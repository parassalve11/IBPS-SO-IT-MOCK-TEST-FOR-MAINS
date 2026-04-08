"use client";

import type { Route } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { QUESTION_STATUS_META } from "@/constants/exam";
import { ResetTestButton } from "@/components/exam/reset-test-button";
import { QuestionCard } from "@/components/exam/question-card";
import { QuestionPalette } from "@/components/exam/question-palette";
import { SubmitConfirmModal } from "@/components/exam/submit-confirm-modal";
import { TopExamBar } from "@/components/exam/top-exam-bar";
import { getProgressSummary, getQuestionStatus } from "@/lib/exam-status";
import { SubjectSummary, NormalizedQuestion } from "@/types/exam";
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
        router.replace(`/result/${subject.slug}` as Route);
        return;
      }

      useExamStore.getState().tick(subject.slug);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [hydrationComplete, router, subject.slug]);

  useEffect(() => {
    if (hydrationComplete && session?.isSubmitted) {
      router.replace(`/result/${subject.slug}` as Route);
    }
  }, [hydrationComplete, router, session?.isSubmitted, subject.slug]);

  if (!hydrationComplete || !session) {
    return (
      <section className="page-shell py-10">
        <div className="panel animate-pulse p-8">
          <div className="h-6 w-48 rounded-full bg-slate-200" />
          <div className="mt-6 h-40 rounded-3xl bg-slate-100" />
        </div>
      </section>
    );
  }

  const instructionsHref = `/instructions/${subject.slug}` as Route;

  if (questions.length === 0) {
    return (
      <section className="page-shell py-10">
        <div className="panel mx-auto max-w-2xl p-8 text-center sm:p-10">
          <span className="section-kicker">No Question Data</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            This subject does not have any questions available yet.
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Add questions to the subject JSON file and try again. The test interface is blocked here to avoid a runtime crash from an empty paper.
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
  const currentStatus = currentQuestion
    ? getQuestionStatus(currentQuestion.id, session)
    : "not_visited";
  const progressSummary = getProgressSummary(questions, session);
  const isMarkedForReview = currentQuestion
    ? session.markedQuestionIds.includes(currentQuestion.id)
    : false;
  const isFirstQuestion = session.currentQuestionIndex === 0;
  const isLastQuestion = session.currentQuestionIndex === questions.length - 1;

  const handleConfirmSubmit = () => {
    submitSession(subject.slug, false);
    router.push(`/result/${subject.slug}` as Route);
  };

  return (
    <section className="page-shell py-8 sm:py-10">
      <TopExamBar
        subjectName={subject.name}
        remainingTimeSeconds={session.remainingTimeSeconds}
        progressSummary={progressSummary}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onSubmit={() => setIsSubmitModalOpen(true)}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <QuestionCard
                question={currentQuestion}
                questionNumber={session.currentQuestionIndex + 1}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswer}
                statusLabel={QUESTION_STATUS_META[currentStatus].label}
                onSelect={(option) => selectAnswer(subject.slug, currentQuestion.id, option)}
              />
            </motion.div>
          </AnimatePresence>

          <div className="panel p-4 sm:p-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => previousQuestion(subject.slug, questionIds)}
                  disabled={isFirstQuestion}
                  className="action-button-secondary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => clearAnswer(subject.slug, currentQuestion.id)}
                  disabled={!selectedAnswer}
                  className="action-button-secondary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Clear Response
                </button>
                <button
                  type="button"
                  onClick={() => toggleMarkForReview(subject.slug, currentQuestion.id)}
                  className="action-button-ghost"
                >
                  {isMarkedForReview ? "Unmark Review" : "Mark for Review"}
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => goToQuestion(subject.slug, session.currentQuestionIndex + 1, questionIds)}
                  disabled={isLastQuestion}
                  className="action-button-secondary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
                <button
                  type="button"
                  onClick={() => nextQuestion(subject.slug, questionIds)}
                  className="action-button-primary"
                >
                  {isLastQuestion ? "Save Response" : "Save & Next"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="action-button-secondary"
                >
                  Submit Test
                </button>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Response selections are saved instantly. Use the palette to jump to any question at any time.
            </p>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="space-y-4 lg:sticky lg:top-[158px]">
            <QuestionPalette
              questions={questions}
              session={session}
              currentIndex={session.currentQuestionIndex}
              onJump={(index) => goToQuestion(subject.slug, index, questionIds)}
            />
            <ResetTestButton
              subjectSlug={subject.slug}
              label="Reset This Attempt"
              redirectTo={instructionsHref}
              variant="danger"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isPaletteOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/45 p-4 lg:hidden"
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
                className="action-button-secondary mt-3 w-full"
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
    </section>
  );
}
