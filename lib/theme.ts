/**
 * Centralized color palette.
 *
 * Every color used across the site previously existed as a raw hex literal
 * repeated inline in `style={{ ... }}` objects (752 occurrences across 15
 * files). That made a single brand-color change require a find-and-replace
 * sweep with no compiler safety net against typos. This module is the single
 * source of truth: change a value here and it updates everywhere it's used.
 */
export const colors = {
  black: "#000000",
  white: "#ffffff",

  // Primary brand green scale
  green50: "#f0fdf4",
  green100: "#dcfce7",
  green200: "#bbf7d0",
  green300: "#86efac",
  green400: "#4ade80",
  green600: "#16a34a",
  green700: "#15803d",
  green800: "#166534",
  green900: "#14532d",

  emerald100: "#d1fae5",

  // Neutral / gray scale
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray900: "#111827",
  neutral50: "#fafafa",

  // Status red scale
  red50: "#fef2f2",
  red100: "#fee2e2",
  red200: "#fecaca",
  red300: "#fca5a5",
  red600: "#dc2626",
  red700: "#b91c1c",
  red800: "#991b1b",

  // Amber / warning scale
  amber200: "#fde68a",
  amber600: "#d97706",
  amber800: "#92400e",
  amber900: "#78350f",
  amber900Deep: "#713f12",

  // Yellow scale
  yellow50: "#fefce8",
  yellow100: "#fef9c3",
  yellow300: "#fde047",
  yellow400: "#fbbf24",
  yellow600: "#ca8a04",

  // Violet accent scale
  violet50: "#f5f3ff",
  violet200: "#ddd6fe",
  violet700: "#6d28d9",
} as const;

export type ColorToken = keyof typeof colors;
