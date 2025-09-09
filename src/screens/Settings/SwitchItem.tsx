import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import FONTSIZE from "../../theme/fontsSize";
import COLORS from "../../theme/colors";
import CustomSwitch from "./CustomSwitch";
import FONTS from "../../theme/fonts";

interface SwitchItemProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SwitchItem: React.FC<SwitchItemProps> = ({
  label,
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      {/* <Switch value={value} onValueChange={onValueChange} /> */}
      <CustomSwitch value={value} onValueChange={onValueChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  label: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.secondary,
  },
});

export default SwitchItem;
