import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FONTSIZE from "../../theme/fontsSize";
import COLORS from "../../theme/colors";
import FONTS from "../../theme/fonts";

interface SettingItemProps {
  label: string;
  onPress?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={COLORS.secondary} />
    </TouchableOpacity>
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

export default SettingItem;
