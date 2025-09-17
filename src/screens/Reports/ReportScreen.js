import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../theme/colors";
import { useTranslation } from "react-i18next";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import AnimatedDatePicker from "../../components/AnimatedDatePicker";
import ReportTile from "../../components/ReportTile";
import { MenuProvider } from "react-native-popup-menu";
import CustomButton from "../../components/CustomButton";

import TokenIcon from "../../../assets/svgs/TokenIcon.svg";

const ReportScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <CustomHeader title={t("report")} onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.whiteSheet}>
        <AnimatedDropdown
          label="Generate report by"
          options={["Daily", "Weekly", "Monthly"]}
          onSelect={(val) => console.log("Selected:", val)}
        />

        <AnimatedDatePicker
          label="Select Date From"
          onSelect={(date) => console.log("From:", date)}
        />

        <AnimatedDatePicker
          label="Select Date To"
          onSelect={(date) => console.log("To:", date)}
        />

        <View>
          <CustomButton
            title="50 Token to generate report"
            buttonStyle={styles.socialButton}
            textStyle={styles.socialButtonTitle}
            onPress={() => navigation.navigate("SignIn")}
            svg={<TokenIcon width={22} height={22} fill="#ffffff" />}
          />
        </View>
      </View>

      <MenuProvider>
        <ScrollView contentContainerStyle={styles.container}>
          <ReportTile
            title="Report Title"
            date="23-08-2025"
            onOptionSelect={(val) => console.log("Option:", val)}
          />
        </ScrollView>
      </MenuProvider>
    </SafeAreaView>
  );
};

export default ReportScreen;

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
  whiteSheet: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 30,
    // marginBottom: 20,
  },
});
