import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";

export default function ProgressCard({ title, percentage, total }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <AnimatedCircularProgress
          size={110}
          width={8}
          fill={percentage}
          tintColor={COLORS.primary}
          backgroundColor="#EDEDED"
          rotation={0}
        >
          {() => (
            <Text style={styles.percent}>
              {percentage}%{"\n"}
              <Text style={styles.total}>{total}</Text>
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>
      <Text style={styles.total}>Correct Answers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
  },
  title: {
    color: COLORS.black,
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistMedium,
  },
  percent: {
    color: COLORS.primary,
    fontSize: FONTSIZE.size32,
    fontFamily: FONTS.UrbanistSemiBold,
    textAlign: "center",
  },
  total: {
    fontSize: FONTSIZE.size10,
    color: COLORS.secondary,
    lineHeight: 10,
    fontFamily: FONTS.UrbanistMedium,
  },
});
