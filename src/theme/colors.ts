export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  white: string;
  black: string;
  danger: string;
  borderColor: string;
  borderColor2: string;
  D9Gray: string;
  lightBlue: string;
  green: string;
  F5Gray: string;
  transparent?: string;
}

// Default COLORS constant
const COLORS: ThemeColors = {
  primary: "#2475FC",
  secondary: "#999999",
  background: "#F6F6F6",
  white: "#FFFFFF",
  black: "#000000",
  danger: "#FD1207",
  borderColor: "#DADADA",
  borderColor2: "#C2C2C2",
  D9Gray: "#D9D9D9",
  lightBlue: "#2473fc10",
  green: "#3CCB3C",
  F5Gray: "#F5F5F5",
  transparent: "transparent",
};

export default COLORS;

// Light theme colors
const lightColors: ThemeColors = {
  primary: "#2475FC",
  secondary: "#999999",
  background: "#F6F6F6",
  white: "#FFFFFF",
  black: "#000000",
  danger: "#FD1207",
  borderColor: "#DADADA",
  borderColor2: "#C2C2C2",
  D9Gray: "#D9D9D9",
  lightBlue: "#2473fc10",
  green: "#3CCB3C",
  F5Gray: "#F5F5F5",
};

// Dark theme colors
const darkColors: ThemeColors = {
  primary: "#2475FC",
  secondary: "#AAAAAA",
  background: "#000000",
  white: "#000000", // reversed
  black: "#FFFFFF", // reversed
  danger: "#FD1207",
  borderColor: "#333333",
  borderColor2: "#555555",
  D9Gray: "#444444",
  lightBlue: "#2473fc30",
  green: "#3CCB3C",
  F5Gray: "#1C1C1C",
};

export { lightColors, darkColors };

// Optional type for all color keys
export type ColorKeys = keyof ThemeColors;
