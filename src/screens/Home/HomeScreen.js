import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

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
import { useLazyGetUserExerciseStatusQuery } from "../../services/tasksSlice";
import { setUser } from "../../store/auth"; // ✅ make sure this exists
import AnimatedDatePicker from "../../components/AnimatedDatePicker";

export default function HomeScreen({ navigation }) {
  const [triggerUserDetail] = useLazyUserDetailQuery();
  const [getAllRecommendedExercise, { isLoading }] =
    useLazyGetAllRecommendedExerciseQuery();
  const [getUserExerciseStatus] = useLazyGetUserExerciseStatusQuery();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { user } = useSelector((state) => state?.auth);
  const { allRecommendedExercise } = useSelector((state) => state?.home);

  const [userExerciseStatus, setUserExerciseStatus] = useState();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    "all_exercises",
    "mcqs",
    "true_false",
    "matching",
    "open_ended",
    "single_choice",
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // ✅ Utility to return datetime in correct format
  const formatDateTime = (date, type) => {
    let d = new Date(date);
    const now = new Date();

    if (type === "from") {
      // ✅ 00:00:00 UTC of that day
      d = new Date(
        Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0)
      );
    } else if (type === "to") {
      if (
        d.getUTCFullYear() === now.getUTCFullYear() &&
        d.getUTCMonth() === now.getUTCMonth() &&
        d.getUTCDate() === now.getUTCDate()
      ) {
        // ✅ If today → current UTC time minus 5 min
        d = new Date(Date.now() - 5 * 60000);
      } else {
        // ✅ 23:59:59 UTC of that day
        d = new Date(
          Date.UTC(
            d.getUTCFullYear(),
            d.getUTCMonth(),
            d.getUTCDate(),
            23,
            59,
            59
          )
        );
      }
    }

    const pad = (n) => String(n).padStart(2, "0");

    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(
      d.getUTCDate()
    )}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(
      d.getUTCSeconds()
    )}`;
  };

  const fetchExerciseStatus = (from, to) => {
    dispatch(setLoading(true));
    getUserExerciseStatus({ from, to })
      .then((res) => {
        // console.log("ressssssssssssssssssss", res?.data);
        if (res) {
          setUserExerciseStatus(res?.data);
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
        setCalendarVisible(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      const now = new Date();

      // ✅ FROM = 30 days ago at 00:00:00 UTC
      // const from = new Date(
      //   Date.UTC(
      //     now.getUTCFullYear(),
      //     now.getUTCMonth(),
      //     now.getUTCDate() - 90,
      //     0,
      //     0,
      //     0,
      //     0
      //   )
      // );
      const from = new Date(Date.UTC(2025, 0, 1, 0, 0, 0));

      // ✅ TO = current UTC time minus 5 minutes
      const to = new Date(now.getTime() - 5 * 60 * 1000);

      // Store raw dates (optional, if you need them elsewhere)
      setFromDate(from);
      setToDate(to);

      // Format for API payload (no ms, no Z)
      const formatForApi = (date) => date.toISOString().slice(0, 19);

      const payload = {
        from: formatForApi(from),
        to: formatForApi(to),
      };

      // console.log("Default payload ::::::::::::::", payload);
      fetchExerciseStatus(payload.from, payload.to);

      // ✅ Fetch user detail again whenever Home gains focus
      triggerUserDetail()
        .unwrap()
        .then((res) => {
          if (res) {
            dispatch(setUser(res)); // update redux store
          }
        })
        .catch((err) => console.log("User detail error:", err));

      getAllRecommendedExercise();
    }, [dispatch, triggerUserDetail, getAllRecommendedExercise])
  );

  const resetDefaultDates = () => {
    const now = new Date();

    // ✅ FROM = 1 Jan 2025 at 00:00:00 UTC
    const from = new Date(Date.UTC(2025, 0, 1, 0, 0, 0));

    // ✅ TO = current UTC time minus 5 minutes
    const to = new Date(now.getTime() - 5 * 60 * 1000);

    setFromDate(from);
    setToDate(to);

    // Optional: re-fetch with default range
    const formatForApi = (date) => date.toISOString().slice(0, 19);
    fetchExerciseStatus(formatForApi(from), formatForApi(to));
  };

  const handleApplyFilter = () => {
    if (fromDate && toDate) {
      const from = formatDateTime(fromDate, "from");
      const to = formatDateTime(toDate, "to");

      const payload = { from, to };
      // console.log("itself select from to payload::::::::::::::", payload);

      fetchExerciseStatus(from, to);
    }
  };

  const total = userExerciseStatus?.totalAnswers ?? 0;
  const correct = userExerciseStatus?.correctAnswers ?? 0;

  const accuracyPercent =
    total > 0 ? ((correct / total) * 100).toFixed(1) : "0";
  const accuracyProgress = total > 0 ? correct / total : 0;

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getAllRecommendedExercise().unwrap();
    } catch (err) {
      console.log("❌ Refresh error", err);
    } finally {
      setRefreshing(false);
    }
  }, [getAllRecommendedExercise]);

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <View
          style={{
            width: "85%",
            paddingRight: 10,
          }}
        >
          <Text style={styles.greeting} numberOfLines={1} ellipsizeMode="tail">
            {t("hi")}! {user?.firstName}
          </Text>
          <Text style={styles.subGreeting}>{t("welcome_back")}</Text>
        </View>
        <View
          style={[
            styles.rightHeader,
            {
              width: "15%",
            },
          ]}
        >
          {/* <TouchableOpacity
            onPress={() => console.log("notification button")}
            style={styles.notifyCircle}
          >
            <Ionicons name="notifications-outline" size={22} color="black" />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SettingsTab", {
                screen: "EditProfile",
              })
            }
          >
            <Image
              source={
                user?.avatar
                  ? { uri: user?.avatar?.uri }
                  : require("../../../assets/images/avatar.png")
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards */}
      <View style={styles.cardsRow}>
        <StatCard
          value={userExerciseStatus?.totalAnswers}
          onCalendarPress={() => {
            setFromDate(null);
            setToDate(null);
            setCalendarVisible(true);
          }}
        />

        <ProgressCard
          title={t("accuracy")}
          percentage={parseFloat(accuracyPercent)} // shows "0%" or "75%"
          progress={accuracyProgress} // 0 → 1 for the bar
          total={`${correct}/${total}`}
        />
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
              onPress={() => setActiveCategory(cat)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Recommended Tasks */}
      <View style={styles.recommendedContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        >
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
                  {t("pending_tasks", {
                    count: allRecommendedExercise?.length,
                  })}
                </Text>
              </View>
              {/* <View>
                <FilterIcon />
              </View> */}
            </View>

            {allRecommendedExercise && allRecommendedExercise.length > 0 ? (
              allRecommendedExercise &&
              filteredQuestions.map((q, index) => (
                <QuestionCard
                  key={q.id}
                  number={index + 1}
                  question={q.title}
                  // status={q.status}
                  status={"solve"}
                  onPress={() =>
                    navigation.navigate("TasksTab", {
                      screen: "TaskDetail",
                      params: { exerciseId: q?.id },
                    })
                  }
                />
              ))
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  color: COLORS.secondary,
                }}
              >
                {t("noRecommendedTaskFound")}
              </Text>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Calendar Modal */}
      <Modal visible={calendarVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: FONTSIZE.size24,
                fontFamily: FONTS.UrbanistMedium,
                marginBottom: 10,
              }}
            >
              {t("select_date_range")}
            </Text>

            <AnimatedDatePicker
              label="From Date"
              selectedDate={fromDate}
              onSelect={(date) => setFromDate(date)}
              maximumDate={toDate ? new Date(toDate) : undefined} // if To selected → restrict From
            />

            <AnimatedDatePicker
              label="To Date"
              selectedDate={toDate}
              minimumDate={fromDate || undefined}
              onSelect={(date) => setToDate(date)}
              maximumDate={toDate ? new Date(toDate) : undefined} // if To selected → restrict From
            />

            <TouchableOpacity
              style={{
                marginTop: 20,
                padding: 12,
                borderRadius: 8,
                backgroundColor: COLORS.primary,
                alignItems: "center",
              }}
              onPress={handleApplyFilter}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.UrbanistMedium,
                }}
              >
                {t("apply")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginTop: 10,
                padding: 12,
                borderRadius: 8,
                backgroundColor: COLORS.white,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#cccccc",
              }}
              onPress={() => {
                resetDefaultDates();
                setCalendarVisible(false);
              }}
            >
              <Text
                style={{
                  color: COLORS.secondary,
                  fontFamily: FONTS.UrbanistMedium,
                }}
              >
                {t("cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: "flex-end",
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
