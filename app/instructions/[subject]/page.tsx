import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InstructionPanel } from "@/components/exam/instruction-panel";
import { ResetTestButton } from "@/components/exam/reset-test-button";
import { StartTestButton } from "@/components/exam/start-test-button";
import {
  getNormalizedQuestionsForSubject,
  getStaticSubjectParams,
  getSubjectSummary
} from "@/lib/subjects";

export function generateStaticParams() {
  return getStaticSubjectParams();
}

export default async function InstructionsPage({
  params
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectSlug } = await params;
  const subject = getSubjectSummary(subjectSlug);

  if (!subject) {
    notFound();
  }

  const questions = getNormalizedQuestionsForSubject(subject.slug);
  const questionIds = questions.map((question) => question.id);
  const subjectsHref = "/subjects" as Route;
  const instructionsHref = `/instructions/${subject.slug}` as Route;

  return (
    <section className="page-shell py-12 sm:py-16">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <InstructionPanel
          questionCount={questions.length}
          durationMinutes={subject.durationMinutes}
        />

        <aside className="panel h-fit p-6 sm:p-7 xl:sticky xl:top-24">
          <div className="section-kicker">Mock Overview</div>
          <h2 className="mt-4 text-2xl font-semibold text-slate-950">{subject.name}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{subject.description}</p>

          <div className="mt-6 grid gap-3">
            <div className="soft-panel p-4">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Question file</div>
              <div className="mt-2 text-sm font-medium text-slate-900">{subject.sourceFile}</div>
            </div>
            <div className="soft-panel p-4">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Approx. IBPS Weightage
              </div>
              <div className="mt-2 text-sm font-medium text-slate-900">
                {subject.ibpsWeightageLabel}
              </div>
            </div>
            <div className="soft-panel p-4">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Difficulty</div>
              <div className="mt-2 text-sm font-medium text-slate-900">{subject.difficultyLabel}</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <StartTestButton
              subjectSlug={subject.slug}
              durationMinutes={subject.durationMinutes}
              questionIds={questionIds}
            />
            <ResetTestButton
              subjectSlug={subject.slug}
              label="Reset Saved Attempt"
              redirectTo={instructionsHref}
              hideIfMissing
              variant="ghost"
            />
            <Link href={subjectsHref} className="action-button-secondary w-full">
              Back to Subjects
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
