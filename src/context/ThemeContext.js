import React, { createContext, useContext, useState } from "react";
import { lightColors, darkColors } from "../theme/colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const COLORS = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, COLORS, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
