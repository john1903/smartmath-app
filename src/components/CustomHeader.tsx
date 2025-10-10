import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import BackButton from "./BackButton";
import COLORS from "../theme/colors";
import FONTS from "../theme/fonts";
import FONTSIZE from "../theme/fontsSize";

interface CustomHeaderProps {
  title: string;
  goBack?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  goBack = true,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      {goBack ? (
        <BackButton onPress={onPress || (() => {})} />
      ) : (
        <View style={{ width: 40 }} /> // placeholder to keep title centered
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: FONTSIZE.size28,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.black,
    textAlign: "center",
    flex: 1,
  },
});

export default CustomHeader;
