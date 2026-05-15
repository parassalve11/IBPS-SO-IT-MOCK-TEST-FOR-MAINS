"use client";

import type { Route } from "next";
import Link from "next/link";
import { calculateResultStats } from "@/lib/scoring";
import { ResultSummary } from "@/components/exam/result-summary";
import { ResetTestButton } from "@/components/exam/reset-test-button";
import { NormalizedQuestion, SubjectSummary } from "@/types/exam";
import { useExamStore } from "@/store/use-exam-store";

type ResultShellProps = {
  subject: SubjectSummary;
  questions: NormalizedQuestion[];
};

export function ResultShell({ subject, questions }: ResultShellProps) {
  const hydrationComplete = useExamStore((state) => state.hydrationComplete);
  const session = useExamStore((state) => state.sessions[subject.slug]);
  const reviewHref = `/review/${subject.slug}` as Route;
  const testHref = `/test/${subject.slug}` as Route;

  if (!hydrationComplete) {
    return (
      <section className="page-shell py-12">
        <div className="panel animate-pulse p-8">
          <div className="h-8 w-56 rounded-full bg-slate-200" />
          <div className="mt-5 h-40 rounded-3xl bg-slate-100" />
        </div>
      </section>
    );
  }

  if (!session || !session.isSubmitted) {
    return (
      <section className="page-shell py-12">
        <div className="panel mx-auto max-w-2xl p-8 text-center sm:p-10">
          <span className="section-kicker">No Submitted Attempt</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            Submit a mock test to unlock the result summary.
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            You can reopen the test if an attempt is in progress, or start the subject again from
            the instruction screen.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={testHref} className="action-button-primary">
              Open Test
            </Link>
            <Link href="/" className="action-button-secondary">
              Return Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const stats = calculateResultStats(questions, session, subject.durationMinutes);

  return (
    <section className="page-shell py-12">
      <ResultSummary subject={subject} stats={stats} autoSubmitted={session.autoSubmitted} />

      <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <span className="section-kicker">Next Step</span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
            Open the analysis view for fast revision.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Each submitted question now shows the correct answer, explanation, detailed
            explanation, why the answer is correct, wrong option notes, memory trick, and exam
            note in separate color-coded cards.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={reviewHref} className="action-button-primary">
              Open Analysis Page
            </Link>
            <ResetTestButton
              subjectSlug={subject.slug}
              label="Retake Test"
              redirectTo={testHref}
              restartAfterReset
              durationMinutes={subject.durationMinutes}
              questionIds={questions.map((question) => question.id)}
              variant="secondary"
              className="sm:w-auto"
            />
            <Link href="/" className="action-button-secondary">
              Return Home
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-950">What to revise here</div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p>Open skipped and incorrect questions first from the palette.</p>
            <p>Use Memory Trick cards for one-line recall before the exam.</p>
            <p>Check Wrong Options to avoid repeating the same confusion next time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
