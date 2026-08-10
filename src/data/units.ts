import type { Unit } from "@/types/learning";

/**
 * Beginner units for a few languages.
 * Spanish is the fullest sample (matches Home / Learn UI mockups).
 */
export const units: Unit[] = [
  // ── Spanish ──────────────────────────────────────────────
  {
    id: "es-unit-1",
    languageId: "es",
    title: "Greetings & Introductions",
    description: "Say hello, introduce yourself, and ask simple questions.",
    order: 1,
    level: "A1",
    lessonIds: ["es-lesson-1-1", "es-lesson-1-2"],
  },
  {
    id: "es-unit-2",
    languageId: "es",
    title: "Daily Life",
    description: "Talk about routines, time of day, and everyday activities.",
    order: 2,
    level: "A1",
    lessonIds: ["es-lesson-2-1", "es-lesson-2-2"],
  },
  {
    id: "es-unit-3",
    languageId: "es",
    title: "At the Café",
    description: "Order drinks, ask for the bill, and chat at a café.",
    order: 3,
    level: "A1",
    lessonIds: [
      "es-lesson-3-1",
      "es-lesson-3-2",
      "es-lesson-3-3",
      "es-lesson-3-4",
      "es-lesson-3-5",
      "es-lesson-3-6",
    ],
  },
  {
    id: "es-unit-4",
    languageId: "es",
    title: "Travel & Directions",
    description: "Ask for directions and get around town.",
    order: 4,
    level: "A1",
    lessonIds: ["es-lesson-4-1", "es-lesson-4-2"],
  },
  {
    id: "es-unit-5",
    languageId: "es",
    title: "Shopping",
    description: "Buy things, ask about prices, and say thank you.",
    order: 5,
    level: "A1",
    lessonIds: ["es-lesson-5-1", "es-lesson-5-2"],
  },
  {
    id: "es-unit-6",
    languageId: "es",
    title: "Family & Friends",
    description: "Talk about people you know and how you are related.",
    order: 6,
    level: "A1",
    lessonIds: ["es-lesson-6-1", "es-lesson-6-2"],
  },

  // ── French ───────────────────────────────────────────────
  {
    id: "fr-unit-1",
    languageId: "fr",
    title: "Salutations",
    description: "Greet people and introduce yourself in French.",
    order: 1,
    level: "A1",
    lessonIds: ["fr-lesson-1-1", "fr-lesson-1-2"],
  },
  {
    id: "fr-unit-2",
    languageId: "fr",
    title: "Au Café",
    description: "Order a drink and practice polite café phrases.",
    order: 2,
    level: "A1",
    lessonIds: ["fr-lesson-2-1", "fr-lesson-2-2"],
  },

  // ── Japanese ─────────────────────────────────────────────
  {
    id: "ja-unit-1",
    languageId: "ja",
    title: "Greetings",
    description: "Learn essential Japanese greetings for beginners.",
    order: 1,
    level: "A1",
    lessonIds: ["ja-lesson-1-1", "ja-lesson-1-2"],
  },
  {
    id: "ja-unit-2",
    languageId: "ja",
    title: "At a Café",
    description: "Order simple drinks and thank the staff.",
    order: 2,
    level: "A1",
    lessonIds: ["ja-lesson-2-1", "ja-lesson-2-2"],
  },
];

export function getUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}

export function getUnitsByLanguage(languageId: string): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}
