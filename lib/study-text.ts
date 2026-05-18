const STUDY_TEXT_REPLACEMENTS: Array<[string, string]> = [
  ["\u2014", " - "],
  ["\u2013", " - "],
  ["\u2192", " -> "],
  ["\u21d2", " => "],
  ["\u2265", ">="],
  ["\u2264", "<="],
  ["\u2260", "!="],
  ["\u2019", "'"],
  ["\u2018", "'"],
  ["\u201c", '"'],
  ["\u201d", '"'],
  ["\u00e2\u20ac\u201d", " - "],
  ["\u00e2\u20ac\u201c", " - "],
  ["\u00e2\u2020\u2019", " -> "],
  ["\u00e2\u2021\u2019", " => "],
  ["\u00e2\u2030\u00a5", ">="],
  ["\u00e2\u2030\u00a4", "<="],
  ["\u00e2\u2030 ", "!="],
  ["\u00e2\u20ac\u2122", "'"],
  ["\u00e2\u20ac\u02dc", "'"],
  ["\u00e2\u20ac\u0153", '"'],
  ["\u00e2\u20ac\u009d", '"'],
  ["\u00c3\u00a2\u00e2\u201a\u00ac\u00e2\u20ac\u009d", " - "],
  ["\u00c3\u00a2\u00e2\u201a\u00ac\u00e2\u20ac\u201c", " - "],
  ["\u00c3\u00a2\u00e2\u20ac\u00a0\u00e2\u20ac\u2122", " -> "],
  ["\u00c3\u00a2\u00e2\u20ac\u00a1\u00e2\u20ac\u2122", " => "],
  ["\u00c3\u201a", ""]
];

export function cleanStudyText(text?: string) {
  if (!text) {
    return "";
  }

  let cleaned = text;

  for (const [from, to] of STUDY_TEXT_REPLACEMENTS) {
    cleaned = cleaned.split(from).join(to);
  }

  return cleaned.replace(/[ \t]{2,}/g, " ").trim();
}
