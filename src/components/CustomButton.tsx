import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
  StyleProp,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../theme/colors";

type IconProps = {
  name: React.ComponentProps<typeof Ionicons>["name"];
  size?: number;
  color?: string;
  style?: any;
};

interface CustomButtonProps extends TouchableOpacityProps {
  title?: string;
  onPress?: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProps | null;
  svg?: ReactNode;
  disabled?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title = "Button",
  onPress,
  buttonStyle,
  textStyle,
  icon = null,
  svg = null,
  disabled = false,
  contentStyle,
  iconStyle,
  ...rest
}) => {
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && { opacity: 0.6 }]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      <View
        style={[
          styles.content,
          contentStyle,
          // { maxWidth: width * 0.9 }
        ]}
      >
        {(icon || svg) && (
          <View style={[styles.iconContainer, iconStyle]}>
            {icon && (
              <Ionicons
                name={icon.name}
                size={icon.size || 20}
                color={icon.color || COLORS.white}
                style={icon.style}
              />
            )}
            {svg && svg}
          </View>
        )}

        <Text
          style={[styles.title, textStyle]}
          numberOfLines={0}
          allowFontScaling={true}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
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
    flexWrap: "nowrap",
  },

  title: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "600",
    textAlign: "center",
    flexShrink: 1,
    flexBasis: 0,
    flexGrow: 1,
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
});

export default CustomButton;
