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

export default function SignUpScreen({ navigation }) {
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <CustomBackground showImage={false} showGradient={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.innerContainer}>
            <View
              style={{
                marginBottom: 30,
              }}
            >
              <View style={styles.mainTitleContainer}>
                <Text style={styles.title}>Register</Text>
                <Text style={styles.subtitle}>Please register to login!</Text>
              </View>

              <View style={styles.inputContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <AnimatedInput
                    label="First Name"
                    value={FName}
                    onChangeText={setFName}
                    style={{ flex: 1 }}
                  />
                  <AnimatedInput
                    label="Last Name"
                    value={LName}
                    onChangeText={setLName}
                    style={{ flex: 1 }}
                  />
                </View>
                <AnimatedInput
                  label="Email or Phone"
                  value={email}
                  onChangeText={setEmail}
                />
                <AnimatedInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                {/* <TouchableOpacity style={styles.forgotBtn}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity> */}
              </View>

              <CustomButton
                title="Sign Up"
                buttonStyle={{
                  width: "100%",
                  marginVertical: 10,
                }}
                textStyle={{ color: COLORS.white, fontSize: 14 }}
                onPress={() => navigation.navigate("Main")}
              />

              <View style={styles.createAccountContainer}>
                <Text style={styles.createAccount}>
                  If you have already an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text style={styles.createLink}> Sign In </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>

              <CustomButton
                title="Sign in with Email"
                buttonStyle={styles.socialButton}
                textStyle={styles.socialButtonTitle}
                onPress={() => navigation.navigate("SignIn")}
                svg={<EmailIcon width={22} height={22} fill="#fff" />}
              />
              <CustomButton
                title="Sign in with Google"
                buttonStyle={[
                  styles.socialButton,
                  {
                    marginTop: 10,
                  },
                ]}
                textStyle={styles.socialButtonTitle}
                onPress={() => navigation.navigate("SignIn")}
                svg={<GoogleIcon width={22} height={22} fill="#fff" />}
              />
              <CustomButton
                title="Sign in with Apple"
                buttonStyle={[
                  styles.socialButton,
                  {
                    marginTop: 10,
                  },
                ]}
                textStyle={styles.socialButtonTitle}
                onPress={() => navigation.navigate("SignIn")}
                svg={<AppleIcon width={22} height={22} fill="#fff" />}
              />
            </View>

            <Text style={styles.footerText}>
              By using our services you are agreeing to our{" "}
              <Text style={styles.link}>Terms</Text> and{" "}
              <Text style={styles.link}>Privacy Statement</Text>.
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
    // backgroundColor: "#00000010",
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
  signInBtn: {
    backgroundColor: "#007AFF",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 20,
  },
  signInText: {
    color: "#fff",
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistSemiBold,
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
    // marginHorizontal: 5,
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
