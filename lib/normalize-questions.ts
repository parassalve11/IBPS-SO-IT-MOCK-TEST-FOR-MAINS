import {
  NormalizedQuestion,
  RawQuestionFile,
  RawQuestionItem,
  SubjectConfig
} from "@/types/exam";

function extractQuestionItems(rawData: RawQuestionFile): RawQuestionItem[] {
  return Object.values(rawData).flatMap((value) =>
    Array.isArray(value) ? (value as RawQuestionItem[]) : []
  );
}

export function normalizeQuestions(
  rawData: RawQuestionFile,
  subject: Pick<SubjectConfig, "slug" | "name">
): NormalizedQuestion[] {
  const questionItems = extractQuestionItems(rawData);

  return questionItems.map((item, index) => ({
    id: `${subject.slug}-${String(item.id ?? index + 1)}`,
    order: index + 1,
    question: item.question,
    options: item.options,
    correctAnswer: item.correct_answer,
    explanation: item.explanation,
    detailedExplanation: item.detailed_explanation,
    whyCorrect: item.why_correct,
    wrongOptions: item.wrong_options,
    memoryTrick: item.memory_trick,
    examNote: item.exam_note,
    topic: item.topic,
    difficulty: item.difficulty,
    subjectSlug: subject.slug,
    subjectName: subject.name
  }));
}
