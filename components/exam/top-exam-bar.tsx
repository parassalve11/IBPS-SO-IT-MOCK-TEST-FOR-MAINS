"use client";

import { LayoutGrid, Send } from "lucide-react";
import { Timer } from "@/components/exam/timer";

type TopExamBarProps = {
  subjectName: string;
  questionNumber: number;
  totalQuestions: number;
  remainingTimeSeconds: number;
  onOpenPalette: () => void;
  onSubmit: () => void;
};

export function TopExamBar({
  subjectName,
  questionNumber,
  totalQuestions,
  remainingTimeSeconds,
  onOpenPalette,
  onSubmit
}: TopExamBarProps) {
  return (
    <div className="sticky top-4 z-30 rounded-[1.75rem] border border-slate-200 bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Active Mock
          </div>
          <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-[1.9rem]">
            {subjectName}
          </h1>
          <div className="mt-1 text-sm text-slate-500">
            Question {questionNumber} of {totalQuestions}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Timer remainingTimeSeconds={remainingTimeSeconds} />
          <button
            type="button"
            onClick={onOpenPalette}
            className="inline-flex rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 xl:hidden"
          >
            <LayoutGrid className="mr-2 h-4 w-4" />
            Questions
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex rounded-[1rem] bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Send className="mr-2 h-4 w-4" />
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}
