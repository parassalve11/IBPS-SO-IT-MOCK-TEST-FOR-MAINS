"use client";

import { OptionButton } from "@/components/exam/option-button";
import { NormalizedQuestion } from "@/types/exam";

type QuestionCardProps = {
  question: NormalizedQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  statusLabel: string;
  onSelect: (option: string) => void;
};

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  statusLabel,
  onSelect
}: QuestionCardProps) {
  return (
    <article className="panel p-6 sm:p-8">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Question {questionNumber} of {totalQuestions}
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            {question.question}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {question.topic ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {question.topic}
            </span>
          ) : null}
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {question.options.map((option) => (
          <OptionButton
            key={option}
            option={option}
            selected={selectedAnswer === option}
            onSelect={onSelect}
          />
        ))}
      </div>
    </article>
  );
}
