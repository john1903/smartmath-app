import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FONTS from "../theme/fonts";
import FONTSIZE from "../theme/fontsSize";
import COLORS from "../theme/colors";

interface GlobalModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const GlobalModal: React.FC<GlobalModalProps> = ({
  visible,
  title = "Token limit exceeded",
  message = "Great progress! You've reached your token limit — recharge to unlock more challenges.",
  cancelText = "Cancel",
  confirmText = "Buy more",
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GlobalModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.56)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontFamily: FONTS.UrbanistSemiBold,
    fontSize: FONTSIZE.size22,
    color: COLORS.danger,
    textAlign: "center",
    marginBottom: 4,
  },
  message: {
    fontFamily: FONTS.UrbanistMedium,
    fontSize: FONTSIZE.size14,
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 24,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: "center",
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    paddingVertical: 10,
    marginLeft: 8,
    alignItems: "center",
  },
  cancelText: {
    fontFamily: FONTS.UrbanistSemiBold,
    fontSize: FONTSIZE.size16,
    color: COLORS.secondary,
  },
  confirmText: {
    fontFamily: FONTS.UrbanistSemiBold,
    fontSize: FONTSIZE.size16,
    color: COLORS.white,
  },
});
