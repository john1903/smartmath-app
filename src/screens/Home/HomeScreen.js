import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next"; // ✅ Import i18n hook

import CustomBackground from "../../components/CustomBackground";
import COLORS from "../../theme/colors";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import StatCard from "../../components/StatCard";
import ProgressCard from "../../components/ProgressCard";
import CategoryButton from "../../components/CategoryButton";
import QuestionCard from "../../components/QuestionCard";
import FilterIcon from "../../../assets/svgs/FilterIcon.svg";

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation(); // ✅ Initialize translations

  const categories = [
    t("all_exercises"),
    t("mcqs"),
    t("true_false"),
    t("matching"),
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const questions = [
    {
      id: 1,
      text: t("question_sample"),
      status: "Solve",
      taskType: "MCQs",
    },
    {
      id: 2,
      text: t("question_sample"),
      status: "Solve",
      taskType: "Matching Pair",
    },
    {
      id: 3,
      text: t("question_sample"),
      status: "Solve",

      taskType: "True/False",
    },
    {
      id: 4,
      text: t("question_sample"),
      status: "Solve",
      taskType: "MCQs",
    },
    {
      id: 5,
      text: t("question_sample"),
      status: "Solve",
      taskType: "Matching Pair",
    },
    {
      id: 6,
      text: t("question_sample"),
      status: "Solve",
      taskType: "True/False",
    },
    {
      id: 7,
      text: t("question_sample"),
      status: "Solve",
      taskType: "MCQs",
    },
    {
      id: 8,
      text: t("question_sample"),
      status: "Solve",
      taskType: "Matching Pair",
    },
  ];

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };

  const filteredQuestions =
    activeCategory === t("all_exercises")
      ? questions
      : questions.filter((q) => {
          if (activeCategory === t("mcqs")) return q.taskType === "MCQs";
          if (activeCategory === t("true_false"))
            return q.taskType === "True/False";
          if (activeCategory === t("matching"))
            return q.taskType === "Matching Pair";
          return true;
        });

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{t("hi")}! Jhon</Text>
          <Text style={styles.subGreeting}>{t("welcome_back")}</Text>
        </View>
        <View style={styles.rightHeader}>
          <View style={styles.notifyCircle}>
            <Ionicons name="notifications-outline" size={22} color="black" />
          </View>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/a/ACg8ocLERh1J801wC08MLmV6_oTFduriLSIU-ukH0Yuqf0ouklQMEyi1=s360-c-no",
            }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Cards */}
      <View style={styles.cardsRow}>
        <StatCard value="225" />
        <ProgressCard title={t("accuracy")} percentage={50} total="50/100" />
      </View>

      {/* Categories */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              label={cat}
              active={cat === activeCategory}
              onPress={() => handleCategoryPress(cat)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Recommended Tasks */}
      <View style={styles.recommendedContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={styles.recommendedInnerContainer}>
            <View style={styles.recommendedHeader}>
              <View>
                <Text
                  style={{
                    fontSize: FONTSIZE.size20,
                    fontFamily: FONTS.UrbanistMedium,
                    color: COLORS.black,
                  }}
                >
                  {t("recommended_tasks")}
                </Text>
                <Text
                  style={{
                    fontSize: FONTSIZE.size12,
                    fontFamily: FONTS.UrbanistMedium,
                    color: COLORS.secondary,
                  }}
                >
                  {t("pending_tasks", { count: 20 })}
                </Text>
              </View>
              <View>
                <FilterIcon />
              </View>
            </View>

            {filteredQuestions.map((q, index) => (
              <QuestionCard
                key={q.id}
                number={index + 1}
                question={q.text}
                status={q.status}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContent: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  greeting: {
    color: COLORS.black,
    fontSize: FONTSIZE.size32,
    fontFamily: FONTS.UrbanistMedium,
    lineHeight: 32,
  },
  subGreeting: {
    color: COLORS.black,
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistRegular,
    lineHeight: 14,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  notifyCircle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 12,
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    gap: 10,
  },
  categories: {
    flexDirection: "row",
    paddingLeft: 20,
    marginVertical: 20,
    gap: 5,
    paddingRight: 30,
  },
  recommendedContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  recommendedInnerContainer: {
    padding: 20,
  },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
