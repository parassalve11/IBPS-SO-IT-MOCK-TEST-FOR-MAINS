"use client";

import { cn } from "@/lib/cn";
import { isCorrectAnswer } from "@/lib/scoring";
import { NormalizedQuestion } from "@/types/exam";

type ReviewPaletteProps = {
  questions: NormalizedQuestion[];
  answers: Record<string, string>;
  markedQuestionIds: string[];
  activeIndex: number;
  onJump: (index: number) => void;
};

function getReviewCounts(
  questions: NormalizedQuestion[],
  answers: Record<string, string>,
  markedQuestionIds: string[]
) {
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;

  for (const question of questions) {
    const selectedAnswer = answers[question.id];

    if (!selectedAnswer) {
      skippedCount += 1;
      continue;
    }

    if (isCorrectAnswer(question, selectedAnswer)) {
      correctCount += 1;
    } else {
      incorrectCount += 1;
    }
  }

  return {
    correctCount,
    incorrectCount,
    skippedCount,
    markedCount: markedQuestionIds.length
  };
}

function getPaletteTone(
  question: NormalizedQuestion,
  selectedAnswer: string | undefined,
  isMarked: boolean
) {
  if (isMarked) {
    return "border-blue-300 bg-blue-50 text-blue-700";
  }

  if (!selectedAnswer) {
    return "border-slate-200 bg-slate-100 text-slate-600";
  }

  return isCorrectAnswer(question, selectedAnswer)
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-rose-200 bg-rose-50 text-rose-700";
}

export function ReviewPalette({
  questions,
  answers,
  markedQuestionIds,
  activeIndex,
  onJump
}: ReviewPaletteProps) {
  const counts = getReviewCounts(questions, answers, markedQuestionIds);
  const markedSet = new Set(markedQuestionIds);

  return (
    <aside className="space-y-4 xl:sticky xl:top-4">
      <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
        <h2 className="text-base font-semibold tracking-tight text-slate-950">
          Review Your Answers
        </h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Jump straight to weak questions and revise faster.
        </p>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <div className="rounded-[1rem] border border-slate-200 bg-slate-50/80 p-3 text-center">
            <div className="text-xl font-semibold text-emerald-600">{counts.correctCount}</div>
            <div className="mt-1 text-xs text-slate-600">Correct</div>
          </div>
          <div className="rounded-[1rem] border border-slate-200 bg-slate-50/80 p-3 text-center">
            <div className="text-xl font-semibold text-rose-600">{counts.incorrectCount}</div>
            <div className="mt-1 text-xs text-slate-600">Incorrect</div>
          </div>
          <div className="rounded-[1rem] border border-slate-200 bg-slate-50/80 p-3 text-center">
            <div className="text-xl font-semibold text-slate-700">{counts.skippedCount}</div>
            <div className="mt-1 text-xs text-slate-600">Skipped</div>
          </div>
          <div className="rounded-[1rem] border border-slate-200 bg-slate-50/80 p-3 text-center">
            <div className="text-xl font-semibold text-blue-600">{counts.markedCount}</div>
            <div className="mt-1 text-xs text-slate-600">Marked</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-5 gap-2">
          {questions.map((question, index) => {
            const selectedAnswer = answers[question.id];
            const isMarked = markedSet.has(question.id);
            const isActive = index === activeIndex;

            return (
              <button
                key={question.id}
                type="button"
                onClick={() => onJump(index)}
                className={cn(
                  "rounded-[0.85rem] border px-2 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                  getPaletteTone(question, selectedAnswer, isMarked),
                  isActive && "ring-2 ring-blue-600 ring-offset-2"
                )}
              >
                {question.order}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
        <h3 className="text-base font-semibold text-slate-950">Legend</h3>
        <div className="mt-4 grid gap-3 text-sm text-slate-700">
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 rounded border border-emerald-200 bg-emerald-50" />
            Correct
          </div>
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 rounded border border-rose-200 bg-rose-50" />
            Incorrect
          </div>
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 rounded border border-slate-200 bg-slate-100" />
            Skipped / Unattempted
          </div>
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 rounded border border-blue-300 bg-blue-50" />
            Marked for Review
          </div>
        </div>
      </div>
    </aside>
  );
}
