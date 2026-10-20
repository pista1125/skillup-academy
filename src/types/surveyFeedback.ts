export type QuestionType = 'single_choice' | 'multi_choice' | 'text' | 'split_text';

export interface SurveyOption {
  value: string;
  label: string;
  icon?: string;
  score?: number; // 1-5 or 1-4 for average score calculations
}

export interface SurveyQuestion {
  id: string;
  number: number;
  question: string;
  type: QuestionType;
  options?: SurveyOption[];
  placeholder?: string;
  subLabels?: {
    first: string;
    second: string;
  };
  hasOtherOption?: boolean;
  required?: boolean;
}

export interface SurveySection {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  icon?: string;
  badgeColor?: string;
  questions: SurveyQuestion[];
}

export interface SurveyTemplate {
  id: string;
  title: string;
  subtitle: string;
  note: string;
  sections: SurveySection[];
}

export interface SurveySession {
  id: string;
  teacher_id: string;
  class_id: string;
  class_name: string;
  tool_type: 'survey';
  template_id: string;
  title: string;
  note?: string;
  allow_anonymous: boolean;
  created_at: string;
  status: 'active' | 'closed';
  students?: Array<{
    id: string;
    name: string;
    userCode?: string;
    avatar_id?: string;
  }>;
}

export interface SurveyResponse {
  id?: string;
  session_id: string;
  class_id: string;
  student_id: string;
  student_name: string;
  is_anonymous: boolean;
  submitted_at: string;
  answers: Record<string, any>;
}

export interface QuestionAnalytics {
  questionId: string;
  questionText: string;
  type: QuestionType;
  totalResponses: number;
  averageScore?: number;
  optionCounts?: Record<string, number>;
  optionPercentages?: Record<string, number>;
  textAnswers?: Array<{
    text: string;
    studentName?: string;
    date?: string;
  }>;
  splitTextAnswers?: Array<{
    firstText: string;
    secondText: string;
    studentName?: string;
  }>;
}
