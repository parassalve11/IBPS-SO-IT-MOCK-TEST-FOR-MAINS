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
        "flex items-center gap-3 rounded-[1.25rem] border px-5 py-3 text-sm font-semibold shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition",
        isLowTime ? "border-rose-200 bg-rose-50 text-rose-700" : "border-slate-200 bg-white"
      )}
      aria-live="polite"
    >
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border",
          isLowTime
            ? "border-rose-200 bg-white text-rose-600"
            : "border-blue-200 bg-blue-50 text-blue-600"
        )}
      >
        {isLowTime ? <AlertTriangle className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}
      </div>
      <div>
        <div className="text-xs font-medium text-slate-500">Time Left</div>
        <div className="text-[2rem] font-semibold leading-none tracking-tight text-slate-950">
          {formatTime(remainingTimeSeconds)}
        </div>
      </div>
    </div>
  );
}
