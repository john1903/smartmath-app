import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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

export default function SignInScreen({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <CustomBackground showImage={false} showGradient={true}>
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.mainTitleContainer}>
              <Text style={styles.title}>{t("login")}</Text>
              <Text style={styles.subtitle}>{t("login_subtitle")}</Text>
            </View>

            <View style={styles.inputContainer}>
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

              <TouchableOpacity style={styles.forgotBtn}>
                <Text style={styles.forgotText}>{t("forgot_password")}</Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              title={t("sign_in")}
              buttonStyle={{
                width: "100%",
                marginVertical: 10,
              }}
              textStyle={{ color: COLORS.white, fontSize: 14 }}
              onPress={() => navigation.navigate("Main")}
            />

            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccount}>{t("no_account")}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.createLink}> {t("create_account")} </Text>
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
  forgotBtn: {
    alignSelf: "flex-end",
  },
  forgotText: {
    color: COLORS.black,
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistSemiBold,
    marginBottom: 5,
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
