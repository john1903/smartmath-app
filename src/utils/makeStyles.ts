// utils/makeStyles.ts
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const makeStyles = (styles: (COLORS: any) => any) => {
  return () => {
    const { COLORS } = useTheme();
    return useMemo(() => StyleSheet.create(styles(COLORS)), [COLORS]);
  };
};
