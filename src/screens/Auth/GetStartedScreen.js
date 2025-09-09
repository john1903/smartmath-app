import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomBackground from "../../components/CustomBackground";
import COLORS from "../../theme/colors";
import CustomButton from "../../components/CustomButton";
import FONTS from "../../theme/fonts";
import FONTSIZE from "../../theme/fontsSize";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";

const GetStartedScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  // 🔄 Force re-render when screen is focused
  useFocusEffect(
    useCallback(() => {
      // trigger re-render by touching i18n.language
      console.log("Current Language:", i18n.language);
    }, [i18n.language])
  );

  return (
    <CustomBackground
      showImage={true}
      showGradient={true}
      gradientColors={["#cce5fcff", "#ffffff"]}
    >
      <View style={styles.container}>
        <View style={styles.bottomText}>
          <Text style={styles.text}>
            {t("your")} <Text style={styles.highlight}>{t("shortcut")}</Text>{" "}
            {t("to")}
            {"\n"}
            {t("math")} <Text style={styles.highlight}>{t("success")}</Text>
          </Text>
        </View>
        <CustomButton
          title={t("getstarted")}
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
    </CustomBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  bottomText: {
    marginBottom: 20,
    alignItems: "center",
  },
  text: {
    fontSize: FONTSIZE.size37,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.black,
    textAlign: "center",
  },
  highlight: {
    color: COLORS.primary,
    fontFamily: FONTS.UrbanistBold,
  },
});

export default GetStartedScreen;
