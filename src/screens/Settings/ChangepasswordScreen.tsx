import { View, Text, ScrollView, StyleSheet } from "react-native";
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
      newErrors.currentPassword =
        t("currentPasswordRequired") || "Current password is required";
      valid = false;
    }

    if (newPassword.length < 8) {
      newErrors.newPassword =
        t("passwordLengthError") || "Password must be at least 8 characters";
      valid = false;
    }

    if (rePassword.length < 8) {
      newErrors.rePassword =
        t("passwordLengthError") || "Password must be at least 8 characters";
      valid = false;
    }

    if (newPassword !== rePassword) {
      newErrors.rePassword = t("passwordMismatch") || "Passwords do not match";
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
      {/* Header */}
      <View style={styles.header}>
        <CustomHeader
          title="Change Password"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.container}>
        <View>
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

          <AnimatedInput
            label={t("newPassword")}
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              if (errors.newPassword) setErrors({ ...errors, newPassword: "" });
            }}
            secureTextEntry
          />
          {errors.newPassword ? (
            <Text style={styles.errorText}>{errors.newPassword}</Text>
          ) : null}

          <AnimatedInput
            label={t("rePassword")}
            value={rePassword}
            onChangeText={(text) => {
              setRePassword(text);
              if (errors.rePassword) setErrors({ ...errors, rePassword: "" });
            }}
            secureTextEntry
          />
          {errors.rePassword ? (
            <Text style={styles.errorText}>{errors.rePassword}</Text>
          ) : null}
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
    color: COLORS.danger,
    fontSize: FONTSIZE.size15,
    fontFamily: FONTS.UrbanistLight,
    // marginTop: 5,
    marginLeft: 25,
  },
});
