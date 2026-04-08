import computerNetworksData from "@/data/subjects/computer-networks.json";
import dbmsData from "@/data/subjects/dbms.json";
import operatingSystemsData from "@/data/subjects/operating-systems.json";
import { SubjectConfig } from "@/types/exam";

export const SUBJECT_REGISTRY: Record<string, SubjectConfig> = {
  "computer-networks": {
    slug: "computer-networks",
    name: "Computer Networks",
    shortName: "CN",
    description:
      "Routing, protocols, addressing, OSI/TCP-IP basics, and exam-style objective practice.",
    durationMinutes: 12,
    estimatedDurationLabel: "12 mins",
    typeLabel: "Professional Knowledge",
    difficultyLabel: "Mains Practice",
    accent: "blue",
    sourceFile: "data/subjects/computer-networks.json",
    mode: "single-subject",
    rawData: computerNetworksData
  },
  dbms: {
    slug: "dbms",
    name: "Database Management Systems",
    shortName: "DBMS",
    description:
      "Normalization, SQL, transactions, indexing, and core relational database concepts.",
    durationMinutes: 12,
    estimatedDurationLabel: "12 mins",
    typeLabel: "Professional Knowledge",
    difficultyLabel: "Mains Practice",
    accent: "indigo",
    sourceFile: "data/subjects/dbms.json",
    mode: "single-subject",
    rawData: dbmsData
  },
  "operating-systems": {
    slug: "operating-systems",
    name: "Operating Systems",
    shortName: "OS",
    description:
      "Scheduling, synchronization, memory management, deadlocks, and process control.",
    durationMinutes: 12,
    estimatedDurationLabel: "12 mins",
    typeLabel: "Professional Knowledge",
    difficultyLabel: "Mains Practice",
    accent: "slate",
    sourceFile: "data/subjects/operating-systems.json",
    mode: "single-subject",
    rawData: operatingSystemsData
  }
};
