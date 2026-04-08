"use client";

import type { Route } from "next";
import Link from "next/link";
import { calculateResultStats } from "@/lib/scoring";
import { QuestionReviewList } from "@/components/exam/question-review-list";
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
            You can reopen the test if an attempt is in progress, or start the subject again from the instruction screen.
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

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={reviewHref} className="action-button-primary">
          Open Review Page
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

      <div className="mt-10">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm">
          <span className="section-kicker">Question-wise Performance</span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
            Review wrong and unanswered questions first.
          </h2>
          <p className="mt-3 text-sm font-medium text-slate-700">
            Expand descriptions only when needed.
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            The list is sorted to surface unanswered questions first, then incorrect responses, and finally correct ones for quick analysis.
          </p>
        </div>

        <QuestionReviewList questions={questions} answers={session.answers} />
      </div>
    </section>
  );
}
