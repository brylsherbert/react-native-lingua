import { fonts } from "./fonts";

/**
 * Lingua design system — typography scale
 * Source: prompt_material/01-design-system.png
 */
export const typography = {
  h1: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 32 * 1.2,
    fontWeight: "700" as const,
    purpose: "Page / Screen Title",
  },
  h2: {
    fontFamily: fonts.semibold,
    fontSize: 24,
    lineHeight: 24 * 1.3,
    fontWeight: "600" as const,
    purpose: "Section Title",
  },
  h3: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.3,
    fontWeight: "600" as const,
    purpose: "Card / Module Title",
  },
  h4: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontWeight: "500" as const,
    purpose: "Subheading",
  },
  bodyLarge: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 16 * 1.6,
    fontWeight: "400" as const,
    purpose: "Important content",
  },
  bodyMedium: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 14 * 1.6,
    fontWeight: "400" as const,
    purpose: "Body text",
  },
  bodySmall: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 13 * 1.6,
    fontWeight: "400" as const,
    purpose: "Supporting text",
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontWeight: "400" as const,
    purpose: "Labels, meta text",
  },
} as const;

export type Typography = typeof typography;
export type TypographyVariant = keyof typeof typography;
