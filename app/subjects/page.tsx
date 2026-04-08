import { FadeIn } from "@/components/animation/fade-in";
import { SubjectCard } from "@/components/shared/subject-card";
import { getAllSubjectSummaries } from "@/lib/subjects";

export default function SubjectsPage() {
  const subjects = getAllSubjectSummaries();

  return (
    <section className="page-shell py-14 sm:py-16">
      <FadeIn className="mb-10 max-w-3xl">
        <span className="section-kicker">Choose a Subject</span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Subject-wise professional knowledge mocks for IBPS SO IT mains.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Each mock is loaded from local JSON data, uses consistent scoring, and is designed to be easy to extend as your question bank grows.
        </p>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject, index) => (
          <FadeIn key={subject.slug} delay={index * 0.04}>
            <SubjectCard subject={subject} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
