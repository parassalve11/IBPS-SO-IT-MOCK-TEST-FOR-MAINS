const STUDY_TEXT_REPLACEMENTS: Array<[string, string]> = [
  ["â€”", " - "],
  ["â€“", " - "],
  ["â†’", " -> "],
  ["â‡’", " => "],
  ["â‰¥", ">="],
  ["â‰¤", "<="],
  ["â‰ ", "!="],
  ["â€™", "'"],
  ["â€˜", "'"],
  ['â€œ', '"'],
  ['â€\u009d', '"'],
  ["Â", ""]
];

export function cleanStudyText(text?: string) {
  if (!text) {
    return "";
  }

  let cleaned = text;

  for (const [from, to] of STUDY_TEXT_REPLACEMENTS) {
    cleaned = cleaned.split(from).join(to);
  }

  return cleaned.trim();
}
