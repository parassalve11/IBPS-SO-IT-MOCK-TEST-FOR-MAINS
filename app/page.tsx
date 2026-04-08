import Link from "next/link";
import { BookOpenCheck, ClipboardList, Clock3, Layers3 } from "lucide-react";
import { FadeIn } from "@/components/animation/fade-in";
import { SubjectCard } from "@/components/shared/subject-card";
import { getAllSubjectSummaries, getTotalQuestionCount } from "@/lib/subjects";

const featureHighlights = [
  {
    icon: ClipboardList,
    title: "Exam-style navigation",
    description: "One question at a time, sticky timer, palette navigation, and realistic status tracking."
  },
  {
    icon: Clock3,
    title: "Timed mock experience",
    description: "Low-time warnings, auto-submit on timeout, and persistence across refreshes."
  },
  {
    icon: BookOpenCheck,
    title: "Detailed post-test review",
    description: "Explanations stay locked during the test and open only after submission."
  },
  {
    icon: Layers3,
    title: "JSON-driven scalability",
    description: "Register a new subject file once and the platform is ready for more mocks."
  }
];

export default function HomePage() {
  const subjects = getAllSubjectSummaries();
  const totalQuestions = getTotalQuestionCount();

  return (
    <div className="pb-16">
      <section className="page-shell pt-14 sm:pt-20">
        <FadeIn className="panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute inset-0 bg-hero-glow" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="section-kicker">IBPS SO IT Mains Mock Tests</span>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Professional Knowledge practice built to feel like a serious banking exam.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Prepare subject by subject with a clean, exam-focused interface that mirrors real test pressure:
                timed attempts, question palette control, mark-for-review flow, negative marking, and detailed result analysis.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/subjects" className="action-button-primary">
                  Start a Subject Mock
                </Link>
                <Link href="#features" className="action-button-secondary">
                  Explore Features
                </Link>
              </div>
            </div>

            <div className="subtle-grid rounded-[2rem] border border-slate-200 bg-white/70 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="metric-card">
                  <div className="text-sm text-slate-500">Subjects Available</div>
                  <div className="mt-3 text-4xl font-semibold text-slate-950">{subjects.length}</div>
                </div>
                <div className="metric-card">
                  <div className="text-sm text-slate-500">Question Bank</div>
                  <div className="mt-3 text-4xl font-semibold text-slate-950">{totalQuestions}</div>
                </div>
                <div className="metric-card sm:col-span-2">
                  <div className="text-sm text-slate-500">Designed for</div>
                  <div className="mt-3 text-2xl font-semibold text-slate-950">
                    IBPS SO IT Mains Professional Knowledge
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section id="features" className="page-shell pt-16">
        <FadeIn className="mb-8">
          <span className="section-kicker">Platform Highlights</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            Built for focused preparation, not distraction.
          </h2>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureHighlights.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <FadeIn key={feature.title} delay={index * 0.06}>
                <div className="panel h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="page-shell pt-16">
        <FadeIn className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="section-kicker">Available Subjects</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              Start with a focused topic mock.
            </h2>
          </div>
          <Link href="/subjects" className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white sm:inline-flex">
            View all subjects
          </Link>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {subjects.map((subject, index) => (
            <FadeIn key={subject.slug} delay={index * 0.05}>
              <SubjectCard subject={subject} />
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
