import { notFound } from "next/navigation";
import { ResultShell } from "@/components/exam/result-shell";
import {
  getNormalizedQuestionsForSubject,
  getStaticSubjectParams,
  getSubjectSummary
} from "@/lib/subjects";

export function generateStaticParams() {
  return getStaticSubjectParams();
}

export default async function ResultPage({
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

  return <ResultShell subject={subject} questions={questions} />;
}
