"use client";

import { ReviewCard } from "@/components/exam/review-card";
import { isCorrectAnswer } from "@/lib/scoring";
import { NormalizedQuestion } from "@/types/exam";

type QuestionReviewListProps = {
  questions: NormalizedQuestion[];
  answers: Record<string, string>;
};

function getReviewPriority(question: NormalizedQuestion, answers: Record<string, string>) {
  const selectedAnswer = answers[question.id];

  if (!selectedAnswer) {
    return 0;
  }

  return isCorrectAnswer(question, selectedAnswer) ? 2 : 1;
}

export function QuestionReviewList({
  questions,
  answers
}: QuestionReviewListProps) {
  const sortedQuestions = [...questions].sort((left, right) => {
    const leftPriority = getReviewPriority(left, answers);
    const rightPriority = getReviewPriority(right, answers);

    if (leftPriority !== rightPriority) {
      return leftPriority - rightPriority;
    }

    return left.order - right.order;
  });

  return (
    <div className="space-y-5">
      {sortedQuestions.map((question) => {
        const selectedAnswer = answers[question.id];

        return (
          <ReviewCard
            key={question.id}
            question={question}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrectAnswer(question, selectedAnswer)}
            isUnanswered={!selectedAnswer}
          />
        );
      })}
    </div>
  );
}
