import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
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
import {
  useLazyGetAllRecommendedExerciseQuery,
  useLazyUserDetailQuery,
} from "../../services/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/loading";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [userDetail] = useLazyUserDetailQuery();
  const [getAllRecommendedExercise, { isLoading }] =
    useLazyGetAllRecommendedExerciseQuery();

  const dispatch = useDispatch();
  const { t } = useTranslation(); // ✅ Initialize translations

  const { user } = useSelector((state) => state?.auth);
  const { allRecommendedExercise } = useSelector((state) => state?.home);

  const categories = [
    "all_exercises",
    "mcqs",
    "true_false",
    "matching",
    "open_ended",
    "single_choice",
  ];
  // const categories = ["all_exercises", "mcqs", "true_false", "matching"];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const questions = [
    {
      id: 1,
      text: t("question_sample"),
      status: "solve",
      taskType: "MCQs",
    },
    {
      id: 2,
      text: t("question_sample"),
      status: "solve",
      taskType: "Matching Pair",
    },
    {
      id: 3,
      text: t("question_sample"),
      status: "solve",
      taskType: "True/False",
    },
    {
      id: 4,
      text: t("question_sample"),
      status: "solve",
      taskType: "MCQs",
    },
    {
      id: 5,
      text: t("question_sample"),
      status: "solve",
      taskType: "Matching Pair",
    },
    {
      id: 6,
      text: t("question_sample"),
      status: "solve",
      taskType: "True/False",
    },
    {
      id: 7,
      text: t("question_sample"),
      status: "solve",
      taskType: "MCQs",
    },
    {
      id: 8,
      text: t("question_sample"),
      status: "solve",
      taskType: "Matching Pair",
    },
  ];
  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };

  const filteredQuestions =
    activeCategory === "all_exercises"
      ? allRecommendedExercise
      : allRecommendedExercise.filter((q) => {
          if (activeCategory === "mcqs")
            return q.exerciseType === "MULTIPLE_CHOICE";
          if (activeCategory === "open_ended")
            return q.exerciseType === "OPEN_ENDED";
          if (activeCategory === "single_choice")
            return q.exerciseType === "SINGLE_CHOICE";
          if (activeCategory === "true_false")
            return q.exerciseType === "TRUE_FALSE";
          if (activeCategory === "matching")
            return q.exerciseType === "MATCHING";
          return true;
        });
  useFocusEffect(
    useCallback(() => {
      dispatch(setLoading(true));
      userDetail(); // refetch data when tab is focused
      getAllRecommendedExercise();
    }, [dispatch, userDetail])
  );

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            {t("hi")}! {user?.firstName}
          </Text>
          <Text style={styles.subGreeting}>{t("welcome_back")}</Text>
        </View>
        <View style={styles.rightHeader}>
          <TouchableOpacity
            onPress={() => console.log("notification button")}
            style={styles.notifyCircle}
          >
            <Ionicons name="notifications-outline" size={22} color="black" />
          </TouchableOpacity>
          <Image
            source={
              user?.avatar
                ? { uri: user?.avatar?.uri }
                : require("../../../assets/images/avatar.png") // ✅ local placeholder
            }
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
              label={t(`${cat}`)}
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

            {allRecommendedExercise &&
              filteredQuestions.map((q, index) => (
                <QuestionCard
                  key={q.id}
                  number={index + 1}
                  question={q.title}
                  status={q.status}
                  onPress={() =>
                    // navigation.navigate("TaskDetail", { exerciseId: q?.id })
                    navigation.navigate("TasksTab", {
                      screen: "TaskDetail",
                      params: { exerciseId: q?.id }, // optional params
                    })
                  }
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
  },
  subGreeting: {
    color: COLORS.black,
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistRegular,
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
    borderRadius: 100,
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
