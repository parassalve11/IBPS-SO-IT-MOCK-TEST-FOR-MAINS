import {
  ExamSession,
  NormalizedQuestion,
  ProgressSummary,
  QuestionStatus
} from "@/types/exam";

function asSet(values: string[] | undefined) {
  return new Set(values ?? []);
}

export function getQuestionStatus(
  questionId: string,
  session: ExamSession | undefined
): QuestionStatus {
  if (!session) {
    return "not_visited";
  }

  const visitedQuestionIds = asSet(session.visitedQuestionIds);
  const markedQuestionIds = asSet(session.markedQuestionIds);
  const hasVisited = visitedQuestionIds.has(questionId);
  const isMarked = markedQuestionIds.has(questionId);
  const hasAnswer = Boolean(session.answers[questionId]);

  if (isMarked && hasAnswer) {
    return "answered_and_marked_for_review";
  }

  if (isMarked) {
    return "marked_for_review";
  }

  if (hasAnswer) {
    return "answered";
  }

  if (hasVisited) {
    return "not_answered";
  }

  return "not_visited";
}

export function getProgressSummary(
  questions: NormalizedQuestion[],
  session: ExamSession | undefined
): ProgressSummary {
  return questions.reduce<ProgressSummary>(
    (summary, question) => {
      const status = getQuestionStatus(question.id, session);

      if (status === "answered" || status === "answered_and_marked_for_review") {
        summary.answeredCount += 1;
      }

      if (status === "marked_for_review" || status === "answered_and_marked_for_review") {
        summary.markedCount += 1;
      }

      if (status === "not_answered") {
        summary.unansweredCount += 1;
      }

      if (status === "not_visited") {
        summary.remainingCount += 1;
      }

      return summary;
    },
    {
      answeredCount: 0,
      unansweredCount: 0,
      markedCount: 0,
      remainingCount: 0
    }
  );
}

export function getDashboardCounts(
  questions: NormalizedQuestion[],
  session: ExamSession | undefined
) {
  return questions.reduce(
    (summary, question) => {
      const status = getQuestionStatus(question.id, session);

      if (status === "answered") {
        summary.answeredCount += 1;
      }

      if (status === "marked_for_review" || status === "answered_and_marked_for_review") {
        summary.markedCount += 1;
      }

      if (status === "not_visited" || status === "not_answered") {
        summary.notAttemptedCount += 1;
      }

      return summary;
    },
    {
      answeredCount: 0,
      markedCount: 0,
      notAttemptedCount: 0
    }
  );
}
