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

import EmailIcon from "../../../assets/svgs/Email.svg";
import GoogleIcon from "../../../assets/svgs/Google.svg";
import AppleIcon from "../../../assets/svgs/Apple.svg";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import { useTranslation } from "react-i18next";
import { useRegisterUserMutation } from "../../services/authSlice";
import { useDispatch } from "react-redux";

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { t } = useTranslation();
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupFunc = async () => {
    let obj = {
      data: {
        email: email,
        firstName: FName,
        lastName: LName,
        password: password,
      },
      navigation,
    };

    registerUser(obj);
    dispatch(setLoading(true));
    console.log("obj :::: ", JSON.stringify(obj));

    // navigation.navigate("Main")
  };

  return (
    <CustomBackground showImage={false} showGradient={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.innerContainer}>
            <View style={{ marginBottom: 30 }}>
              <View style={styles.mainTitleContainer}>
                <Text style={styles.title}>{t("register")}</Text>
                <Text style={styles.subtitle}>{t("register_subtitle")}</Text>
              </View>

              <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <AnimatedInput
                    label={t("first_name")}
                    value={FName}
                    onChangeText={setFName}
                    style={{ flex: 1 }}
                  />
                  <AnimatedInput
                    label={t("last_name")}
                    value={LName}
                    onChangeText={setLName}
                    style={{ flex: 1 }}
                  />
                </View>
                <AnimatedInput
                  label={t("email_or_phone")}
                  value={email}
                  onChangeText={setEmail}
                />
                <AnimatedInput
                  label={t("password")}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <CustomButton
                title={t("sign_up")}
                buttonStyle={{ width: "100%", marginVertical: 10 }}
                textStyle={{
                  color: COLORS.white,
                  fontSize: 14,
                  includeFontPadding: false,
                }}
                onPress={() => signupFunc()}
              />

              <View style={styles.createAccountContainer}>
                <Text style={styles.createAccount}>{t("already_account")}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text style={styles.createLink}> {t("sign_in")} </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.orText}>{t("or")}</Text>
                <View style={styles.line} />
              </View>

              <CustomButton
                title={t("sign_in_with_email")}
                buttonStyle={styles.socialButton}
                textStyle={styles.socialButtonTitle}
                onPress={() => navigation.navigate("SignIn")}
                svg={<EmailIcon width={22} height={22} fill="#fff" />}
              />
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

            <Text style={styles.footerText}>
              {t("terms_text")} <Text style={styles.link}>{t("terms")}</Text>{" "}
              {t("and")} <Text style={styles.link}>{t("privacy")}</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 40,
  },
  innerContainer: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  mainTitleContainer: {
    marginVertical: 10,
  },
  inputContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: FONTSIZE.size40,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.secondary,
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
    fontSize: FONTSIZE.size12,
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
    marginTop: 20,
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
