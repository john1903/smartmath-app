import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CalanderIcon from "../../assets/svgs/CalendarIcon.svg";
import ArrowIcon from "../../assets/svgs/ArrowIcon.svg";

import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import COLORS from "../theme/colors";

export default function StatCard({ value }) {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.title}>Task</Text>
          <Text style={styles.title}>Completed</Text>
        </View>
        <CalanderIcon />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.subtitle}>Tasks Solve</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <ArrowIcon />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    // marginRight: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistMedium,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: FONTSIZE.size10,
    fontFamily: FONTS.UrbanistMedium,
    lineHeight: 10,
  },
  value: {
    color: COLORS.white,
    fontSize: FONTSIZE.size48,
    fontFamily: FONTS.UrbanistRegular,
    lineHeight: 48,
  },
});
