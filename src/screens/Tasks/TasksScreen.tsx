import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import COLORS from "../../theme/colors";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";

import CategoryButton from "../../components/CategoryButton";
import QuestionCard from "../../components/QuestionCard";
import CustomHeader from "../../components/CustomHeader";
import SearchBar from "../../components/SearchBar";
import FilterBottomSheet from "../../components/FilterBottomSheet";
import { useLazyGetAllExerciseQuery } from "../../services/tasksSlice";
import { setLoading } from "../../store/loading";

const CATEGORY_KEYS = [
  "all",
  "CORRECT",
  "PENDING",
  "INCORRECT",
  "FAILED",
  "NOT_ENOUGH_TOKENS",
  "COMPLETED",
  "INCOMPLETE",
] as const;

const PAGE_SIZE = 20;
type CategoryKey = (typeof CATEGORY_KEYS)[number];

interface FilterValues {
  status?: string;
  difficultyLevel?: string;
  exerciseType?: string;
}

const TasksScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { allExercise } = useSelector((state: any) => state?.tasks);

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [getAllExercise, { isFetching }] = useLazyGetAllExerciseQuery();

  const exercises = (allExercise || []).map((item: any) => ({
    id: item.exercise?.id,
    title: item.exercise?.title || "",
    difficultyLevel: item.exercise?.difficultyLevel || "",
    maxPoints: item.exercise?.maxPoints,
    exerciseType: item.exercise?.exerciseType || "",
    status: item.status || null,
    answer: item.answer,
  }));

  const mapCategoryToStatus = (category: string) =>
    CATEGORY_KEYS.includes(category as CategoryKey) && category !== "all"
      ? category
      : "";

  const fetchExercises = async (
    pageNum = 0,
    isRefresh = false,
    customFilters = filters,
    customCategory = activeCategory,
    search = searchText
  ) => {
    try {
      const res = await getAllExercise({
        page: pageNum,
        size: PAGE_SIZE,
        query: search.trim(),
        status:
          customCategory === "all"
            ? ""
            : mapCategoryToStatus(customCategory) || customFilters.status || "",
        difficultyLevel: customFilters.difficultyLevel || "",
        exerciseType: customFilters.exerciseType || "",
      }).unwrap();

      if (!res?.content?.length) setHasMore(false);
    } catch (err) {
      console.log("Fetch error", err);
    } finally {
      if (isRefresh) setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(setLoading(true));
      setPage(0);
      setHasMore(true);
      fetchExercises(0);
    }, [dispatch])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(0);
    setHasMore(true);
    fetchExercises(0, true);
  }, [filters, searchText, activeCategory]);

  const loadMore = async () => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchExercises(nextPage);
    }
  };

  const handleApplyFilters = (
    newFilters: FilterValues & { category?: CategoryKey }
  ) => {
    setPage(0);
    setHasMore(true);
    setIsFilterVisible(false);

    // ✅ If user picked category inside filter, sync with activeCategory
    if (newFilters.category) {
      setActiveCategory(newFilters.category);
    }

    // ✅ Update filters in one go
    setFilters({
      status:
        newFilters.category && newFilters.category !== "all"
          ? newFilters.category
          : newFilters.status || "",
      difficultyLevel: newFilters.difficultyLevel || "",
      exerciseType: newFilters.exerciseType || "",
    });
  };

  const handleCategoryChange = (catKey: CategoryKey) => {
    setActiveCategory(catKey);
    setPage(0);
    setHasMore(true);
    fetchExercises(0, false, filters, catKey);
  };

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      // ✅ Always handle “all” correctly
      fetchExercises(0, false, filters, activeCategory, searchText);
    }, 400);
    return () => clearTimeout(delay);
  }, [searchText, activeCategory, filters]);

  // const renderFooter = () =>
  //   isFetching ? (
  //     <ActivityIndicator
  //       style={{ marginVertical: 15 }}
  //       color={COLORS.primary}
  //     />
  //   ) : null;

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <CustomHeader
          title={t("tasks.title")}
          onPress={() => navigation.goBack()}
        />
      </View>

      <SearchBar
        onSearch={handleSearchChange}
        onFilter={() => setIsFilterVisible(true)}
        placeholder={t("search")}
        showDot={Boolean(
          filters?.status || filters?.difficultyLevel || filters?.exerciseType
        )}
      />

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {CATEGORY_KEYS.map((catKey) => (
            <CategoryButton
              key={catKey}
              label={t(`categories.${catKey}`)}
              active={catKey === activeCategory}
              onPress={() => handleCategoryChange(catKey)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.recommendedContainer}>
        <FlatList
          data={exercises}
          keyExtractor={(item, index) => `${item?.id ?? "no-id"}-${index}`}
          renderItem={({ item, index }) => (
            <QuestionCard
              key={item.id}
              number={index + 1}
              question={item.title}
              status={item?.answer?.feedbackStatus}
              onPress={() =>
                navigation.navigate("TaskDetail", { exerciseId: item?.id })
              }
              disable={item?.answer?.feedbackStatus === "PENDING"}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          // ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          ListEmptyComponent={
            !isFetching ? (
              <Text style={styles.noData}>{t("tasks.noData")}</Text>
            ) : null
          }
        />
      </View>

      <FilterBottomSheet
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApply={handleApplyFilters}
        selectedCategory={activeCategory}
        onCategoryChange={(newCategory) => setActiveCategory(newCategory)}
      />
    </SafeAreaView>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  safeContent: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
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
  noData: {
    textAlign: "center",
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistRegular,
    color: COLORS.secondary,
    marginTop: 20,
  },
});
