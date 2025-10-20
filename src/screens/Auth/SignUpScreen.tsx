import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomBackground from "../../components/CustomBackground";
import AnimatedInput from "../../components/AnimatedInput";
import BackButton from "../../components/BackButton";
import COLORS from "../../theme/colors";
import CustomButton from "../../components/CustomButton";

import GoogleIcon from "../../../assets/svgs/GoogleIcon.svg";
import AppleIcon from "../../../assets/svgs/AppleIcon.svg";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import { useTranslation } from "react-i18next";
import { useRegisterUserMutation } from "../../services/authSlice";
import { useDispatch } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { setLoading } from "../../store/loading";
import { RegisterUserPayload } from "../../models/Auth";

// ----------------------
// ✅ Interface Definitions
// ----------------------
interface SignUpScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

interface ValidationErrors {
  FName?: string;
  LName?: string;
  email?: string;
  password?: string;
}

// ----------------------
// ✅ Component
// ----------------------
const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const { t } = useTranslation();

  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const tempErrors: ValidationErrors = {};

    if (!FName.trim()) tempErrors.FName = t("validation.first_name_required");
    if (!LName.trim()) tempErrors.LName = t("validation.last_name_required");

    if (!email.trim()) {
      tempErrors.email = t("validation.email_required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = t("validation.email_invalid");
    }

    if (!password.trim()) {
      tempErrors.password = t("validation.password_required");
    } else if (password.length < 8) {
      tempErrors.password = t("validation.password_min_length");
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const signupFunc = async (): Promise<void> => {
    if (!validateForm()) return;

    dispatch(setLoading(true));

    const obj: RegisterUserPayload = {
      data: {
        email,
        firstName: FName,
        lastName: LName,
        password,
      },
      navigation,
    };

    registerUser(obj);
    console.log("obj ::: ", JSON.stringify(obj));
  };

  return (
    <CustomBackground showImage={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <BackButton onPress={() => navigation.goBack()} />

          <View style={styles.innerContainer}>
            <View style={{ marginBottom: 20 }}>
              {/* Title */}
              <View style={styles.mainTitleContainer}>
                <Text style={styles.title}>{t("register")}</Text>
                <Text style={styles.subtitle}>{t("register_subtitle")}</Text>
              </View>

              {/* Input Fields */}
              <View style={styles.inputContainer}>
                <View style={styles.nameRow}>
                  {/* First Name */}
                  <View style={[styles.inputWrapper, { flex: 1 }]}>
                    <AnimatedInput
                      label={t("first_name")}
                      value={FName}
                      onChangeText={(text: string) => {
                        setFName(text);
                        if (errors.FName)
                          setErrors((prev: any) => ({ ...prev, FName: "" }));
                      }}
                      error={errors.FName}
                    />
                    {errors.FName && (
                      <Text style={styles.errorText}>{errors.FName}</Text>
                    )}
                  </View>

                  {/* Spacer */}
                  <View style={{ width: 10 }} />

                  {/* Last Name */}
                  <View style={[styles.inputWrapper, { flex: 1 }]}>
                    <AnimatedInput
                      label={t("last_name")}
                      value={LName}
                      onChangeText={(text: string) => {
                        setLName(text);
                        if (errors.LName)
                          setErrors((prev: any) => ({ ...prev, LName: "" }));
                      }}
                      error={errors.LName}
                    />
                    {errors.LName && (
                      <Text style={styles.errorText}>{errors.LName}</Text>
                    )}
                  </View>
                </View>

                {/* Email */}
                <View style={styles.inputWrapper}>
                  <AnimatedInput
                    label={t("email_or_phone")}
                    value={email}
                    onChangeText={(text: string) => {
                      setEmail(text);
                      if (errors.email)
                        setErrors((prev: any) => ({ ...prev, email: "" }));
                    }}
                    error={errors.email}
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                {/* Password */}
                <View style={styles.inputWrapper}>
                  <AnimatedInput
                    label={t("password")}
                    value={password}
                    onChangeText={(text: string) => {
                      setPassword(text);
                      if (errors.password)
                        setErrors((prev: any) => ({ ...prev, password: "" }));
                    }}
                    secureTextEntry
                    error={errors.password}
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
              </View>

              {/* Sign Up Button */}
              <CustomButton
                title={t("sign_up")}
                buttonStyle={{ width: "100%", marginVertical: 12 }}
                textStyle={{
                  color: COLORS.white,
                  fontSize: FONTSIZE.size16,
                  fontFamily: FONTS.UrbanistSemiBold,
                  includeFontPadding: false,
                }}
                onPress={signupFunc}
                disabled={isLoading}
              />

              {/* Already have an account */}
              <View style={styles.createAccountContainer}>
                <Text style={styles.createAccount}>{t("already_account")}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text style={styles.createLink}> {t("sign_in")} </Text>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.orText}>{t("or")}</Text>
                <View style={styles.line} />
              </View>

              {/* Social Buttons */}
              <CustomButton
                title={t("sign_in_with_google")}
                buttonStyle={[styles.socialButton, { marginTop: 10 }]}
                textStyle={styles.socialButtonTitle}
                onPress={() => navigation.navigate("SignIn")}
                svg={<GoogleIcon width={22} height={22} fill="#fff" />}
              />
              <CustomButton
                title={t("sign_in_with_apple")}
                buttonStyle={[styles.socialButton, { marginTop: 10 }]}
                textStyle={styles.socialButtonTitle}
                onPress={() => navigation.navigate("SignIn")}
                svg={<AppleIcon width={22} height={22} fill="#fff" />}
              />
            </View>

            {/* Footer Terms */}
            <Text style={styles.footerText}>
              {t("terms_text")} <Text style={styles.link}>{t("terms")}</Text>{" "}
              {t("and")} <Text style={styles.link}>{t("privacy")}</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomBackground>
  );
};

export default SignUpScreen;

// ----------------------
// ✅ Styles
// ----------------------
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 18,
    marginHorizontal: 20,
    paddingBottom: 15,
  },
  innerContainer: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  mainTitleContainer: {
    marginVertical: 10,
  },

  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 3,
  },
  inputContainer: {
    marginTop: 0,
  },
  inputWrapper: {
    position: "relative",
  },
  title: {
    fontSize: FONTSIZE.size41,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: FONTSIZE.size15,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.secondary,
  },
  errorText: {
    position: "absolute",
    bottom: -8,
    left: 22,
    fontSize: FONTSIZE.size12,
    color: COLORS.danger,
    fontFamily: FONTS.UrbanistRegular,
  },
  createAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccount: {
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistRegular,
    textAlign: "center",
    color: COLORS.secondary,
  },
  createLink: {
    color: COLORS.black,
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistSemiBold,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.secondary,
  },
  orText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    marginHorizontal: 10,
    color: COLORS.secondary,
  },
  socialButton: {
    width: "100%",
    marginTop: 5,
    backgroundColor: "transparent",
    borderColor: COLORS.secondary,
  },
  socialButtonTitle: {
    color: COLORS.black,
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistMedium,
    paddingVertical: 2,
    includeFontPadding: false,
  },
  footerText: {
    // marginTop: 10,
    textAlign: "center",
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistRegular,
    color: COLORS.secondary,
  },
  link: {
    color: COLORS.black,
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistSemiBold,
  },
});
