'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Play, 
  Bookmark, 
  Calendar, 
  FileText, 
  User, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Edit3,
  MapPin,
  Target,
  MessageSquare
} from 'lucide-react';
import { Course, UserProgressData } from '@/types/course';
import { calculateCourseProgress, getAllLessonsInCourse } from '@/lib/storage';

interface DashboardViewProps {
  courses: Course[];
  userProgress: UserProgressData;
  currency: 'PKR' | 'USD';
  onOpenClassroom: (course: Course) => void;
  onExploreCourses: () => void;
  onViewCertificate: (courseId: string) => void;
  onToggleBookmark: (courseId: string, e: React.MouseEvent) => void;
  onUpdateProfile: (updated: Partial<UserProgressData['studentProfile']>) => void;
}

export function DashboardView({
  courses,
  userProgress,
  currency,
  onOpenClassroom,
  onExploreCourses,
  onViewCertificate,
  onToggleBookmark,
  onUpdateProfile
}: DashboardViewProps) {
  const [subTab, setSubTab] = useState<'enrolled' | 'certificates' | 'bookmarks' | 'notes' | 'mentorship'>('enrolled');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(userProgress.studentProfile);

  // Filter enrolled courses
  const enrolledCourses = courses.filter(c => userProgress.enrolledCourseIds.includes(c.id));
  const bookmarkedCourses = courses.filter(c => userProgress.bookmarkedCourseIds.includes(c.id));

  // Compute aggregated stats
  let totalLessonsCompleted = 0;
  let totalHoursLearned = 0;

  enrolledCourses.forEach(c => {
    const doneLessons = userProgress.completedLessonIds[c.id] || [];
    totalLessonsCompleted += doneLessons.length;
    // Estimate hours learned proportionally
    const all = getAllLessonsInCourse(c);
    if (all.length > 0) {
      totalHoursLearned += Math.round((doneLessons.length / all.length) * c.durationHours);
    }
  });

  // Calculate readiness score
  const readinessScore = Math.min(96, Math.max(30, 40 + totalLessonsCompleted * 6));

  // Pick primary active course
  const activeCourse = enrolledCourses.find(c => {
    const p = calculateCourseProgress(c, userProgress);
    return !p.isCompleted;
  }) || enrolledCourses[0];

  const activeCourseProgress = activeCourse 
    ? calculateCourseProgress(activeCourse, userProgress)
    : null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Student Welcome Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative">
                <img 
                  src={userProgress.studentProfile.avatar} 
                  alt={userProgress.studentProfile.name} 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-emerald-500/30"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-950">
                  ✓
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                    Welcome back, {userProgress.studentProfile.name}! 👋
                  </h1>
                  <button 
                    onClick={() => {
                      setProfileForm(userProgress.studentProfile);
                      setIsEditingProfile(true);
                    }}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Edit Profile"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-300 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {userProgress.studentProfile.city}
                  </span>
                  <span>•</span>
                  <span>Joined {userProgress.studentProfile.joinDate}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{userProgress.studentProfile.email}</span>
                </div>

                <div className="flex items-center gap-2 mt-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60 max-w-xl">
                  <Target className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Career Goal: <strong className="text-white font-medium">{userProgress.studentProfile.primaryGoal}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Action in Header */}
            {activeCourse && (
              <button
                onClick={() => onOpenClassroom(activeCourse)}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Resume Active Course</span>
              </button>
            )}
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditingProfile && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Edit Student Profile</h3>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-hidden focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-hidden focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City &amp; Country</label>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-hidden focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Learning Goal</label>
                  <input
                    type="text"
                    value={profileForm.primaryGoal}
                    onChange={(e) => setProfileForm({ ...profileForm, primaryGoal: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-hidden focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Aggregated KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black text-slate-900">{enrolledCourses.length}</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Enrolled Bootcamps</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black text-slate-900">{totalLessonsCompleted}</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Lessons Completed</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black text-slate-900">{totalHoursLearned} hrs</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Practical Training</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black text-slate-900">{userProgress.earnedCertificates.length}</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Earned Certificates</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs col-span-2 lg:col-span-1">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black text-slate-900">{readinessScore}%</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Freelance Ready Score</p>
          </div>
        </div>

        {/* Continue Learning Spotlight (If any enrolled) */}
        {activeCourse && activeCourseProgress && (
          <div className="bg-white border-2 border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <img 
                src={activeCourse.thumbnail} 
                alt={activeCourse.title} 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 ring-1 ring-slate-200"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                  Continue Where You Left Off
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                  {activeCourse.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instructor: {activeCourse.instructor.name} • {activeCourse.durationWeeks}
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <div className="w-32 sm:w-48 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all"
                      style={{ width: `${activeCourseProgress.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-emerald-700">
                    {activeCourseProgress.percentage}% Done
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => onOpenClassroom(activeCourse)}
                className="w-full md:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Resume Lecture</span>
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Sub-navigation Tabs */}
        <div className="space-y-6">
          <div className="flex border-b border-slate-200 gap-4 sm:gap-6 text-xs sm:text-sm font-semibold overflow-x-auto">
            <button
              onClick={() => setSubTab('enrolled')}
              className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                subTab === 'enrolled'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>My Enrolled Courses ({enrolledCourses.length})</span>
            </button>

            <button
              onClick={() => setSubTab('certificates')}
              className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                subTab === 'certificates'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Earned Certificates ({userProgress.earnedCertificates.length})</span>
            </button>

            <button
              onClick={() => setSubTab('bookmarks')}
              className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                subTab === 'bookmarks'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Courses ({bookmarkedCourses.length})</span>
            </button>

            <button
              onClick={() => setSubTab('notes')}
              className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                subTab === 'notes'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Lecture Notes ({Object.keys(userProgress.notes).length})</span>
            </button>

            <button
              onClick={() => setSubTab('mentorship')}
              className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                subTab === 'mentorship'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Live Mentorship &amp; Batches</span>
            </button>
          </div>

          {/* SubTab 1: Enrolled Courses */}
          {subTab === 'enrolled' && (
            <div>
              {enrolledCourses.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800">No Enrolled Courses Yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                    Explore our hands-on tech and freelance bootcamps inspired by oneskills.pk and start learning today!
                  </p>
                  <button
                    onClick={onExploreCourses}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                  >
                    Browse Course Catalog
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledCourses.map((c) => {
                    const progress = calculateCourseProgress(c, userProgress);
                    return (
                      <div 
                        key={c.id} 
                        className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start gap-4">
                            <img 
                              src={c.thumbnail} 
                              alt={c.title} 
                              className="w-20 h-20 rounded-xl object-cover shrink-0 ring-1 ring-slate-100"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                {c.category}
                              </span>
                              <h4 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 mt-1">
                                {c.title}
                              </h4>
                              <p className="text-xs text-slate-500">Instructor: {c.instructor.name}</p>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-semibold text-slate-700">Course Completion</span>
                              <span className="font-bold text-emerald-700">{progress.percentage}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-emerald-600 h-2 rounded-full transition-all"
                                style={{ width: `${progress.percentage}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                              <span>{progress.completedCount} of {progress.totalCount} lectures finished</span>
                              {progress.isCompleted ? (
                                <span className="text-emerald-700 font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Complete
                                </span>
                              ) : (
                                <span>{progress.totalCount - progress.completedCount} remaining</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Card actions */}
                        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                          {progress.isCompleted ? (
                            <button
                              onClick={() => onViewCertificate(c.id)}
                              className="px-3.5 py-2 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>View Certificate</span>
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 font-medium">
                              Batch active • Lifetime access
                            </span>
                          )}

                          <button
                            onClick={() => onOpenClassroom(c)}
                            className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{progress.percentage > 0 ? 'Resume Classroom' : 'Start Course'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SubTab 2: Certificates */}
          {subTab === 'certificates' && (
            <div>
              {userProgress.earnedCertificates.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
                  <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800">No Certificates Earned Yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                    Complete 100% of the lessons in any enrolled course to unlock your official verified certificate!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userProgress.earnedCertificates.map((cert, i) => (
                    <div 
                      key={i} 
                      className="bg-white rounded-2xl border border-emerald-500/40 p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                            ✓ Official OneSkills Certificate
                          </span>
                          <span className="text-xs text-slate-500 font-mono">{cert.certificateNumber}</span>
                        </div>

                        <h4 className="font-extrabold text-slate-900 text-base">
                          {cert.courseTitle}
                        </h4>

                        <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl">
                          <p>Issued to: <strong className="text-slate-800">{cert.studentName}</strong></p>
                          <p>Date Awarded: <strong className="text-slate-800">{cert.issueDate}</strong></p>
                          <p>Verification Grade: <strong className="text-emerald-700">{cert.grade}</strong></p>
                        </div>
                      </div>

                      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-400">Verifiable via oneskills.pk QR registry</span>
                        <button
                          onClick={() => onViewCertificate(cert.courseId)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>View &amp; Print Certificate</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SubTab 3: Bookmarks */}
          {subTab === 'bookmarks' && (
            <div>
              {bookmarkedCourses.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
                  <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800">No Bookmarked Courses</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                    Browse courses and click the bookmark ribbon icon on any course card to save it here for later.
                  </p>
                  <button
                    onClick={onExploreCourses}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkedCourses.map((c) => (
                    <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
                      <div className="space-y-2">
                        <img src={c.thumbnail} alt={c.title} className="w-full aspect-video rounded-xl object-cover" />
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {c.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{c.title}</h4>
                        <p className="text-xs text-slate-500">{c.instructor.name}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">
                          {currency === 'PKR' ? `Rs. ${c.pricePKR.toLocaleString()}` : `$${c.priceUSD}`}
                        </span>
                        <button
                          onClick={(e) => onToggleBookmark(c.id, e)}
                          className="text-xs text-rose-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SubTab 4: Notes */}
          {subTab === 'notes' && (
            <div className="space-y-4">
              {Object.keys(userProgress.notes).length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800">No Lecture Notes Yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    While watching any video lecture in the classroom, use the &quot;My Personal Notes&quot; tab to save key insights.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(userProgress.notes).map(([key, note]) => {
                    const [cId, lId] = key.split('_');
                    const course = courses.find(c => c.id === cId);
                    const lesson = course?.modules.flatMap(m => m.lessons).find(l => l.id === lId);

                    return (
                      <div key={key} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-emerald-700 truncate">{course?.title}</span>
                        </div>
                        <h5 className="font-semibold text-slate-900 text-xs truncate">
                          Lesson: {lesson?.title || lId}
                        </h5>
                        <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed italic">
                          &ldquo;{note}&rdquo;
                        </p>
                        {course && (
                          <button
                            onClick={() => onOpenClassroom(course)}
                            className="text-[11px] text-emerald-700 hover:underline font-semibold flex items-center gap-1"
                          >
                            <span>Open lecture in classroom</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SubTab 5: Live Mentorship */}
          {subTab === 'mentorship' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Weekly Live Q&amp;A on Zoom</h3>
                    <p className="text-xs text-slate-500">Every Saturday at 8:00 PM (Pakistan Standard Time)</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Join live screen-sharing sessions with lead instructors. Get your code audited, review your Upwork proposal drafts, and receive direct career feedback in real-time.
                </p>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Next Session:</span>
                    <strong className="text-slate-800">Saturday, Nov 14 @ 8:00 PM PKT</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Topic:</span>
                    <strong className="text-emerald-700">Live Upwork Proposal Teardowns</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Instructor:</span>
                    <strong className="text-slate-800">Engr. Hammad &amp; Usman Sheikh</strong>
                  </div>
                </div>

                <button
                  onClick={() => alert('Zoom Room Link: https://zoom.us/j/oneskills-live (Opens 15 mins prior to session)')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Join Live Zoom Room</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">24/7 WhatsApp Community</h3>
                    <p className="text-xs text-slate-500">Direct student &amp; mentor discussion group</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Never get stuck. Post your programming errors, client communication screenshots, or design wireframes to receive instant solutions from fellow alumni and teaching assistants.
                </p>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Group Status:</span>
                    <strong className="text-emerald-700 font-semibold">Active (450+ Members Online)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Avg. Response Time:</span>
                    <strong className="text-slate-800">&lt; 8 minutes</strong>
                  </div>
                </div>

                <a
                  href="https://wa.me/923001234567?text=Hi%20OneSkills%20Team!%20I%20am%20an%20enrolled%20student%20joining%20the%20mentorship%20group."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Open WhatsApp Mentorship Group</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
