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
  Platform,
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
  error?: string; // ✅ new prop
  autoComplete?: any;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  style = {},
  error,
  autoComplete,
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

  // Dynamic border color based on state
  const getBorderColor = () => {
    if (error) return COLORS.danger;
    if (isFocused) return COLORS.black;
    return COLORS.secondary;
  };

  const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
    position: "absolute",
    left: 18,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: Platform.OS === "android" ? [10, -20] : [12, -20],
    }),
    fontSize: FONTSIZE.size15,
    fontFamily: FONTS.UrbanistMedium,
    color: error
      ? COLORS.danger
      : animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [COLORS.secondary, COLORS.black],
        }),
    backgroundColor: "transparent",
    paddingHorizontal: 4,
  };

  return (
    <View style={[styles.container]}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>

      <View
        style={[
          styles.inputWrapper,
          { borderColor: getBorderColor() },
          secureTextEntry && styles.iconContainerPassword,
          style,
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
          autoComplete={autoComplete}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color={error ? COLORS.danger : COLORS.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    justifyContent: "center",
    marginTop: 26,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 25,
    // height: 45,
    paddingLeft: 18,
  },
  iconContainerPassword: {
    paddingRight: 40,
  },
  input: {
    flex: 1,
    fontSize: FONTSIZE.size15,
    fontFamily: FONTS.UrbanistMedium,
    paddingVertical: 12,
    includeFontPadding: false,
    // height: 38,
    // backgroundColor: "red",
    borderRadius: 25,
  },
  iconContainer: {
    position: "absolute",
    // marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    right: 20,
  },
});

export default AnimatedInput;
