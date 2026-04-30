"use client";

import { QUESTION_STATUS_META } from "@/constants/exam";
import { PaletteLegend } from "@/components/exam/palette-legend";
import { cn } from "@/lib/cn";
import { getDashboardCounts, getQuestionStatus } from "@/lib/exam-status";
import { ExamSession, NormalizedQuestion } from "@/types/exam";

type QuestionPaletteProps = {
  subjectName: string;
  questions: NormalizedQuestion[];
  session: ExamSession | undefined;
  currentIndex: number;
  onJump: (index: number) => void;
};

export function QuestionPalette({
  subjectName,
  questions,
  session,
  currentIndex,
  onJump
}: QuestionPaletteProps) {
  const dashboardCounts = getDashboardCounts(questions, session);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_16px_36px_rgba(15,23,42,0.07)] sm:p-5">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          {subjectName}
        </h2>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50/70 p-4 text-center">
          <div className="text-[1.5rem] font-semibold leading-none text-emerald-500">
            {dashboardCounts.answeredCount}
          </div>
          <div className="mt-2 text-xs text-slate-700">Answered</div>
        </div>
        <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50/70 p-4 text-center">
          <div className="text-[1.5rem] font-semibold leading-none text-blue-600">
            {dashboardCounts.markedCount.toString().padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs leading-5 text-slate-700">Marked</div>
        </div>
        <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50/70 p-4 text-center">
          <div className="text-[1.5rem] font-semibold leading-none text-slate-950">
            {dashboardCounts.notAttemptedCount}
          </div>
          <div className="mt-2 text-xs text-slate-700">Not Attempted</div>
        </div>
      </div>

      <div className="mt-6 text-lg font-semibold tracking-tight text-slate-950">Questions</div>

      <div className="mt-5 grid max-h-[46vh] grid-cols-5 gap-3 overflow-y-auto pr-1">
        {questions.map((question, index) => {
          const status = getQuestionStatus(question.id, session);
          const statusMeta = QUESTION_STATUS_META[status];
          const isActive = index === currentIndex;

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onJump(index)}
              title={`Question ${index + 1}: ${statusMeta.label}`}
              className={cn(
                "rounded-[0.9rem] border px-3 py-2.5 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                statusMeta.paletteClassName,
                isActive && "ring-2 ring-blue-600 ring-offset-2"
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="mb-4 text-lg font-semibold tracking-tight text-slate-950">Legend</div>
        <PaletteLegend />
      </div>
    </div>
  );
}
