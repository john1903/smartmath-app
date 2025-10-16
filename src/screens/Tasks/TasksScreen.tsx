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
import { useLazyGetCategoriesQuery } from "../../services/categoriesSlice";

const STATUS_KEYS = [
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
type StatusKey = (typeof STATUS_KEYS)[number];

interface FilterValues {
  status?: string;
  difficultyLevel?: string;
  exerciseType?: string;
  categoryId?: number;
}

const TasksScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { allExercise } = useSelector((state: any) => state?.tasks);

  const [activeStatus, setActiveStatus] = useState<StatusKey>("all");
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [getAllExercise, { isFetching }] = useLazyGetAllExerciseQuery();
  const [getCategories] = useLazyGetCategoriesQuery();

  const exercises = (allExercise || []).map((item: any) => ({
    id: item.exercise?.id,
    title: item.exercise?.title || "",
    difficultyLevel: item.exercise?.difficultyLevel || "",
    categoryId: item.exercise?.categoryId || 0,
    maxPoints: item.exercise?.maxPoints,
    exerciseType: item.exercise?.exerciseType || "",
    status: item.status || null,
    answer: item.answer,
  }));

  const mapStatus = (exerciseStatus: string) =>
    STATUS_KEYS.includes(exerciseStatus as StatusKey) &&
    exerciseStatus !== "all"
      ? exerciseStatus
      : "";

  const fetchExercises = async (
    pageNum = 0,
    isRefresh = false,
    customFilters = filters,
    customStatus = activeStatus,
    search = searchText
  ) => {
    try {
      const res = await getAllExercise({
        page: pageNum,
        size: PAGE_SIZE,
        query: search.trim(),
        status: customStatus === "all" ? "" : mapStatus(customStatus) || "",
        difficultyLevel: customFilters.difficultyLevel || "",
        exerciseType: customFilters.exerciseType || "",
        categoryId: customFilters.categoryId || 0,
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

      setFilters({});
      setActiveStatus("all");
      setSearchText("");
      setPage(0);
      setHasMore(true);

      fetchExercises(0);
      getCategories({});

      return () => {
        setFilters({});
        setActiveStatus("all");
        setSearchText("");
      };
    }, [dispatch])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(0);
    setHasMore(true);
    fetchExercises(0, true);
    getCategories({});
  }, [filters, searchText, activeStatus]);

  const loadMore = async () => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchExercises(nextPage);
    }
  };

  const handleApplyFilters = (
    newFilters: FilterValues & { exerciseStatus?: StatusKey }
  ) => {
    setPage(0);
    setHasMore(true);
    setIsFilterVisible(false);

    setFilters({
      status: newFilters?.status || "",
      difficultyLevel: newFilters?.difficultyLevel || "",
      exerciseType: newFilters?.exerciseType || "",
      categoryId: newFilters?.categoryId || 0,
    });
  };

  const handleStatusChange = (statusKey: StatusKey) => {
    setActiveStatus(statusKey);
    setPage(0);
    setHasMore(true);
    fetchExercises(0, false, filters, statusKey);
  };

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchExercises(0, false, filters, activeStatus, searchText);
    }, 400);
    return () => clearTimeout(delay);
  }, [searchText, activeStatus, filters]);

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
          filters?.categoryId ||
            filters?.difficultyLevel ||
            filters?.exerciseType
        )}
      />

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusBar}
        >
          {STATUS_KEYS.map((statusKey) => (
            <CategoryButton
              key={statusKey}
              label={t(`exerciseStatus.${statusKey}`)}
              active={statusKey === activeStatus}
              onPress={() => handleStatusChange(statusKey)}
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
        currentFilters={filters}
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
  statusBar: {
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
