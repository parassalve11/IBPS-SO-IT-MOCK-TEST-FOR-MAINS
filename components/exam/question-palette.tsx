"use client";

import { QUESTION_STATUS_META } from "@/constants/exam";
import { cn } from "@/lib/cn";
import { getProgressSummary, getQuestionStatus } from "@/lib/exam-status";
import { ExamSession, NormalizedQuestion } from "@/types/exam";
import { PaletteLegend } from "@/components/exam/palette-legend";

type QuestionPaletteProps = {
  questions: NormalizedQuestion[];
  session: ExamSession | undefined;
  currentIndex: number;
  onJump: (index: number) => void;
};

export function QuestionPalette({
  questions,
  session,
  currentIndex,
  onJump
}: QuestionPaletteProps) {
  const progressSummary = getProgressSummary(questions, session);

  return (
    <div className="panel p-5 sm:p-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Question Palette
        </div>
        <h2 className="mt-2 text-xl font-semibold text-slate-950">Navigate the paper</h2>
      </div>

      <div className="mt-5 grid max-h-[40vh] grid-cols-4 gap-2 overflow-y-auto pr-1 sm:max-h-[46vh] sm:grid-cols-5 lg:max-h-[58vh]">
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
                "rounded-2xl border px-3 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                statusMeta.paletteClassName,
                isActive && "ring-2 ring-slate-900 ring-offset-2"
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="soft-panel p-4">
          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Answered</div>
          <div className="mt-2 text-xl font-semibold text-slate-950">
            {progressSummary.answeredCount}
          </div>
        </div>
        <div className="soft-panel p-4">
          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Unanswered</div>
          <div className="mt-2 text-xl font-semibold text-slate-950">
            {progressSummary.unansweredCount}
          </div>
        </div>
        <div className="soft-panel p-4">
          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Marked</div>
          <div className="mt-2 text-xl font-semibold text-slate-950">
            {progressSummary.markedCount}
          </div>
        </div>
        <div className="soft-panel p-4">
          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Remaining</div>
          <div className="mt-2 text-xl font-semibold text-slate-950">
            {progressSummary.remainingCount}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <PaletteLegend />
      </div>
    </div>
  );
}
