// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import CustomBackground from "../../components/CustomBackground";
// import AnimatedInput from "../../components/AnimatedInput";
// import BackButton from "../../components/BackButton";
// import COLORS from "../../theme/colors";
// import CustomButton from "../../components/CustomButton";
// import GoogleIcon from "../../../assets/svgs/Google.svg";
// import AppleIcon from "../../../assets/svgs/Apple.svg";
// import FONTSIZE from "../../theme/fontsSize";
// import FONTS from "../../theme/fonts";
// import { useTranslation } from "react-i18next";
// import { useLoginUserMutation } from "../../services/authSlice";
// import { useDispatch } from "react-redux";
// import { setLoading } from "../../store/loading";

// export default function SignInScreen({ navigation }) {
//   const dispatch = useDispatch();
//   const [loginUser] = useLoginUserMutation();
//   const { t } = useTranslation();

//   const [email, setEmail] = useState("hani4u13@gmail.com");
//   const [password, setPassword] = useState("12345678");

//   const loginFunc = async () => {
//     dispatch(setLoading(true));
//     loginUser({ data: { username: email, password } });
//   };

//   return (
//     <CustomBackground showImage={false} showGradient={true}>
//       <KeyboardAwareScrollView
//         contentContainerStyle={styles.container}
//         enableOnAndroid={true}
//         extraScrollHeight={20}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//       >
//         <BackButton onPress={() => navigation.goBack()} />
//         <View style={styles.innerContainer}>
//           {/* Titles */}
//           <View style={styles.mainTitleContainer}>
//             <Text style={styles.title}>{t("login")}</Text>
//             <Text style={styles.subtitle}>{t("login_subtitle")}</Text>
//           </View>

//           {/* Inputs */}
//           <View style={styles.inputContainer}>
//             <AnimatedInput
//               label={t("email_or_phone")}
//               value={email}
//               onChangeText={setEmail}
//             />
//             <AnimatedInput
//               label={t("password")}
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />

//             <TouchableOpacity style={styles.forgotBtn}>
//               <Text style={styles.forgotText}>{t("forgot_password")}</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Button */}
//           <CustomButton
//             title={t("sign_in")}
//             buttonStyle={{ width: "100%", marginVertical: 10 }}
//             textStyle={{
//               color: COLORS.white,
//               fontSize: FONTSIZE.size16,
//               fontFamily: FONTS.UrbanistSemiBold,
//               includeFontPadding: false,
//             }}
//             onPress={loginFunc}
//           />

//           {/* Footer */}
//           <View style={styles.createAccountContainer}>
//             <Text style={styles.createAccount}>{t("no_account")}</Text>
//             <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//               <Text style={styles.createLink}> {t("create_account")} </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Divider */}
//           <View style={styles.divider}>
//             <View style={styles.line} />
//             <Text style={styles.orText}>{t("or")}</Text>
//             <View style={styles.line} />
//           </View>

//           {/* Social Buttons */}
//           <CustomButton
//             title={t("sign_in_with_google")}
//             buttonStyle={[styles.socialButton, { marginTop: 10 }]}
//             textStyle={styles.socialButtonTitle}
//             onPress={() => navigation.navigate("SignIn")}
//             svg={<GoogleIcon width={22} height={22} fill="#fff" />}
//           />
//           <CustomButton
//             title={t("sign_in_with_apple")}
//             buttonStyle={[styles.socialButton, { marginTop: 10 }]}
//             textStyle={styles.socialButtonTitle}
//             onPress={() => navigation.navigate("SignIn")}
//             svg={<AppleIcon width={22} height={22} fill="#fff" />}
//           />

