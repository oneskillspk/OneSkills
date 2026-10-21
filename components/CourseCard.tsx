'use client';

import React from 'react';
import { 
  Star, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Bookmark, 
  ArrowRight, 
  Play, 
  Award,
  Users
} from 'lucide-react';
import { Course, UserProgressData } from '@/types/course';
import { calculateCourseProgress } from '@/lib/storage';

interface CourseCardProps {
  course: Course;
  currency: 'PKR' | 'USD';
  userProgress: UserProgressData;
  onSelectCourse: (course: Course) => void;
  onOpenClassroom: (course: Course) => void;
  onToggleBookmark: (courseId: string, e: React.MouseEvent) => void;
  onEnroll: (courseId: string, e: React.MouseEvent) => void;
}

export function CourseCard({
  course,
  currency,
  userProgress,
  onSelectCourse,
  onOpenClassroom,
  onToggleBookmark,
  onEnroll
}: CourseCardProps) {
  const isEnrolled = userProgress.enrolledCourseIds.includes(course.id);
  const isBookmarked = userProgress.bookmarkedCourseIds.includes(course.id);
  const { percentage, isCompleted, completedCount, totalCount } = calculateCourseProgress(course, userProgress);

  const priceText = currency === 'PKR' 
    ? `Rs. ${course.pricePKR.toLocaleString()}`
    : `$${course.priceUSD}`;

  const originalPriceText = currency === 'PKR'
    ? `Rs. ${course.originalPricePKR.toLocaleString()}`
    : `$${course.originalPriceUSD}`;

  const discountPercent = Math.round(
    ((course.originalPricePKR - course.pricePKR) / course.originalPricePKR) * 100
  );

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Thumbnail Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onSelectCourse(course)}>
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            {course.badge && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-md">
                {course.badge}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 text-[11px] font-medium border border-slate-700/60">
              {course.level}
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => onToggleBookmark(course.id, e)}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isBookmarked 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Save Course'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Bar on Thumbnail */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <span className="flex items-center gap-1 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm text-[11px]">
            <Clock className="w-3 h-3 text-emerald-400" />
            {course.durationWeeks} • {course.durationHours} hrs
          </span>

          <span className="flex items-center gap-1 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm text-[11px]">
            <BookOpen className="w-3 h-3 text-emerald-400" />
            {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lectures
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs mb-2">
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
              {course.category}
            </span>

            <div className="flex items-center gap-1 text-slate-700 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{course.rating.toFixed(2)}</span>
              <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectCourse(course)}
            className="font-bold text-slate-900 text-base sm:text-lg hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 mb-2 leading-snug"
          >
            {course.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {course.subtitle}
          </p>

          {/* Instructor pill */}
          <div className="flex items-center gap-2.5 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
            <img 
              src={course.instructor.avatar} 
              alt={course.instructor.name} 
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 truncate">{course.instructor.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{course.instructor.company}</p>
            </div>
            <span className="text-[10px] text-slate-400 shrink-0 font-medium">{course.batchStartDate.split('Starts ')[1]}</span>
          </div>

          {/* If user is enrolled: Show Real-time Progress Bar */}
          {isEnrolled && (
            <div className="mb-4 p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-emerald-900 flex items-center gap-1">
                  {isCompleted ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Completed!</span>
                    </>
                  ) : (
                    <span>Your Learning Progress</span>
                  )}
                </span>
                <span className="font-bold text-emerald-700">{percentage}%</span>
              </div>
              <div className="w-full bg-emerald-200/60 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-emerald-800 mt-1.5">
                <span>{completedCount} of {totalCount} lessons done</span>
                {isCompleted && <span className="font-bold text-emerald-700">Certificate Ready</span>}
              </div>
            </div>
          )}
        </div>

        {/* Footer: Price & CTA Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">{priceText}</span>
              <span className="text-xs text-slate-400 line-through">{originalPriceText}</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
              Save {discountPercent}%
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectCourse(course)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Syllabus
            </button>

            {isEnrolled ? (
              <button
                onClick={() => onOpenClassroom(course)}
                className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{percentage > 0 ? 'Resume' : 'Start'}</span>
              </button>
            ) : (
              <button
                onClick={(e) => onEnroll(course.id, e)}
                className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-emerald-600 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>Enroll</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
