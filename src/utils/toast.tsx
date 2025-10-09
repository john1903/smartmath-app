// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import Toast, {
//   ToastConfig,
//   ToastConfigParams,
// } from "react-native-toast-message";
// import COLORS from "../theme/colors";
// import FONTSIZE from "../theme/fontsSize";
// import FONTS from "../theme/fonts";
// import { Entypo } from "@expo/vector-icons";

// // Types
// type ToastType = "success" | "error" | "warning" | "info";

// // Reusable custom toast component
// const CustomToast = (
//   props: ToastConfigParams<any>,
//   background: string,
//   border: string,
//   titleColor: string,
//   subtitleColor: string
// ) => (
//   <View
//     style={[
//       styles.toastContainer,
//       { backgroundColor: background, borderColor: border },
//     ]}
//   >
//     <View style={styles.textContainer}>
//       <Text style={[styles.title, { color: titleColor }]}>{props.text1}</Text>
//       {props.text2 ? (
//         <Text style={[styles.subtitle, { color: subtitleColor }]}>
//           {props.text2}
//         </Text>
//       ) : null}
//     </View>

//     {/* Close Button */}
//     <TouchableOpacity onPress={() => Toast.hide()} style={styles.closeBtn}>
//       <Entypo name="cross" size={16} color="black" />
//     </TouchableOpacity>
//   </View>
// );

// // Toast Config
// const toastConfig: ToastConfig = {
//   success: (props) =>
//     CustomToast(props, "#3CCB3C", "#3CCB3C", COLORS.white, COLORS.white),

//   error: (props) =>
//     CustomToast(props, "#FD1207", "#FD1207", COLORS.white, COLORS.white),

//   warning: (props) =>
//     CustomToast(props, "#fff8e6", "#FAF0E1", "#f1c40f", COLORS.black),

//   info: (props) =>
//     CustomToast(props, "#e8f4fd", "#D7DDE5", COLORS.primary, COLORS.secondary),
// };

// // Toast wrapper component
// export const ToastConfigComponent: React.FC = () => {
//   return <Toast config={toastConfig} topOffset={60} />;
// };

// // Helper to trigger toasts
// const showToast = (type: ToastType, text1: string, text2?: string): void => {
//   Toast.show({
//     type,
//     text1,
//     text2,
//     position: "top",
//   });
// };

// // Public functions
// export const showSuccessToast = (message: string, description?: string): void =>
//   showToast("success", message, description);

// export const showErrorToast = (message: string, description?: string): void =>
//   showToast("error", message, description);

// export const showWarningToast = (message: string, description?: string): void =>
//   showToast("warning", message, description);

// export const showInfoToast = (message: string, description?: string): void =>
//   showToast("info", message, description);

// // ======================
// // Styles
// // ======================
// const styles = StyleSheet.create({
//   toastContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 100,
//     borderWidth: 1,
//     marginHorizontal: 12,
//     minHeight: 70,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   textContainer: {
//     flex: 1,
//     paddingRight: 8,
//   },
//   title: {
//     fontSize: FONTSIZE.size16,
//     fontFamily: FONTS.UrbanistMedium,
//   },
//   subtitle: {
//     marginTop: 4,
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistRegular,
//   },
//   closeBtn: {
//     height: 25,
//     width: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: COLORS.white,
//     borderRadius: 8,
//   },
//   closeText: {
//     fontSize: 18,
//     color: COLORS.black,
//     fontWeight: "600",
//   },
// });

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast, {
  ToastConfig,
  ToastConfigParams,
} from "react-native-toast-message";
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import { Entypo, Ionicons, FontAwesome6 } from "@expo/vector-icons";

// Types
type ToastType = "success" | "error" | "warning" | "info";

// Reusable custom toast component
const CustomToast = (
  props: ToastConfigParams<any>,
  background: string,
  border: string,
  titleColor: string,
  subtitleColor: string,
  icon: React.ReactNode
) => (
  <View
    style={[
      styles.toastContainer,
      { backgroundColor: background, borderColor: border },
    ]}
  >
    {/* Icon */}
    <View style={styles.iconContainer}>{icon}</View>

    {/* Text */}
    <View style={styles.textContainer}>
      <Text style={[styles.title, { color: titleColor }]}>{props.text1}</Text>
      {props.text2 ? (
        <Text style={[styles.subtitle, { color: subtitleColor }]}>
          {props.text2}
        </Text>
      ) : null}
    </View>

    {/* Close Button */}
    <TouchableOpacity onPress={() => Toast.hide()} style={styles.closeBtn}>
      <Entypo name="cross" size={16} color="black" />
    </TouchableOpacity>
  </View>
);

// Toast Config
const toastConfig: ToastConfig = {
  success: (props) =>
    CustomToast(
      props,
      "#3CCB3C",
      "#3CCB3C",
      COLORS.white,
      COLORS.white,
      <Ionicons name="checkmark-circle" size={32} color={COLORS.white} />
    ),

  error: (props) =>
    CustomToast(
      props,
      "#FD1207",
      "#FD1207",
      COLORS.white,
      COLORS.white,
      <Ionicons name="close-circle" size={32} color={COLORS.white} />
    ),

  warning: (props) =>
    CustomToast(
      props,
      "#FFD54F",
      "#FFD54F",
      COLORS.black,
      "#5A5A5A",
      <Ionicons name="warning" size={32} color="#f1c40f" />
    ),

  info: (props) =>
    CustomToast(
      props,
      "#FFD54F",
      "#FFD54F",
      COLORS.black,
      "#5A5A5A",
      <FontAwesome6 name="circle-exclamation" size={32} color={COLORS.black} />
    ),
};

// Toast wrapper component
export const ToastConfigComponent: React.FC = () => {
  return <Toast config={toastConfig} topOffset={60} />;
};

// Helper to trigger toasts
const showToast = (type: ToastType, text1: string, text2?: string): void => {
  Toast.show({
    type,
    text1,
    text2,
    position: "top",
  });
};

// Public functions
export const showSuccessToast = (message: string, description?: string): void =>
  showToast("success", message, description);

export const showErrorToast = (message: string, description?: string): void =>
  showToast("error", message, description);

export const showWarningToast = (message: string, description?: string): void =>
  showToast("warning", message, description);

export const showInfoToast = (message: string, description?: string): void =>
  showToast("info", message, description);

// ======================
// Styles
// ======================
const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 100,
    borderWidth: 1,
    marginHorizontal: 12,
    minHeight: 70,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: FONTSIZE.size18,
    fontFamily: FONTS.UrbanistMedium,
  },
  subtitle: {
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistRegular,
  },
  closeBtn: {
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
});

export default ToastConfigComponent;
