"use client";

import { OptionButton } from "@/components/exam/option-button";
import { cn } from "@/lib/cn";
import { NormalizedQuestion } from "@/types/exam";

type QuestionCardProps = {
  sectionLabel: string;
  question: NormalizedQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onSelect: (option: string) => void;
};

export function QuestionCard({
  sectionLabel,
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isBookmarked,
  onToggleBookmark,
  onSelect
}: QuestionCardProps) {
  return (
    <>
      <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm text-slate-700">
          Section: <span className="font-semibold text-blue-600">{sectionLabel}</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
          <div>
            Question <span className="font-semibold text-blue-600">{questionNumber}</span> of{" "}
            {totalQuestions}
          </div>
          <div className="hidden h-5 w-px bg-slate-200 lg:block" />
          <button
            type="button"
            onClick={onToggleBookmark}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-1 py-1 font-medium transition hover:text-blue-600",
              isBookmarked ? "text-blue-600" : "text-slate-600"
            )}
          >
            <span
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full border",
                isBookmarked
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-white text-slate-500"
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1Z" />
              </svg>
            </span>
            Bookmark
          </button>
        </div>
      </div>

      <div className="px-5 py-6 sm:px-6 sm:py-7">
        <div className="text-[1.35rem] font-semibold tracking-tight text-blue-600">
          Q.{questionNumber}
        </div>

        <h2 className="mt-3 max-w-4xl text-[1.45rem] font-medium leading-[1.7] tracking-tight text-slate-950 sm:text-[1.6rem]">
          {question.question}
        </h2>

        {question.topic ? (
          <div className="mt-5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
            {question.topic}
          </div>
        ) : null}

        <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white">
          {question.options.map((option) => (
            <OptionButton
              key={option}
              option={option}
              selected={selectedAnswer === option}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </>
  );
}
