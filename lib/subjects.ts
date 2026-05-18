import fs from "node:fs";
import path from "node:path";
import {
  DEFAULT_SUBJECT_SETTINGS,
  SUBJECT_METADATA_OVERRIDES
} from "@/constants/subjects";
import { formatDuration } from "@/lib/format";
import { extractQuestionItems, normalizeQuestions } from "@/lib/normalize-questions";
import { RawQuestionFile, SubjectConfig, SubjectSummary } from "@/types/exam";

const SUBJECTS_DIR = path.join(process.cwd(), "data", "subjects");
const IBPS_MAIN_TOTAL_MARKS = 60;
const ACRONYM_TOKENS: Record<string, string> = {
  ai: "AI",
  api: "API",
  cn: "CN",
  cpu: "CPU",
  css: "CSS",
  dbms: "DBMS",
  dsa: "DSA",
  html: "HTML",
  ibps: "IBPS",
  ip: "IP",
  it: "IT",
  json: "JSON",
  ml: "ML",
  oop: "OOP",
  os: "OS",
  sql: "SQL",
  ui: "UI",
  ux: "UX"
};

function getRawQuestionItems(rawData: RawQuestionFile) {
  return extractQuestionItems(rawData);
}

function normalizeSlug(fileName: string) {
  return fileName
    .replace(/\.json$/i, "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-");
}

function titleCaseToken(token: string) {
  const normalizedToken = token.toLowerCase();
  return (
    ACRONYM_TOKENS[normalizedToken] ??
    `${normalizedToken.charAt(0).toUpperCase()}${normalizedToken.slice(1)}`
  );
}

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((token) => titleCaseToken(token))
    .join(" ");
}

function deriveShortName(slug: string, name: string) {
  if (ACRONYM_TOKENS[slug]) {
    return ACRONYM_TOKENS[slug];
  }

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials.slice(0, 4) || slug.slice(0, 4).toUpperCase();
}

function getDefaultDurationMinutes(questionCount: number) {
  return Math.max(30, Math.ceil(questionCount * 0.5));
}

function formatIbpsWeightageLabel(ibpsWeightageMarks: number) {
  if (ibpsWeightageMarks <= 0) {
    return "Not mapped yet";
  }

  const percentage = Math.round((ibpsWeightageMarks / IBPS_MAIN_TOTAL_MARKS) * 100);
  return `Approx. ${ibpsWeightageMarks}/${IBPS_MAIN_TOTAL_MARKS} marks (${percentage}%)`;
}

function readSubjectConfigs(): SubjectConfig[] {
  if (!fs.existsSync(SUBJECTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(SUBJECTS_DIR)
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const slug = normalizeSlug(fileName);
      const sourceFile = `data/subjects/${fileName}`;
      const rawData = JSON.parse(
        fs.readFileSync(path.join(SUBJECTS_DIR, fileName), "utf8")
      ) as RawQuestionFile;
      const questionCount = getRawQuestionItems(rawData).length;
      const metadataOverride = SUBJECT_METADATA_OVERRIDES[slug] ?? {};
      const name = metadataOverride.name ?? humanizeSlug(slug);
      const shortName = metadataOverride.shortName ?? deriveShortName(slug, name);
      const syllabusOrder = metadataOverride.syllabusOrder ?? Number.MAX_SAFE_INTEGER;
      const ibpsWeightageMarks = metadataOverride.ibpsWeightageMarks ?? 0;
      const durationMinutes =
        metadataOverride.durationMinutes ?? getDefaultDurationMinutes(questionCount);

      return {
        slug,
        name,
        shortName,
        description:
          metadataOverride.description ??
          `Objective mock practice for ${name} loaded from local JSON question files.`,
        syllabusOrder,
        ibpsWeightageMarks,
        ibpsWeightageLabel: formatIbpsWeightageLabel(ibpsWeightageMarks),
        durationMinutes,
        estimatedDurationLabel:
          metadataOverride.estimatedDurationLabel ?? formatDuration(durationMinutes),
        typeLabel:
          metadataOverride.typeLabel ?? DEFAULT_SUBJECT_SETTINGS.typeLabel,
        difficultyLabel:
          metadataOverride.difficultyLabel ?? DEFAULT_SUBJECT_SETTINGS.difficultyLabel,
        accent: metadataOverride.accent ?? DEFAULT_SUBJECT_SETTINGS.accent,
        sourceFile,
        mode: metadataOverride.mode ?? DEFAULT_SUBJECT_SETTINGS.mode,
        rawData
      };
    })
    .sort(
      (left, right) =>
        left.syllabusOrder - right.syllabusOrder || left.name.localeCompare(right.name)
    );
}

export function getSubjectBySlug(slug: string) {
  return readSubjectConfigs().find((subject) => subject.slug === slug);
}

export function getAllSubjectConfigs(): SubjectConfig[] {
  return readSubjectConfigs();
}

export function getNormalizedQuestionsForSubject(slug: string) {
  const subject = getSubjectBySlug(slug);

  if (!subject) {
    return [];
  }

  return normalizeQuestions(subject.rawData, subject);
}

export function getAllSubjectSummaries(): SubjectSummary[] {
  return getAllSubjectConfigs().map((subject) => {
    const questionCount = normalizeQuestions(subject.rawData, subject).length;

    return {
      ...subject,
      questionCount
    };
  });
}

export function getSubjectSummary(slug: string) {
  const subject = getSubjectBySlug(slug);

  if (!subject) {
    return undefined;
  }

  return {
    ...subject,
    questionCount: normalizeQuestions(subject.rawData, subject).length
  };
}

export function getTotalQuestionCount() {
  return getAllSubjectSummaries().reduce(
    (count, subject) => count + subject.questionCount,
    0
  );
}

export function getStaticSubjectParams() {
  return getAllSubjectConfigs().map((subject) => ({ subject: subject.slug }));
}
