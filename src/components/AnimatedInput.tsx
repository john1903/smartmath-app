import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";

interface AnimatedInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: ViewStyle | ViewStyle[];
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  style = {},
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
    position: "absolute",
    left: 25,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [31, -2],
    }),
    fontSize: FONTSIZE.size15,
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
        secureTextEntry={secureTextEntry && !showPassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
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
    marginVertical: 6,
    justifyContent: "center",
  },
  input: {
    paddingLeft: 25,
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: FONTSIZE.size15,
    fontFamily: FONTS.UrbanistMedium,
    paddingRight: 40, // space for eye icon
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    top: "68%",
  },
});

export default AnimatedInput;
