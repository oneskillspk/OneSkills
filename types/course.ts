export type CourseCategory = 
  | 'All'
  | 'Web Development'
  | 'Freelancing & Upwork'
  | 'Graphic & UI/UX Design'
  | 'Digital Marketing & SEO'
  | 'Shopify & E-Commerce'
  | 'Video Editing & Motion'
  | 'Python & AI Automation';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface LessonResource {
  title: string;
  type: 'pdf' | 'zip' | 'code' | 'figma' | 'link';
  size?: string;
  url?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoDurationSeconds: number;
  type: 'video' | 'quiz' | 'assignment';
  videoThumbnail?: string;
  videoPreviewUrl?: string;
  description: string;
  summaryPoints?: string[];
  resources?: LessonResource[];
  quiz?: QuizQuestion;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseReview {
  id: string;
  studentName: string;
  avatar: string;
  rating: number;
  date: string;
  city: string;
  comment: string;
  achievement?: string; // e.g. "Earned $1,200 on Upwork in Month 2"
}

export interface Instructor {
  name: string;
  title: string;
  company: string;
  avatar: string;
  bio: string;
  experience: string;
  rating: number;
  studentsCount: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: CourseCategory;
  level: SkillLevel;
  badge?: string;
  rating: number;
  reviewsCount: number;
  studentsEnrolled: number;
  durationHours: number;
  durationWeeks: string;
  pricePKR: number;
  originalPricePKR: number;
  priceUSD: number;
  originalPriceUSD: number;
  thumbnail: string;
  coverImage?: string;
  language: string;
  certificateIncluded: boolean;
  instructor: Instructor;
  learningOutcomes: string[];
  prerequisites: string[];
  modules: CourseModule[];
  reviews: CourseReview[];
  featuredOutcome: string;
  batchStartDate: string;
}

export interface UserProgressData {
  enrolledCourseIds: string[];
  completedLessonIds: Record<string, string[]>; // courseId -> array of completed lesson IDs
  lastActiveLesson: Record<string, string>; // courseId -> lessonId
  earnedCertificates: {
    courseId: string;
    courseTitle: string;
    studentName: string;
    issueDate: string;
    certificateNumber: string;
    grade: string;
  }[];
  bookmarkedCourseIds: string[];
  notes: Record<string, string>; // `${courseId}_${lessonId}` -> note text
  studentProfile: {
    name: string;
    email: string;
    avatar: string;
    city: string;
    primaryGoal: string;
    joinDate: string;
  };
}
