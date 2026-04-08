import { SubjectConfig } from "@/types/exam";

type SubjectMetadataOverride = Partial<
  Pick<
    SubjectConfig,
    | "name"
    | "shortName"
    | "description"
    | "durationMinutes"
    | "estimatedDurationLabel"
    | "typeLabel"
    | "difficultyLabel"
    | "accent"
    | "mode"
  >
>;

export const DEFAULT_SUBJECT_SETTINGS = {
  typeLabel: "Professional Knowledge",
  difficultyLabel: "Mains Practice",
  accent: "blue",
  mode: "single-subject"
} as const;

export const SUBJECT_METADATA_OVERRIDES: Record<string, SubjectMetadataOverride> = {
  "computer-networks": {
    name: "Computer Networks",
    shortName: "CN",
    description:
      "Routing, switching, protocols, addressing, and network architecture practice for IBPS SO IT mains.",
    accent: "blue"
  },
  dbms: {
    name: "Database Management Systems",
    shortName: "DBMS",
    description:
      "Normalization, SQL, transactions, indexing, and relational database concepts in exam format.",
    accent: "indigo"
  },
  "operating-systems": {
    name: "Operating Systems",
    shortName: "OS",
    description:
      "Scheduling, memory management, synchronization, deadlocks, and process control practice.",
    accent: "slate"
  },
  "cyber-security": {
    name: "Cyber Security",
    shortName: "CS",
    description:
      "Confidentiality, integrity, authentication, attacks, and defensive security concepts for mains preparation.",
    accent: "indigo"
  },
  dsa: {
    name: "Data Structures and Algorithms",
    shortName: "DSA",
    description:
      "Arrays, linked lists, trees, graphs, sorting, searching, and algorithmic reasoning in objective format.",
    accent: "blue"
  },
  "c-programming": {
    name: "C Programming",
    shortName: "C",
    description:
      "Pointers, memory, functions, structures, and core C language concepts for objective exam practice.",
    accent: "slate"
  },
  "computer-organization": {
    name: "Computer Organization",
    shortName: "CO",
    description:
      "Processor organization, memory hierarchy, I/O, instruction cycles, and architecture fundamentals.",
    accent: "blue"
  },
  oop: {
    name: "Object Oriented Programming",
    shortName: "OOP",
    description:
      "Classes, objects, inheritance, polymorphism, abstraction, and OOP-based reasoning for mains practice.",
    accent: "indigo"
  },
  "softwere-enginnering": {
    name: "Software Engineering",
    shortName: "SE",
    description:
      "SDLC, models, estimation, testing, maintenance, and software project fundamentals for exam practice.",
    accent: "slate"
  }
};
