import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../theme/colors";
import AnimatedInput from "../../components/AnimatedInput";
import { useTranslation } from "react-i18next";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import CustomButton from "../../components/CustomButton";
import { useUpdateUserMutation } from "../../services/authSlice";
import { setLoading } from "../../store/loading";
import { useDispatch } from "react-redux";

const ChangepasswordScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};

    if (!currentPassword) {
      newErrors.currentPassword = t("currentPasswordRequired");
      valid = false;
    }

    if (newPassword.length < 8) {
      newErrors.newPassword = t("passwordLengthError");
      valid = false;
    }

    if (rePassword.length < 8) {
      newErrors.rePassword = t("passwordLengthError");
      valid = false;
    }

    if (newPassword !== rePassword) {
      newErrors.rePassword = t("passwordMismatch");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async () => {
    if (validate()) {
      dispatch(setLoading(true));

      try {
        let obj = {
          data: {
            password: newPassword,
          },
        };
        console.log("user password update ", obj);

        await updateUser(obj).unwrap();
        // maybe show success toast or navigate back
      } catch (err) {
        console.log("Update failed", JSON.stringify(err));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <CustomHeader
              title={t("changePassword")}
              onPress={() => navigation.goBack()}
            />
          </View>

          <View style={styles.container}>
            <View>
              <View style={styles.inputWrapper}>
                <AnimatedInput
                  label={t("currentPassword")}
                  value={currentPassword}
                  onChangeText={(text) => {
                    setCurrentPassword(text);
                    if (errors.currentPassword)
                      setErrors({ ...errors, currentPassword: "" });
                  }}
                  secureTextEntry
                />
                {errors.currentPassword ? (
                  <Text style={styles.errorText}>{errors.currentPassword}</Text>
                ) : null}
              </View>

              <View style={styles.inputWrapper}>
                <AnimatedInput
                  label={t("newPassword")}
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    if (errors.newPassword)
                      setErrors({ ...errors, newPassword: "" });
                  }}
                  secureTextEntry
                />
                {errors.newPassword ? (
                  <Text style={styles.errorText}>{errors.newPassword}</Text>
                ) : null}
              </View>

              <View style={styles.inputWrapper}>
                <AnimatedInput
                  label={t("rePassword")}
                  value={rePassword}
                  onChangeText={(text) => {
                    setRePassword(text);
                    if (errors.rePassword)
                      setErrors({ ...errors, rePassword: "" });
                  }}
                  secureTextEntry
                />
                {errors.rePassword ? (
                  <Text style={styles.errorText}>{errors.rePassword}</Text>
                ) : null}
              </View>
            </View>

            <View style={styles.bottomButton}>
              <CustomButton
                title={t("save")}
                buttonStyle={{
                  width: "50%",
                  backgroundColor:
                    currentPassword || newPassword || rePassword
                      ? COLORS.primary
                      : COLORS.D9Gray,
                  borderColor:
                    currentPassword || newPassword || rePassword
                      ? COLORS.primary
                      : COLORS.D9Gray,
                }}
                textStyle={{
                  color:
                    currentPassword || newPassword || rePassword
                      ? COLORS.white
                      : COLORS.black,
                  fontSize: FONTSIZE.size20,
                  fontFamily: FONTS.UrbanistSemiBold,
                  includeFontPadding: false,
                }}
                onPress={handleSave}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ChangepasswordScreen;

// ✅ Styles
const styles = StyleSheet.create({
  safeContent: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  bottomButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  errorText: {
    fontSize: FONTSIZE.size12,
    color: COLORS.danger,
    fontFamily: FONTS.UrbanistRegular,
    // marginTop: 5,
    marginLeft: 25,
    position: "absolute",
    bottom: -6,
  },
  inputWrapper: {
    // marginBottom: 30, // leaves space for error text
    position: "relative",
    // flex: 1,
  },
});
