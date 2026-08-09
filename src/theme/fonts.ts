/**
 * Lingua design system — Poppins font families
 * PostScript names must match the loaded font files.
 */
export const fonts = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

/** Map for `useFonts` / expo-font loading */
export const fontAssets = {
  [fonts.regular]: require("../../assets/fonts/Poppins-Regular.ttf"),
  [fonts.medium]: require("../../assets/fonts/Poppins-Medium.ttf"),
  [fonts.semibold]: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  [fonts.bold]: require("../../assets/fonts/Poppins-Bold.ttf"),
} as const;

export type Fonts = typeof fonts;
