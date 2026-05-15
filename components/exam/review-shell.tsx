"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import { ReviewAnalysisPanel } from "@/components/exam/review-analysis-panel";
import { ReviewPalette } from "@/components/exam/review-palette";
import { ResetTestButton } from "@/components/exam/reset-test-button";
import { formatPercentage, formatTime } from "@/lib/format";
import { calculateResultStats, isCorrectAnswer } from "@/lib/scoring";
import { NormalizedQuestion, SubjectSummary } from "@/types/exam";
import { useExamStore } from "@/store/use-exam-store";

type ReviewShellProps = {
  subject: SubjectSummary;
  questions: NormalizedQuestion[];
};

export function ReviewShell({ subject, questions }: ReviewShellProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hydrationComplete = useExamStore((state) => state.hydrationComplete);
  const session = useExamStore((state) => state.sessions[subject.slug]);
  const resultHref = `/result/${subject.slug}` as Route;
  const testHref = `/test/${subject.slug}` as Route;

  useEffect(() => {
    if (activeIndex > questions.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, questions.length]);

  useEffect(() => {
    if (!session) {
      return;
    }

    const firstPriorityIndex = questions.findIndex((question) => {
      const selectedAnswer = session.answers[question.id];
      return !selectedAnswer || !isCorrectAnswer(question, selectedAnswer);
    });

    setActiveIndex(firstPriorityIndex >= 0 ? firstPriorityIndex : 0);
  }, [questions, session?.submittedAt]);

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
            Continue or submit the mock first, then return here for a full question-by-question
            review.
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

  if (questions.length === 0) {
    return (
      <section className="page-shell py-12">
        <div className="panel mx-auto max-w-2xl p-8 text-center sm:p-10">
          <span className="section-kicker">No Question Data</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            No submitted questions are available for review yet.
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Add question data to this subject file, submit the test again, and the analysis page
            will unlock automatically.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/" className="action-button-secondary">
              Return Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const stats = calculateResultStats(questions, session, subject.durationMinutes);
  const activeQuestion = questions[activeIndex] ?? questions[0];
  const selectedAnswer = activeQuestion ? session.answers[activeQuestion.id] : undefined;
  const isCorrect = activeQuestion ? isCorrectAnswer(activeQuestion, selectedAnswer) : false;
  const isUnanswered = !selectedAnswer;
  const isMarked = activeQuestion ? session.markedQuestionIds.includes(activeQuestion.id) : false;

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1450px] px-4 py-4 sm:px-6 xl:px-8">
        <div className="rounded-[1.45rem] border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                Analysis Mode
              </div>
              <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                {subject.name} Post-Test Review
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Open one question at a time, check the correct logic, and revise memory tricks
                without scrolling through a long report.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-[1rem] border border-emerald-200 bg-emerald-50 px-4 py-2.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Test Submitted
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {session.submittedAt
                    ? new Date(session.submittedAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit"
                      })
                    : "Submitted"}
                </div>
              </div>

              <Link href={resultHref} className="action-button-secondary">
                Result Summary
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

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            <div className="rounded-[1rem] border border-slate-200 bg-slate-50/80 p-3.5">
              <div className="text-xs text-slate-500">Net Score</div>
              <div className="mt-2 text-xl font-semibold text-slate-950">
                {stats.netScore} <span className="text-base text-slate-500">/ {stats.maxScore}</span>
              </div>
            </div>
            <div className="rounded-[1rem] border border-slate-200 bg-slate-50/80 p-3.5">
              <div className="text-xs text-slate-500">Accuracy</div>
              <div className="mt-2 text-xl font-semibold text-slate-950">
                {formatPercentage(stats.accuracyPercentage)}
              </div>
            </div>
            <div className="rounded-[1rem] border border-slate-200 bg-slate-50/80 p-3.5">
              <div className="text-xs text-slate-500">Attempted</div>
              <div className="mt-2 text-xl font-semibold text-slate-950">
                {stats.attemptedCount} <span className="text-base text-slate-500">/ {stats.totalQuestions}</span>
              </div>
            </div>
            <div className="rounded-[1rem] border border-slate-200 bg-slate-50/80 p-3.5">
              <div className="text-xs text-slate-500">Correct</div>
              <div className="mt-2 text-xl font-semibold text-emerald-600">{stats.correctCount}</div>
            </div>
            <div className="rounded-[1rem] border border-slate-200 bg-slate-50/80 p-3.5">
              <div className="text-xs text-slate-500">Incorrect</div>
              <div className="mt-2 text-xl font-semibold text-rose-600">{stats.wrongCount}</div>
            </div>
            <div className="rounded-[1rem] border border-slate-200 bg-slate-50/80 p-3.5">
              <div className="text-xs text-slate-500">Time Spent</div>
              <div className="mt-2 flex items-center gap-2 text-xl font-semibold text-slate-950">
                <Clock3 className="h-4 w-4 text-blue-600" />
                {formatTime(stats.timeUsedSeconds)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <div className="rounded-[1.35rem] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] sm:px-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">Question</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                    Why Correct
                  </span>
                  {activeQuestion.memoryTrick ? (
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                      Memory Trick
                    </span>
                  ) : null}
                  {activeQuestion.examNote ? (
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
                      Exam Note
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveIndex((current) => Math.max(current - 1, 0))}
                    disabled={activeIndex === 0}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="text-sm font-medium text-slate-700">
                    {activeIndex + 1} of {questions.length}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((current) => Math.min(current + 1, questions.length - 1))
                    }
                    disabled={activeIndex === questions.length - 1}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <ReviewAnalysisPanel
              question={activeQuestion}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              isUnanswered={isUnanswered}
              isMarked={isMarked}
            />
          </div>

          <ReviewPalette
            questions={questions}
            answers={session.answers}
            markedQuestionIds={session.markedQuestionIds}
            activeIndex={activeIndex}
            onJump={setActiveIndex}
          />
        </div>
      </div>
    </section>
  );
}
