import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import CategoryButton from "./CategoryButton";
import CustomButton from "./CustomButton";

export default function FilterBottomSheet({ isVisible, onClose, onApply }) {
  const { t } = useTranslation();

  const OPTIONS = {
    status: [
      "all",
      "correct",
      "pending",
      "inCorrect",
      "failed",
      "notEnoughTokens",
      "completed",
      "inComplete",
    ],
    difficultyLevel: ["EASY", "MEDIUM", "HARD"],
    exerciseType: [
      "MULTIPLE_CHOICE",
      "TRUE_FALSE",
      "MATCHING",
      "OPEN_ENDED",
      "SINGLE_CHOICE",
    ],
  };

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTaskType, setSelectedTaskType] = useState("");

  const handleApply = () => {
    onApply({
      status: selectedStatus,
      difficultyLevel: selectedDifficulty,
      exerciseType: selectedTaskType,
    });
    onClose();
  };

  const handleCancel = () => {
    onApply({
      status: "",
      difficultyLevel: "",
      exerciseType: "",
    });
    setSelectedStatus("");
    setSelectedDifficulty("");
    setSelectedTaskType("");
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => handleCancel()}
      style={styles.modal}
    >
      <View style={styles.container}>
        {/* Handle bar */}
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <View style={styles.sheetHandle} />
        </View>

        {/* Header */}
        <View style={styles.filterSection}>
          <Text style={styles.title}>{t("filter.title")}</Text>
          <TouchableOpacity
            onPress={() => handleCancel()}
            style={styles.crossCircle}
          >
            <Entypo name="cross" size={14} color="black" />
          </TouchableOpacity>
        </View>

        {/* Status */}
        <Text style={styles.sectionTitle}>{t("filter.status")}</Text>
        <View style={styles.row}>
          {OPTIONS.status.map((item) => (
            <CategoryButton
              key={item}
              label={t(`categories.${item}`)}
              active={item === selectedStatus}
              onPress={() =>
                setSelectedStatus(item === selectedStatus ? "" : item)
              }
              textStyle={{ fontSize: FONTSIZE.size12 }}
            />
          ))}
        </View>

        <View style={styles.spacing}></View>

        {/* Difficulty */}
        <Text style={styles.sectionTitle}>{t("filter.difficulty")}</Text>
        <View style={styles.row}>
          {OPTIONS.difficultyLevel.map((item) => (
            <CategoryButton
              key={item}
              label={t(`difficulty.${item.toLowerCase()}`)}
              active={item === selectedDifficulty}
              onPress={() =>
                setSelectedDifficulty(item === selectedDifficulty ? "" : item)
              }
              textStyle={{ fontSize: FONTSIZE.size12 }}
            />
          ))}
        </View>

        <View style={styles.spacing}></View>

        {/* Task Type */}
        <Text style={styles.sectionTitle}>{t("filter.taskType")}</Text>
        <View style={styles.row}>
          {OPTIONS.exerciseType.map((item) => (
            <CategoryButton
              key={item}
              label={t(`taskType.${item.toLowerCase()}`)}
              active={item === selectedTaskType}
              onPress={() =>
                setSelectedTaskType(item === selectedTaskType ? "" : item)
              }
              textStyle={{ fontSize: FONTSIZE.size12 }}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.footer}>
          <CustomButton
            title={t("actions.cancel")}
            buttonStyle={{
              flex: 1,
              backgroundColor: COLORS.white,
              borderColor: COLORS.borderColor2,
            }}
            textStyle={{
              color: COLORS.black,
              fontSize: FONTSIZE.size14,
              fontFamily: FONTS.UrbanistSemiBold,
              includeFontPadding: false,
            }}
            onPress={() => handleCancel()}
          />

          <CustomButton
            title={t("actions.apply")}
            buttonStyle={{ flex: 1 }}
            textStyle={{
              color: COLORS.white,
              fontSize: FONTSIZE.size14,
              fontFamily: FONTS.UrbanistSemiBold,
              includeFontPadding: false,
            }}
            onPress={() => handleApply()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  sheetHandle: {
    backgroundColor: COLORS.secondary,
    height: 4,
    borderRadius: 40,
    width: "20%",
  },
  filterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  crossCircle: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
  },
  spacing: {
    marginVertical: 10,
  },
  title: {
    fontSize: FONTSIZE.size20,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.secondary,
  },
  sectionTitle: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.black,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 25,
    gap: 10,
  },
});
