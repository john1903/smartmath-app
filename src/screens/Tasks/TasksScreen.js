// import React, { useCallback, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   RefreshControl,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useTranslation } from "react-i18next";
// import { useFocusEffect } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";

// import COLORS from "../../theme/colors";
// import FONTSIZE from "../../theme/fontsSize";
// import FONTS from "../../theme/fonts";

// import CategoryButton from "../../components/CategoryButton";
// import QuestionCard from "../../components/QuestionCard";
// import CustomHeader from "../../components/CustomHeader";
// import SearchBar from "../../components/SearchBar";
// import FilterBottomSheet from "../../components/FilterBottomSheet";
// import { useLazyGetAllExerciseQuery } from "../../services/tasksSlice";
// import { setLoading } from "../../store/loading";

// // ✅ categories use keys, not translations
// const CATEGORY_KEYS = [
//   "all",
//   "correct",
//   "pending",
//   "inCorrect",
//   "failed",
//   "notEnoughTokens",
//   "completed",
//   "inComplete",
//   // "limitexceeded",
//   // "solve",
// ];

// export default function TasksScreen({ navigation }) {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   const [activeCategory, setActiveCategory] = useState("all"); // ✅ category filter
//   const [searchQuery, setSearchQuery] = useState(""); // ✅ search query
//   const [isFilterVisible, setIsFilterVisible] = useState(false); // ✅ filter sheet toggle
//   const [filters, setFilters] = useState({}); // ✅ object with status/difficulty/exerciseType

//   const [getAllExercise] = useLazyGetAllExerciseQuery();
//   const { allExercise } = useSelector((state) => state?.tasks);
//   const [refreshing, setRefreshing] = useState(false);

//   // console.log("all exercise ::::::::::::; ", JSON.stringify(allExercise));

//   // ✅ Normalize API response
//   const exercises = (allExercise || []).map((item) => ({
//     id: item.exercise?.id,
//     title: item.exercise?.title || "",
//     difficultyLevel: item.exercise?.difficultyLevel || "",
//     maxPoints: item.exercise?.maxPoints,
//     exerciseType: item.exercise?.exerciseType || "",
//     status: item.status || null,
//     answer: item.answer,
//   }));

//   // ✅ Apply filtering logic
//   const filteredQuestions = exercises.filter((q) => {
//     // category
//     // if (activeCategory !== "all" && q.status !== activeCategory) {
//     //   return false;
//     // }

//     if (activeCategory !== "all") {
//       if (
//         activeCategory === "correct" &&
//         q.answer?.feedbackStatus !== "CORRECT"
//       )
//         return false;
//       if (
//         activeCategory === "pending" &&
//         q.answer?.feedbackStatus !== "PENDING"
//       )
//         return false;
//       if (
//         activeCategory === "inCorrect" &&
//         q.answer?.feedbackStatus !== "INCORRECT"
//       )
//         return false;
//       if (activeCategory === "failed" && q.answer?.feedbackStatus !== "FAILED")
//         return false;
//       if (
//         activeCategory === "notEnoughTokens" &&
//         q.answer?.feedbackStatus !== "NOT_ENOUGH_TOKENS"
//       )
//         return false;
//       if (
//         activeCategory === "completed" &&
//         q.answer?.feedbackStatus !== "COMPLETED"
//       )
//         return false;
//       if (
//         activeCategory === "inComplete" &&
//         q.answer?.feedbackStatus !== "INCOMPLETE"
//       )
//         return false;
//     }

//     // search
//     if (
//       searchQuery &&
//       !q.title.toLowerCase().includes(searchQuery.toLowerCase())
//     ) {
//       return false;
//     }

