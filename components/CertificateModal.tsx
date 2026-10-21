'use client';

import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Download, 
  Printer, 
  Share2, 
  ShieldCheck, 
  Check, 
  Sparkles,
  QrCode
} from 'lucide-react';
import { Course, UserProgressData } from '@/types/course';

interface CertificateModalProps {
  courseId: string;
  courses: Course[];
  userProgress: UserProgressData;
  onClose: () => void;
}

export function CertificateModal({
  courseId,
  courses,
  userProgress,
  onClose
}: CertificateModalProps) {
  const [copied, setCopied] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const certInfo = userProgress.earnedCertificates.find(c => c.courseId === courseId) || {
    courseId: courseId,
    courseTitle: course?.title || 'OneSkills Professional Certification',
    studentName: userProgress.studentProfile.name,
    issueDate: 'October 2026',
    certificateNumber: 'OS-PK-2026-8842',
    grade: 'Distinction (Grade A+)'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://oneskills.pk/verify/${certInfo.certificateNumber}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">Official Certificate of Completion</span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">#{certInfo.certificateNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors"
              title="Copy verification link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share / Verify'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Canvas (Printable Target) */}
        <div className="p-4 sm:p-8 md:p-10 bg-slate-100 flex items-center justify-center overflow-x-auto">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl border-8 border-double border-emerald-800/80 p-8 sm:p-12 relative overflow-hidden text-center text-slate-800">
            {/* Watermark Logo in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
              <Award className="w-96 h-96 text-emerald-950" />
            </div>

            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-800" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-800" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-800" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-800" />

            {/* Header / Brand */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                  OS
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  One<span className="text-emerald-700">Skills</span><span className="text-xs bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded ml-1 font-semibold">.pk</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-bold">
                Institute of Practical Tech &amp; Freelancing Skills • Pakistan
              </p>
            </div>

            {/* Main Certificate Title */}
            <div className="space-y-2 mb-6">
              <h2 className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-emerald-800">
                Certificate of Completion
              </h2>
              <p className="text-xs text-slate-500 italic">This is proudly presented to</p>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight py-1 font-serif underline decoration-emerald-500/40 decoration-2 underline-offset-8">
                {certInfo.studentName}
              </h3>
            </div>

            {/* Course Details Text */}
            <div className="max-w-xl mx-auto space-y-2 mb-8">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For successfully fulfilling all curriculum requirements, hands-on projects, assignments, and practical evaluations for
              </p>
              <h4 className="text-base sm:text-xl font-bold text-emerald-950">
                {certInfo.courseTitle}
              </h4>
              <p className="text-xs text-emerald-700 font-semibold">
                Status: Awarded with {certInfo.grade}
              </p>
            </div>

            {/* Signatures & Seal Grid */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 items-end text-xs">
              {/* Academic Director */}
              <div className="space-y-1">
                <div className="font-serif italic text-sm text-slate-700 font-bold border-b border-slate-300 pb-1">
                  Hammad Tariq
                </div>
                <p className="font-bold text-slate-800 text-[11px]">Engr. Hammad Tariq</p>
                <p className="text-[10px] text-slate-500">Academic Director</p>
              </div>

              {/* Gold/Emerald Official Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 p-1 shadow-lg border-2 border-amber-600 flex items-center justify-center text-slate-900">
                  <div className="w-full h-full rounded-full border border-dashed border-amber-800 flex flex-col items-center justify-center p-1 text-[8px] font-black uppercase tracking-tighter text-amber-950 text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-900 mb-0.5" />
                    <span>Verified</span>
                    <span>OneSkills</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-1">{certInfo.issueDate}</span>
              </div>

              {/* Lead Instructor */}
              <div className="space-y-1">
                <div className="font-serif italic text-sm text-slate-700 font-bold border-b border-slate-300 pb-1">
                  Usman Sheikh
                </div>
                <p className="font-bold text-slate-800 text-[11px]">Usman Ali Sheikh</p>
                <p className="text-[10px] text-slate-500">Lead Mentor</p>
              </div>
            </div>

            {/* Bottom Verification Footer */}
            <div className="mt-8 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
              <span className="font-mono">Certificate ID: <strong className="text-slate-700">{certInfo.certificateNumber}</strong></span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Verify online at oneskills.pk/verify</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <p>
            💡 You can present this certificate on your Upwork profile, LinkedIn certifications, or CV to verify your competencies.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
