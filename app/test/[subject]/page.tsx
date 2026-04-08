import { notFound } from "next/navigation";
import { TestShell } from "@/components/exam/test-shell";
import {
  getNormalizedQuestionsForSubject,
  getStaticSubjectParams,
  getSubjectSummary
} from "@/lib/subjects";

export function generateStaticParams() {
  return getStaticSubjectParams();
}

export default async function TestPage({
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

  return <TestShell subject={subject} questions={questions} />;
}