//     // filter bottom sheet
//     if (
//       filters.status &&
//       filters.status !== "all" &&
//       q?.answer?.feedbackStatus !== filters.status
//     ) {
//       if (
//         filters.status === "correct" &&
//         q.answer?.feedbackStatus !== "CORRECT"
//       )
//         return false;
//       if (
//         filters.status === "pending" &&
//         q.answer?.feedbackStatus !== "PENDING"
//       )
//         return false;
//       if (
//         filters.status === "inCorrect" &&
//         q.answer?.feedbackStatus !== "INCORRECT"
//       )
//         return false;
//       if (filters.status === "failed" && q.answer?.feedbackStatus !== "FAILED")
//         return false;
//       if (
//         filters.status === "notEnoughTokens" &&
//         q.answer?.feedbackStatus !== "NOT_ENOUGH_TOKENS"
//       )
//         return false;
//       if (
//         filters.status === "completed" &&
//         q.answer?.feedbackStatus !== "COMPLETED"
//       )
//         return false;
//       if (
//         filters.status === "inComplete" &&
//         q.answer?.feedbackStatus !== "INCOMPLETE"
//       )
//         return false;
//     }
//     if (
//       filters.difficultyLevel &&
//       q.difficultyLevel !== filters.difficultyLevel
//     ) {
//       return false;
//     }
//     if (filters.exerciseType && q.exerciseType !== filters.exerciseType) {
//       return false;
//     }

//     return true;
//   });

//   // ✅ Fetch exercises when screen focused
//   useFocusEffect(
//     useCallback(() => {
//       dispatch(setLoading(true));
//       getAllExercise();
//     }, [dispatch])
//   );

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await getAllExercise().unwrap();
//     } catch (err) {
//       console.log("❌ Refresh error", err);
//     } finally {
//       setRefreshing(false);
//     }
//   }, [getAllExercise]);

//   return (
//     <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
//       {/* Header */}
//       <View style={styles.header}>
//         <CustomHeader
//           title={t("tasks.title")}
//           onPress={() => navigation.goBack()}
//         />
//       </View>

//       {/* Search */}
//       <SearchBar
//         onSearch={setSearchQuery}
//         onFilter={() => setIsFilterVisible(true)}
//         placeholder={t("search")}
//       />

//       {/* Categories */}
//       <View>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categories}
//         >
//           {CATEGORY_KEYS.map((catKey) => (
//             <CategoryButton
//               key={catKey}
//               label={t(`categories.${catKey}`)}
//               active={catKey === activeCategory}
//               onPress={() => setActiveCategory(catKey)}
//             />
//           ))}
//         </ScrollView>
//       </View>

//       {/* Tasks List */}
//       <View style={styles.recommendedContainer}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           style={{ flex: 1 }}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[COLORS.primary]}
//               tintColor={COLORS.primary}
//             />
//           }
//         >
//           <View style={styles.recommendedInnerContainer}>
//             {filteredQuestions.length > 0 ? (
//               filteredQuestions.map((q, index) => (
//                 <QuestionCard
//                   key={q.id}
//                   number={index + 1}
//                   question={q.title}
//                   status={q?.answer?.feedbackStatus}
//                   onPress={() =>
//                     navigation.navigate("TaskDetail", { exerciseId: q?.id })
//                   }
//                 />
//               ))
//             ) : (
//               <Text style={styles.noData}>{t("tasks.noData")}</Text>
//             )}
//           </View>
//         </ScrollView>
//       </View>

//       {/* Filter Bottom Sheet */}
//       <FilterBottomSheet
//         isVisible={isFilterVisible}
//         onClose={() => {
//           setActiveCategory("all");
//           setIsFilterVisible(false);
//         }}
//         onApply={setFilters}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeContent: { flex: 1, backgroundColor: COLORS.background },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: 20,
//     marginVertical: 20,
//   },
//   categories: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     marginVertical: 20,
//     gap: 5,
//   },
//   recommendedContainer: {
//     flex: 1,
//     marginHorizontal: 20,
//   },
//   recommendedInnerContainer: {},
//   noData: {
//     textAlign: "center",
//     fontSize: FONTSIZE.size16,
//     fontFamily: FONTS.UrbanistRegular,
//     color: COLORS.secondary,
//     marginTop: 20,
//   },
// });

import React, { useCallback, useState } from "react";
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
  "correct",
  "pending",
  "inCorrect",
  "failed",
  "notEnoughTokens",
  "completed",
  "inComplete",
];

const PAGE_SIZE = 10;

