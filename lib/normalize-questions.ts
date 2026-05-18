import {
  NormalizedQuestion,
  RawQuestionFile,
  RawQuestionItem,
  SubjectConfig
} from "@/types/exam";

function isRawQuestionItem(value: unknown): value is RawQuestionItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<RawQuestionItem>;

  return (
    typeof candidate.question === "string" &&
    Array.isArray(candidate.options) &&
    typeof candidate.correct_answer === "string"
  );
}

export function extractQuestionItems(rawData: RawQuestionFile): RawQuestionItem[] {
  return Object.values(rawData).flatMap((value) =>
    Array.isArray(value) ? value.filter(isRawQuestionItem) : []
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
    explanation: item.explanation ?? item.main_concept ?? item.why_correct ?? "",
    mainConcept: item.main_concept,
    detailedExplanation: item.detailed_explanation,
    relatedConcept: item.related_concept,
    whyCorrect: item.why_correct,
    wrongOptions: item.wrong_options,
    memoryTrick: item.memory_trick,
    examNote: item.exam_note,
    topic: item.topic ?? item.topic_group ?? item.main_topic,
    topicGroup: item.topic_group,
    mainTopic: item.main_topic,
    difficulty: item.difficulty,
    subjectSlug: subject.slug,
    subjectName: subject.name
  }));
}
