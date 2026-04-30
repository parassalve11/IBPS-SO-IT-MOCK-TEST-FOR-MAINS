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
          Subject-wise professional knowledge mocks, ordered by IBPS SO IT mains priority.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Each mock is loaded from local JSON data and arranged by an IBPS-style syllabus flow so you can start with the highest-weight areas first.
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Weightage shown here is an approximate planning guide for the 60-mark Professional
          Knowledge mains paper. IBPS officially publishes the full paper pattern, but not a fixed
          topic-wise marks split.
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
