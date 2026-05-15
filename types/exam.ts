export type RawQuestionItem = {
  id: number | string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  detailed_explanation?: string;
  why_correct?: string;
  wrong_options?: Record<string, string>;
  memory_trick?: string;
  exam_note?: string;
  topic?: string;
  difficulty?: string;
};

export type RawQuestionFile = Record<string, unknown>;

export type SubjectMode = "single-subject" | "mixed";

export type QuestionStatus =
  | "not_visited"
  | "not_answered"
  | "answered"
  | "marked_for_review"
  | "answered_and_marked_for_review";

export interface NormalizedQuestion {
  id: string;
  order: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  detailedExplanation?: string;
  whyCorrect?: string;
  wrongOptions?: Record<string, string>;
  memoryTrick?: string;
  examNote?: string;
  topic?: string;
  difficulty?: string;
  subjectSlug: string;
  subjectName: string;
}

export interface SubjectConfig {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  syllabusOrder: number;
  ibpsWeightageMarks: number;
  ibpsWeightageLabel: string;
  durationMinutes: number;
  estimatedDurationLabel?: string;
  typeLabel: string;
  difficultyLabel: string;
  accent: "blue" | "indigo" | "slate";
  sourceFile: string;
  mode: SubjectMode;
  rawData: RawQuestionFile;
}

export interface SubjectSummary extends Omit<SubjectConfig, "rawData"> {
  questionCount: number;
}

export interface ExamSession {
  subjectSlug: string;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  visitedQuestionIds: string[];
  markedQuestionIds: string[];
  remainingTimeSeconds: number;
  startedAt: string;
  isSubmitted: boolean;
  submittedAt?: string;
  autoSubmitted: boolean;
}

export interface ProgressSummary {
  answeredCount: number;
  unansweredCount: number;
  markedCount: number;
  remainingCount: number;
}

export interface ResultStats {
  totalQuestions: number;
  maxScore: number;
  netScore: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  attemptedCount: number;
  accuracyPercentage: number;
  timeUsedSeconds: number;
}
