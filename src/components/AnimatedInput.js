import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // 👈 make sure to install
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";

const AnimatedInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  style = {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute",
    left: 20,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [32, 0],
    }),
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.secondary, COLORS.black],
    }),
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !showPassword} // 👈 control visibility
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color={COLORS.secondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    marginVertical: 5,
    justifyContent: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistMedium,
    paddingRight: 40, // 👈 space for eye icon
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    top: "68%",
  },
});

export default AnimatedInput;
