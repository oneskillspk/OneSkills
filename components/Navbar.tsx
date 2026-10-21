'use client';

import React from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Search, 
  CheckCircle2, 
  User, 
  ChevronRight,
  Menu,
  X,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { UserProgressData } from '@/types/course';

interface NavbarProps {
  activeTab: 'courses' | 'dashboard' | 'verify' | 'stories' | 'about';
  setActiveTab: (tab: 'courses' | 'dashboard' | 'verify' | 'stories' | 'about') => void;
  currency: 'PKR' | 'USD';
  setCurrency: (c: 'PKR' | 'USD') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userProgress: UserProgressData;
  onOpenClassroomForFirstEnrolled: () => void;
}

export function Navbar({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  searchQuery,
  setSearchQuery,
  userProgress,
  onOpenClassroomForFirstEnrolled
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const enrolledCount = userProgress.enrolledCourseIds.length;
  const certificatesCount = userProgress.earnedCertificates.length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full text-[11px] border border-emerald-500/30">
              <Sparkles className="w-3 h-3 text-emerald-400" /> New Batches Open
            </span>
            <span className="truncate text-slate-300">
              November 2026 Admissions: Flat 45% Early Bird Discount for Pakistani Students & Freelancers.
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-300 text-xs shrink-0">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              WhatsApp Help: +92 300 1234567
            </span>
            <div className="h-3 w-px bg-slate-700" />
            <button
              onClick={() => setActiveTab('verify')}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <Award className="w-3 h-3 text-emerald-400" />
              Verify Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Brand Logo */}
          <button 
            onClick={() => setActiveTab('courses')}
            className="flex items-center gap-2.5 text-left group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold tracking-tight text-slate-900">One<span className="text-emerald-600">Skills</span></span>
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded text-emerald-700">.pk</span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Practical Tech Academy</p>
            </div>
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, skills (React, Upwork, Figma, SEO)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-50 focus:bg-white border border-transparent focus:border-emerald-500 rounded-full outline-hidden transition-all text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'courses' 
                  ? 'text-emerald-700 bg-emerald-50 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Explore Courses
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 relative ${
                activeTab === 'dashboard'
                  ? 'text-emerald-700 bg-emerald-50 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Student Dashboard</span>
              {enrolledCount > 0 && (
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                  {enrolledCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('verify')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'verify' 
                  ? 'text-emerald-700 bg-emerald-50 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Verify Certificate
            </button>

            <button
              onClick={() => setActiveTab('stories')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'stories' 
                  ? 'text-emerald-700 bg-emerald-50 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Success Stories
            </button>
          </nav>

          {/* Currency Toggle & Profile CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency selector */}
            <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex text-xs font-semibold">
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  currency === 'PKR' 
                    ? 'bg-white text-emerald-700 shadow-2xs font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Pakistani Rupees (PKR)"
              >
                PKR (₨)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  currency === 'USD' 
                    ? 'bg-white text-emerald-700 shadow-2xs font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="US Dollars (USD)"
              >
                USD ($)
              </button>
            </div>

            {/* Student Dashboard Profile Quick Pill */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-full transition-all group"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-600/20">
                {userProgress.studentProfile.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-none group-hover:text-emerald-700">
                  {userProgress.studentProfile.name}
                </p>
                <p className="text-[10px] text-emerald-600 font-medium">
                  {enrolledCount} Enrolled {certificatesCount > 0 ? `• ${certificatesCount} Cert` : ''}
                </p>
              </div>
            </button>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          {/* Mobile Search */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg outline-hidden text-slate-800"
            />
          </div>

          <div className="flex flex-col gap-1 pt-2">
            <button
              onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
              className={`px-3 py-2.5 text-sm font-medium rounded-lg text-left flex items-center justify-between ${
                activeTab === 'courses' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Explore All Courses</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className={`px-3 py-2.5 text-sm font-medium rounded-lg text-left flex items-center justify-between ${
                activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>My Learning Dashboard</span>
              </div>
              <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {enrolledCount} Active
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('verify'); setMobileMenuOpen(false); }}
              className={`px-3 py-2.5 text-sm font-medium rounded-lg text-left flex items-center justify-between ${
                activeTab === 'verify' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Verify OneSkills Certificate</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => { setActiveTab('stories'); setMobileMenuOpen(false); }}
              className={`px-3 py-2.5 text-sm font-medium rounded-lg text-left flex items-center justify-between ${
                activeTab === 'stories' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Student Success Stories</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Currency:</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrency('PKR')} 
                className={`px-2 py-1 rounded ${currency === 'PKR' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100'}`}
              >
                PKR (₨)
              </button>
              <button 
                onClick={() => setCurrency('USD')} 
                className={`px-2 py-1 rounded ${currency === 'USD' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100'}`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
