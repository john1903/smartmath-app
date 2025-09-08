// components/BackButton.js
import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons"; // Or any icon library
import COLORS from "../theme/colors";

const BackButton = ({
  onPress,
  size = 24,
  style = {},
  iconName = "chevron-left", // default back icon
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <Feather name={iconName} size={size} color={COLORS.black} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "13%",
    height: 50,
  },
});

export default BackButton;
