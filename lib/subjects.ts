import { SUBJECT_REGISTRY } from "@/constants/subjects";
import { normalizeQuestions } from "@/lib/normalize-questions";
import { SubjectConfig, SubjectSummary } from "@/types/exam";

const normalizedQuestionCache = new Map<string, ReturnType<typeof normalizeQuestions>>();

export function getSubjectBySlug(slug: string) {
  return SUBJECT_REGISTRY[slug];
}

export function getAllSubjectConfigs(): SubjectConfig[] {
  return Object.values(SUBJECT_REGISTRY);
}

export function getNormalizedQuestionsForSubject(slug: string) {
  if (normalizedQuestionCache.has(slug)) {
    return normalizedQuestionCache.get(slug) ?? [];
  }

  const subject = getSubjectBySlug(slug);

  if (!subject) {
    return [];
  }

  const normalizedQuestions = normalizeQuestions(subject.rawData, subject);
  normalizedQuestionCache.set(slug, normalizedQuestions);
  return normalizedQuestions;
}

export function getAllSubjectSummaries(): SubjectSummary[] {
  return getAllSubjectConfigs().map((subject) => ({
    ...subject,
    questionCount: getNormalizedQuestionsForSubject(subject.slug).length
  }));
}

export function getSubjectSummary(slug: string) {
  const subject = getSubjectBySlug(slug);

  if (!subject) {
    return undefined;
  }

  return {
    ...subject,
    questionCount: getNormalizedQuestionsForSubject(subject.slug).length
  };
}

export function getTotalQuestionCount() {
  return getAllSubjectSummaries().reduce(
    (count, subject) => count + subject.questionCount,
    0
  );
}

export function getStaticSubjectParams() {
  return Object.keys(SUBJECT_REGISTRY).map((subject) => ({ subject }));
}
