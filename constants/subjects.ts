import { SubjectConfig } from "@/types/exam";

type SubjectMetadataOverride = Partial<
  Pick<
    SubjectConfig,
    | "name"
    | "shortName"
    | "description"
    | "syllabusOrder"
    | "ibpsWeightageMarks"
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
  "cloud-webapi-emergingtech": {
    name: "Cloud, Web API & Emerging Tech",
    shortName: "CWAE",
    syllabusOrder: 10,
    ibpsWeightageMarks: 3,
    description:
      "Cloud models, REST and HTTP basics, web services, blockchain, IoT, machine learning, and emerging technology topics for exam practice.",
    accent: "indigo"
  },
  "computer-networks": {
    name: "Computer Networks",
    shortName: "CN",
    syllabusOrder: 2,
    ibpsWeightageMarks: 12,
    description:
      "Routing, switching, protocols, addressing, and network architecture practice for IBPS SO IT mains.",
    accent: "blue"
  },
  dbms: {
    name: "Database Management Systems",
    shortName: "DBMS",
    syllabusOrder: 1,
    ibpsWeightageMarks: 12,
    description:
      "Normalization, SQL, transactions, indexing, and relational database concepts in exam format.",
    accent: "indigo"
  },
  "operating-systems": {
    name: "Operating Systems",
    shortName: "OS",
    syllabusOrder: 3,
    ibpsWeightageMarks: 7,
    description:
      "Scheduling, memory management, synchronization, deadlocks, and process control practice.",
    accent: "slate"
  },
  "cyber-security": {
    name: "Cyber Security",
    shortName: "CS",
    syllabusOrder: 5,
    ibpsWeightageMarks: 5,
    description:
      "Confidentiality, integrity, authentication, attacks, and defensive security concepts for mains preparation.",
    accent: "indigo"
  },
  dsa: {
    name: "Data Structures and Algorithms",
    shortName: "DSA",
    syllabusOrder: 4,
    ibpsWeightageMarks: 6,
    description:
      "Arrays, linked lists, trees, graphs, sorting, searching, and algorithmic reasoning in objective format.",
    accent: "blue"
  },
  "hardware-linux-misc": {
    name: "Hardware, Linux & Miscellaneous",
    shortName: "HLM",
    syllabusOrder: 6,
    ibpsWeightageMarks: 5,
    description:
      "Computer hardware, memory, storage, Linux and UNIX commands, Git basics, and general IT awareness practice.",
    accent: "slate"
  },
  oop: {
    name: "Object Oriented Programming",
    shortName: "OOP",
    syllabusOrder: 8,
    ibpsWeightageMarks: 3,
    description:
      "Classes, objects, inheritance, polymorphism, abstraction, and OOP-based reasoning for mains practice.",
    accent: "indigo"
  },
  python: {
    name: "Python Programming",
    shortName: "PY",
    syllabusOrder: 9,
    ibpsWeightageMarks: 3,
    description:
      "Python syntax, data types, functions, exceptions, file handling, OOP, and objective coding concepts for mock practice.",
    accent: "blue"
  },
  "softwere-enginnering": {
    name: "Software Engineering",
    shortName: "SE",
    syllabusOrder: 7,
    ibpsWeightageMarks: 4,
    description:
      "SDLC, models, estimation, testing, maintenance, and software project fundamentals for exam practice.",
    accent: "slate"
  }
};
