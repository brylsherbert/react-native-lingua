import type { Lesson, LessonActivity } from "@/types/learning";

const beginnerActivities = (
  prefix: string,
  topic: string,
): LessonActivity[] => [
  {
    id: `${prefix}-act-vocab`,
    type: "vocabulary",
    title: "New words",
    description: `Learn key ${topic} vocabulary.`,
  },
  {
    id: `${prefix}-act-phrases`,
    type: "phrase_practice",
    title: "Useful phrases",
    description: `Practice common ${topic} phrases.`,
  },
  {
    id: `${prefix}-act-speak`,
    type: "speaking",
    title: "Say it out loud",
    description: "Repeat after the teacher and build confidence.",
  },
  {
    id: `${prefix}-act-ai`,
    type: "ai_conversation",
    title: "AI Conversation",
    description: "Practice speaking with your AI teacher.",
  },
];

const teacherPrompt = (options: {
  language: string;
  lessonTitle: string;
  goal: string;
  vocab: string[];
  phrases: string[];
}): string => {
  const vocabList = options.vocab.join(", ");
  const phraseList = options.phrases.join(" | ");

  return [
    `You are a warm, energetic beginner-level ${options.language} teacher.`,
    `Teach only this lesson: "${options.lessonTitle}".`,
    `Lesson goal: ${options.goal}`,
    `Stay strictly inside this vocabulary: ${vocabList}.`,
    `Practice these phrases: ${phraseList}.`,
    "Mostly speak English. Introduce target-language words slowly with translations.",
    "Use short natural sentences, gentle encouragement, and ask the student to repeat.",
    "Do not teach unrelated topics or switch to other languages.",
  ].join(" ");
};

/**
 * Hardcoded beginner lessons for Spanish (fullest), French, and Japanese.
 * Easy to extend: copy a lesson block, bump ids/order, and fill content.
 */
