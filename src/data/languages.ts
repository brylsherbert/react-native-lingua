import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    code: "es",
    flagEmoji: `https://flagcdn.com/w320/es.png`,
    learnersLabel: "28.4M learners",
    isPopular: true,
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    code: "fr",
    flagEmoji: `https://flagcdn.com/w320/fr.png`,
    learnersLabel: "19.1M learners",
    isPopular: true,
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    code: "jp",
    flagEmoji: `https://flagcdn.com/w320/jp.png`,
    learnersLabel: "12.6M learners",
    isPopular: true,
  },
  {
    id: "ko",
    name: "Korean",
    nativeName: "한국어",
    code: "kr",
    flagEmoji: `https://flagcdn.com/w320/kr.png`,
    learnersLabel: "9.8M learners",
    isPopular: true,
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    code: "de",
    flagEmoji: `https://flagcdn.com/w320/de.png`,
    learnersLabel: "8.2M learners",
    isPopular: true,
  },
  {
    id: "zh",
    name: "Chinese",
    nativeName: "中文",
    code: "cn",
    flagEmoji: `https://flagcdn.com/w320/cn.png`,
    learnersLabel: "7.5M learners",
    isPopular: true,
  },
];

export function getLanguageById(id: string): Language | undefined {
  return languages.find((language) => language.id === id);
}

export function getPopularLanguages(): Language[] {
  return languages.filter((language) => language.isPopular);
}
