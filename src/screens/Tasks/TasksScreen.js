import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import COLORS from "../../theme/colors";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";

import StatCard from "../../components/StatCard";
import ProgressCard from "../../components/ProgressCard";
import CategoryButton from "../../components/CategoryButton";
import QuestionCard from "../../components/QuestionCard";
import CustomHeader from "../../components/CustomHeader";
import SearchBar from "../../components/SearchBar";
import FilterBottomSheet from "../../components/FilterBottomSheet";

// ✅ categories use keys, not translations
const CATEGORY_KEYS = [
  "all",
  "completed",
  "notCompleted",
  "pending",
  "limitexceeded",
  "solve",
  "failed",
];

export default function TasksScreen({ navigation }) {
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState("all"); // ✅ use key
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState(null);

  // ✅ questions use keys only
  const questions = [
    {
      id: 1,
      text: t("questions.q1"),
      status: "solve",
      difficulty: "hard",
      taskType: "mcq",
    },
    {
      id: 2,
      text: t("questions.q2"),
      status: "completed",
      difficulty: "easy",
      taskType: "matching",
    },
    {
      id: 3,
      text: t("questions.q2"),
      status: "solve",
      difficulty: "normal",
      taskType: "trueFalse",
    },
    {
      id: 4,
      text: t("questions.q3"),
      status: "failed",
      difficulty: "hard",
      taskType: "mcq",
    },
    {
      id: 5,
      text: t("questions.q1"),
      status: "limitexceeded",
      difficulty: "hard",
      taskType: "matching",
    },
    {
      id: 6,
      text: t("questions.q1"),
      status: "completed",
      difficulty: "normal",
      taskType: "trueFalse",
    },
    {
      id: 7,
      text: t("questions.q2"),
      status: "solve",
      difficulty: "hard",
      taskType: "mcq",
    },
    {
      id: 8,
      text: t("questions.q4"),
      status: "pending",
      difficulty: "easy",
      taskType: "matching",
    },
  ];

  const filteredQuestions = questions.filter((q) => {
    // ✅ Category match (no special case for notCompleted)
    const matchesCategory =
      activeCategory === "all" ? true : q.status === activeCategory;

    // ✅ Search match
    const matchesSearch = q.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // ✅ Filter match
    const matchesFilters = filters
      ? Object.entries(filters).every(([key, value]) => {
          if (!value || value === "all") return true;
          return q[key] === value; // no exception
        })
      : true;

    return matchesCategory && matchesSearch && matchesFilters;
  });

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <CustomHeader
          title={t("tasks.title")}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Search */}
      <SearchBar
        onSearch={setSearchQuery}
        onFilter={() => setIsFilterVisible(true)}
        placeholder={t("search")}
      />

      {/* Categories */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {CATEGORY_KEYS.map((catKey) => (
            <CategoryButton
              key={catKey}
              label={t(`categories.${catKey}`)} // ✅ translate here
              active={catKey === activeCategory}
              onPress={() => setActiveCategory(catKey)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Recommended Tasks */}
      <View style={styles.recommendedContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={styles.recommendedInnerContainer}>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q, index) => (
                <QuestionCard
                  key={q.id}
                  number={index + 1}
                  question={q.text}
                  status={q.status} // ✅ pass key
                  onPress={() => navigation.navigate("TaskDetail")}
                />
              ))
            ) : (
              <Text style={styles.noData}>{t("tasks.noData")}</Text>
            )}
          </View>
        </ScrollView>
      </View>

      <FilterBottomSheet
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApply={setFilters}
      />
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
    paddingHorizontal: 20,
    marginVertical: 20,
    gap: 5,
  },
  recommendedContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  recommendedInnerContainer: {},
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noData: {
    textAlign: "center",
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistRegular,
    color: COLORS.secondary,
    marginTop: 20,
  },
});
