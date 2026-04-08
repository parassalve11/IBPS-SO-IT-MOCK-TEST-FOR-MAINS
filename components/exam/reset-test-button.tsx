"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { useExamStore } from "@/store/use-exam-store";

type ResetTestButtonProps = {
  subjectSlug: string;
  label: string;
  redirectTo?: string;
  restartAfterReset?: boolean;
  durationMinutes?: number;
  questionIds?: string[];
  hideIfMissing?: boolean;
  variant?: "secondary" | "ghost" | "danger";
  className?: string;
};

const variantClasses = {
  secondary: "action-button-secondary",
  ghost: "action-button-ghost",
  danger: "action-button-danger"
};

export function ResetTestButton({
  subjectSlug,
  label,
  redirectTo,
  restartAfterReset = false,
  durationMinutes,
  questionIds,
  hideIfMissing = false,
  variant = "secondary",
  className
}: ResetTestButtonProps) {
  const router = useRouter();
  const hydrationComplete = useExamStore((state) => state.hydrationComplete);
  const session = useExamStore((state) => state.sessions[subjectSlug]);
  const initializeSession = useExamStore((state) => state.initializeSession);
  const resetSession = useExamStore((state) => state.resetSession);

  if (!hydrationComplete && hideIfMissing) {
    return null;
  }

  if (hideIfMissing && !session) {
    return null;
  }

  const handleReset = () => {
    resetSession(subjectSlug);

    if (restartAfterReset && durationMinutes && questionIds) {
      initializeSession(
        {
          slug: subjectSlug,
          durationMinutes,
          questionIds
        },
        true
      );
    }

    if (redirectTo) {
      router.push(redirectTo as Route);
    }
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className={cn(variantClasses[variant], "w-full", className)}
    >
      {label}
    </button>
  );
}
