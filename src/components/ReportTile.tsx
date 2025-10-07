// components/ReportTile.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ReportFileIcon from "../../assets/svgs/ReportFileIcon.svg";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import COLORS from "../theme/colors";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  date: string;
  onOptionSelect: (val: string) => void;
  status: string;
}

const ReportTile: React.FC<Props> = ({
  title,
  date,
  onOptionSelect,
  status,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.card}>
      <View
        style={{
          backgroundColor:
            status === "SUCCESS"
              ? "rgba(36,117,252,0.1)"
              : status === "PENDING"
              ? "rgba(252, 248, 36, 0.33)"
              : "rgba(252, 36, 36, 0.34)",
          padding: 12,
          borderRadius: 60,
        }}
      >
        <ReportFileIcon width={28} height={28} />
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Menu>
        <MenuTrigger>
          <Ionicons name="ellipsis-vertical" size={22} />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption
            onSelect={() => onOptionSelect("View")}
            customStyles={optionStyles}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Ionicons name="download-outline" size={22} />
              <Text style={[styles.optionText]}>{t("download")}</Text>
            </View>
          </MenuOption>
          {/* <View style={styles.divider} /> */}
          {/* <MenuOption onSelect={() => onOptionSelect("Delete")}>
            <Text style={[styles.optionText, { color: "red" }]}>Delete</Text>
          </MenuOption> */}
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    marginVertical: 6,
    // elevation: 2,
  },
  title: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.black,
  },
  date: {
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.secondary,
  },

  optionText: {
    fontSize: 16,
    padding: 2,
    color: COLORS.black,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderColor2, // light gray line
    marginHorizontal: -5, // extend to full width inside options
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
};

const optionStyles = {
  optionWrapper: {
    padding: 8,
  },
  optionTouchable: {
    underlayColor: "#f2f2f2", // pressed effect
    activeOpacity: 70,
  },
};

export default ReportTile;