export default function TasksScreen({ navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [getAllExercise, { isFetching }] = useLazyGetAllExerciseQuery();
  const { allExercise } = useSelector((state) => state?.tasks);
  const [refreshing, setRefreshing] = useState(false);

  // ✅ Normalize API response
  const exercises = (allExercise || []).map((item) => ({
    id: item.exercise?.id,
    title: item.exercise?.title || "",
    difficultyLevel: item.exercise?.difficultyLevel || "",
    maxPoints: item.exercise?.maxPoints,
    exerciseType: item.exercise?.exerciseType || "",
    status: item.status || null,
    answer: item.answer,
  }));

  // ✅ Filtering logic (same as before)
  const filteredQuestions = exercises.filter((q) => {
    if (activeCategory !== "all") {
      if (
        activeCategory === "correct" &&
        q.answer?.feedbackStatus !== "CORRECT"
      )
        return false;
      if (
        activeCategory === "pending" &&
        q.answer?.feedbackStatus !== "PENDING"
      )
        return false;
      if (
        activeCategory === "inCorrect" &&
        q.answer?.feedbackStatus !== "INCORRECT"
      )
        return false;
      if (activeCategory === "failed" && q.answer?.feedbackStatus !== "FAILED")
        return false;
      if (
        activeCategory === "notEnoughTokens" &&
        q.answer?.feedbackStatus !== "NOT_ENOUGH_TOKENS"
      )
        return false;
      if (
        activeCategory === "completed" &&
        q.answer?.feedbackStatus !== "COMPLETED"
      )
        return false;
      if (
        activeCategory === "inComplete" &&
        q.answer?.feedbackStatus !== "INCOMPLETE"
      )
        return false;
    }

    if (
      searchQuery &&
      !q.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    if (
      filters.status &&
      filters.status !== "all" &&
      q?.answer?.feedbackStatus !== filters.status
    ) {
      if (
        filters.status === "correct" &&
        q.answer?.feedbackStatus !== "CORRECT"
      )
        return false;
      if (
        filters.status === "pending" &&
        q.answer?.feedbackStatus !== "PENDING"
      )
        return false;
      if (
        filters.status === "inCorrect" &&
        q.answer?.feedbackStatus !== "INCORRECT"
      )
        return false;
      if (filters.status === "failed" && q.answer?.feedbackStatus !== "FAILED")
        return false;
      if (
        filters.status === "notEnoughTokens" &&
        q.answer?.feedbackStatus !== "NOT_ENOUGH_TOKENS"
      )
        return false;
      if (
        filters.status === "completed" &&
        q.answer?.feedbackStatus !== "COMPLETED"
      )
        return false;
      if (
        filters.status === "inComplete" &&
        q.answer?.feedbackStatus !== "INCOMPLETE"
      )
        return false;
    }

    if (
      filters.difficultyLevel &&
      q.difficultyLevel !== filters.difficultyLevel
    )
      return false;
    if (filters.exerciseType && q.exerciseType !== filters.exerciseType)
      return false;

    return true;
  });

  // ✅ Fetch API data (supports pagination)
  const fetchExercises = async (pageNum = 0) => {
    try {
      const res = await getAllExercise({
        page: pageNum,
        size: PAGE_SIZE,
      }).unwrap();
      if (!res?.content?.length) {
        setHasMore(false);
      }
    } catch (err) {
      console.log("❌ Fetch error", err);
    }
  };

  // ✅ Initial load
  useFocusEffect(
    useCallback(() => {
      dispatch(setLoading(true));
      setPage(0);
      setHasMore(true);
      fetchExercises(0);
    }, [dispatch])
  );

  // ✅ Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(0);
    setHasMore(true);
    try {
      await fetchExercises(0);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // ✅ Load more (pagination)
  const loadMore = async () => {
    if (!isFetching && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchExercises(nextPage);
    }
  };

  // ✅ FlatList footer
  const renderFooter = () => {
    if (!isFetching) return null;
    return (
      <ActivityIndicator
        style={{ marginVertical: 15 }}
        color={COLORS.primary}
      />
    );
  };

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
              label={t(`categories.${catKey}`)}
              active={catKey === activeCategory}
              onPress={() => setActiveCategory(catKey)}
            />
          ))}
        </ScrollView>
      </View>

      {/* ✅ Use FlatList instead of ScrollView for pagination */}
      <View style={styles.recommendedContainer}>
        <FlatList
          data={filteredQuestions}
          // keyExtractor={(item) => item.id?.toString()}
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
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
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
            !isFetching && (
              <Text style={styles.noData}>{t("tasks.noData")}</Text>
            )
          }
        />
      </View>

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        isVisible={isFilterVisible}
        onClose={() => {
          setActiveCategory("all");
          setIsFilterVisible(false);
        }}
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
