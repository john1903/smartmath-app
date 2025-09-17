import React from "react";
import { TouchableOpacity, View, StyleSheet, Animated } from "react-native";
import COLORS from "../../theme/colors";

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.switch,
        { backgroundColor: value ? COLORS.lightBlue : COLORS.D9Gray },
      ]}
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
    >
      <View
        style={[
          styles.circle,
          {
            alignSelf: value ? "flex-end" : "flex-start",
            backgroundColor: value ? COLORS.primary : COLORS.secondary,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 42,
    height: 23,
    borderRadius: 20,
    padding: 2,
    justifyContent: "center",
  },
  circle: {
    width: 17,
    height: 17,
    borderRadius: 40,
    backgroundColor: "#fff",
  },
});

export default CustomSwitch;
