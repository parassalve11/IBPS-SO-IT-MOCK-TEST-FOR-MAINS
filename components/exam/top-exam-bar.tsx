"use client";

import { LayoutGrid, Send } from "lucide-react";
import { ProgressSummary } from "@/types/exam";
import { Timer } from "@/components/exam/timer";

type TopExamBarProps = {
  subjectName: string;
  remainingTimeSeconds: number;
  progressSummary: ProgressSummary;
  onOpenPalette: () => void;
  onSubmit: () => void;
};

export function TopExamBar({
  subjectName,
  remainingTimeSeconds,
  progressSummary,
  onOpenPalette,
  onSubmit
}: TopExamBarProps) {
  return (
    <div className="sticky top-[73px] z-30 panel px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Active Mock Test
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            {subjectName}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 md:flex">
            <span>Answered: {progressSummary.answeredCount}</span>
            <span className="text-slate-300">|</span>
            <span>Unanswered: {progressSummary.unansweredCount}</span>
            <span className="text-slate-300">|</span>
            <span>Marked: {progressSummary.markedCount}</span>
            <span className="text-slate-300">|</span>
            <span>Remaining: {progressSummary.remainingCount}</span>
          </div>
          <Timer remainingTimeSeconds={remainingTimeSeconds} />
          <button type="button" onClick={onOpenPalette} className="action-button-secondary lg:hidden">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Palette
          </button>
          <button type="button" onClick={onSubmit} className="action-button-primary">
            <Send className="mr-2 h-4 w-4" />
            Submit Test
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm md:hidden">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
          Answered: <span className="font-semibold text-slate-900">{progressSummary.answeredCount}</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
          Unanswered: <span className="font-semibold text-slate-900">{progressSummary.unansweredCount}</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
          Marked: <span className="font-semibold text-slate-900">{progressSummary.markedCount}</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
          Remaining: <span className="font-semibold text-slate-900">{progressSummary.remainingCount}</span>
        </div>
      </div>
    </div>
  );
}
