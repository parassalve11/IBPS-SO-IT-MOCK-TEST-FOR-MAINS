"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ProgressSummary } from "@/types/exam";

type SubmitConfirmModalProps = {
  open: boolean;
  totalQuestions: number;
  progressSummary: ProgressSummary;
  onClose: () => void;
  onConfirm: () => void;
};

export function SubmitConfirmModal({
  open,
  totalQuestions,
  progressSummary,
  onClose,
  onConfirm
}: SubmitConfirmModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="panel w-full max-w-xl p-6 sm:p-8"
          >
            <span className="section-kicker">Confirm Submission</span>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">
              Submit your test now?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Once submitted, the timer stops and answers can only be reviewed in result mode.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="soft-panel p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Total Questions</div>
                <div className="mt-2 text-2xl font-semibold text-slate-950">{totalQuestions}</div>
              </div>
              <div className="soft-panel p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Answered</div>
                <div className="mt-2 text-2xl font-semibold text-slate-950">
                  {progressSummary.answeredCount}
                </div>
              </div>
              <div className="soft-panel p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Marked</div>
                <div className="mt-2 text-2xl font-semibold text-slate-950">
                  {progressSummary.markedCount}
                </div>
              </div>
              <div className="soft-panel p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Remaining</div>
                <div className="mt-2 text-2xl font-semibold text-slate-950">
                  {progressSummary.remainingCount + progressSummary.unansweredCount}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={onClose} className="action-button-secondary">
                Continue Test
              </button>
              <button type="button" onClick={onConfirm} className="action-button-primary">
                Final Submit
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
