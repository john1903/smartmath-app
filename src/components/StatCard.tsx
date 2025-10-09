import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CalanderWhiteIcon from "../../assets/svgs/CalendarWhiteIcon.svg";
import ArrowIcon from "../../assets/svgs/ArrowIcon.svg";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import COLORS from "../theme/colors";
import { useTranslation } from "react-i18next";

interface StatCardProps {
  value: any;
  onCalendarPress?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ value, onCalendarPress }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.title}>{t("tasks.title")}</Text>
          <Text style={styles.title}>{t("completed")}</Text>
        </View>

        <TouchableOpacity onPress={onCalendarPress}>
          <CalanderWhiteIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.subtitle}>{t("tasks_solve")}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        {/* <View style={styles.arrowContainer}>
          <ArrowIcon />
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: COLORS.white,
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistMedium,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: FONTSIZE.size11,
    fontFamily: FONTS.UrbanistMedium,
  },
  value: {
    color: COLORS.white,
    fontSize: FONTSIZE.size48,
    fontFamily: FONTS.UrbanistRegular,
  },
  arrowContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default StatCard;
