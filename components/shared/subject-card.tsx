"use client";

import type { Route } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CircleDot } from "lucide-react";
import { cn } from "@/lib/cn";
import { SubjectSummary } from "@/types/exam";

type SubjectCardProps = {
  subject: SubjectSummary;
};

const accentClasses = {
  blue: "from-blue-500/10 to-sky-500/5 text-blue-700",
  indigo: "from-indigo-500/10 to-blue-500/5 text-indigo-700",
  slate: "from-slate-500/10 to-slate-300/10 text-slate-700"
};

export function SubjectCard({ subject }: SubjectCardProps) {
  const instructionsHref = `/instructions/${subject.slug}` as Route;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="panel relative overflow-hidden p-6"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-br",
          accentClasses[subject.accent]
        )}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="section-kicker border-none bg-slate-900/90 text-white">
              {subject.typeLabel}
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
              {subject.name}
            </h3>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/90 px-3 py-2 text-right shadow-sm">
            <div className="text-xs text-slate-500">Level</div>
            <div className="text-sm font-semibold text-slate-900">{subject.difficultyLabel}</div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">{subject.description}</p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="soft-panel p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Questions</div>
            <div className="mt-2 text-xl font-semibold text-slate-900">{subject.questionCount}</div>
          </div>
          <div className="soft-panel p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Duration</div>
            <div className="mt-2 text-xl font-semibold text-slate-900">
              {subject.estimatedDurationLabel}
            </div>
          </div>
          <div className="soft-panel p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Mode</div>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <CircleDot className="h-4 w-4" />
              {subject.mode === "single-subject" ? "Subject Test" : "Mixed Mock"}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Source: <span className="font-medium text-slate-700">{subject.sourceFile}</span>
          </p>
          <Link href={instructionsHref} className="action-button-primary gap-2">
            Start Mock
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
