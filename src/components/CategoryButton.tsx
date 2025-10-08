// import React from "react";
// import { TouchableOpacity, Text, StyleSheet } from "react-native";
// import COLORS from "../theme/colors"; // ✅ use your theme
// import FONTSIZE from "../theme/fontsSize";
// import FONTS from "../theme/fonts";

// export default function CategoryButton({
//   label,
//   active,
//   onPress,
//   style,
//   textStyle,
// }) {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.button,
//         active ? styles.activeButton : styles.inactiveButton,
//         style,
//       ]}
//       onPress={onPress}
//     >
//       <Text
//         style={[
//           styles.text,
//           active ? styles.activeText : styles.inactiveText,
//           textStyle,
//         ]}
//       >
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 100,
//     borderWidth: 1,
//     borderColor: COLORS.borderColor2,
//   },
//   text: {
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistSemiBold,
//   },
//   activeButton: {
//     backgroundColor: COLORS.primary, // your blue
//     borderColor: COLORS.primary,
//   },
//   inactiveButton: {
//     backgroundColor: "transparent",
//   },
//   activeText: {
//     color: COLORS.white,
//   },
//   inactiveText: {
//     color: COLORS.black,
//   },
// });

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";

interface CategoryButtonProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  active = false,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        active ? styles.activeButton : styles.inactiveButton,
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          active ? styles.activeText : styles.inactiveText,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.borderColor2,
  },
  text: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
  },
  activeButton: {
    backgroundColor: COLORS.primary,
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

export default CategoryButton;
