'use client';

import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Star, 
  TrendingUp, 
  Code2, 
  Briefcase, 
  Laptop, 
  Award
} from 'lucide-react';
import { CourseCategory } from '@/types/course';
import { PLATFORM_STATS, TRUST_PARTNERS } from '@/data/courses';

interface HeroSectionProps {
  onExploreCourses: () => void;
  onOpenDashboard: () => void;
  selectedCategory: CourseCategory;
  onSelectCategory: (cat: CourseCategory) => void;
  onSelectFeaturedCourse: () => void;
}

export function HeroSection({
  onExploreCourses,
  onOpenDashboard,
  selectedCategory,
  onSelectCategory,
  onSelectFeaturedCourse
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid: Headline + Video/Hero Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Inspired by oneskills.pk • Pakistan&apos;s High-Impact Skill Academy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Learn In-Demand Tech Skills. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Earn Globally from Pakistan.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Master Full-Stack Web Development, Upwork Freelancing, UI/UX, Meta Ads, Shopify E-Commerce, and Python with live mentorship, real portfolio projects, and structured progress tracking.
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bilingual Urdu &amp; English Technical Training</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real Upwork &amp; Client Acquisition Clinics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verifiable QR-Code Certificates of Completion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 Dedicated Mentor Support on WhatsApp</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onExploreCourses}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Browse All Bootcamps</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDashboard}
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-white font-semibold text-sm sm:text-base transition-all flex items-center gap-2"
              >
                <Laptop className="w-4 h-4 text-emerald-400" />
                <span>Open Student Dashboard</span>
              </button>
            </div>

            {/* Live Student Trust Stats */}
            <div className="pt-4 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Student" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.95 Rating</span>
                  <span className="text-slate-400 font-normal">from 8,200+ Reviews</span>
                </div>
                <p className="text-slate-400">Trusted by learners across Lahore, Karachi, Islamabad &amp; Overseas</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Interactive Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Flagship Bootcamp
                </span>
                <span className="text-xs text-slate-400">Batch 14 • 10 Weeks</span>
              </div>

              {/* Course Preview Visual */}
              <div className="relative rounded-xl overflow-hidden aspect-video group mb-4 border border-slate-700">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                  alt="Full-Stack Web Development Course" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
                
                <button
                  onClick={onSelectFeaturedCourse}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center hover:scale-110 hover:bg-emerald-400 transition-all shadow-xl"
                  title="Watch Course Preview"
                >
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="bg-slate-900/80 px-2 py-0.5 rounded text-[11px] backdrop-blur-sm">
                    4 Modules • 36 Lessons
                  </span>
                  <span className="bg-emerald-600/90 px-2 py-0.5 rounded text-[11px] font-semibold">
                    Hands-on Capstones
                  </span>
                </div>
              </div>

              {/* Course Quick Info */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                  Full-Stack Modern Web Development Bootcamp
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  Master React 19, Next.js 15, TypeScript, Tailwind CSS, REST APIs, and land international remote or freelance gigs.
                </p>

                {/* Progress Tracking Simulation Preview */}
                <div className="bg-slate-900/70 rounded-xl p-3 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                    <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                      <TrendingUp className="w-3.5 h-3.5" /> Student Progress Tracker
                    </span>
                    <span className="text-slate-400 font-semibold">65% Complete</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full w-[65%]" />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
                    <span>Active: Module 2 • Lesson 2</span>
                    <span className="text-emerald-400 font-medium">Certificate In Progress</span>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-1 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 line-through block">Rs. 28,000</span>
                    <span className="text-lg font-bold text-emerald-400">Rs. 14,999</span>
                  </div>
                  <button
                    onClick={onSelectFeaturedCourse}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Stats Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          {PLATFORM_STATS.map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                <span className="text-emerald-400">{stat.value}</span>
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust Partners ticker */}
        <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-slate-400">
          <span className="uppercase tracking-wider font-semibold text-slate-500">Graduates Recognized By:</span>
          {TRUST_PARTNERS.map((partner, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-800 text-slate-300 font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
