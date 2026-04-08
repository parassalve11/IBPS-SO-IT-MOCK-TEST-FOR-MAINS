"use client";

import { AlertTriangle, Clock3 } from "lucide-react";
import { LOW_TIME_WARNING_MINUTES } from "@/constants/exam";
import { cn } from "@/lib/cn";
import { formatTime } from "@/lib/format";

type TimerProps = {
  remainingTimeSeconds: number;
};

export function Timer({ remainingTimeSeconds }: TimerProps) {
  const isLowTime = remainingTimeSeconds <= LOW_TIME_WARNING_MINUTES * 60;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm transition",
        isLowTime
          ? "border-rose-200 bg-rose-50 text-rose-700"
          : "border-slate-200 bg-white text-slate-700"
      )}
      aria-live="polite"
    >
      {isLowTime ? <AlertTriangle className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
      <div>
        <div className="text-[11px] uppercase tracking-[0.18em] opacity-70">Time Left</div>
        <div className="text-base">{formatTime(remainingTimeSeconds)}</div>
      </div>
    </div>
  );
}
