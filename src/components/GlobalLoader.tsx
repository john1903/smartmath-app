import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import { useAppSelector } from "../store";

const GlobalLoader = () => {
  // const { isLoading } = useSelector((state) => state?.loading);
  const { isLoading } = useAppSelector((state) => state.loading);

  console.log("isLoading ", isLoading);

  return (
    <Modal visible={isLoading} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.textStyle}>Wait for a while...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default GlobalLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderBox: {
    width: "80%",
    padding: 20,
    borderRadius: 12,
    // backgroundColor: "rgba(0,0,0,0.7)",
  },
  textStyle: {
    textAlign: "center",
    color: COLORS.white,
    fontFamily: FONTS.UrbanistMedium,
    fontSize: FONTSIZE.size12,
  },
});
