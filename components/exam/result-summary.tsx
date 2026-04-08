"use client";

import { CheckCircle2, Clock3, Target, XCircle } from "lucide-react";
import { formatPercentage, formatTime } from "@/lib/format";
import { ResultStats, SubjectSummary } from "@/types/exam";

type ResultSummaryProps = {
  subject: SubjectSummary;
  stats: ResultStats;
  autoSubmitted: boolean;
};

const statCards = [
  {
    key: "correctCount",
    label: "Correct",
    icon: CheckCircle2,
    tone: "text-emerald-700 bg-emerald-50"
  },
  {
    key: "wrongCount",
    label: "Wrong",
    icon: XCircle,
    tone: "text-rose-700 bg-rose-50"
  },
  {
    key: "unansweredCount",
    label: "Unanswered",
    icon: Target,
    tone: "text-amber-700 bg-amber-50"
  },
  {
    key: "timeUsedSeconds",
    label: "Time Used",
    icon: Clock3,
    tone: "text-blue-700 bg-blue-50"
  }
] as const;

export function ResultSummary({
  subject,
  stats,
  autoSubmitted
}: ResultSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="panel p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="section-kicker">
              {autoSubmitted ? "Auto Submitted" : "Test Submitted"}
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {subject.name} Result Summary
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Review your performance, accuracy, and net score before analyzing the question-wise breakdown.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-blue-100 bg-blue-50 px-6 py-5">
            <div className="text-sm font-medium text-blue-700">Net Score</div>
            <div className="mt-2 text-4xl font-semibold text-slate-950">
              {stats.netScore}
              <span className="ml-2 text-lg text-slate-500">/ {stats.maxScore}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => {
            const Icon = item.icon;
            const value =
              item.key === "timeUsedSeconds"
                ? formatTime(stats.timeUsedSeconds)
                : stats[item.key];

            return (
              <div key={item.key} className="metric-card">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-sm text-slate-500">{item.label}</div>
                <div className="mt-2 text-3xl font-semibold text-slate-950">{value}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="metric-card">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Attempted</div>
          <div className="mt-2 text-3xl font-semibold text-slate-950">{stats.attemptedCount}</div>
        </div>
        <div className="metric-card">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Accuracy</div>
          <div className="mt-2 text-3xl font-semibold text-slate-950">
            {formatPercentage(stats.accuracyPercentage)}
          </div>
        </div>
        <div className="metric-card">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Total Questions</div>
          <div className="mt-2 text-3xl font-semibold text-slate-950">{stats.totalQuestions}</div>
        </div>
      </div>
    </div>
  );
}
