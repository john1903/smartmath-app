import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../theme/colors";

const { width, height } = Dimensions.get("window");

const CustomBackground = ({
  children,
  showImage = false,
  imageSource = require("../../assets/images/student.png"),
  showGradient = false,
  gradientColors = ["#2475FC80", "#ffffff"],

  style = {},
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor: showGradient ? COLORS.white : COLORS.background,
        },
      ]}
    >
      {/* Top Gradient */}
      {showGradient && (
        <LinearGradient
          colors={gradientColors}
          style={[styles.gradient, { top: 0, height: height * 0.4 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      )}

      {/* Bottom Gradient */}
      {showGradient && (
        <LinearGradient
          colors={gradientColors}
          style={[styles.gradient, { bottom: 0, height: height * 0.4 }]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
      )}

      {/* Center Image */}
      {showImage && imageSource && (
        <View style={styles.imageWrapper}>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}
      {/* {children} */}

      {/* Main Safe Content Area */}
      <SafeAreaView style={styles.safeContent}>{children}</SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  imageWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.85,
    height: height * 0.7,
  },
  safeContent: {
    flex: 1,
  },
});

export default CustomBackground;
