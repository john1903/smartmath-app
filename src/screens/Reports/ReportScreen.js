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
import { useTranslation } from "react-i18next";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import AnimatedDatePicker from "../../components/AnimatedDatePicker";
import ReportTile from "../../components/ReportTile";
import { MenuProvider } from "react-native-popup-menu";
import CustomButton from "../../components/CustomButton";

import TokenWhiteIcon from "../../../assets/svgs/TokenWhiteIcon.svg";
import TokenBlackIcon from "../../../assets/svgs/TokenBlackIcon.svg";

import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";

const ReportScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [appToken, setAppToken] = useState(0);

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

        {appToken > 0 ? (
          <View style={styles.whiteSheetFooter}>
            <CustomButton
              title="50 Token to generate report"
              buttonStyle={styles.generateReportBtn}
              textStyle={styles.generateReportBtnTitle}
              onPress={() => navigation.navigate("SignIn")}
              svg={<TokenWhiteIcon width={22} height={22} />}
            />
            <Text style={styles.whiteSheetFooterText}>
              {appToken} Token available
            </Text>
          </View>
        ) : (
          <View style={styles.whiteSheetFooter}>
            <CustomButton
              title="50 Token to generate report"
              buttonStyle={[
                styles.generateReportBtn,
                {
                  backgroundColor: COLORS.D9Gray,
                  borderWidth: 0,
                },
              ]}
              textStyle={[
                styles.generateReportBtnTitle,
                {
                  color: COLORS.black,
                },
              ]}
              onPress={() => navigation.navigate("SignIn")}
              svg={<TokenBlackIcon width={22} height={22} />}
            />
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.whiteSheetFooterText,
                  {
                    marginRight: 10,
                  },
                ]}
              >
                {appToken} Token available
              </Text>
              <TouchableOpacity onPress={() => console.log("Buy Tokens")}>
                <Text
                  style={[
                    styles.whiteSheetFooterText,
                    {
                      color: COLORS.primary,
                    },
                  ]}
                >
                  Buy Tokens
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  whiteSheet: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    // marginBottom: 20,
  },
  whiteSheetFooter: {
    alignItems: "center",
  },
  generateReportBtn: {
    width: "85%",
    alignItems: "center",
  },
  generateReportBtnTitle: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
  whiteSheetFooterText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
    marginTop: 10,
    color: COLORS.black,
  },
});
