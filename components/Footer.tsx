'use client';

import React from 'react';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Award,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: any) => void;
  onOpenDashboard: () => void;
  onOpenVerify: () => void;
}

export function Footer({ onSelectCategory, onOpenDashboard, onOpenVerify }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                One<span className="text-emerald-500">Skills</span>
                <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded ml-1 font-semibold">.pk</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Pakistan&apos;s leading practical skills academy. Empowering students, freelancers, and professionals with real-world tech capabilities, portfolio development, and international client acquisition.
            </p>

            <div className="space-y-2 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>oneskillspk@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+92 300 1234567 (WhatsApp / Support)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>G-11 Markaz, Islamabad &amp; Gulberg III, Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Top Bootcamps</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onSelectCategory('Web Development')} className="hover:text-emerald-400 transition-colors">
                  Full-Stack Web Dev (Next.js)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Freelancing & Upwork')} className="hover:text-emerald-400 transition-colors">
                  Upwork &amp; Fiverr Mastery
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Graphic & UI/UX Design')} className="hover:text-emerald-400 transition-colors">
                  UI/UX &amp; Product Design
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Digital Marketing & SEO')} className="hover:text-emerald-400 transition-colors">
                  Meta Ads &amp; Performance SEO
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Shopify & E-Commerce')} className="hover:text-emerald-400 transition-colors">
                  Shopify &amp; Local Dropshipping
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Python & AI Automation')} className="hover:text-emerald-400 transition-colors">
                  Python &amp; AI Automation
                </button>
              </li>
            </ul>
          </div>

          {/* Student Portal & Verification */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Student Portal</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenDashboard} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                  <span>My Learning Dashboard</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenVerify} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verify Student Certificate</span>
                </button>
              </li>
              <li>
                <a href="#faqs" className="hover:text-emerald-400 transition-colors">
                  Admissions &amp; Payment FAQs
                </a>
              </li>
              <li>
                <span className="text-slate-500">Live Zoom Schedule</span>
              </li>
              <li>
                <span className="text-slate-500">Download Curriculum PDF</span>
              </li>
            </ul>
          </div>

          {/* Local Pakistani Payment Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Supported Payments</h4>
            <p className="text-xs text-slate-400">
              Instant activation via Pakistani &amp; global payment channels:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-emerald-400">JazzCash</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-emerald-400">EasyPaisa</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold">SadaPay</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold">NayaPay</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold">Meezan Bank</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold">Visa / MC</span>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>7-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 OneSkills Pakistan (oneskills.pk). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenVerify} className="hover:text-slate-300">Certificate Verification</button>
            <span>•</span>
            <span className="hover:text-slate-300">Terms of Enrollment</span>
            <span>•</span>
            <span className="hover:text-slate-300">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
