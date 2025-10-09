import React from "react";
import { Text, View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import COLORS from "../theme/colors";
import { useTranslation } from "react-i18next";

type StatusType =
  | "solve"
  | "CORRECT"
  | "PENDING"
  | "INCORRECT"
  | "FAILED"
  | "NOT_ENOUGH_TOKENS"
  | "COMPLETED"
  | "INCOMPLETE"
  | string;

interface StatusBadgeProps {
  status: StatusType;
}

const STATUS_STYLES: Record<string, ViewStyle> = {
  solve: { backgroundColor: COLORS.primary },
  CORRECT: { backgroundColor: "#3CCB3C" },
  PENDING: { backgroundColor: "#FFD54F" },
  INCORRECT: { backgroundColor: "#FD1207" },
  FAILED: { backgroundColor: "#FD1207" },
  NOT_ENOUGH_TOKENS: { backgroundColor: "#BCAAA4" },
  COMPLETED: { backgroundColor: "#3CCB3C" },
  INCOMPLETE: { backgroundColor: "#FD1207" },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();
  const style = STATUS_STYLES[status] || { backgroundColor: "#999" };

  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{t(`status.${status}`)}</Text>
    </View>
  );
};

export default StatusBadge;

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 60,
  },
  text: {
    color: "#fff",
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
  },
});
