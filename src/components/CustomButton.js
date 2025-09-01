// // components/CustomButton.js
// import React from "react";
// import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import COLORS from "../theme/colors";

// const CustomButton = ({
//   title = "Button",
//   onPress,
//   buttonStyle = {}, // custom styles for button
//   textStyle = {}, // custom styles for text
//   icon = null, // { name: "add", size: 20, color: "#fff" }
//   disabled = false,
// }) => {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.button,
//         buttonStyle, // merge custom styles
//         disabled && { opacity: 0.6 },
//       ]}
//       activeOpacity={0.7}
//       onPress={onPress}
//       disabled={disabled}
//     >
//       <View style={styles.content}>
//         {icon && (
//           <Ionicons
//             name={icon.name}
//             size={icon.size || 20}
//             color={icon.color || "#fff"}
//             style={[styles.icon, icon.style]}
//           />
//         )}
//         <Text style={[styles.title, textStyle]}>{title}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     width: "100%",
//     backgroundColor: COLORS.primary,
//     borderRadius: 40,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//     padding: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   content: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 16,
//     color: COLORS.white,
//   },
//   icon: {
//     marginRight: 8,
//   },
// });

// export default CustomButton;

// components/CustomButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../theme/colors";

const CustomButton = ({
  title = "Button",
  onPress,
  buttonStyle = {}, // custom styles for button
  textStyle = {}, // custom styles for text
  icon = null, // { name: "add", size: 20, color: "#fff", style: {} }
  svg = null, // pass React element: <MySvg width={20} height={20} />
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle, // merge custom styles
        disabled && { opacity: 0.6 },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.content}>
        {icon && (
          <Ionicons
            name={icon.name}
            size={icon.size || 20}
            color={icon.color || COLORS.white}
            style={[styles.icon, icon.style]}
          />
        )}

        {svg && <View style={styles.icon}>{svg}</View>}

        <Text style={[styles.title, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "600",
  },
  icon: {
    marginRight: 8,
  },
});

export default CustomButton;
