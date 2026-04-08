import { EXAM_SCORING } from "@/constants/exam";
import { PaletteLegend } from "@/components/exam/palette-legend";

type InstructionPanelProps = {
  questionCount: number;
  durationMinutes: number;
};

const instructions = [
  "Only one question is displayed at a time during the mock test.",
  "Use Save & Next, Previous, Next, and the palette to move across questions.",
  "Questions can be marked for review with or without a selected answer.",
  "Unanswered questions are allowed and carry zero marks.",
  "Explanations are locked during the exam and visible only after submission.",
  "The test auto-submits when the timer reaches zero."
];

export function InstructionPanel({
  questionCount,
  durationMinutes
}: InstructionPanelProps) {
  const totalMarks = questionCount * EXAM_SCORING.correct;

  return (
    <div className="space-y-6">
      <div className="panel p-6 sm:p-8">
        <span className="section-kicker">Exam Instructions</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Read these instructions carefully before starting the mock.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          This interface is designed to feel close to a real competitive exam environment. Review the rules, scoring pattern, and palette meaning before entering the test.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="metric-card">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Questions</div>
            <div className="mt-2 text-3xl font-semibold text-slate-950">{questionCount}</div>
          </div>
          <div className="metric-card">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Duration</div>
            <div className="mt-2 text-3xl font-semibold text-slate-950">{durationMinutes} mins</div>
          </div>
          <div className="metric-card">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Total Marks</div>
            <div className="mt-2 text-3xl font-semibold text-slate-950">{totalMarks}</div>
          </div>
          <div className="metric-card">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Negative Marking</div>
            <div className="mt-2 text-3xl font-semibold text-slate-950">{EXAM_SCORING.wrong}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="panel p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">General Rules</h2>
          <div className="mt-5 grid gap-3">
            {instructions.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Palette Meaning</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            The question palette helps you monitor progress and jump directly to any question.
          </p>
          <div className="mt-6">
            <PaletteLegend />
          </div>
        </div>
      </div>
    </div>
  );
}
