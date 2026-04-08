import { EXAM_SCORING } from "@/constants/exam";
import { ExamSession, NormalizedQuestion, ResultStats } from "@/types/exam";

function roundToTwo(value: number) {
  return Math.round(value * 100) / 100;
}

export function isCorrectAnswer(question: NormalizedQuestion, answer?: string) {
  return Boolean(answer) && answer === question.correctAnswer;
}

export function calculateResultStats(
  questions: NormalizedQuestion[],
  session: ExamSession,
  durationMinutes: number
): ResultStats {
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  for (const question of questions) {
    const selectedAnswer = session.answers[question.id];

    if (!selectedAnswer) {
      unansweredCount += 1;
      continue;
    }

    if (isCorrectAnswer(question, selectedAnswer)) {
      correctCount += 1;
    } else {
      wrongCount += 1;
    }
  }

  const attemptedCount = correctCount + wrongCount;
  const maxScore = questions.length * EXAM_SCORING.correct;
  const netScore =
    correctCount * EXAM_SCORING.correct + wrongCount * EXAM_SCORING.wrong;
  const accuracyPercentage = attemptedCount === 0 ? 0 : (correctCount / attemptedCount) * 100;
  const timeUsedSeconds = Math.max(durationMinutes * 60 - session.remainingTimeSeconds, 0);

  return {
    totalQuestions: questions.length,
    maxScore,
    netScore: roundToTwo(netScore),
    correctCount,
    wrongCount,
    unansweredCount,
    attemptedCount,
    accuracyPercentage: roundToTwo(accuracyPercentage),
    timeUsedSeconds
  };
}
