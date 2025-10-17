import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../theme/colors";
import ProfileImagePicker from "../../components/ProfileImagePicker";
import AnimatedInput from "../../components/AnimatedInput";
import { useTranslation } from "react-i18next";

import FONTS from "../../theme/fonts";
import FONTSIZE from "../../theme/fontsSize";
import CustomButton from "../../components/CustomButton";
import { useUpdateUserMutation } from "../../services/authSlice";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/loading";
import { useAppSelector } from "../../store";

const EditProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state: any) => state?.auth);
  const { t } = useTranslation();

  const [updateUser] = useUpdateUserMutation();

  const [FName, setFName] = useState(user?.firstName || "");
  const [LName, setLName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [userAvatar, setUserAvatar] = useState(user?.avatar?.uri || "");

  const [errors, setErrors] = useState<any>({});

  // ✅ Validation before submit
  const validate = () => {
    const newErrors: any = {};

    if (!FName.trim()) newErrors.FName = t("first_name_required");
    if (!LName.trim()) newErrors.LName = t("last_name_required");
    if (!email.trim()) {
      newErrors.email = t("email_required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) &&
      !/^\d{10,15}$/.test(email)
    ) {
      newErrors.email = t("invalid_email_or_phone");
    }
    // if (!phone.trim()) newErrors.phone = t("phone_required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return; // ❌ Stop if validation fails

    dispatch(setLoading(true));
    try {
      const obj = {
        data: {
          firstName: FName,
          lastName: LName,
          username: email,
          phone,
          avatarFileId: user?.avatar?.id,
        },
      };

      console.log("data of object user update ", obj);
      await updateUser(obj).unwrap();
      // maybe show success toast or navigate back
    } catch (err) {
      console.log("Update failed", JSON.stringify(err));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <CustomHeader
          title={t("editProfile")}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <ProfileImagePicker
            size={120}
            initialImage={user?.avatar?.uri}
            onImagePicked={(uri) => setUserAvatar(uri)}
          />
        </View>

        {/* Inputs with inline errors */}
        <View>
          <View style={styles.inputWrapper}>
            <AnimatedInput
              label={t("first_name")}
              value={FName}
              onChangeText={(text: any) => {
                setFName(text);
                setErrors((prev: any) => ({ ...prev, FName: "" }));
              }}
            />
            {errors.FName ? (
              <Text style={styles.errorText}>{errors.FName}</Text>
            ) : null}
          </View>

          <View style={styles.inputWrapper}>
            <AnimatedInput
              label={t("last_name")}
              value={LName}
              onChangeText={(text: any) => {
                setLName(text);
                setErrors((prev: any) => ({ ...prev, LName: "" }));
              }}
            />
            {errors.LName ? (
              <Text style={styles.errorText}>{errors.LName}</Text>
            ) : null}
          </View>

          <View style={styles.inputWrapper}>
            <AnimatedInput
              label={t("email_or_phone")}
              value={email}
              onChangeText={(text: any) => {
                setEmail(text);
                setErrors((prev: any) => ({ ...prev, email: "" }));
              }}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={styles.inputWrapper}>
            <AnimatedInput
              label={t("phone")}
              value={phone}
              onChangeText={(text: any) => {
                setPhone(text);
                setErrors((prev: any) => ({ ...prev, phone: "" }));
              }}
            />
            {/* {errors.phone ? (
              <Text style={styles.errorText}>{errors.phone}</Text>
            ) : null} */}
          </View>
        </View>

        <View style={styles.bottomButton}>
          <CustomButton
            title={t("save")}
            buttonStyle={{ width: "50%" }}
            textStyle={{
              color: COLORS.white,
              fontSize: FONTSIZE.size20,
              fontFamily: FONTS.UrbanistSemiBold,
              includeFontPadding: false,
            }}
            onPress={handleSave}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  safeContent: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  container: { paddingHorizontal: 20, paddingBottom: 40 },

  errorText: {
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

  bottomButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
