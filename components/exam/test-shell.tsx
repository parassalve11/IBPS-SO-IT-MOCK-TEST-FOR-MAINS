"use client";

import type { Route } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { QuestionCard } from "@/components/exam/question-card";
import { QuestionPalette } from "@/components/exam/question-palette";
import { ResetTestButton } from "@/components/exam/reset-test-button";
import { SubmitConfirmModal } from "@/components/exam/submit-confirm-modal";
import { TopExamBar } from "@/components/exam/top-exam-bar";
import { getProgressSummary } from "@/lib/exam-status";
import { NormalizedQuestion, SubjectSummary } from "@/types/exam";
import { useExamStore } from "@/store/use-exam-store";

type TestShellProps = {
  subject: SubjectSummary;
  questions: NormalizedQuestion[];
};

export function TestShell({ subject, questions }: TestShellProps) {
  const router = useRouter();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const hydrationComplete = useExamStore((state) => state.hydrationComplete);
  const session = useExamStore((state) => state.sessions[subject.slug]);
  const initializeSession = useExamStore((state) => state.initializeSession);
  const selectAnswer = useExamStore((state) => state.selectAnswer);
  const clearAnswer = useExamStore((state) => state.clearAnswer);
  const nextQuestion = useExamStore((state) => state.nextQuestion);
  const previousQuestion = useExamStore((state) => state.previousQuestion);
  const goToQuestion = useExamStore((state) => state.goToQuestion);
  const toggleMarkForReview = useExamStore((state) => state.toggleMarkForReview);
  const submitSession = useExamStore((state) => state.submitSession);

  useEffect(() => {
    if (!hydrationComplete) {
      return;
    }

    initializeSession({
      slug: subject.slug,
      durationMinutes: subject.durationMinutes,
      questionIds: questions.map((question) => question.id)
    });
  }, [hydrationComplete, initializeSession, questions, subject.durationMinutes, subject.slug]);

  useEffect(() => {
    if (!hydrationComplete) {
      return;
    }

    const interval = window.setInterval(() => {
      const currentSession = useExamStore.getState().sessions[subject.slug];

      if (!currentSession || currentSession.isSubmitted) {
        return;
      }

      if (currentSession.remainingTimeSeconds <= 1) {
        useExamStore.getState().submitSession(subject.slug, true);
        router.replace(`/review/${subject.slug}` as Route);
        return;
      }

      useExamStore.getState().tick(subject.slug);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [hydrationComplete, router, subject.slug]);

  useEffect(() => {
    if (hydrationComplete && session?.isSubmitted) {
      router.replace(`/review/${subject.slug}` as Route);
    }
  }, [hydrationComplete, router, session?.isSubmitted, subject.slug]);

  if (!hydrationComplete || !session) {
    return (
      <section className="min-h-screen bg-[linear-gradient(180deg,#f6f9ff_0%,#edf3fb_100%)] px-4 py-8 sm:px-6 xl:px-8">
        <div className="animate-pulse rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
          <div className="h-7 w-52 rounded-full bg-slate-200" />
          <div className="mt-6 h-56 rounded-[1.6rem] bg-slate-100" />
        </div>
      </section>
    );
  }

  const instructionsHref = `/instructions/${subject.slug}` as Route;

  if (questions.length === 0) {
    return (
      <section className="min-h-screen bg-[linear-gradient(180deg,#f6f9ff_0%,#edf3fb_100%)] px-4 py-10 sm:px-6 xl:px-8">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_20px_55px_rgba(15,23,42,0.08)] sm:p-10">
          <span className="section-kicker">No Question Data</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            This subject does not have any questions available yet.
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Add questions to the subject JSON file and try again. The test interface is blocked
            here to avoid a runtime crash from an empty paper.
          </p>
          <div className="mt-8">
            <ResetTestButton
              subjectSlug={subject.slug}
              label="Back to Instructions"
              redirectTo={instructionsHref}
              variant="secondary"
            />
          </div>
        </div>
      </section>
    );
  }

  const questionIds = questions.map((question) => question.id);
  const currentQuestion = questions[session.currentQuestionIndex] ?? questions[0];
  const selectedAnswer = currentQuestion ? session.answers[currentQuestion.id] : undefined;
  const progressSummary = getProgressSummary(questions, session);
  const isMarkedForReview = currentQuestion
    ? session.markedQuestionIds.includes(currentQuestion.id)
    : false;
  const isFirstQuestion = session.currentQuestionIndex === 0;
  const isLastQuestion = session.currentQuestionIndex === questions.length - 1;
  const answeredPercentage = Math.round(
    (progressSummary.answeredCount / questions.length) * 100
  );

  const handleConfirmSubmit = () => {
    submitSession(subject.slug, false);
    router.push(`/review/${subject.slug}` as Route);
  };

  const handleMarkForReviewAndNext = () => {
    if (!isMarkedForReview) {
      toggleMarkForReview(subject.slug, currentQuestion.id);
    }

    if (!isLastQuestion) {
      nextQuestion(subject.slug, questionIds);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1500px] px-4 pb-8 pt-4 sm:px-6 xl:px-8">
        <TopExamBar
          subjectName={subject.name}
          questionNumber={session.currentQuestionIndex + 1}
          totalQuestions={questions.length}
          remainingTimeSeconds={session.remainingTimeSeconds}
          onOpenPalette={() => setIsPaletteOpen(true)}
          onSubmit={() => setIsSubmitModalOpen(true)}
        />

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <QuestionCard
                    sectionLabel={subject.name}
                    question={currentQuestion}
                    questionNumber={session.currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                    selectedAnswer={selectedAnswer}
                    isBookmarked={isMarkedForReview}
                    onToggleBookmark={() =>
                      toggleMarkForReview(subject.slug, currentQuestion.id)
                    }
                    onSelect={(option) =>
                      selectAnswer(subject.slug, currentQuestion.id, option)
                    }
                  />
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-5 sm:px-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => previousQuestion(subject.slug, questionIds)}
                    disabled={isFirstQuestion}
                    className="inline-flex items-center rounded-[1rem] border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleMarkForReviewAndNext}
                    className="rounded-[1rem] border border-blue-600 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    Mark for Review &amp; Next
                  </button>
                  <button
                    type="button"
                    onClick={() => clearAnswer(subject.slug, currentQuestion.id)}
                    disabled={!selectedAnswer}
                    className="rounded-[1rem] border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Clear Response
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-[1rem] border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Submit Test
                  </button>
                  <button
                    type="button"
                    onClick={() => nextQuestion(subject.slug, questionIds)}
                    className="inline-flex items-center justify-center rounded-[1rem] bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    {isLastQuestion ? "Save Response" : "Save & Next"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                    Your Progress
                  </h2>
                  <p className="mt-2 text-base text-slate-700">
                    <span className="font-semibold text-blue-600">
                      {progressSummary.answeredCount}
                    </span>{" "}
                    of <span className="font-semibold">{questions.length}</span> Answered
                  </p>
                </div>
                <div className="text-xl font-semibold text-emerald-600">{answeredPercentage}%</div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-500 transition-all duration-300"
                  style={{ width: `${answeredPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="hidden xl:block">
            <div className="sticky top-28">
              <QuestionPalette
                subjectName={subject.name}
                questions={questions}
                session={session}
                currentIndex={session.currentQuestionIndex}
                onJump={(index) => goToQuestion(subject.slug, index, questionIds)}
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isPaletteOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/45 p-4 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="ml-auto max-w-sm"
            >
              <QuestionPalette
                subjectName={subject.name}
                questions={questions}
                session={session}
                currentIndex={session.currentQuestionIndex}
                onJump={(index) => {
                  goToQuestion(subject.slug, index, questionIds);
                  setIsPaletteOpen(false);
                }}
              />
              <button
                type="button"
                onClick={() => setIsPaletteOpen(false)}
                className="mt-3 w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Close Palette
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SubmitConfirmModal
        open={isSubmitModalOpen}
        totalQuestions={questions.length}
        progressSummary={progressSummary}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
}
