import {
  NormalizedQuestion,
  RawQuestionFile,
  RawQuestionItem,
  SubjectConfig
} from "@/types/exam";

function extractQuestionArray(rawData: RawQuestionFile): RawQuestionItem[] {
  const firstArrayEntry = Object.values(rawData).find((value) => Array.isArray(value));
  return firstArrayEntry ?? [];
}

export function normalizeQuestions(
  rawData: RawQuestionFile,
  subject: Pick<SubjectConfig, "slug" | "name">
): NormalizedQuestion[] {
  const questionItems = extractQuestionArray(rawData);

  return questionItems.map((item, index) => ({
    id: `${subject.slug}-${String(item.id ?? index + 1)}`,
    order: index + 1,
    question: item.question,
    options: item.options,
    correctAnswer: item.correct_answer,
    explanation: item.explanation,
    topic: item.topic,
    difficulty: item.difficulty,
    subjectSlug: subject.slug,
    subjectName: subject.name
  }));
}