//           {/* Terms */}
//           <Text style={styles.footerText}>
//             {t("terms_text")} <Text style={styles.link}>{t("terms")}</Text>{" "}
//             {t("and")} <Text style={styles.link}>{t("privacy")}</Text>.
//           </Text>
//         </View>
//       </KeyboardAwareScrollView>
//     </CustomBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     marginTop: 20,
//     marginHorizontal: 20,
//     paddingBottom: 40, // extra bottom padding so last button not hidden
//   },
//   innerContainer: {
//     marginHorizontal: 20,
//     flex: 1,
//     justifyContent: "flex-start",
//   },
//   mainTitleContainer: {
//     marginVertical: 10,
//   },
//   inputContainer: {
//     marginTop: 10,
//   },
//   title: {
//     fontSize: FONTSIZE.size41,
//     fontFamily: FONTS.UrbanistSemiBold,
//     color: COLORS.primary,
//   },
//   subtitle: {
//     fontSize: FONTSIZE.size15,
//     fontFamily: FONTS.UrbanistMedium,
//     color: COLORS.secondary,
//   },
//   forgotBtn: {
//     alignSelf: "flex-end",
//   },
//   forgotText: {
//     color: COLORS.black,
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistSemiBold,
//     marginBottom: 5,
//   },
//   createAccountContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   createAccount: {
//     fontSize: FONTSIZE.size12,
//     fontFamily: FONTS.UrbanistRegular,
//     textAlign: "center",
//     color: COLORS.secondary,
//   },
//   createLink: {
//     color: COLORS.black,
//     fontSize: FONTSIZE.size12,
//     fontFamily: FONTS.UrbanistSemiBold,
//   },
//   divider: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: COLORS.secondary,
//   },
//   orText: {
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistSemiBold,
//     marginHorizontal: 10,
//     color: COLORS.secondary,
//   },
//   socialButton: {
//     width: "100%",
//     marginTop: 5,
//     backgroundColor: "transparent",
//     borderColor: COLORS.secondary,
//   },
//   socialButtonTitle: {
//     color: COLORS.black,
//     fontSize: FONTSIZE.size12,
//     fontFamily: FONTS.UrbanistMedium,
//     paddingVertical: 2,
//     includeFontPadding: false,
//   },
//   footerText: {
//     marginTop: 20,
//     textAlign: "center",
//     fontSize: FONTSIZE.size12,
//     fontFamily: FONTS.UrbanistRegular,
//     color: COLORS.secondary,
//   },
//   link: {
//     color: COLORS.black,
//     fontSize: FONTSIZE.size12,
//     fontFamily: FONTS.UrbanistSemiBold,
//   },
// });

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomBackground from "../../components/CustomBackground";
import AnimatedInput from "../../components/AnimatedInput";
import BackButton from "../../components/BackButton";
import COLORS from "../../theme/colors";
import CustomButton from "../../components/CustomButton";
import GoogleIcon from "../../../assets/svgs/Google.svg";
import AppleIcon from "../../../assets/svgs/Apple.svg";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import { useTranslation } from "react-i18next";
import { useLoginUserMutation } from "../../services/authSlice";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/loading";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = t("validation.email_required");
      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      !/^\d{10,15}$/.test(email)
    ) {
      newErrors.email = t("validation.invalid_email_or_phone");
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = t("validation.password_required");
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = t("validation.password_min_length");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const loginFunc = async () => {
    if (!validate()) return;
    dispatch(setLoading(true));
    loginUser({ data: { username: email, password } });
  };

  return (
    <CustomBackground showImage={false} showGradient={true}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.innerContainer}>
          {/* Titles */}

          <View>
            <View style={styles.mainTitleContainer}>
              <Text style={styles.title}>{t("login")}</Text>
              <Text style={styles.subtitle}>{t("login_subtitle")}</Text>
            </View>
            {/* Inputs */}
            <View style={styles.inputWrapper}>
              <AnimatedInput
                label={t("email_or_phone")}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
              {errors.email ? (
                <Text style={styles.errorTextAbsolute}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.inputWrapper}>
              <AnimatedInput
                label={t("password")}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                secureTextEntry
              />
              {errors.password ? (
                <Text style={styles.errorTextAbsolute}>{errors.password}</Text>
              ) : null}
            </View>

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>{t("forgot_password")}</Text>
            </TouchableOpacity>

            {/* Button */}
            <CustomButton
              title={t("sign_in")}
              buttonStyle={{ width: "100%", marginVertical: 10 }}
              textStyle={{
                color: COLORS.white,
                fontSize: FONTSIZE.size16,
                fontFamily: FONTS.UrbanistSemiBold,
                includeFontPadding: false,
              }}
              onPress={loginFunc}
            />

            {/* Footer */}
            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccount}>{t("no_account")}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.createLink}> {t("create_account")} </Text>
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

          {/* Terms */}
          <Text style={styles.footerText}>
            {t("terms_text")} <Text style={styles.link}>{t("terms")}</Text>{" "}
            {t("and")} <Text style={styles.link}>{t("privacy")}</Text>.
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </CustomBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 40, // extra bottom padding so last button not hidden
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
    fontSize: FONTSIZE.size41,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: FONTSIZE.size15,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.secondary,
  },
  forgotBtn: {
    alignSelf: "flex-end",
  },
  forgotText: {
    color: COLORS.black,
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    marginBottom: 5,
  },
  createAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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

  errorTextAbsolute: {
    position: "absolute",
    bottom: -6,
    left: 25,
    fontSize: FONTSIZE.size12,
    color: COLORS.danger,
    fontFamily: FONTS.UrbanistRegular,
  },

  inputWrapper: {
    // marginBottom: 30, // leaves space for error text
    position: "relative",
    // flex: 1,
  },
});
