/** Supported activity types inside a lesson. */
export type ActivityType =
  | "vocabulary"
  | "phrase_practice"
  | "listening"
  | "speaking"
  | "ai_conversation"
  | "review";

/** CEFR-style level labels used in the UI. */
export type LessonLevel = "A1" | "A2" | "B1" | "B2";

export type Language = {
  id: string;
  name: string;
  /** Name written in the language itself (e.g. "Español"). */
  nativeName: string;
  /** ISO country/locale code used for flags (e.g. "es", "jp", "kr", "cn"). */
  code: string;
  flagEmoji: string;
  /** Display string like "28.4M learners". */
  learnersLabel: string;
  isPopular: boolean;
};

export type VocabularyItem = {
  id: string;
  /** Word or short expression in the target language. */
  term: string;
  /** English meaning. */
  translation: string;
  /** Optional phonetic hint for beginners. */
  pronunciation?: string;
};

export type Phrase = {
  id: string;
  /** Full phrase in the target language. */
  phrase: string;
  /** English meaning. */
  translation: string;
  pronunciation?: string;
};

export type LessonActivity = {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
};

export type Unit = {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
  level: LessonLevel;
  /** Ordered lesson ids that belong to this unit. */
  lessonIds: string[];
};

export type Lesson = {
  id: string;
  unitId: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
  xpReward: number;
  /** What the learner should achieve by the end of the lesson. */
  goal: string;
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: LessonActivity[];
  /**
   * System-style prompt for a future audio Vision Agent teacher.
   * Keep lesson-scoped: goal, vocab, and phrases only.
   */
  aiTeacherPrompt: string;
};
