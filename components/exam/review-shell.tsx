"use client";

import type { Route } from "next";
import Link from "next/link";
import { ResetTestButton } from "@/components/exam/reset-test-button";
import { QuestionReviewList } from "@/components/exam/question-review-list";
import { calculateResultStats } from "@/lib/scoring";
import { NormalizedQuestion, SubjectSummary } from "@/types/exam";
import { useExamStore } from "@/store/use-exam-store";

type ReviewShellProps = {
  subject: SubjectSummary;
  questions: NormalizedQuestion[];
};

export function ReviewShell({ subject, questions }: ReviewShellProps) {
  const hydrationComplete = useExamStore((state) => state.hydrationComplete);
  const session = useExamStore((state) => state.sessions[subject.slug]);
  const resultHref = `/result/${subject.slug}` as Route;
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
          <span className="section-kicker">Review Locked</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            Explanations become available only after the test is submitted.
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Continue or submit the mock first, then return here for a full question-by-question review.
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
      <div className="panel p-6 sm:p-8">
        <span className="section-kicker">Answer Review</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {subject.name} question review
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          Compare your selected responses with the correct answers and explanations for every question.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="metric-card">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Correct</div>
            <div className="mt-2 text-3xl font-semibold text-slate-950">{stats.correctCount}</div>
          </div>
          <div className="metric-card">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Wrong</div>
            <div className="mt-2 text-3xl font-semibold text-slate-950">{stats.wrongCount}</div>
          </div>
          <div className="metric-card">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Unanswered</div>
            <div className="mt-2 text-3xl font-semibold text-slate-950">{stats.unansweredCount}</div>
          </div>
          <div className="metric-card">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Net Score</div>
            <div className="mt-2 text-3xl font-semibold text-slate-950">{stats.netScore}</div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={resultHref} className="action-button-secondary">
            Back to Result
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
        </div>
      </div>

      <div className="mt-8">
        <QuestionReviewList questions={questions} answers={session.answers} />
      </div>
    </section>
  );
}
