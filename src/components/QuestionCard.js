import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import StatusBadge from "./StatusBadge";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import COLORS from "../theme/colors";

export default function QuestionCard({ number, question, status, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.circle}>
          <Text style={styles.number}>Q{number}</Text>
        </View>
        <Text style={styles.question} numberOfLines={5} ellipsizeMode="tail">
          {question}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <StatusBadge status={status} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  leftContainer: {
    flex: 1, // takes remaining space
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  rightContainer: {
    // flexShrink: 1, // prevents overflow
    alignItems: "flex-end",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: COLORS.borderColor,
    width: 35,
    height: 35,
    marginRight: 12,
  },
  number: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.black,
  },
  question: {
    flexShrink: 1,
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.black,
  },
});
