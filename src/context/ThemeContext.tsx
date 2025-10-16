import React, { createContext, useContext, useState, ReactNode } from "react";
import { lightColors, darkColors, ThemeColors } from "../theme/colors";

interface ThemeContextType {
  theme: "light" | "dark";
  COLORS: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const COLORS: ThemeColors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, COLORS, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
