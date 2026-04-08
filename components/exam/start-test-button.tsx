"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useExamStore } from "@/store/use-exam-store";

type StartTestButtonProps = {
  subjectSlug: string;
  durationMinutes: number;
  questionIds: string[];
  label?: string;
};

export function StartTestButton({
  subjectSlug,
  durationMinutes,
  questionIds,
  label = "Start Mock Test"
}: StartTestButtonProps) {
  const router = useRouter();
  const hydrationComplete = useExamStore((state) => state.hydrationComplete);
  const session = useExamStore((state) => state.sessions[subjectSlug]);
  const initializeSession = useExamStore((state) => state.initializeSession);

  const hasSavedAttempt = Boolean(session && !session.isSubmitted);
  const hasQuestions = questionIds.length > 0;
  const buttonLabel = !hydrationComplete
    ? "Loading saved attempt..."
    : !hasQuestions
      ? "No Questions Available"
    : hasSavedAttempt
      ? "Resume Test"
      : session?.isSubmitted
        ? "Start New Attempt"
        : label;

  const handleClick = () => {
    if (!hasQuestions) {
      return;
    }

    if (!hasSavedAttempt) {
      initializeSession(
        {
          slug: subjectSlug,
          durationMinutes,
          questionIds
        },
        session?.isSubmitted
      );
    }

    router.push(`/test/${subjectSlug}` as Route);
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={!hydrationComplete || !hasQuestions}
        className="action-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {buttonLabel}
      </button>
      {!hasQuestions ? (
        <p className="text-sm leading-6 text-amber-700">
          This subject is registered, but no questions were found in its local JSON file yet.
        </p>
      ) : hydrationComplete && hasSavedAttempt ? (
        <p className="text-sm leading-6 text-slate-500">
          A saved in-progress attempt was found in local storage. Continuing will reopen your latest question and timer.
        </p>
      ) : (
        <p className="text-sm leading-6 text-slate-500">
          Your progress is stored locally during the test, so refreshes will not interrupt the attempt.
        </p>
      )}
    </div>
  );
}
