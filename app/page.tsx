'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  BookOpen, 
  CheckCircle2, 
  Star, 
  Award, 
  Layers, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  TrendingUp,
  Laptop,
  Check,
  ShieldCheck,
  Zap,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { Course, CourseCategory, SkillLevel, UserProgressData } from '@/types/course';
import { INITIAL_COURSES, CATEGORIES, FAQS } from '@/data/courses';
import { 
  loadUserProgress, 
  saveUserProgress, 
  calculateCourseProgress, 
  generateCertNumber 
} from '@/lib/storage';

import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CourseCard } from '@/components/CourseCard';
import { CourseDetailModal } from '@/components/CourseDetailModal';
import { ClassroomPlayer } from '@/components/ClassroomPlayer';
import { DashboardView } from '@/components/DashboardView';
import { CertificateModal } from '@/components/CertificateModal';
import { CertificateVerification } from '@/components/CertificateVerification';
import { SuccessStories } from '@/components/SuccessStories';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<'courses' | 'dashboard' | 'verify' | 'stories' | 'about'>('courses');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [activeClassroomCourse, setActiveClassroomCourse] = useState<Course | null>(null);
  const [certificateModalCourseId, setCertificateModalCourseId] = useState<string | null>(null);

  // Filter States
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-asc' | 'price-desc'>('popular');

  // User Progress Data State (initialized directly from storage)
  const [userProgress, setUserProgress] = useState<UserProgressData>(() => loadUserProgress());

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // FAQ accordion open states
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({ 0: true, 1: true });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync state update helper
  const updateAndSaveProgress = (updater: (prev: UserProgressData) => UserProgressData) => {
    setUserProgress(prev => {
      const next = updater(prev);
      saveUserProgress(next);
      return next;
    });
  };

  // Handle Enrollment
  const handleEnrollCourse = (courseId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const targetCourse = INITIAL_COURSES.find(c => c.id === courseId);
    if (!targetCourse) return;

    if (userProgress.enrolledCourseIds.includes(courseId)) {
      // Already enrolled, open classroom
      setActiveClassroomCourse(targetCourse);
      return;
    }

    updateAndSaveProgress(prev => ({
      ...prev,
      enrolledCourseIds: [...prev.enrolledCourseIds, courseId],
      completedLessonIds: {
        ...prev.completedLessonIds,
        [courseId]: prev.completedLessonIds[courseId] || []
      }
    }));

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    showToast(`🎉 Enrolled successfully in "${targetCourse.title}"!`);

    // Ask to switch to classroom or dashboard
    setTimeout(() => {
      setActiveClassroomCourse(targetCourse);
    }, 700);
  };

  // Handle toggling lesson complete inside classroom
  const handleToggleLessonComplete = (courseId: string, lessonId: string) => {
    const targetCourse = INITIAL_COURSES.find(c => c.id === courseId);
    if (!targetCourse) return;

    updateAndSaveProgress(prev => {
      const currentDone = prev.completedLessonIds[courseId] || [];
      const isAlreadyDone = currentDone.includes(lessonId);
      const nextDone = isAlreadyDone 
        ? currentDone.filter(id => id !== lessonId)
        : [...currentDone, lessonId];

      const updatedProgress: UserProgressData = {
        ...prev,
        completedLessonIds: {
          ...prev.completedLessonIds,
          [courseId]: nextDone
        },
        lastActiveLesson: {
          ...prev.lastActiveLesson,
          [courseId]: lessonId
        }
      };

      // Check if course became 100% completed
      const allLessons = targetCourse.modules.flatMap(m => m.lessons);
      const isFullyCompleted = allLessons.every(l => nextDone.includes(l.id));

      if (isFullyCompleted) {
        const alreadyHasCert = prev.earnedCertificates.some(cert => cert.courseId === courseId);
        if (!alreadyHasCert) {
          const newCert = {
            courseId: courseId,
            courseTitle: targetCourse.title,
            studentName: prev.studentProfile.name,
            issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            certificateNumber: generateCertNumber(),
            grade: 'Distinction (Grade A+)'
          };
          updatedProgress.earnedCertificates = [...prev.earnedCertificates, newCert];
          showToast(`🎓 Congratulations! You have earned your Certificate of Completion for ${targetCourse.title}!`);
        }
      }

      return updatedProgress;
    });
  };

  // Handle saving lecture notes
  const handleSaveNote = (courseId: string, lessonId: string, noteText: string) => {
    const key = `${courseId}_${lessonId}`;
    updateAndSaveProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [key]: noteText
      }
    }));
    showToast('Note saved to your student profile');
  };

  // Handle bookmark toggle
  const handleToggleBookmark = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updateAndSaveProgress(prev => {
      const isSaved = prev.bookmarkedCourseIds.includes(courseId);
      const nextBookmarks = isSaved
        ? prev.bookmarkedCourseIds.filter(id => id !== courseId)
        : [...prev.bookmarkedCourseIds, courseId];

      showToast(isSaved ? 'Removed from saved courses' : 'Course saved to your wishlist');

      return {
        ...prev,
        bookmarkedCourseIds: nextBookmarks
      };
    });
  };

  // Handle profile update
  const handleUpdateProfile = (updatedProfile: Partial<UserProgressData['studentProfile']>) => {
    updateAndSaveProgress(prev => ({
      ...prev,
      studentProfile: {
        ...prev.studentProfile,
        ...updatedProfile
      }
    }));
    showToast('Student profile updated successfully!');
  };

  // Filtered and sorted courses
  const filteredCourses = useMemo(() => {
    return INITIAL_COURSES.filter(course => {
      // Category match
      if (selectedCategory !== 'All' && course.category !== selectedCategory) {
        return false;
      }
      // Level match
      if (selectedLevel !== 'All' && course.level !== selectedLevel) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesSubtitle = course.subtitle.toLowerCase().includes(query);
        const matchesInstructor = course.instructor.name.toLowerCase().includes(query);
        const matchesCategory = course.category.toLowerCase().includes(query);
        const matchesOutcomes = course.learningOutcomes.some(o => o.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSubtitle && !matchesInstructor && !matchesCategory && !matchesOutcomes) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
      return b.studentsEnrolled - a.studentsEnrolled; // popular
    });
  }, [selectedCategory, selectedLevel, searchQuery, sortBy]);

  // If user is currently in the classroom player view, render ClassroomPlayer
  if (activeClassroomCourse) {
    return (
      <ClassroomPlayer
        course={activeClassroomCourse}
        userProgress={userProgress}
        onBack={() => setActiveClassroomCourse(null)}
        onToggleLessonComplete={handleToggleLessonComplete}
        onSaveNote={handleSaveNote}
        onViewCertificate={(courseId) => setCertificateModalCourseId(courseId)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userProgress={userProgress}
        onOpenClassroomForFirstEnrolled={() => {
          const first = INITIAL_COURSES.find(c => userProgress.enrolledCourseIds.includes(c.id));
          if (first) setActiveClassroomCourse(first);
        }}
      />

      {/* View Switching */}
      {activeTab === 'dashboard' ? (
        <DashboardView
          courses={INITIAL_COURSES}
          userProgress={userProgress}
          currency={currency}
          onOpenClassroom={(course) => setActiveClassroomCourse(course)}
          onExploreCourses={() => setActiveTab('courses')}
          onViewCertificate={(courseId) => setCertificateModalCourseId(courseId)}
          onToggleBookmark={handleToggleBookmark}
          onUpdateProfile={handleUpdateProfile}
        />
      ) : activeTab === 'verify' ? (
        <CertificateVerification
          userProgress={userProgress}
          onExploreCourses={() => setActiveTab('courses')}
        />
      ) : activeTab === 'stories' ? (
        <SuccessStories 
          onExploreCourses={() => setActiveTab('courses')}
        />
      ) : (
        /* Main Catalog & Course Showcase View */
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection
            onExploreCourses={() => {
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenDashboard={() => setActiveTab('dashboard')}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onSelectFeaturedCourse={() => setSelectedCourseForModal(INITIAL_COURSES[0])}
          />

          {/* Catalog & Filter Section */}
          <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-8">
            {/* Section Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Practical Bootcamp Catalog</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Explore High-Impact Digital Courses
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Learn directly from verified freelancers, agency founders, and software engineers in Pakistan.
                </p>
              </div>

              {/* Course Count & Reset Filter */}
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>Showing <strong>{filteredCourses.length}</strong> bootcamps</span>
                {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedLevel('All');
                      setSearchQuery('');
                    }}
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Category Pills Slider / Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name as CourseCategory)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.name !== 'All' && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-500'}`}>
                        {INITIAL_COURSES.filter(c => c.category === cat.name).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controls Row: Search Input + Level + Sort Dropdown */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              {/* Keyword Search */}
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by title, skill (React, Upwork, Figma)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>

              {/* Level Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium hidden sm:inline">Level:</span>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  aria-label="Filter by skill level"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium outline-hidden focus:border-emerald-500"
                >
                  <option value="All">All Skill Levels</option>
                  <option value="Beginner">Beginner Friendly</option>
                  <option value="All Levels">All Levels</option>
                  <option value="Intermediate">Intermediate</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort courses by"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium outline-hidden focus:border-emerald-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated (★)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
                <Layers className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No matching courses found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search terms or select &ldquo;All&rdquo; categories to view the full curriculum.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLevel('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    currency={currency}
                    userProgress={userProgress}
                    onSelectCourse={(c) => setSelectedCourseForModal(c)}
                    onOpenClassroom={(c) => setActiveClassroomCourse(c)}
                    onToggleBookmark={handleToggleBookmark}
                    onEnroll={handleEnrollCourse}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Why OneSkills Feature Showcase */}
          <section className="bg-slate-900 text-white py-16 lg:py-24 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>The OneSkills Difference</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Why Pakistani Students Choose OneSkills
                </h2>
                <p className="text-sm text-slate-400">
                  We don&apos;t just sell recorded videos. We build professional tech careers with personal mentorship.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Project-First Curriculum</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Build real software capstones, Behance case studies, and live Shopify stores. Every module produces a portfolio piece ready for client presentation.
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Upwork &amp; Client Acquisition</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Learn how Pakistani freelancers write proposals that convert, avoid account suspensions, receive USD payments via Payoneer/Wise, and scale rates.
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Verifiable Certifications</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Every graduate receives an official OneSkills QR-verifiable certificate. Employers and clients can verify credentials instantly in our public registry.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Student Success Stories Preview */}
          <SuccessStories onExploreCourses={() => {
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }} />

          {/* Frequently Asked Questions (FAQs) */}
          <section id="faqs" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Everything you need to know about OneSkills admissions, certifications, and payment in Pakistan.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = !!openFaqIndices[idx];
                return (
                  <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    <button
                      onClick={() => setOpenFaqIndices(prev => ({ ...prev, [idx]: !prev[idx] }))}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900">{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      )}

      {/* Course Detail / Syllabus Modal */}
      {selectedCourseForModal && (
        <CourseDetailModal
          course={selectedCourseForModal}
          currency={currency}
          userProgress={userProgress}
          onClose={() => setSelectedCourseForModal(null)}
          onEnroll={(courseId) => {
            handleEnrollCourse(courseId);
            setSelectedCourseForModal(null);
          }}
          onOpenClassroom={(course) => {
            setSelectedCourseForModal(null);
            setActiveClassroomCourse(course);
          }}
        />
      )}

      {/* Official Certificate Modal */}
      {certificateModalCourseId && (
        <CertificateModal
          courseId={certificateModalCourseId}
          courses={INITIAL_COURSES}
          userProgress={userProgress}
          onClose={() => setCertificateModalCourseId(null)}
        />
      )}

      {/* Floating WhatsApp Admissions Widget */}
      <WhatsAppFloat />

      {/* Site Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('courses');
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenDashboard={() => setActiveTab('dashboard')}
        onOpenVerify={() => setActiveTab('verify')}
      />
    </div>
  );
}
