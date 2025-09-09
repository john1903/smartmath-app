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
import TokenIcon from "../../../assets/svgs/TokenIcon.svg";
import * as Progress from "react-native-progress"; // Install this library
import FONTS from "../../theme/fonts";
import FONTSIZE from "../../theme/fontsSize";
import CustomButton from "../../components/CustomButton";

const EditProfileScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const used = 70000;
  const total = 100000;
  const progress = used / total;

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <CustomHeader
          title="Edit Profile"
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <ProfileImagePicker
            size={120}
            onImagePicked={(uri) => console.log("Selected:", uri)}
          />
        </View>
        <View>
          <AnimatedInput
            label={t("first_name")}
            value={FName}
            onChangeText={setFName}
          />
          <AnimatedInput
            label={t("last_name")}
            value={LName}
            onChangeText={setLName}
          />
          <AnimatedInput
            label={t("email_or_phone")}
            value={email}
            onChangeText={setEmail}
          />
          <AnimatedInput
            label={t("phone")}
            value={phone}
            onChangeText={setPhone}
          />
          <AnimatedInput
            label={t("password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={{}}>
          {/* Header */}
          <View style={styles.tokenHeader}>
            <TokenIcon width={22} height={22} />
            <Text style={styles.title}>Token</Text>
          </View>

          {/* Progress Info */}
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              {(used / 1000).toFixed(0)}k Used
            </Text>
            <Text style={styles.infoText}>
              {(total / 1000).toFixed(0)}k Total
            </Text>
          </View>

          {/* Progress Bar */}
          <Progress.Bar
            progress={progress}
            width={null}
            height={12}
            borderRadius={10}
            color={COLORS.primary}
            unfilledColor={COLORS.D9Gray}
            borderWidth={0}
            style={{ marginVertical: 10 }}
          />

          {/* Buy Token Button */}
          <TouchableOpacity>
            <Text style={styles.buyToken}>Buy Token</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomButton}>
          <CustomButton
            title="Save"
            buttonStyle={{
              width: "50%",
            }}
            textStyle={{
              color: COLORS.white,
              fontSize: FONTSIZE.size20,
              fontFamily: FONTS.UrbanistSemiBold,
              includeFontPadding: false,
            }}
            onPress={() => navigation.navigate("SelectLanguage")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

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
    paddingHorizontal: 20,
  },

  tokenHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  title: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.black,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.black,
  },
  buyToken: {
    textAlign: "center",
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.primary,
    marginTop: 6,
  },
  bottomButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
});
