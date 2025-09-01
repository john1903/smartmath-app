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

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <CustomBackground showImage={false} showGradient={true}>
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.mainTitleContainer}>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>Please login to continue!</Text>
            </View>

            <View style={styles.inputContainer}>
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

              <TouchableOpacity style={styles.forgotBtn}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              title="Sign In"
              buttonStyle={{
                width: "100%",
                marginVertical: 10,
              }}
              textStyle={{ color: COLORS.white, fontSize: 14 }}
              onPress={() => navigation.navigate("SignIn")}
            />

            <Text style={styles.createAccount}>
              If you haven’t already an account?{" "}
              <Text style={styles.createLink}>Create account</Text>
            </Text>

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
    </CustomBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 20,
    marginHorizontal: 20,
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
    fontSize: 26,
    fontWeight: 500,
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 10,
    color: COLORS.secondary,
  },
  forgotBtn: {
    alignSelf: "flex-end",
  },
  forgotText: {
    color: COLORS.black,
    fontSize: 10,
    fontWeight: 500,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  createAccount: {
    fontSize: 10,
    textAlign: "center",
    color: COLORS.secondary,
  },
  createLink: {
    color: COLORS.black,
    fontWeight: 500,
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
    fontSize: 12,
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
    fontSize: 12,
    paddingVertical: 2,
  },

  footerText: {
    marginHorizontal: 15,
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
    color: COLORS.secondary,
  },
  link: {
    color: COLORS.black,
    fontWeight: 500,
  },
});
