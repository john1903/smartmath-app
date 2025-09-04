import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import COLORS from "../theme/colors"; // ✅ use your theme
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";

export default function CategoryButton({ label, active, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        active ? styles.activeButton : styles.inactiveButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[styles.text, active ? styles.activeText : styles.inactiveText]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  text: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
  },
  activeButton: {
    backgroundColor: COLORS.primary, // your blue
    borderColor: COLORS.primary,
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.black,
  },
});
