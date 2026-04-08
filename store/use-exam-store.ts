"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORE_NAME } from "@/constants/exam";
import { ExamSession } from "@/types/exam";

type SessionSeed = {
  slug: string;
  durationMinutes: number;
  questionIds: string[];
};

type ExamStore = {
  sessions: Record<string, ExamSession>;
  hydrationComplete: boolean;
  setHydrationComplete: (value: boolean) => void;
  initializeSession: (seed: SessionSeed, force?: boolean) => void;
  selectAnswer: (subjectSlug: string, questionId: string, answer: string) => void;
  clearAnswer: (subjectSlug: string, questionId: string) => void;
  goToQuestion: (subjectSlug: string, index: number, questionIds: string[]) => void;
  nextQuestion: (subjectSlug: string, questionIds: string[]) => void;
  previousQuestion: (subjectSlug: string, questionIds: string[]) => void;
  toggleMarkForReview: (subjectSlug: string, questionId: string) => void;
  markVisited: (subjectSlug: string, questionId: string) => void;
  submitSession: (subjectSlug: string, autoSubmitted?: boolean) => void;
  tick: (subjectSlug: string) => void;
  resetSession: (subjectSlug: string) => void;
};

function withUniqueValue(values: string[], value: string) {
  return values.includes(value) ? values : [...values, value];
}

function createSession(seed: SessionSeed): ExamSession {
  const firstQuestionId = seed.questionIds[0];

  return {
    subjectSlug: seed.slug,
    currentQuestionIndex: 0,
    answers: {},
    visitedQuestionIds: firstQuestionId ? [firstQuestionId] : [],
    markedQuestionIds: [],
    remainingTimeSeconds: seed.durationMinutes * 60,
    startedAt: new Date().toISOString(),
    isSubmitted: false,
    autoSubmitted: false
  };
}

export const useExamStore = create<ExamStore>()(
  persist(
    (set, get) => ({
      sessions: {},
      hydrationComplete: false,
      setHydrationComplete: (value) => set({ hydrationComplete: value }),
      initializeSession: (seed, force = false) =>
        set((state) => {
          const existingSession = state.sessions[seed.slug];

          if (!force && existingSession && !existingSession.isSubmitted) {
            return state;
          }

          return {
            sessions: {
              ...state.sessions,
              [seed.slug]: createSession(seed)
            }
          };
        }),
      selectAnswer: (subjectSlug, questionId, answer) =>
        set((state) => {
          const session = state.sessions[subjectSlug];

          if (!session || session.isSubmitted) {
            return state;
          }

          return {
            sessions: {
              ...state.sessions,
              [subjectSlug]: {
                ...session,
                answers: {
                  ...session.answers,
                  [questionId]: answer
                },
                visitedQuestionIds: withUniqueValue(session.visitedQuestionIds, questionId)
              }
            }
          };
        }),
      clearAnswer: (subjectSlug, questionId) =>
        set((state) => {
          const session = state.sessions[subjectSlug];

          if (!session || session.isSubmitted) {
            return state;
          }

          const updatedAnswers = { ...session.answers };
          delete updatedAnswers[questionId];

          return {
            sessions: {
              ...state.sessions,
              [subjectSlug]: {
                ...session,
                answers: updatedAnswers
              }
            }
          };
        }),
      goToQuestion: (subjectSlug, index, questionIds) =>
        set((state) => {
          const session = state.sessions[subjectSlug];
          const boundedIndex = Math.max(0, Math.min(index, questionIds.length - 1));
          const nextQuestionId = questionIds[boundedIndex];

          if (!session || session.isSubmitted || !nextQuestionId) {
            return state;
          }

          return {
            sessions: {
              ...state.sessions,
              [subjectSlug]: {
                ...session,
                currentQuestionIndex: boundedIndex,
                visitedQuestionIds: withUniqueValue(session.visitedQuestionIds, nextQuestionId)
              }
            }
          };
        }),
      nextQuestion: (subjectSlug, questionIds) => {
        const session = get().sessions[subjectSlug];

        if (!session || session.isSubmitted) {
          return;
        }

        get().goToQuestion(subjectSlug, session.currentQuestionIndex + 1, questionIds);
      },
      previousQuestion: (subjectSlug, questionIds) => {
        const session = get().sessions[subjectSlug];

        if (!session || session.isSubmitted) {
          return;
        }

        get().goToQuestion(subjectSlug, session.currentQuestionIndex - 1, questionIds);
      },
      toggleMarkForReview: (subjectSlug, questionId) =>
        set((state) => {
          const session = state.sessions[subjectSlug];

          if (!session || session.isSubmitted) {
            return state;
          }

          const isMarked = session.markedQuestionIds.includes(questionId);

          return {
            sessions: {
              ...state.sessions,
              [subjectSlug]: {
                ...session,
                markedQuestionIds: isMarked
                  ? session.markedQuestionIds.filter((item) => item !== questionId)
                  : [...session.markedQuestionIds, questionId],
                visitedQuestionIds: withUniqueValue(session.visitedQuestionIds, questionId)
              }
            }
          };
        }),
      markVisited: (subjectSlug, questionId) =>
        set((state) => {
          const session = state.sessions[subjectSlug];

          if (!session || session.isSubmitted) {
            return state;
          }

          return {
            sessions: {
              ...state.sessions,
              [subjectSlug]: {
                ...session,
                visitedQuestionIds: withUniqueValue(session.visitedQuestionIds, questionId)
              }
            }
          };
        }),
      submitSession: (subjectSlug, autoSubmitted = false) =>
        set((state) => {
          const session = state.sessions[subjectSlug];

          if (!session || session.isSubmitted) {
            return state;
          }

          return {
            sessions: {
              ...state.sessions,
              [subjectSlug]: {
                ...session,
                isSubmitted: true,
                autoSubmitted,
                submittedAt: new Date().toISOString()
              }
            }
          };
        }),
      tick: (subjectSlug) =>
        set((state) => {
          const session = state.sessions[subjectSlug];

          if (!session || session.isSubmitted || session.remainingTimeSeconds <= 0) {
            return state;
          }

          return {
            sessions: {
              ...state.sessions,
              [subjectSlug]: {
                ...session,
                remainingTimeSeconds: Math.max(session.remainingTimeSeconds - 1, 0)
              }
            }
          };
        }),
      resetSession: (subjectSlug) =>
        set((state) => {
          const updatedSessions = { ...state.sessions };
          delete updatedSessions[subjectSlug];

          return {
            sessions: updatedSessions
          };
        })
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessions: state.sessions
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrationComplete(true);
      }
    }
  )
);