export const lessons: Lesson[] = [
  // ── Spanish · Unit 1: Greetings & Introductions ──────────
  {
    id: "es-lesson-1-1",
    unitId: "es-unit-1",
    languageId: "es",
    title: "Hello & Goodbye",
    description: "Start and end a conversation politely.",
    order: 1,
    xpReward: 10,
    goal: "Greet someone and say goodbye in Spanish.",
    vocabulary: [
      { id: "es-1-1-v1", term: "hola", translation: "hello", pronunciation: "OH-lah" },
      { id: "es-1-1-v2", term: "adiós", translation: "goodbye", pronunciation: "ah-DYOHS" },
      { id: "es-1-1-v3", term: "buenos días", translation: "good morning", pronunciation: "BWEH-nos DEE-ahs" },
      { id: "es-1-1-v4", term: "buenas noches", translation: "good night", pronunciation: "BWEH-nahs NO-ches" },
    ],
    phrases: [
      { id: "es-1-1-p1", phrase: "¡Hola!", translation: "Hello!", pronunciation: "OH-lah" },
      { id: "es-1-1-p2", phrase: "Buenos días.", translation: "Good morning.", pronunciation: "BWEH-nos DEE-ahs" },
      { id: "es-1-1-p3", phrase: "Adiós.", translation: "Goodbye.", pronunciation: "ah-DYOHS" },
    ],
    activities: beginnerActivities("es-1-1", "greeting"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Hello & Goodbye",
      goal: "Greet someone and say goodbye in Spanish.",
      vocab: ["hola", "adiós", "buenos días", "buenas noches"],
      phrases: ["¡Hola!", "Buenos días.", "Adiós."],
    }),
  },
  {
    id: "es-lesson-1-2",
    unitId: "es-unit-1",
    languageId: "es",
    title: "Introducing Yourself",
    description: "Share your name and ask for someone else's.",
    order: 2,
    xpReward: 10,
    goal: "Introduce yourself and ask someone's name.",
    vocabulary: [
      { id: "es-1-2-v1", term: "me llamo", translation: "my name is", pronunciation: "meh YAH-mo" },
      { id: "es-1-2-v2", term: "cómo te llamas", translation: "what is your name", pronunciation: "KOH-mo teh YAH-mahs" },
      { id: "es-1-2-v3", term: "mucho gusto", translation: "nice to meet you", pronunciation: "MOO-cho GOOS-toh" },
      { id: "es-1-2-v4", term: "yo soy", translation: "I am", pronunciation: "yo soy" },
    ],
    phrases: [
      { id: "es-1-2-p1", phrase: "Me llamo Alex.", translation: "My name is Alex.", pronunciation: "meh YAH-mo AH-lex" },
      { id: "es-1-2-p2", phrase: "¿Cómo te llamas?", translation: "What is your name?", pronunciation: "KOH-mo teh YAH-mahs" },
      { id: "es-1-2-p3", phrase: "Mucho gusto.", translation: "Nice to meet you.", pronunciation: "MOO-cho GOOS-toh" },
    ],
    activities: beginnerActivities("es-1-2", "introduction"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Introducing Yourself",
      goal: "Introduce yourself and ask someone's name.",
      vocab: ["me llamo", "cómo te llamas", "mucho gusto", "yo soy"],
      phrases: ["Me llamo Alex.", "¿Cómo te llamas?", "Mucho gusto."],
    }),
  },

  // ── Spanish · Unit 2: Daily Life ─────────────────────────
  {
    id: "es-lesson-2-1",
    unitId: "es-unit-2",
    languageId: "es",
    title: "Morning Routine",
    description: "Talk about what you do in the morning.",
    order: 1,
    xpReward: 10,
    goal: "Describe a simple morning routine in Spanish.",
    vocabulary: [
      { id: "es-2-1-v1", term: "me despierto", translation: "I wake up", pronunciation: "meh des-PYER-toh" },
      { id: "es-2-1-v2", term: "desayuno", translation: "I eat breakfast", pronunciation: "deh-sah-YOO-no" },
      { id: "es-2-1-v3", term: "café", translation: "coffee", pronunciation: "kah-FEH" },
      { id: "es-2-1-v4", term: "trabajo", translation: "I work / work", pronunciation: "trah-BAH-ho" },
    ],
    phrases: [
      { id: "es-2-1-p1", phrase: "Me despierto temprano.", translation: "I wake up early.", pronunciation: "meh des-PYER-toh tem-PRAH-no" },
      { id: "es-2-1-p2", phrase: "Desayuno café.", translation: "I have coffee for breakfast.", pronunciation: "deh-sah-YOO-no kah-FEH" },
      { id: "es-2-1-p3", phrase: "Voy al trabajo.", translation: "I go to work.", pronunciation: "voy ahl trah-BAH-ho" },
    ],
    activities: beginnerActivities("es-2-1", "morning routine"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Morning Routine",
      goal: "Describe a simple morning routine in Spanish.",
      vocab: ["me despierto", "desayuno", "café", "trabajo"],
      phrases: ["Me despierto temprano.", "Desayuno café.", "Voy al trabajo."],
    }),
  },
  {
    id: "es-lesson-2-2",
    unitId: "es-unit-2",
    languageId: "es",
    title: "Talk About Your Day",
    description: "Share what you did today in simple Spanish.",
    order: 2,
    xpReward: 15,
    goal: "Talk about your day using a few basic verbs.",
    vocabulary: [
      { id: "es-2-2-v1", term: "hoy", translation: "today", pronunciation: "oy" },
      { id: "es-2-2-v2", term: "estudio", translation: "I study", pronunciation: "es-TOO-dyo" },
      { id: "es-2-2-v3", term: "como", translation: "I eat", pronunciation: "KOH-mo" },
      { id: "es-2-2-v4", term: "descanso", translation: "I rest", pronunciation: "des-KAHN-so" },
    ],
    phrases: [
      { id: "es-2-2-p1", phrase: "Hoy estudio español.", translation: "Today I study Spanish.", pronunciation: "oy es-TOO-dyo es-pah-NYOL" },
      { id: "es-2-2-p2", phrase: "Como con amigos.", translation: "I eat with friends.", pronunciation: "KOH-mo kon ah-MEE-gos" },
      { id: "es-2-2-p3", phrase: "Descanso por la tarde.", translation: "I rest in the afternoon.", pronunciation: "des-KAHN-so por lah TAR-deh" },
    ],
    activities: beginnerActivities("es-2-2", "daily life"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Talk About Your Day",
      goal: "Talk about your day using a few basic verbs.",
      vocab: ["hoy", "estudio", "como", "descanso"],
      phrases: ["Hoy estudio español.", "Como con amigos.", "Descanso por la tarde."],
    }),
  },

  // ── Spanish · Unit 3: At the Café ────────────────────────
  {
    id: "es-lesson-3-1",
    unitId: "es-unit-3",
    languageId: "es",
    title: "Ordering a Drink",
    description: "Ask for coffee, tea, or water at a café.",
    order: 1,
    xpReward: 10,
    goal: "Order a simple drink politely in Spanish.",
    vocabulary: [
      { id: "es-3-1-v1", term: "quiero", translation: "I want", pronunciation: "KYEH-ro" },
      { id: "es-3-1-v2", term: "un café", translation: "a coffee", pronunciation: "oon kah-FEH" },
      { id: "es-3-1-v3", term: "un té", translation: "a tea", pronunciation: "oon teh" },
      { id: "es-3-1-v4", term: "agua", translation: "water", pronunciation: "AH-gwah" },
      { id: "es-3-1-v5", term: "por favor", translation: "please", pronunciation: "por fah-VOR" },
    ],
    phrases: [
      { id: "es-3-1-p1", phrase: "Quiero un café, por favor.", translation: "I want a coffee, please.", pronunciation: "KYEH-ro oon kah-FEH por fah-VOR" },
      { id: "es-3-1-p2", phrase: "Un té, por favor.", translation: "A tea, please.", pronunciation: "oon teh por fah-VOR" },
      { id: "es-3-1-p3", phrase: "¿Me da un agua?", translation: "Can I have a water?", pronunciation: "meh dah oon AH-gwah" },
    ],
    activities: beginnerActivities("es-3-1", "café ordering"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Ordering a Drink",
      goal: "Order a simple drink politely in Spanish.",
      vocab: ["quiero", "un café", "un té", "agua", "por favor"],
      phrases: ["Quiero un café, por favor.", "Un té, por favor.", "¿Me da un agua?"],
    }),
  },
  {
    id: "es-lesson-3-2",
    unitId: "es-unit-3",
    languageId: "es",
    title: "Sizes & Preferences",
    description: "Choose small, medium, or large and add milk or sugar.",
    order: 2,
    xpReward: 10,
    goal: "Describe drink size and simple preferences.",
    vocabulary: [
      { id: "es-3-2-v1", term: "pequeño", translation: "small", pronunciation: "peh-KEH-nyo" },
      { id: "es-3-2-v2", term: "mediano", translation: "medium", pronunciation: "meh-DYAH-no" },
      { id: "es-3-2-v3", term: "grande", translation: "large", pronunciation: "GRAHN-deh" },
      { id: "es-3-2-v4", term: "con leche", translation: "with milk", pronunciation: "kon LEH-cheh" },
      { id: "es-3-2-v5", term: "sin azúcar", translation: "without sugar", pronunciation: "seen ah-SOO-kar" },
    ],
    phrases: [
      { id: "es-3-2-p1", phrase: "Un café grande, por favor.", translation: "A large coffee, please.", pronunciation: "oon kah-FEH GRAHN-deh por fah-VOR" },
      { id: "es-3-2-p2", phrase: "Con leche, por favor.", translation: "With milk, please.", pronunciation: "kon LEH-cheh por fah-VOR" },
      { id: "es-3-2-p3", phrase: "Sin azúcar.", translation: "Without sugar.", pronunciation: "seen ah-SOO-kar" },
    ],
    activities: beginnerActivities("es-3-2", "drink preferences"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Sizes & Preferences",
      goal: "Describe drink size and simple preferences.",
      vocab: ["pequeño", "mediano", "grande", "con leche", "sin azúcar"],
      phrases: ["Un café grande, por favor.", "Con leche, por favor.", "Sin azúcar."],
    }),
  },
  {
    id: "es-lesson-3-3",
    unitId: "es-unit-3",
    languageId: "es",
    title: "At the Café",
    description: "Have a short café conversation from greeting to order.",
    order: 3,
    xpReward: 15,
    goal: "Hold a short café conversation: greet, order, and thank.",
    vocabulary: [
      { id: "es-3-3-v1", term: "mesa", translation: "table", pronunciation: "MEH-sah" },
      { id: "es-3-3-v2", term: "menú", translation: "menu", pronunciation: "meh-NOO" },
      { id: "es-3-3-v3", term: "camarero", translation: "waiter", pronunciation: "kah-mah-REH-ro" },
      { id: "es-3-3-v4", term: "gracias", translation: "thank you", pronunciation: "GRAH-syahs" },
      { id: "es-3-3-v5", term: "de nada", translation: "you're welcome", pronunciation: "deh NAH-dah" },
    ],
    phrases: [
      { id: "es-3-3-p1", phrase: "¿Me trae el menú, por favor?", translation: "Can you bring me the menu, please?", pronunciation: "meh TRAH-eh el meh-NOO por fah-VOR" },
      { id: "es-3-3-p2", phrase: "Quiero un café con leche.", translation: "I want a coffee with milk.", pronunciation: "KYEH-ro oon kah-FEH kon LEH-cheh" },
      { id: "es-3-3-p3", phrase: "Gracias.", translation: "Thank you.", pronunciation: "GRAH-syahs" },
    ],
    activities: beginnerActivities("es-3-3", "café conversation"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "At the Café",
      goal: "Hold a short café conversation: greet, order, and thank.",
      vocab: ["mesa", "menú", "camarero", "gracias", "de nada"],
      phrases: ["¿Me trae el menú, por favor?", "Quiero un café con leche.", "Gracias."],
    }),
  },
  {
    id: "es-lesson-3-4",
    unitId: "es-unit-3",
    languageId: "es",
    title: "Asking for the Bill",
    description: "Request the check and confirm payment politely.",
    order: 4,
    xpReward: 10,
    goal: "Ask for the bill and respond politely.",
    vocabulary: [
      { id: "es-3-4-v1", term: "la cuenta", translation: "the bill", pronunciation: "lah KWEN-tah" },
      { id: "es-3-4-v2", term: "pagar", translation: "to pay", pronunciation: "pah-GAR" },
      { id: "es-3-4-v3", term: "efectivo", translation: "cash", pronunciation: "eh-fek-TEE-vo" },
      { id: "es-3-4-v4", term: "tarjeta", translation: "card", pronunciation: "tar-HEH-tah" },
    ],
    phrases: [
      { id: "es-3-4-p1", phrase: "La cuenta, por favor.", translation: "The bill, please.", pronunciation: "lah KWEN-tah por fah-VOR" },
      { id: "es-3-4-p2", phrase: "¿Puedo pagar con tarjeta?", translation: "Can I pay by card?", pronunciation: "PWEH-do pah-GAR kon tar-HEH-tah" },
      { id: "es-3-4-p3", phrase: "Aquí tiene.", translation: "Here you go.", pronunciation: "ah-KEE TYEH-neh" },
    ],
    activities: beginnerActivities("es-3-4", "paying the bill"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Asking for the Bill",
      goal: "Ask for the bill and respond politely.",
      vocab: ["la cuenta", "pagar", "efectivo", "tarjeta"],
      phrases: ["La cuenta, por favor.", "¿Puedo pagar con tarjeta?", "Aquí tiene."],
    }),
  },
  {
    id: "es-lesson-3-5",
    unitId: "es-unit-3",
    languageId: "es",
    title: "Small Talk at the Café",
    description: "Chat lightly about the weather and how you feel.",
    order: 5,
    xpReward: 10,
    goal: "Make simple small talk while at a café.",
    vocabulary: [
      { id: "es-3-5-v1", term: "hace calor", translation: "it's hot", pronunciation: "AH-seh kah-LOR" },
      { id: "es-3-5-v2", term: "hace frío", translation: "it's cold", pronunciation: "AH-seh FREE-oh" },
      { id: "es-3-5-v3", term: "estoy bien", translation: "I'm fine", pronunciation: "es-TOY byen" },
      { id: "es-3-5-v4", term: "delicioso", translation: "delicious", pronunciation: "deh-lee-SYOH-so" },
    ],
    phrases: [
      { id: "es-3-5-p1", phrase: "Hace calor hoy.", translation: "It's hot today.", pronunciation: "AH-seh kah-LOR oy" },
      { id: "es-3-5-p2", phrase: "Estoy bien, gracias.", translation: "I'm fine, thank you.", pronunciation: "es-TOY byen GRAH-syahs" },
      { id: "es-3-5-p3", phrase: "Está delicioso.", translation: "It's delicious.", pronunciation: "es-TAH deh-lee-SYOH-so" },
    ],
    activities: beginnerActivities("es-3-5", "café small talk"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Small Talk at the Café",
      goal: "Make simple small talk while at a café.",
      vocab: ["hace calor", "hace frío", "estoy bien", "delicioso"],
      phrases: ["Hace calor hoy.", "Estoy bien, gracias.", "Está delicioso."],
    }),
  },
  {
    id: "es-lesson-3-6",
    unitId: "es-unit-3",
    languageId: "es",
    title: "Café Review",
    description: "Review café vocabulary and put it all together.",
    order: 6,
    xpReward: 20,
    goal: "Review café words and run a full short order dialogue.",
    vocabulary: [
      { id: "es-3-6-v1", term: "café", translation: "coffee", pronunciation: "kah-FEH" },
      { id: "es-3-6-v2", term: "cuenta", translation: "bill", pronunciation: "KWEN-tah" },
      { id: "es-3-6-v3", term: "gracias", translation: "thank you", pronunciation: "GRAH-syahs" },
      { id: "es-3-6-v4", term: "por favor", translation: "please", pronunciation: "por fah-VOR" },
    ],
    phrases: [
      { id: "es-3-6-p1", phrase: "Hola, quiero un café, por favor.", translation: "Hi, I want a coffee, please.", pronunciation: "OH-lah KYEH-ro oon kah-FEH por fah-VOR" },
      { id: "es-3-6-p2", phrase: "La cuenta, por favor.", translation: "The bill, please.", pronunciation: "lah KWEN-tah por fah-VOR" },
      { id: "es-3-6-p3", phrase: "Gracias. ¡Hasta luego!", translation: "Thank you. See you later!", pronunciation: "GRAH-syahs AH-stah LWEH-go" },
    ],
    activities: [
      ...beginnerActivities("es-3-6", "café review"),
      {
        id: "es-3-6-act-review",
        type: "review",
        title: "Quick review",
        description: "Recap vocabulary and phrases from this unit.",
      },
    ],
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Café Review",
      goal: "Review café words and run a full short order dialogue.",
      vocab: ["café", "cuenta", "gracias", "por favor"],
      phrases: [
        "Hola, quiero un café, por favor.",
        "La cuenta, por favor.",
        "Gracias. ¡Hasta luego!",
      ],
    }),
  },

  // ── Spanish · Unit 4: Travel & Directions ────────────────
  {
    id: "es-lesson-4-1",
    unitId: "es-unit-4",
    languageId: "es",
    title: "Asking for Directions",
    description: "Ask where places are and understand basic answers.",
    order: 1,
    xpReward: 10,
    goal: "Ask where something is and understand left/right/straight.",
    vocabulary: [
      { id: "es-4-1-v1", term: "dónde está", translation: "where is", pronunciation: "DOHN-deh es-TAH" },
      { id: "es-4-1-v2", term: "izquierda", translation: "left", pronunciation: "ees-KYER-dah" },
      { id: "es-4-1-v3", term: "derecha", translation: "right", pronunciation: "deh-REH-chah" },
      { id: "es-4-1-v4", term: "recto", translation: "straight", pronunciation: "REK-toh" },
    ],
    phrases: [
      { id: "es-4-1-p1", phrase: "¿Dónde está la estación?", translation: "Where is the station?", pronunciation: "DOHN-deh es-TAH lah es-tah-SYOHN" },
      { id: "es-4-1-p2", phrase: "A la derecha.", translation: "To the right.", pronunciation: "ah lah deh-REH-chah" },
      { id: "es-4-1-p3", phrase: "Siga recto.", translation: "Go straight.", pronunciation: "SEE-gah REK-toh" },
    ],
    activities: beginnerActivities("es-4-1", "directions"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Asking for Directions",
      goal: "Ask where something is and understand left/right/straight.",
      vocab: ["dónde está", "izquierda", "derecha", "recto"],
      phrases: ["¿Dónde está la estación?", "A la derecha.", "Siga recto."],
    }),
  },
  {
    id: "es-lesson-4-2",
    unitId: "es-unit-4",
    languageId: "es",
    title: "Getting Around",
    description: "Talk about buses, walking, and travel basics.",
    order: 2,
    xpReward: 10,
    goal: "Talk about simple ways to get around.",
    vocabulary: [
      { id: "es-4-2-v1", term: "autobús", translation: "bus", pronunciation: "ow-toh-BOOS" },
      { id: "es-4-2-v2", term: "caminar", translation: "to walk", pronunciation: "kah-mee-NAR" },
      { id: "es-4-2-v3", term: "cerca", translation: "near", pronunciation: "SER-kah" },
      { id: "es-4-2-v4", term: "lejos", translation: "far", pronunciation: "LEH-hos" },
    ],
    phrases: [
      { id: "es-4-2-p1", phrase: "¿Está cerca?", translation: "Is it near?", pronunciation: "es-TAH SER-kah" },
      { id: "es-4-2-p2", phrase: "Puedo caminar.", translation: "I can walk.", pronunciation: "PWEH-do kah-mee-NAR" },
      { id: "es-4-2-p3", phrase: "Necesito un autobús.", translation: "I need a bus.", pronunciation: "neh-seh-SEE-toh oon ow-toh-BOOS" },
    ],
    activities: beginnerActivities("es-4-2", "getting around"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Getting Around",
      goal: "Talk about simple ways to get around.",
      vocab: ["autobús", "caminar", "cerca", "lejos"],
      phrases: ["¿Está cerca?", "Puedo caminar.", "Necesito un autobús."],
    }),
  },

  // ── Spanish · Unit 5: Shopping ───────────────────────────
  {
    id: "es-lesson-5-1",
    unitId: "es-unit-5",
    languageId: "es",
    title: "Asking About Prices",
    description: "Ask how much something costs.",
    order: 1,
    xpReward: 10,
    goal: "Ask the price of an item politely.",
    vocabulary: [
      { id: "es-5-1-v1", term: "cuánto cuesta", translation: "how much does it cost", pronunciation: "KWAN-toh KWES-tah" },
      { id: "es-5-1-v2", term: "barato", translation: "cheap", pronunciation: "bah-RAH-toh" },
      { id: "es-5-1-v3", term: "caro", translation: "expensive", pronunciation: "KAH-ro" },
      { id: "es-5-1-v4", term: "euros", translation: "euros", pronunciation: "EH-oo-ros" },
    ],
    phrases: [
      { id: "es-5-1-p1", phrase: "¿Cuánto cuesta?", translation: "How much does it cost?", pronunciation: "KWAN-toh KWES-tah" },
      { id: "es-5-1-p2", phrase: "Es un poco caro.", translation: "It's a bit expensive.", pronunciation: "es oon POH-ko KAH-ro" },
      { id: "es-5-1-p3", phrase: "Está bien.", translation: "That's fine.", pronunciation: "es-TAH byen" },
    ],
    activities: beginnerActivities("es-5-1", "prices"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Asking About Prices",
      goal: "Ask the price of an item politely.",
      vocab: ["cuánto cuesta", "barato", "caro", "euros"],
      phrases: ["¿Cuánto cuesta?", "Es un poco caro.", "Está bien."],
    }),
  },
  {
    id: "es-lesson-5-2",
    unitId: "es-unit-5",
    languageId: "es",
    title: "Buying Something",
    description: "Complete a simple purchase conversation.",
    order: 2,
    xpReward: 10,
    goal: "Buy an item using polite shopping phrases.",
    vocabulary: [
      { id: "es-5-2-v1", term: "quiero esto", translation: "I want this", pronunciation: "KYEH-ro ES-toh" },
      { id: "es-5-2-v2", term: "bolsa", translation: "bag", pronunciation: "BOL-sah" },
      { id: "es-5-2-v3", term: "recibo", translation: "receipt", pronunciation: "reh-SEE-bo" },
      { id: "es-5-2-v4", term: "gracias", translation: "thank you", pronunciation: "GRAH-syahs" },
    ],
    phrases: [
      { id: "es-5-2-p1", phrase: "Quiero esto, por favor.", translation: "I want this, please.", pronunciation: "KYEH-ro ES-toh por fah-VOR" },
      { id: "es-5-2-p2", phrase: "¿Me da una bolsa?", translation: "Can I have a bag?", pronunciation: "meh dah OO-nah BOL-sah" },
      { id: "es-5-2-p3", phrase: "El recibo, por favor.", translation: "The receipt, please.", pronunciation: "el reh-SEE-bo por fah-VOR" },
    ],
    activities: beginnerActivities("es-5-2", "shopping"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Buying Something",
      goal: "Buy an item using polite shopping phrases.",
      vocab: ["quiero esto", "bolsa", "recibo", "gracias"],
      phrases: ["Quiero esto, por favor.", "¿Me da una bolsa?", "El recibo, por favor."],
    }),
  },

  // ── Spanish · Unit 6: Family & Friends ───────────────────
  {
    id: "es-lesson-6-1",
    unitId: "es-unit-6",
    languageId: "es",
    title: "Family Words",
    description: "Name close family members.",
    order: 1,
    xpReward: 10,
    goal: "Name basic family members in Spanish.",
    vocabulary: [
      { id: "es-6-1-v1", term: "madre", translation: "mother", pronunciation: "MAH-dreh" },
      { id: "es-6-1-v2", term: "padre", translation: "father", pronunciation: "PAH-dreh" },
      { id: "es-6-1-v3", term: "hermano", translation: "brother", pronunciation: "er-MAH-no" },
      { id: "es-6-1-v4", term: "hermana", translation: "sister", pronunciation: "er-MAH-nah" },
    ],
    phrases: [
      { id: "es-6-1-p1", phrase: "Esta es mi madre.", translation: "This is my mother.", pronunciation: "ES-tah es mee MAH-dreh" },
      { id: "es-6-1-p2", phrase: "Tengo un hermano.", translation: "I have a brother.", pronunciation: "TEN-go oon er-MAH-no" },
      { id: "es-6-1-p3", phrase: "Mi hermana se llama Ana.", translation: "My sister's name is Ana.", pronunciation: "mee er-MAH-nah seh YAH-mah AH-nah" },
    ],
    activities: beginnerActivities("es-6-1", "family"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Family Words",
      goal: "Name basic family members in Spanish.",
      vocab: ["madre", "padre", "hermano", "hermana"],
      phrases: ["Esta es mi madre.", "Tengo un hermano.", "Mi hermana se llama Ana."],
    }),
  },
  {
    id: "es-lesson-6-2",
    unitId: "es-unit-6",
    languageId: "es",
    title: "Friends & People",
    description: "Talk about friends and describe people simply.",
    order: 2,
    xpReward: 10,
    goal: "Talk about a friend using simple descriptions.",
    vocabulary: [
      { id: "es-6-2-v1", term: "amigo", translation: "friend (m.)", pronunciation: "ah-MEE-go" },
      { id: "es-6-2-v2", term: "amiga", translation: "friend (f.)", pronunciation: "ah-MEE-gah" },
      { id: "es-6-2-v3", term: "simpático", translation: "nice / friendly", pronunciation: "seem-PAH-tee-ko" },
      { id: "es-6-2-v4", term: "divertido", translation: "fun", pronunciation: "dee-ver-TEE-do" },
    ],
    phrases: [
      { id: "es-6-2-p1", phrase: "Él es mi amigo.", translation: "He is my friend.", pronunciation: "el es mee ah-MEE-go" },
      { id: "es-6-2-p2", phrase: "Ella es muy simpática.", translation: "She is very nice.", pronunciation: "EH-yah es mwee seem-PAH-tee-kah" },
      { id: "es-6-2-p3", phrase: "Somos amigos.", translation: "We are friends.", pronunciation: "SO-mos ah-MEE-gos" },
    ],
    activities: beginnerActivities("es-6-2", "friends"),
    aiTeacherPrompt: teacherPrompt({
      language: "Spanish",
      lessonTitle: "Friends & People",
      goal: "Talk about a friend using simple descriptions.",
      vocab: ["amigo", "amiga", "simpático", "divertido"],
      phrases: ["Él es mi amigo.", "Ella es muy simpática.", "Somos amigos."],
    }),
  },

  // ── French · Unit 1 ──────────────────────────────────────
  {
    id: "fr-lesson-1-1",
    unitId: "fr-unit-1",
    languageId: "fr",
    title: "Bonjour & Au Revoir",
    description: "Greet people and say goodbye in French.",
    order: 1,
    xpReward: 10,
    goal: "Greet someone and say goodbye in French.",
    vocabulary: [
      { id: "fr-1-1-v1", term: "bonjour", translation: "hello / good day", pronunciation: "bohn-ZHOOR" },
      { id: "fr-1-1-v2", term: "salut", translation: "hi", pronunciation: "sah-LOO" },
      { id: "fr-1-1-v3", term: "au revoir", translation: "goodbye", pronunciation: "oh ruh-VWAHR" },
      { id: "fr-1-1-v4", term: "bonsoir", translation: "good evening", pronunciation: "bohn-SWAHR" },
    ],
    phrases: [
      { id: "fr-1-1-p1", phrase: "Bonjour !", translation: "Hello!", pronunciation: "bohn-ZHOOR" },
      { id: "fr-1-1-p2", phrase: "Salut !", translation: "Hi!", pronunciation: "sah-LOO" },
      { id: "fr-1-1-p3", phrase: "Au revoir.", translation: "Goodbye.", pronunciation: "oh ruh-VWAHR" },
    ],
    activities: beginnerActivities("fr-1-1", "French greeting"),
    aiTeacherPrompt: teacherPrompt({
      language: "French",
      lessonTitle: "Bonjour & Au Revoir",
      goal: "Greet someone and say goodbye in French.",
      vocab: ["bonjour", "salut", "au revoir", "bonsoir"],
      phrases: ["Bonjour !", "Salut !", "Au revoir."],
    }),
  },
  {
    id: "fr-lesson-1-2",
    unitId: "fr-unit-1",
    languageId: "fr",
    title: "Je m'appelle",
    description: "Introduce yourself in French.",
    order: 2,
    xpReward: 10,
    goal: "Say your name and ask for someone else's name.",
    vocabulary: [
      { id: "fr-1-2-v1", term: "je m'appelle", translation: "my name is", pronunciation: "zhuh mah-PELL" },
      { id: "fr-1-2-v2", term: "comment tu t'appelles", translation: "what is your name", pronunciation: "koh-MAHN too tah-PELL" },
      { id: "fr-1-2-v3", term: "enchanté", translation: "nice to meet you", pronunciation: "ahn-shahn-TAY" },
      { id: "fr-1-2-v4", term: "oui", translation: "yes", pronunciation: "wee" },
    ],
    phrases: [
      { id: "fr-1-2-p1", phrase: "Je m'appelle Alex.", translation: "My name is Alex.", pronunciation: "zhuh mah-PELL AH-lex" },
      { id: "fr-1-2-p2", phrase: "Comment tu t'appelles ?", translation: "What is your name?", pronunciation: "koh-MAHN too tah-PELL" },
      { id: "fr-1-2-p3", phrase: "Enchanté.", translation: "Nice to meet you.", pronunciation: "ahn-shahn-TAY" },
    ],
    activities: beginnerActivities("fr-1-2", "French introductions"),
    aiTeacherPrompt: teacherPrompt({
      language: "French",
      lessonTitle: "Je m'appelle",
      goal: "Say your name and ask for someone else's name.",
      vocab: ["je m'appelle", "comment tu t'appelles", "enchanté", "oui"],
      phrases: ["Je m'appelle Alex.", "Comment tu t'appelles ?", "Enchanté."],
    }),
  },

  // ── French · Unit 2 ──────────────────────────────────────
  {
    id: "fr-lesson-2-1",
    unitId: "fr-unit-2",
    languageId: "fr",
    title: "Commander une boisson",
    description: "Order a drink at a French café.",
    order: 1,
    xpReward: 10,
    goal: "Order a coffee or tea politely in French.",
    vocabulary: [
      { id: "fr-2-1-v1", term: "je voudrais", translation: "I would like", pronunciation: "zhuh voo-DREH" },
      { id: "fr-2-1-v2", term: "un café", translation: "a coffee", pronunciation: "uhn kah-FAY" },
      { id: "fr-2-1-v3", term: "un thé", translation: "a tea", pronunciation: "uhn tay" },
      { id: "fr-2-1-v4", term: "s'il vous plaît", translation: "please", pronunciation: "seel voo PLEH" },
    ],
    phrases: [
      { id: "fr-2-1-p1", phrase: "Je voudrais un café, s'il vous plaît.", translation: "I would like a coffee, please.", pronunciation: "zhuh voo-DREH uhn kah-FAY seel voo PLEH" },
      { id: "fr-2-1-p2", phrase: "Un thé, s'il vous plaît.", translation: "A tea, please.", pronunciation: "uhn tay seel voo PLEH" },
      { id: "fr-2-1-p3", phrase: "Merci.", translation: "Thank you.", pronunciation: "mair-SEE" },
    ],
    activities: beginnerActivities("fr-2-1", "French café"),
    aiTeacherPrompt: teacherPrompt({
      language: "French",
      lessonTitle: "Commander une boisson",
      goal: "Order a coffee or tea politely in French.",
      vocab: ["je voudrais", "un café", "un thé", "s'il vous plaît"],
      phrases: [
        "Je voudrais un café, s'il vous plaît.",
        "Un thé, s'il vous plaît.",
        "Merci.",
      ],
    }),
  },
  {
    id: "fr-lesson-2-2",
    unitId: "fr-unit-2",
    languageId: "fr",
    title: "L'addition",
    description: "Ask for the bill in French.",
    order: 2,
    xpReward: 10,
    goal: "Ask for the bill and thank the server.",
    vocabulary: [
      { id: "fr-2-2-v1", term: "l'addition", translation: "the bill", pronunciation: "lah-dee-SYOHN" },
      { id: "fr-2-2-v2", term: "payer", translation: "to pay", pronunciation: "peh-YAY" },
      { id: "fr-2-2-v3", term: "merci", translation: "thank you", pronunciation: "mair-SEE" },
      { id: "fr-2-2-v4", term: "de rien", translation: "you're welcome", pronunciation: "duh RYEN" },
    ],
    phrases: [
      { id: "fr-2-2-p1", phrase: "L'addition, s'il vous plaît.", translation: "The bill, please.", pronunciation: "lah-dee-SYOHN seel voo PLEH" },
      { id: "fr-2-2-p2", phrase: "Je voudrais payer.", translation: "I would like to pay.", pronunciation: "zhuh voo-DREH peh-YAY" },
      { id: "fr-2-2-p3", phrase: "Merci beaucoup.", translation: "Thank you very much.", pronunciation: "mair-SEE boh-KOO" },
    ],
    activities: beginnerActivities("fr-2-2", "French bill"),
    aiTeacherPrompt: teacherPrompt({
      language: "French",
      lessonTitle: "L'addition",
      goal: "Ask for the bill and thank the server.",
      vocab: ["l'addition", "payer", "merci", "de rien"],
      phrases: ["L'addition, s'il vous plaît.", "Je voudrais payer.", "Merci beaucoup."],
    }),
  },

  // ── Japanese · Unit 1 ────────────────────────────────────
  {
    id: "ja-lesson-1-1",
    unitId: "ja-unit-1",
    languageId: "ja",
    title: "基本のあいさつ",
    description: "Learn the most common Japanese greetings.",
    order: 1,
    xpReward: 10,
    goal: "Use hello, goodbye, and good morning in Japanese.",
    vocabulary: [
      { id: "ja-1-1-v1", term: "こんにちは", translation: "hello", pronunciation: "kon-nee-chee-wah" },
      { id: "ja-1-1-v2", term: "おはよう", translation: "good morning", pronunciation: "oh-hah-yoh" },
      { id: "ja-1-1-v3", term: "さようなら", translation: "goodbye", pronunciation: "sah-yoh-nah-rah" },
      { id: "ja-1-1-v4", term: "ありがとう", translation: "thank you", pronunciation: "ah-ree-gah-toh" },
    ],
    phrases: [
      { id: "ja-1-1-p1", phrase: "こんにちは。", translation: "Hello.", pronunciation: "kon-nee-chee-wah" },
      { id: "ja-1-1-p2", phrase: "おはようございます。", translation: "Good morning.", pronunciation: "oh-hah-yoh go-zah-ee-mahs" },
      { id: "ja-1-1-p3", phrase: "ありがとう。", translation: "Thank you.", pronunciation: "ah-ree-gah-toh" },
    ],
    activities: beginnerActivities("ja-1-1", "Japanese greeting"),
    aiTeacherPrompt: teacherPrompt({
      language: "Japanese",
      lessonTitle: "基本のあいさつ",
      goal: "Use hello, goodbye, and good morning in Japanese.",
      vocab: ["こんにちは", "おはよう", "さようなら", "ありがとう"],
      phrases: ["こんにちは。", "おはようございます。", "ありがとう。"],
    }),
  },
  {
    id: "ja-lesson-1-2",
    unitId: "ja-unit-1",
    languageId: "ja",
    title: "自己紹介",
    description: "Introduce yourself in Japanese.",
    order: 2,
    xpReward: 10,
    goal: "Say your name and a polite nice-to-meet-you.",
    vocabulary: [
      { id: "ja-1-2-v1", term: "わたし", translation: "I / me", pronunciation: "wah-tah-shee" },
      { id: "ja-1-2-v2", term: "です", translation: "am / is / are", pronunciation: "dess" },
      { id: "ja-1-2-v3", term: "はじめまして", translation: "nice to meet you", pronunciation: "hah-jee-meh-mah-shee-teh" },
      { id: "ja-1-2-v4", term: "よろしく", translation: "please treat me well", pronunciation: "yoh-roh-shee-koo" },
    ],
    phrases: [
      { id: "ja-1-2-p1", phrase: "わたしはアレックスです。", translation: "I am Alex.", pronunciation: "wah-tah-shee wah AH-rex-oo dess" },
      { id: "ja-1-2-p2", phrase: "はじめまして。", translation: "Nice to meet you.", pronunciation: "hah-jee-meh-mah-shee-teh" },
      { id: "ja-1-2-p3", phrase: "よろしくお願いします。", translation: "Please treat me well.", pronunciation: "yoh-roh-shee-koo oh-neh-gah-ee-shee-mahs" },
    ],
    activities: beginnerActivities("ja-1-2", "Japanese introductions"),
    aiTeacherPrompt: teacherPrompt({
      language: "Japanese",
      lessonTitle: "自己紹介",
      goal: "Say your name and a polite nice-to-meet-you.",
      vocab: ["わたし", "です", "はじめまして", "よろしく"],
      phrases: ["わたしはアレックスです。", "はじめまして。", "よろしくお願いします。"],
    }),
  },

  // ── Japanese · Unit 2 ────────────────────────────────────
  {
    id: "ja-lesson-2-1",
    unitId: "ja-unit-2",
    languageId: "ja",
    title: "飲み物を注文する",
    description: "Order a simple drink in Japanese.",
    order: 1,
    xpReward: 10,
    goal: "Order coffee or tea politely in Japanese.",
    vocabulary: [
      { id: "ja-2-1-v1", term: "コーヒー", translation: "coffee", pronunciation: "koh-hee" },
      { id: "ja-2-1-v2", term: "お茶", translation: "tea", pronunciation: "oh-chah" },
      { id: "ja-2-1-v3", term: "ください", translation: "please (give me)", pronunciation: "koo-dah-sah-ee" },
      { id: "ja-2-1-v4", term: "おねがいします", translation: "please / I request", pronunciation: "oh-neh-gah-ee shee-mahs" },
    ],
    phrases: [
      { id: "ja-2-1-p1", phrase: "コーヒーをください。", translation: "Coffee, please.", pronunciation: "koh-hee oh koo-dah-sah-ee" },
      { id: "ja-2-1-p2", phrase: "お茶をおねがいします。", translation: "Tea, please.", pronunciation: "oh-chah oh oh-neh-gah-ee shee-mahs" },
      { id: "ja-2-1-p3", phrase: "ありがとう。", translation: "Thank you.", pronunciation: "ah-ree-gah-toh" },
    ],
    activities: beginnerActivities("ja-2-1", "Japanese café"),
    aiTeacherPrompt: teacherPrompt({
      language: "Japanese",
      lessonTitle: "飲み物を注文する",
      goal: "Order coffee or tea politely in Japanese.",
      vocab: ["コーヒー", "お茶", "ください", "おねがいします"],
      phrases: ["コーヒーをください。", "お茶をおねがいします。", "ありがとう。"],
    }),
  },
  {
    id: "ja-lesson-2-2",
    unitId: "ja-unit-2",
    languageId: "ja",
    title: "会計をお願いします",
    description: "Ask for the check in Japanese.",
    order: 2,
    xpReward: 10,
    goal: "Ask for the bill and thank the staff.",
    vocabulary: [
      { id: "ja-2-2-v1", term: "お会計", translation: "the bill / check", pronunciation: "oh-kah-ee-kay" },
      { id: "ja-2-2-v2", term: "お願いします", translation: "please", pronunciation: "oh-neh-gah-ee shee-mahs" },
      { id: "ja-2-2-v3", term: "ありがとう", translation: "thank you", pronunciation: "ah-ree-gah-toh" },
      { id: "ja-2-2-v4", term: "どういたしまして", translation: "you're welcome", pronunciation: "doh ee-tah-shee-mah-shee-teh" },
    ],
    phrases: [
      { id: "ja-2-2-p1", phrase: "お会計をお願いします。", translation: "The bill, please.", pronunciation: "oh-kah-ee-kay oh oh-neh-gah-ee shee-mahs" },
      { id: "ja-2-2-p2", phrase: "ありがとう。", translation: "Thank you.", pronunciation: "ah-ree-gah-toh" },
      { id: "ja-2-2-p3", phrase: "ごちそうさまでした。", translation: "Thank you for the meal.", pronunciation: "go-chee-soh sah-mah desh-tah" },
    ],
    activities: beginnerActivities("ja-2-2", "Japanese bill"),
    aiTeacherPrompt: teacherPrompt({
      language: "Japanese",
      lessonTitle: "会計をお願いします",
      goal: "Ask for the bill and thank the staff.",
      vocab: ["お会計", "お願いします", "ありがとう", "どういたしまして"],
      phrases: ["お会計をお願いします。", "ありがとう。", "ごちそうさまでした。"],
    }),
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonsByLanguage(languageId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}
