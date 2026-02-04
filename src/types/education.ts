export type Subject =
  | 'math'
  | 'physics'
  | 'hungarian'
  | 'english'
  | 'chemistry'
  | 'history'
  | 'geography';

export type GradeLevel =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8  // Elementary
  | 'high-1' | 'high-2' | 'high-3' | 'high-4'  // High school
  | 'graduation';  // Érettségi

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'theory' | 'practice' | 'simulation' | 'quiz';
  content?: string;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  xpEarned: number;
}

export interface MathProblem {
  id: string;
  expression: string;
  answer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed' | 'fractions';
}

export interface UserProgress {
  xp: number;
  streak: number;
  completedLessons: string[];
  quizResults: Record<string, QuizResult>;
}
