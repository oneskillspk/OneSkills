'use client';

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Star, 
  Calendar, 
  Globe, 
  Award, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  FileText, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  Share2
} from 'lucide-react';
import { Course, UserProgressData } from '@/types/course';
import { calculateCourseProgress } from '@/lib/storage';

interface CourseDetailModalProps {
  course: Course | null;
  currency: 'PKR' | 'USD';
  userProgress: UserProgressData;
  onClose: () => void;
  onEnroll: (courseId: string) => void;
  onOpenClassroom: (course: Course) => void;
}

export function CourseDetailModal({
  course,
  currency,
  userProgress,
  onClose,
  onEnroll,
  onOpenClassroom
}: CourseDetailModalProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-fl-1': true,
    'mod-ux-1': true,
    'mod-mkt-1': true,
    'mod-shp-1': true,
    'mod-vid-1': true,
    'mod-py-1': true
  });
  const [copiedLink, setCopiedLink] = useState(false);

  if (!course) return null;

  const isEnrolled = userProgress.enrolledCourseIds.includes(course.id);
  const { percentage, isCompleted, completedCount, totalCount } = calculateCourseProgress(course, userProgress);

  const priceText = currency === 'PKR' 
    ? `Rs. ${course.pricePKR.toLocaleString()}`
    : `$${course.priceUSD}`;

  const originalPriceText = currency === 'PKR'
    ? `Rs. ${course.originalPricePKR.toLocaleString()}`
    : `$${course.originalPriceUSD}`;

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-500/30">
                {course.category}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                {course.level}
              </span>
              {course.badge && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
                  ★ {course.badge}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
              {course.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {course.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{course.rating.toFixed(2)}</span>
                <span className="text-slate-400 font-normal">({course.reviewsCount} reviews)</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{course.durationWeeks} • {course.durationHours} Hours</span>
              </div>

              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{course.language}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{course.batchStartDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          {/* Enrolled Status Notice (if already enrolled) */}
          {isEnrolled && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  You are already enrolled in this bootcamp!
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Your progress: {percentage}% completed ({completedCount} of {totalCount} lessons completed).
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenClassroom(course);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{percentage > 0 ? 'Continue Classroom' : 'Start Classroom'}</span>
              </button>
            </div>
          )}

          {/* Featured Outcome Highlight */}
          <div className="bg-gradient-to-r from-emerald-950 to-slate-900 rounded-2xl p-4 sm:p-5 text-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Career Outcome</p>
              <p className="text-sm sm:text-base font-semibold text-slate-100">{course.featuredOutcome}</p>
            </div>
          </div>

          {/* What You Will Learn */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              What You Will Learn &amp; Master
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Course Curriculum &amp; Modules</h3>
                <p className="text-xs text-slate-500">
                  {course.modules.length} Modules • {totalCount} Lectures &amp; Assignments
                </p>
              </div>

              <button
                onClick={() => {
                  const allExpanded = Object.keys(expandedModules).length === course.modules.length;
                  const nextState: Record<string, boolean> = {};
                  course.modules.forEach(m => {
                    nextState[m.id] = !allExpanded;
                  });
                  setExpandedModules(nextState);
                }}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                Expand / Collapse All
              </button>
            </div>

            <div className="space-y-3">
              {course.modules.map((module, mIdx) => {
                const isOpen = !!expandedModules[module.id];
                return (
                  <div key={module.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/70 text-left flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-emerald-600/10 text-emerald-800 font-bold text-xs flex items-center justify-center">
                          {mIdx + 1}
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-slate-800">{module.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 hidden sm:inline">
                          {module.lessons.length} lessons
                        </span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="divide-y divide-slate-100 px-4 py-2">
                        {module.lessons.map((lesson) => {
                          const completed = userProgress.completedLessonIds[course.id]?.includes(lesson.id);
                          return (
                            <div key={lesson.id} className="py-2.5 flex items-center justify-between text-xs gap-3">
                              <div className="flex items-center gap-2.5 min-w-0">
                                {completed ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                ) : lesson.type === 'assignment' ? (
                                  <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                                ) : (
                                  <Play className="w-4 h-4 text-slate-400 shrink-0" />
                                )}
                                <span className={`truncate ${completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                                  {lesson.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 text-slate-400">
                                {lesson.resources && (
                                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-600">
                                    Files
                                  </span>
                                )}
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructor Profile Card */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Your Lead Instructor</h3>
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-start gap-4">
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name} 
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30"
              />
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{course.instructor.name}</h4>
                    <p className="text-xs text-emerald-700 font-medium">{course.instructor.title}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold bg-white px-2 py-1 rounded-md border border-slate-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{course.instructor.rating} Instructor Rating</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {course.instructor.bio}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>🎓 {course.instructor.studentsCount.toLocaleString()} Students Taught</span>
                  <span>⚡ {course.instructor.experience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Reviews & Testimonials */}
          {course.reviews.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Verified Student Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={rev.avatar} alt={rev.studentName} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{rev.studentName}</p>
                          <p className="text-[10px] text-slate-500">{rev.city} • {rev.date}</p>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic">&ldquo;{rev.comment}&rdquo;</p>
                    {rev.achievement && (
                      <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        🏆 {rev.achievement}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-slate-900">{priceText}</span>
                <span className="text-xs text-slate-400 line-through">{originalPriceText}</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 7-Day Money-Back Guarantee • Lifetime Access
              </p>
            </div>

            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
              title="Share Course"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && <span className="text-[10px] block">Copied!</span>}
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isEnrolled ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenClassroom(course);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Open in Classroom ({percentage}%)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onEnroll(course.id);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Enroll Now ({priceText})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
