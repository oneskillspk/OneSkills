'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  Calendar,
  User,
  GraduationCap
} from 'lucide-react';
import { UserProgressData } from '@/types/course';

interface CertificateVerificationProps {
  userProgress: UserProgressData;
  onExploreCourses: () => void;
}

export function CertificateVerification({
  userProgress,
  onExploreCourses
}: CertificateVerificationProps) {
  const [certIdInput, setCertIdInput] = useState('OS-PK-2026-8841');
  const [result, setResult] = useState<{
    found: boolean;
    studentName?: string;
    courseTitle?: string;
    issueDate?: string;
    certId?: string;
    grade?: string;
  } | null>({
    found: true,
    studentName: userProgress.studentProfile.name,
    courseTitle: 'Freelancing & Client Acquisition Mastery: Upwork & Fiverr Pro',
    issueDate: 'October 14, 2026',
    certId: 'OS-PK-2026-8841',
    grade: 'Distinction (Grade A+)'
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = certIdInput.trim().toUpperCase();
    if (!clean) return;

    // Check against user's earned certificates
    const matched = userProgress.earnedCertificates.find(
      c => c.certificateNumber.toUpperCase() === clean
    );

    if (matched) {
      setResult({
        found: true,
        studentName: matched.studentName,
        courseTitle: matched.courseTitle,
        issueDate: matched.issueDate,
        certId: matched.certificateNumber,
        grade: matched.grade
      });
    } else if (clean.startsWith('OS-PK-') || clean.includes('2026')) {
      // Valid algorithmic mock verification
      setResult({
        found: true,
        studentName: 'Verified OneSkills Graduate',
        courseTitle: 'Full-Stack Web Development Bootcamp',
        issueDate: 'October 2026',
        certId: clean,
        grade: 'Distinction (Grade A)'
      });
    } else {
      setResult({
        found: false
      });
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Credential Registry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Verify OneSkills Certificate
          </h1>

          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Employers, clients, and recruiters can verify the authenticity of any certificate issued by OneSkills Pakistan.
          </p>
        </div>

        {/* Verification Input Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Enter Certificate Verification ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. OS-PK-2026-8841"
                  value={certIdInput}
                  onChange={(e) => setCertIdInput(e.target.value)}
                  className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-300 focus:border-emerald-500 rounded-xl font-mono text-slate-900 font-bold text-sm sm:text-base outline-hidden transition-colors uppercase placeholder:normal-case placeholder:font-normal placeholder:text-slate-400"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>Try sample ID:</span>
              <button
                type="button"
                onClick={() => setCertIdInput('OS-PK-2026-8841')}
                className="font-mono text-emerald-700 font-bold hover:underline bg-emerald-50 px-2 py-0.5 rounded"
              >
                OS-PK-2026-8841
              </button>
            </div>
          </form>

          {/* Verification Results Panel */}
          {result && (
            <div className="pt-6 border-t border-slate-200">
              {result.found ? (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 sm:p-6 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Authentic &amp; Verified
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                        Certificate Valid in OneSkills Registry
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-4 rounded-xl border border-emerald-100">
                    <div>
                      <span className="text-slate-500 block">Student Recipient:</span>
                      <strong className="text-slate-900 text-sm font-bold">{result.studentName}</strong>
                    </div>

                    <div>
                      <span className="text-slate-500 block">Certificate ID:</span>
                      <strong className="text-emerald-800 font-mono text-sm">{result.certId}</strong>
                    </div>

                    <div className="sm:col-span-2 pt-2 border-t border-slate-100">
                      <span className="text-slate-500 block">Accredited Program:</span>
                      <strong className="text-slate-900 text-sm">{result.courseTitle}</strong>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-slate-500 block">Date Awarded:</span>
                      <strong className="text-slate-800">{result.issueDate}</strong>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-slate-500 block">Performance Grade:</span>
                      <strong className="text-emerald-700 font-bold">{result.grade}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    Issued under the authority of OneSkills Pakistan Academic Directorate. Valid for international freelancing and employment screening.
                  </p>
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center space-y-2">
                  <XCircle className="w-8 h-8 text-rose-500 mx-auto" />
                  <h4 className="font-bold text-slate-900 text-sm">Certificate ID Not Found</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Please ensure you typed the ID exactly as written on the certificate (e.g. OS-PK-2026-XXXX).
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="mt-8 text-center text-xs text-slate-500 space-y-2">
          <p>Questions about certificate verification? Contact credentials@oneskills.pk</p>
        </div>
      </div>
    </div>
  );
}
