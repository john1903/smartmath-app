import React from "react";
import { Text, View, StyleSheet } from "react-native";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import COLORS from "../theme/colors";

const STATUS_STYLES = {
  Solve: { backgroundColor: COLORS.primary }, // Blue
  Completed: { backgroundColor: "#3CCB3C" }, // Green
  Failed: { backgroundColor: "#FD1207" }, // Red
  "Limit Exceeded.": { backgroundColor: "#BCAAA4" }, // Brown
  Pending: { backgroundColor: "#FFD54F" }, // Yellow
};

export default function StatusBadge({ status }) {
  return (
    <View style={[styles.badge, STATUS_STYLES[status]]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 30,
  },
  text: {
    color: "#fff",
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
  },
});
