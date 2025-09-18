import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";

export default function OptionButton({ label, selected, onPress, index }) {
  const optionLetter = String.fromCharCode(65 + index); // 97 = 'a'

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        }}
      >
        <View
          style={[styles.optionCircle, selected && styles.selectedOptionLetter]}
        >
          <Text style={[styles.optionLetter]}>{optionLetter})</Text>
        </View>

        <Text
          style={[styles.label, selected && styles.selectedLabel]}
          numberOfLines={0}
        >
          {label}
        </Text>
      </View>

      {/* Circle on the right side */}
      <View style={[styles.circle, selected && styles.selectedCircle]}>
        {/* {selected && <Ionicons name="ellipse" size={20} color={COLORS.white} />} */}
        {selected && <View style={styles.innerDot} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.borderColor2,
    borderRadius: 100,
    padding: 5,
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  selectedContainer: {
    backgroundColor: COLORS.green, // green background
    borderColor: COLORS.green,
  },
  label: {
    fontSize: FONTSIZE.size14,
    color: COLORS.black,
    fontFamily: FONTS.UrbanistMedium,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  selectedLabel: {
    color: COLORS.white,
  },

  optionCircle: {
    backgroundColor: COLORS.F5Gray,
    width: 45,
    height: 45,
    borderRadius: 400,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  optionLetter: {
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.black,
  },
  selectedOptionLetter: {
    backgroundColor: COLORS.white,
  },

  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    borderWidth: 1,
    borderColor: COLORS.borderColor2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  selectedCircle: {
    borderColor: COLORS.white,
    backgroundColor: COLORS.green,
  },
  innerDot: {
    width: 18,
    height: 18,
    borderRadius: 100,
    backgroundColor: COLORS.white, // 👈 inner dot color
  },
});
