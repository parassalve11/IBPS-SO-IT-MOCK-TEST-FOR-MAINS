"use client";

import { CheckCircle2, Circle, Info, Lightbulb, NotebookPen, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { cleanStudyText } from "@/lib/study-text";
import { NormalizedQuestion } from "@/types/exam";

type ReviewAnalysisPanelProps = {
  question: NormalizedQuestion;
  selectedAnswer?: string;
  isCorrect: boolean;
  isUnanswered: boolean;
  isMarked: boolean;
};

function splitOption(option: string) {
  const match = option.match(/^([A-Z])\.\s*(.*)$/);

  if (!match) {
    return {
      key: option,
      label: option,
      text: option
    };
  }

  return {
    key: match[1],
    label: `${match[1]}.`,
    text: match[2]
  };
}

function getOptionTone(
  option: string,
  selectedAnswer: string | undefined,
  correctAnswer: string
) {
  if (option === correctAnswer) {
    return "border-emerald-200 bg-emerald-50";
  }

  if (selectedAnswer && option === selectedAnswer && option !== correctAnswer) {
    return "border-rose-200 bg-rose-50";
  }

  return "border-slate-200 bg-white";
}

function SectionCard({
  title,
  body,
  icon,
  className
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
  className: string;
}) {
  return (
    <div className={cn("rounded-[1.15rem] border p-4", className)}>
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
      </div>
      <div className="mt-2 whitespace-pre-line text-[13px] leading-6 text-slate-700">
        {cleanStudyText(body)}
      </div>
    </div>
  );
}

export function ReviewAnalysisPanel({
  question,
  selectedAnswer,
  isCorrect,
  isUnanswered,
  isMarked
}: ReviewAnalysisPanelProps) {
  const wrongOptions = Object.entries(question.wrongOptions ?? {});
  const cleanedQuestion = cleanStudyText(question.question);
  const cleanedCorrectAnswer = cleanStudyText(question.correctAnswer);
  const cleanedSelectedAnswer = cleanStudyText(selectedAnswer ?? "Skipped");
  const cleanedTopic = question.topic ? cleanStudyText(question.topic) : "";
  const cleanedMainTopic =
    question.mainTopic && question.mainTopic !== question.topic
      ? cleanStudyText(question.mainTopic)
      : "";
  const cleanedDifficulty = question.difficulty ? cleanStudyText(question.difficulty) : "";
  const primaryExplanationBody = question.mainConcept ?? question.explanation;
  const primaryExplanationTitle = question.mainConcept ? "Main Concept" : "Explanation";

  return (
    <div className="space-y-4">
      <div className="rounded-[1.45rem] border border-slate-200 bg-white p-4 shadow-[0_16px_36px_rgba(15,23,42,0.06)] sm:p-5">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Question
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {question.subjectName}
            </span>
            {question.topic ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {cleanedTopic}
              </span>
            ) : null}
            {cleanedMainTopic ? (
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                {cleanedMainTopic}
              </span>
            ) : null}
            {question.difficulty ? (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                {cleanedDifficulty}
              </span>
            ) : null}
            {isMarked ? (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Marked
              </span>
            ) : null}
          </div>

          <span
            className={cn(
              "w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
              isUnanswered
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : isCorrect
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-rose-200 bg-rose-50 text-rose-800"
            )}
          >
            {isUnanswered ? "Skipped" : isCorrect ? "Correct" : "Incorrect"}
          </span>
        </div>

        <div className="mt-4">
          <div className="text-[1.1rem] font-semibold tracking-tight text-blue-600">
            Q.{question.order}
          </div>
          <h2 className="mt-2 text-lg font-medium leading-8 tracking-tight text-slate-950 sm:text-[1.15rem]">
            {cleanedQuestion}
          </h2>
        </div>

        <div className="mt-5 overflow-hidden rounded-[1.15rem] border border-slate-200">
          {question.options.map((option) => {
            const optionParts = splitOption(option);
            const isSelected = selectedAnswer === option;
            const isCorrectOption = question.correctAnswer === option;
            const wrongReason =
              !isCorrectOption && optionParts.key
                ? question.wrongOptions?.[optionParts.key]
                : undefined;

            return (
              <div
                key={option}
                className={cn(
                  "border-b border-slate-200 px-4 py-3 last:border-b-0",
                  getOptionTone(option, selectedAnswer, question.correctAnswer)
                )}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-1 block h-5 w-5 rounded-full border-2",
                        isCorrectOption
                          ? "border-emerald-500 bg-emerald-500 shadow-[inset_0_0_0_4px_white]"
                          : isSelected
                            ? "border-rose-500 bg-rose-500 shadow-[inset_0_0_0_4px_white]"
                            : "border-slate-300 bg-white"
                      )}
                    />
                    <div>
                      <div className="text-sm font-medium leading-6 text-slate-900">
                        <span className="mr-2 font-semibold">{optionParts.label}</span>
                        {cleanStudyText(optionParts.text)}
                      </div>
                      {wrongReason ? (
                        <div className="mt-1 rounded-xl border border-rose-100 bg-white/80 px-3 py-2 text-xs leading-5 text-slate-500">
                          {cleanStudyText(wrongReason)}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {isSelected ? (
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          isCorrect
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        )}
                      >
                        Your Answer
                      </span>
                    ) : null}
                    {isCorrectOption ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Correct Answer
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <div className="rounded-[1rem] border border-slate-200 bg-slate-50/80 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Your Answer
            </div>
            <div className="mt-2 text-base font-semibold text-slate-950">
              {cleanedSelectedAnswer}
            </div>
          </div>
          <div className="rounded-[1rem] border border-emerald-200 bg-emerald-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Correct Answer
            </div>
            <div className="mt-2 text-base font-semibold text-slate-950">{cleanedCorrectAnswer}</div>
          </div>
          <div
            className={cn(
              "rounded-[1rem] border p-4",
              isUnanswered
                ? "border-amber-200 bg-amber-50"
                : isCorrect
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-rose-200 bg-rose-50"
            )}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Result
            </div>
            <div className="mt-2 text-base font-semibold text-slate-950">
              {isUnanswered ? "Skipped" : isCorrect ? "Correct" : "Incorrect"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          {primaryExplanationBody ? (
            <SectionCard
              title={primaryExplanationTitle}
              body={primaryExplanationBody}
              icon={<Info className="h-4 w-4 text-blue-600" />}
              className="border-blue-200 bg-blue-50/70"
            />
          ) : null}

          {question.detailedExplanation ? (
            <SectionCard
              title="Detailed Explanation"
              body={question.detailedExplanation}
              icon={<NotebookPen className="h-4 w-4 text-slate-700" />}
              className="border-slate-200 bg-white"
            />
          ) : null}

          {question.relatedConcept ? (
            <SectionCard
              title="Related Concept"
              body={question.relatedConcept}
              icon={<Circle className="h-4 w-4 text-slate-700" />}
              className="border-slate-200 bg-slate-50/80"
            />
          ) : null}

          {wrongOptions.length > 0 ? (
            <div className="rounded-[1.15rem] border border-rose-200 bg-rose-50/70 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-700">
                <XCircle className="h-4 w-4" />
                Wrong Options
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {wrongOptions.map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-[1rem] border border-rose-100 bg-white/80 p-3"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">
                      Option {key}
                    </div>
                    <div className="mt-1 whitespace-pre-line text-[13px] leading-6 text-slate-700">
                      {cleanStudyText(value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-4">
          <SectionCard
            title="Correct Answer"
            body={question.correctAnswer}
            icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
            className="border-emerald-200 bg-emerald-50/70"
          />

          {question.whyCorrect ? (
            <SectionCard
              title="Why This Is Correct"
              body={question.whyCorrect}
              icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
              className="border-emerald-200 bg-emerald-50/70"
            />
          ) : null}

          {question.memoryTrick ? (
            <SectionCard
              title="Memory Trick"
              body={question.memoryTrick}
              icon={<Lightbulb className="h-4 w-4 text-amber-600" />}
              className="border-amber-200 bg-amber-50/75"
            />
          ) : null}

          {question.examNote ? (
            <SectionCard
              title="Exam Note"
              body={question.examNote}
              icon={<Circle className="h-4 w-4 text-indigo-600" />}
              className="border-indigo-200 bg-indigo-50/70"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
