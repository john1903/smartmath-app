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
const ChangepasswordScreen = ({ navigation }: any) => {
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSave = () => {};

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
            onChangeText={setCurrentPassword}
            secureTextEntry
          />
          <AnimatedInput
            label={t("newPassword")}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <AnimatedInput
            label={t("rePassword")}
            value={rePassword}
            onChangeText={setRePassword}
            secureTextEntry
          />
        </View>

        <View style={styles.bottomButton}>
          <CustomButton
            title={t("save")}
            buttonStyle={{
              width: "50%",
            }}
            textStyle={{
              color: COLORS.white,
              fontSize: FONTSIZE.size20,
              fontFamily: FONTS.UrbanistSemiBold,
              includeFontPadding: false,
            }}
            onPress={() => handleSave()}
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
});
