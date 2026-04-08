"use client";

import { cn } from "@/lib/cn";
import { NormalizedQuestion } from "@/types/exam";

type ReviewCardProps = {
  question: NormalizedQuestion;
  selectedAnswer?: string;
  isCorrect: boolean;
  isUnanswered: boolean;
};

function getStatusMeta(isCorrect: boolean, isUnanswered: boolean) {
  if (isUnanswered) {
    return {
      label: "Unanswered",
      statusClassName: "border-amber-200 bg-amber-50 text-amber-800",
      accentClassName: "border-amber-200 bg-amber-50/60",
      answerCardClassName: "border-amber-200 bg-amber-50"
    };
  }

  if (isCorrect) {
    return {
      label: "Correct",
      statusClassName: "border-emerald-200 bg-emerald-50 text-emerald-800",
      accentClassName: "border-emerald-200 bg-emerald-50/60",
      answerCardClassName: "border-emerald-200 bg-emerald-50"
    };
  }

  return {
    label: "Wrong",
    statusClassName: "border-rose-200 bg-rose-50 text-rose-800",
    accentClassName: "border-rose-200 bg-rose-50/60",
    answerCardClassName: "border-rose-200 bg-rose-50"
  };
}

export function ReviewCard({
  question,
  selectedAnswer,
  isCorrect,
  isUnanswered
}: ReviewCardProps) {
  const statusMeta = getStatusMeta(isCorrect, isUnanswered);

  return (
    <article className={cn("panel p-5 sm:p-6", statusMeta.accentClassName)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
              Q{question.order}
            </span>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              {question.subjectName}
            </span>
            {question.topic ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {question.topic}
              </span>
            ) : null}
          </div>
          <span
            className={cn(
              "w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
              statusMeta.statusClassName
            )}
          >
            {statusMeta.label}
          </span>
        </div>

        <div>
          <h2 className="text-lg font-semibold leading-7 text-slate-950 sm:text-xl">
            {question.question}
          </h2>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Your Answer
            </div>
            <p
              className={cn(
                "mt-3 text-sm leading-6",
                isUnanswered ? "text-amber-700" : "text-slate-800"
              )}
            >
              {selectedAnswer ?? "No response selected"}
            </p>
          </div>

          <div className={cn("rounded-2xl border p-4", statusMeta.answerCardClassName)}>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Correct Answer
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-900">{question.correctAnswer}</p>
          </div>
        </div>

        <details className="group rounded-2xl border border-slate-200 bg-white p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-700 marker:hidden">
            <span>Explanation</span>
            <span className="text-xs uppercase tracking-[0.16em] text-slate-400 transition group-open:text-slate-600">
              {question.explanation ? "Expand" : "No details"}
            </span>
          </summary>
          <div className="mt-3 border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600">
            {question.explanation}
          </div>
        </details>
      </div>
    </article>
  );
}
