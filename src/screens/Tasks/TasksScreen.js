import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

import COLORS from "../../theme/colors";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import StatCard from "../../components/StatCard";
import ProgressCard from "../../components/ProgressCard";
import CategoryButton from "../../components/CategoryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import QuestionCard from "../../components/QuestionCard";
import CustomHeader from "../../components/CustomHeader";
import SearchBar from "../../components/SearchBar";
import FilterBottomSheet from "../../components/FilterBottomSheet";

export default function TasksScreen({ navigation }) {
  const categories = [
    "All tasks",
    "Completed",
    "Not Completed",
    "Pending",
    "Limit Exceeded",
    "Solve",
    "Failed",
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState(null);

  const questions = [
    {
      id: 1,
      text: "What is the sum of 130+125+191?",
      status: "Solve",
      difficulty: "Hard",
      taskType: "MCQs",
    },
    {
      id: 2,
      text: "What is the subtract of 130-125-191?",
      status: "Completed",
      difficulty: "Easy",
      taskType: "Matching Pair",
    },
    {
      id: 3,
      text: "What is the subtract of 130-125+191?",
      status: "Solve",
      difficulty: "Normal",
      taskType: "True/False",
    },
    {
      id: 4,
      text: "What is the multiply of 130*125*191?",
      status: "Failed",
      difficulty: "Hard",
      taskType: "MCQs",
    },
    {
      id: 5,
      text: "What is the sum of 130+125+191?",
      status: "Limit Exceeded",
      difficulty: "Hard",
      taskType: "Matching Pair",
    },
    {
      id: 6,
      text: "What is the sum of 130+125+191?",
      status: "Completed",
      difficulty: "Normal",
      taskType: "True/False",
    },
    {
      id: 7,
      text: "What is the subtract of 130+125-191?",
      status: "Solve",
      difficulty: "Hard",
      taskType: "MCQs",
    },
    {
      id: 8,
      text: "What is the divide of 130/125/191?",
      status: "Pending",
      difficulty: "Easy",
      taskType: "Matching Pair",
    },
  ];

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
    console.log("Selected:", category); // ✅ parent handles press
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = () => {
    setIsFilterVisible(true);
  };

  const handleApplyFilter = (selectedFilters) => {
    setFilters(selectedFilters);
    console.log("Applied Filters: ", selectedFilters);
  };

  const filteredQuestions = questions.filter((q) => {
    // ✅ Category filter
    const matchesCategory =
      activeCategory === "All tasks" ? true : q.status === activeCategory;

    // ✅ Search filter
    const matchesSearch = q.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // ✅ Bottom sheet filters
    const matchesFilters = filters
      ? Object.entries(filters).every(([key, value]) => {
          if (!value || value === "All tasks") return true; // ignore "All tasks" and empty

          // Special handling for "Not Completed"
          if (key === "status" && value === "Not Completed") {
            return q.status !== "Completed";
          }

          return q[key] === value;
        })
      : true;

    return matchesCategory && matchesSearch && matchesFilters;
  });

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <CustomHeader title={"Tasks"} onPress={() => navigation.goBack()} />
      </View>

      {/* Search */}
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
        >
          <View style={styles.recommendedInnerContainer}>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q, index) => (
                <QuestionCard
                  key={q.id}
                  number={index + 1}
                  question={q.text}
                  status={q.status}
                  onPress={() => navigation.navigate("TaskDetail")}
                />
              ))
            ) : (
              <Text style={styles.noData}>No questions found</Text>
            )}
          </View>
        </ScrollView>
      </View>

      <FilterBottomSheet
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApply={handleApplyFilter}
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
