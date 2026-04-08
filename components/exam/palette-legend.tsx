"use client";

import { QUESTION_STATUS_META } from "@/constants/exam";
import { QuestionStatus } from "@/types/exam";

const statusOrder: QuestionStatus[] = [
  "not_visited",
  "not_answered",
  "answered",
  "marked_for_review",
  "answered_and_marked_for_review"
];

export function PaletteLegend() {
  return (
    <div className="grid gap-3">
      {statusOrder.map((status) => {
        const item = QUESTION_STATUS_META[status];

        return (
          <div key={status} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3">
            <span className={`mt-1 h-4 w-4 rounded-md border ${item.paletteClassName}`} />
            <div>
              <div className="text-sm font-semibold text-slate-900">{item.label}</div>
              <div className="text-xs leading-5 text-slate-500">{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
