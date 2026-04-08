import { notFound } from "next/navigation";
import { ReviewShell } from "@/components/exam/review-shell";
import {
  getNormalizedQuestionsForSubject,
  getStaticSubjectParams,
  getSubjectSummary
} from "@/lib/subjects";

export function generateStaticParams() {
  return getStaticSubjectParams();
}

export default async function ReviewPage({
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

  return <ReviewShell subject={subject} questions={questions} />;
}
