'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  ExternalLink,
  Award,
  Clock,
  Save,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Course, Lesson, UserProgressData } from '@/types/course';
import { calculateCourseProgress, getAllLessonsInCourse } from '@/lib/storage';

interface ClassroomPlayerProps {
  course: Course;
  userProgress: UserProgressData;
  onBack: () => void;
  onToggleLessonComplete: (courseId: string, lessonId: string) => void;
  onSaveNote: (courseId: string, lessonId: string, note: string) => void;
  onViewCertificate: (courseId: string) => void;
}

export function ClassroomPlayer({
  course,
  userProgress,
  onBack,
  onToggleLessonComplete,
  onSaveNote,
  onViewCertificate
}: ClassroomPlayerProps) {
  const allLessons = getAllLessonsInCourse(course);
  
  // Find current active lesson (from userProgress.lastActiveLesson or first incomplete)
  const initialLessonId = userProgress.lastActiveLesson[course.id] || allLessons[0]?.id || '';
  const [currentLessonId, setCurrentLessonId] = useState<string>(initialLessonId);

  const currentLesson: Lesson = allLessons.find(l => l.id === currentLessonId) || allLessons[0];
  const currentModule = course.modules.find(m => m.lessons.some(l => l.id === currentLesson.id)) || course.modules[0];

  // Video player simulated states
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [videoProgress, setVideoProgress] = useState<number>(30); // in percent
  const [isMuted, setIsMuted] = useState(false);

  // Tab state: 'overview' | 'quiz' | 'notes' | 'resources'
  const [activeTab, setActiveTab] = useState<'overview' | 'quiz' | 'notes' | 'resources'>('overview');

  // Notes state
  const noteKey = `${course.id}_${currentLesson.id}`;
  const [noteText, setNoteText] = useState<string>(() => userProgress.notes[noteKey] || '');
  const [isSavedNote, setIsSavedNote] = useState(false);

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Progress metrics
  const { percentage, isCompleted, completedCount, totalCount } = calculateCourseProgress(course, userProgress);
  const isCurrentLessonDone = userProgress.completedLessonIds[course.id]?.includes(currentLesson.id);

  // Handle note save
  const handleSaveNote = () => {
    onSaveNote(course.id, currentLesson.id, noteText);
    setIsSavedNote(true);
    setTimeout(() => setIsSavedNote(false), 2000);
  };

  // Switch to next or previous lesson
  const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleLessonChange = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    const key = `${course.id}_${lessonId}`;
    setNoteText(userProgress.notes[key] || '');
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    const isDone = userProgress.completedLessonIds[course.id]?.includes(lessonId);
    setVideoProgress(isDone ? 100 : 25);
    setIsPlaying(false);
  };

  const handleMarkComplete = () => {
    onToggleLessonComplete(course.id, currentLesson.id);
    
    // Celebrate with confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });

    // Auto advance to next lesson if available and not yet completed
    if (nextLesson && !isCurrentLessonDone) {
      setTimeout(() => {
        handleLessonChange(nextLesson.id);
      }, 700);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Classroom Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block truncate">
              {course.title}
            </span>
            <h1 className="text-sm font-bold text-white truncate">
              {currentLesson.title}
            </h1>
          </div>
        </div>

        {/* Course Progress Overview */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:flex flex-col items-end text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300">
              <span>Course Progress:</span>
              <span className="text-emerald-400 font-bold">{percentage}%</span>
            </div>
            <span className="text-[11px] text-slate-500">
              {completedCount} of {totalCount} lessons completed
            </span>
          </div>

          <div className="w-24 sm:w-32 bg-slate-800 rounded-full h-2 overflow-hidden hidden sm:block">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {isCompleted && (
            <button
              onClick={() => onViewCertificate(course.id)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md animate-pulse"
            >
              <Award className="w-3.5 h-3.5" />
              <span>View Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Classroom Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left/Main Column: Player + Interactive Tabs */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col bg-slate-950 overflow-y-auto">
          {/* Simulated Video Player */}
          <div className="relative aspect-video w-full bg-black flex flex-col justify-between group overflow-hidden border-b border-slate-800">
            {/* Video Background / Poster */}
            <div className="absolute inset-0">
              <img 
                src={course.thumbnail} 
                alt={currentLesson.title} 
                className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-40' : 'opacity-80'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
            </div>

            {/* Top Video Overlay: Module & Lecture Info */}
            <div className="relative z-10 p-4 sm:p-6 flex items-start justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-emerald-400 text-xs font-semibold border border-slate-700">
                  {currentModule.title}
                </span>
                <h2 className="text-lg sm:text-2xl font-extrabold text-white mt-2 drop-shadow-md">
                  {currentLesson.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs">
                  {currentLesson.duration}
                </span>
              </div>
            </div>

            {/* Center Big Play/Pause Action */}
            <div className="relative z-10 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center hover:scale-110 hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/30"
                aria-label={isPlaying ? 'Pause Lecture' : 'Play Lecture'}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Video Controls Bar */}
            <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-t from-slate-950 to-transparent space-y-2">
              {/* Scrubbing timeline */}
              <div 
                className="w-full bg-slate-800/80 hover:bg-slate-700/80 h-1.5 hover:h-2 rounded-full cursor-pointer transition-all overflow-hidden relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPos = (e.clientX - rect.left) / rect.width;
                  setVideoProgress(Math.min(100, Math.max(0, Math.round(clickPos * 100))));
                }}
              >
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all" 
                  style={{ width: `${videoProgress}%` }}
                />
              </div>

              {/* Controls footer */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-[11px] font-mono text-slate-400">
                    {Math.floor((videoProgress / 100) * 24)}:00 / {currentLesson.duration}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Speed toggle */}
                  <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 text-[11px]">
                    <span className="text-slate-400">Speed:</span>
                    <button 
                      onClick={() => {
                        const speeds = [1, 1.25, 1.5, 2];
                        const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                        setPlaybackSpeed(next);
                      }}
                      className="font-bold text-emerald-400 hover:text-white"
                    >
                      {playbackSpeed}x
                    </button>
                  </div>

                  {/* Reset timestamp */}
                  <button 
                    onClick={() => setVideoProgress(0)}
                    className="hover:text-white transition-colors p-1"
                    title="Restart Lecture"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row: Prev / Mark Completed / Next */}
          <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                disabled={!prevLesson}
                onClick={() => prevLesson && handleLessonChange(prevLesson.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  prevLesson 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
                    : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous Lesson</span>
              </button>

              <button
                disabled={!nextLesson}
                onClick={() => nextLesson && handleLessonChange(nextLesson.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  nextLesson 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
                    : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                }`}
              >
                <span className="hidden sm:inline">Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mark as Completed Button */}
            <button
              onClick={handleMarkComplete}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md ${
                isCurrentLessonDone
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/40 hover:bg-emerald-900'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCurrentLessonDone ? 'text-emerald-400' : ''}`} />
              <span>{isCurrentLessonDone ? 'Completed (Click to Unmark)' : 'Mark as Complete & Next'}</span>
            </button>
          </div>

          {/* Interactive Lesson Tabs Navigation */}
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex border-b border-slate-800 gap-4 text-xs sm:text-sm font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                  activeTab === 'overview'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Lecture Overview</span>
              </button>

              {currentLesson.quiz && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                    activeTab === 'quiz'
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Knowledge Check (Quiz)</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                  activeTab === 'notes'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>My Personal Notes</span>
                {noteText.length > 0 && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
              </button>

              {currentLesson.resources && currentLesson.resources.length > 0 && (
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                    activeTab === 'resources'
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Resources &amp; Downloads ({currentLesson.resources.length})</span>
                </button>
              )}
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4 max-w-3xl">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">About this Lecture</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentLesson.description}
                  </p>
                </div>

                {currentLesson.summaryPoints && currentLesson.summaryPoints.length > 0 && (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                      Key Takeaways for Freelancers &amp; Developers:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {currentLesson.summaryPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Practical Mentor Advice */}
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                      Mentor Tip from {course.instructor.name}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      &ldquo;Do not merely watch this video passively. Open your editor or design canvas and replicate every step side-by-side. If you encounter any bugs, post your snippet in our OneSkills WhatsApp Community group for instant review.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Quiz */}
            {activeTab === 'quiz' && currentLesson.quiz && (
              <div className="space-y-4 max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Quick Knowledge Check
                  </span>
                  <span className="text-xs text-slate-500">1 Question</span>
                </div>

                <p className="text-sm sm:text-base font-bold text-white">
                  {currentLesson.quiz.question}
                </p>

                <div className="space-y-2.5 pt-2">
                  {currentLesson.quiz.options.map((opt, optIdx) => {
                    const isSelected = selectedQuizOption === optIdx;
                    const isCorrect = optIdx === currentLesson.quiz?.correctIndex;
                    
                    let optionStyle = 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-emerald-950/60 border-emerald-500 text-white';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={quizSubmitted}
                        onClick={() => setSelectedQuizOption(optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    disabled={selectedQuizOption === null}
                    onClick={() => {
                      setQuizSubmitted(true);
                      if (selectedQuizOption === currentLesson.quiz?.correctIndex) {
                        confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
                      }
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs sm:text-sm transition-all"
                  >
                    Check My Answer
                  </button>
                ) : (
                  <div className="mt-4 p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-2 animate-in fade-in">
                    <p className="text-xs font-bold text-emerald-400">
                      {selectedQuizOption === currentLesson.quiz.correctIndex ? '🎉 Excellent! Correct Answer.' : '💡 Not quite! Here is the explanation:'}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentLesson.quiz.explanation}
                    </p>
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setSelectedQuizOption(null);
                      }}
                      className="text-xs text-slate-400 hover:text-white underline pt-1 block"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Personal Lecture Notes</h3>
                    <p className="text-xs text-slate-400">Notes are saved directly to your local learning profile.</p>
                  </div>

                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {isSavedNote ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{isSavedNote ? 'Saved!' : 'Save Note'}</span>
                  </button>
                </div>

                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Jot down snippets, client questions, keyboard shortcuts, or Upwork proposal ideas from this lesson..."
                  rows={7}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-500"
                />
              </div>
            )}

            {/* Tab 4: Resources */}
            {activeTab === 'resources' && currentLesson.resources && (
              <div className="space-y-3 max-w-2xl">
                <h3 className="text-base font-bold text-white mb-2">Downloadable Project Materials</h3>
                <div className="space-y-2">
                  {currentLesson.resources.map((res, i) => (
                    <div 
                      key={i} 
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs sm:text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                          {res.type.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{res.title}</p>
                          {res.size && <p className="text-[11px] text-slate-500">{res.size}</p>}
                        </div>
                      </div>

                      <button 
                        onClick={() => alert(`Starting download for "${res.title}"...`)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Course Curriculum Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 bg-slate-900 border-l border-slate-800 flex flex-col h-full overflow-hidden">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">Course Curriculum</h3>
              <p className="text-[11px] text-slate-400">
                {completedCount} / {totalCount} completed ({percentage}%)
              </p>
            </div>
          </div>

          {/* Module List Accordion */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80">
            {course.modules.map((mod, mIndex) => {
              const moduleLessons = mod.lessons;
              const moduleCompletedCount = moduleLessons.filter(l => 
                userProgress.completedLessonIds[course.id]?.includes(l.id)
              ).length;

              return (
                <div key={mod.id} className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                      Section {mIndex + 1}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {moduleCompletedCount}/{moduleLessons.length}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-200 mb-2">
                    {mod.title}
                  </h4>

                  <div className="space-y-1">
                    {moduleLessons.map((les) => {
                      const isCurrent = les.id === currentLesson.id;
                      const isDone = userProgress.completedLessonIds[course.id]?.includes(les.id);

                      return (
                        <button
                          key={les.id}
                          onClick={() => handleLessonChange(les.id)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 transition-all ${
                            isCurrent
                              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                              : isDone
                              ? 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                              : 'text-slate-300 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {isDone ? (
                              <CheckCircle2 className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-white' : 'text-emerald-400'}`} />
                            ) : isCurrent ? (
                              <Play className="w-4 h-4 shrink-0 fill-current" />
                            ) : (
                              <Circle className="w-4 h-4 shrink-0 text-slate-600" />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>

                          <span className={`text-[10px] shrink-0 ${isCurrent ? 'text-emerald-100' : 'text-slate-500'}`}>
                            {les.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certificate Banner if Course Completed */}
          {isCompleted && (
            <div className="p-4 bg-gradient-to-r from-emerald-950 to-slate-900 border-t border-emerald-800/60">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-white">Course Completed!</span>
              </div>
              <p className="text-[11px] text-slate-300 mb-3">
                You have finished all required lessons. Your official OneSkills Certificate is ready!
              </p>
              <button
                onClick={() => onViewCertificate(course.id)}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Download Certificate</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
