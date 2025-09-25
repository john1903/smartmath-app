import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast, {
  ToastConfig,
  ToastConfigParams,
} from "react-native-toast-message";
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";

// Types
type ToastType = "success" | "error" | "warning" | "info";

// Reusable custom toast component
const CustomToast = (
  props: ToastConfigParams<any>,
  background: string,
  border: string,
  titleColor: string,
  subtitleColor: string
) => (
  <View style={[styles.toastContainer, { backgroundColor: background, borderColor: border }]}>
    <View style={styles.textContainer}>
      <Text style={[styles.title, { color: titleColor }]}>{props.text1}</Text>
      {props.text2 ? (
        <Text style={[styles.subtitle, { color: subtitleColor }]}>{props.text2}</Text>
      ) : null}
    </View>

    {/* Close Button */}
    <TouchableOpacity onPress={() => Toast.hide()} style={styles.closeBtn}>
      <Text style={styles.closeText}>×</Text>
    </TouchableOpacity>
  </View>
);

// Toast Config
const toastConfig: ToastConfig = {
  success: (props) =>
    CustomToast(props, "#e6f7ed", "#DAEDE5", COLORS.green, COLORS.black),

  error: (props) =>
    CustomToast(props, "#fdecea", "#EFDFE0", COLORS.danger, COLORS.black),

  warning: (props) =>
    CustomToast(props, "#fff8e6", "#FAF0E1", "#f1c40f", COLORS.black),

  info: (props) =>
    CustomToast(props, "#e8f4fd", "#D7DDE5", COLORS.primary, COLORS.secondary),
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
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 12,
    minHeight: 70,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistMedium,
  },
  subtitle: {
    marginTop: 4,
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistRegular,
  },
  closeBtn: {
    height:25, width:25, justifyContent:"center", alignItems:"center",
    backgroundColor: COLORS.white,
    borderRadius:25,

  },
  closeText: {
    fontSize: 18,
    color: "#888",
    fontWeight: "600",
  },
});
