import { Course, UserProgressData } from '@/types/course';
import { INITIAL_COURSES } from '@/data/courses';

const STORAGE_KEY = 'oneskills_user_progress_v1';

export const INITIAL_USER_PROGRESS: UserProgressData = {
  enrolledCourseIds: ['course-web-dev', 'course-freelancing'],
  completedLessonIds: {
    'course-web-dev': ['les-1-1', 'les-1-2'],
    'course-freelancing': ['les-fl-1-1', 'les-fl-1-2', 'les-fl-2-1', 'les-fl-2-2', 'les-fl-3-1']
  },
  lastActiveLesson: {
    'course-web-dev': 'les-1-3',
    'course-freelancing': 'les-fl-3-1'
  },
  earnedCertificates: [
    {
      courseId: 'course-freelancing',
      courseTitle: 'Freelancing & Client Acquisition Mastery: Upwork & Fiverr Pro',
      studentName: 'Ali Raza Khan',
      issueDate: 'October 14, 2026',
      certificateNumber: 'OS-PK-2026-8841',
      grade: 'Distinction (Grade A+)'
    }
  ],
  bookmarkedCourseIds: ['course-ui-ux', 'course-shopify'],
  notes: {
    'course-web-dev_les-1-1': 'Remember to configure Prettier and ESLint in VSCode for standard formatting.',
    'course-web-dev_les-1-2': '<nav> tag is essential for SEO crawlers and screen reader accessibility.',
    'course-freelancing_les-fl-2-1': 'The first two sentences of the proposal must acknowledge the specific challenge in the job post, NOT say "Hi I am a web developer".'
  },
  studentProfile: {
    name: 'Ali Raza Khan',
    email: 'oneskillspk@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    city: 'Lahore, Pakistan',
    primaryGoal: 'Earn $1,500/month as a remote Next.js developer & Upwork freelancer',
    joinDate: 'September 2026'
  }
};

export function loadUserProgress(): UserProgressData {
  if (typeof window === 'undefined') {
    return INITIAL_USER_PROGRESS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USER_PROGRESS));
      return INITIAL_USER_PROGRESS;
    }
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_USER_PROGRESS,
      ...parsed,
      studentProfile: {
        ...INITIAL_USER_PROGRESS.studentProfile,
        ...(parsed.studentProfile || {})
      }
    };
  } catch (err) {
    console.error('Failed to parse user progress from localStorage', err);
    return INITIAL_USER_PROGRESS;
  }
}

export function saveUserProgress(data: UserProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save user progress', err);
  }
}

export function getAllLessonsInCourse(course: Course) {
  return course.modules.flatMap(m => m.lessons);
}

export function calculateCourseProgress(course: Course, progress: UserProgressData): {
  completedCount: number;
  totalCount: number;
  percentage: number;
  isCompleted: boolean;
} {
  const allLessons = getAllLessonsInCourse(course);
  const totalCount = allLessons.length;
  if (totalCount === 0) return { completedCount: 0, totalCount: 0, percentage: 0, isCompleted: false };

  const completedSet = new Set(progress.completedLessonIds[course.id] || []);
  const completedCount = allLessons.filter(l => completedSet.has(l.id)).length;
  const percentage = Math.round((completedCount / totalCount) * 100);
  const isCompleted = completedCount === totalCount;

  return { completedCount, totalCount, percentage, isCompleted };
}

export function generateCertNumber(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `OS-PK-2026-${random}`;
}
