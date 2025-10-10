import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import MathRenderer from "./MathRenderer";

interface OptionButtonProps {
  optionKey: string;
  label: string;
  selected: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  correct?: boolean | null;
  disabled?: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  optionKey,
  label,
  selected,
  onPress,
  correct,
  disabled,
}) => {
  const getContainerStyle = () => {
    if (selected && correct === true)
      return [styles.container, styles.correctContainer];
    if (selected && correct === false)
      return [styles.container, styles.incorrectContainer];
    if (selected) return [styles.container, styles.selectedContainer];
    return styles.container;
  };

  const getCircleStyle = () => {
    if (selected && correct === true)
      return [styles.circle, styles.correctCircle];
    if (selected && correct === false)
      return [styles.circle, styles.incorrectCircle];
    if (selected) return [styles.circle, styles.selectedCircle];
    return styles.circle;
  };

  // console.log("label :::::::: ", label);

  return (
    <TouchableOpacity
      // disabled={disabled}
      style={getContainerStyle()}
      onPress={!disabled ? onPress : undefined}
      activeOpacity={0.7}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          marginRight: 5,
        }}
      >
        {/* Circle with option key (A, B, C, D) */}
        <View
          style={[styles.optionCircle, selected && styles.selectedOptionLetter]}
        >
          <Text style={styles.optionLetter}>{`${optionKey})`}</Text>
        </View>

        {/* Math label */}
        <MathRenderer
          formula={label}
          style={[styles.label, selected && styles.selectedLabel]}
          selected={selected}
          fontSize={14}
        />
      </View>

      {/* Right-side radio circle */}
      <View style={getCircleStyle()}>
        {selected && <View style={styles.innerDot} />}
      </View>
    </TouchableOpacity>
  );
};

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
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  correctContainer: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  incorrectContainer: {
    backgroundColor: COLORS.danger,
    borderColor: COLORS.danger,
  },
  label: {
    fontSize: FONTSIZE.size14,
    color: COLORS.black,
    fontFamily: FONTS.UrbanistMedium,
    flexShrink: 1,
    // flexWrap: "wrap",
    // minHeight: 20,
  },
  selectedLabel: { color: COLORS.white },
  optionCircle: {
    backgroundColor: COLORS.F5Gray,
    width: 35,
    height: 35,
    borderRadius: 400,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  optionLetter: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.black,
  },
  selectedOptionLetter: { backgroundColor: COLORS.white },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borderColor2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  selectedCircle: {
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
  },
  correctCircle: {
    borderColor: COLORS.white,
    backgroundColor: COLORS.green,
  },
  incorrectCircle: {
    borderColor: COLORS.white,
    backgroundColor: COLORS.danger,
  },
  innerDot: {
    width: 14,
    height: 14,
    borderRadius: 100,
    backgroundColor: COLORS.white,
  },
});

export default OptionButton;
