import { QuestionStatus } from "@/types/exam";

export const APP_NAME = "IBPS SO IT Mains Mock Platform";

export const EXAM_SCORING = {
  correct: 1,
  wrong: -0.25,
  unanswered: 0
} as const;

export const LOW_TIME_WARNING_MINUTES = 5;

export const STORE_NAME = "ibps-so-it-mains-exam-store";

export const QUESTION_STATUS_META: Record<
  QuestionStatus,
  {
    label: string;
    description: string;
    paletteClassName: string;
    badgeClassName: string;
  }
> = {
  not_visited: {
    label: "Not Visited",
    description: "Question has not been opened yet.",
    paletteClassName:
      "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
    badgeClassName: "bg-slate-100 text-slate-700"
  },
  not_answered: {
    label: "Not Answered",
    description: "Question was visited but no option was selected.",
    paletteClassName:
      "border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300",
    badgeClassName: "bg-amber-50 text-amber-700"
  },
  answered: {
    label: "Answered",
    description: "A response has been saved for the question.",
    paletteClassName:
      "border-emerald-500 bg-emerald-500 text-white hover:border-emerald-600",
    badgeClassName: "bg-emerald-100 text-emerald-700"
  },
  marked_for_review: {
    label: "Marked for Review",
    description: "Question is flagged for later review with no saved answer.",
    paletteClassName:
      "border-blue-600 bg-blue-600 text-white hover:border-blue-700",
    badgeClassName: "bg-blue-100 text-blue-700"
  },
  answered_and_marked_for_review: {
    label: "Answered & Marked",
    description: "Question has an answer and is also flagged for review.",
    paletteClassName:
      "border-sky-500 bg-sky-500 text-white hover:border-sky-600",
    badgeClassName: "bg-sky-100 text-sky-700"
  }
};
