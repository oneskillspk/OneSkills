'use client';

import React from 'react';
import { 
  Star, 
  Quote, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  MapPin,
  Award
} from 'lucide-react';
import { SUCCESS_STORIES } from '@/data/courses';

interface SuccessStoriesProps {
  onExploreCourses: () => void;
}

export function SuccessStories({ onExploreCourses }: SuccessStoriesProps) {
  return (
    <div className="bg-slate-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Real Pakistani Freelancer Outcomes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            From Zero Coding to Earning in Dollars
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Read inspiring stories of Pakistani students, graduates, and housewives who built sustainable freelance careers through OneSkills.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Earnings & Status Pill */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200/60 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {story.monthlyEarnings}
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-semibold text-[11px]">
                    {story.badge}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic relative">
                  &ldquo;{story.quote}&rdquo;
                </p>

                {/* Stars */}
                <div className="flex text-amber-400 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Student Bio */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-3">
                <img 
                  src={story.avatar} 
                  alt={story.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">{story.name}</h4>
                  <p className="text-xs text-emerald-700 font-medium truncate">{story.role}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {story.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Ready to write your own success story?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Join over 18,500 students mastering in-demand digital skills with hands-on mentoring.
            </p>
          </div>

          <button
            onClick={onExploreCourses}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/25 shrink-0 flex items-center gap-2"
          >
            <span>Explore All Bootcamps</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
