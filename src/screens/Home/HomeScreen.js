// import React, { useCallback, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useTranslation } from "react-i18next"; // ✅ Import i18n hook

// import CustomBackground from "../../components/CustomBackground";
// import COLORS from "../../theme/colors";
// import FONTSIZE from "../../theme/fontsSize";
// import FONTS from "../../theme/fonts";
// import StatCard from "../../components/StatCard";
// import ProgressCard from "../../components/ProgressCard";
// import CategoryButton from "../../components/CategoryButton";
// import QuestionCard from "../../components/QuestionCard";
// import FilterIcon from "../../../assets/svgs/FilterIcon.svg";
// import {
//   useLazyGetAllRecommendedExerciseQuery,
//   useLazyUserDetailQuery,
// } from "../../services/homeSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../../store/loading";
// import { useFocusEffect } from "@react-navigation/native";
// import { useLazyGetUserExerciseStatusQuery } from "../../services/tasksSlice";
// import { getDateRange } from "../../utils/helpers";

// export default function HomeScreen({ navigation }) {
//   const [userDetail] = useLazyUserDetailQuery();
//   const [getAllRecommendedExercise, { isLoading }] =
//     useLazyGetAllRecommendedExerciseQuery();

//   const [getUserExerciseStatus] = useLazyGetUserExerciseStatusQuery();

//   const dispatch = useDispatch();
//   const { t } = useTranslation(); // ✅ Initialize translations

//   const { user } = useSelector((state) => state?.auth);
//   const { allRecommendedExercise } = useSelector((state) => state?.home);

//   const categories = [
//     "all_exercises",
//     "mcqs",
//     "true_false",
//     "matching",
//     "open_ended",
//     "single_choice",
//   ];
//   // const categories = ["all_exercises", "mcqs", "true_false", "matching"];
//   const [activeCategory, setActiveCategory] = useState(categories[0]);

//   const [userExerciseStatus, setUserExerciseStatus] = useState();
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");

//   const questions = [
//     {
//       id: 1,
//       text: t("question_sample"),
//       status: "solve",
//       taskType: "MCQs",
//     },
//     {
//       id: 2,
//       text: t("question_sample"),
//       status: "solve",
//       taskType: "Matching Pair",
//     },
//     {
//       id: 3,
//       text: t("question_sample"),
//       status: "solve",
//       taskType: "True/False",
//     },
//     {
//       id: 4,
//       text: t("question_sample"),
//       status: "solve",
//       taskType: "MCQs",
//     },
//     {
//       id: 5,
//       text: t("question_sample"),
//       status: "solve",
//       taskType: "Matching Pair",
//     },
//     {
//       id: 6,
//       text: t("question_sample"),
//       status: "solve",
//       taskType: "True/False",
//     },
//     {
//       id: 7,
//       text: t("question_sample"),
//       status: "solve",
//       taskType: "MCQs",
//     },
//     {
//       id: 8,
//       text: t("question_sample"),
//       status: "solve",
//       taskType: "Matching Pair",
//     },
//   ];
//   const handleCategoryPress = (category) => {
//     setActiveCategory(category);
//   };

//   const filteredQuestions =
//     activeCategory === "all_exercises"
//       ? allRecommendedExercise
//       : allRecommendedExercise.filter((q) => {
//           if (activeCategory === "mcqs")
//             return q.exerciseType === "MULTIPLE_CHOICE";
//           if (activeCategory === "open_ended")
//             return q.exerciseType === "OPEN_ENDED";
//           if (activeCategory === "single_choice")
//             return q.exerciseType === "SINGLE_CHOICE";
//           if (activeCategory === "true_false")
//             return q.exerciseType === "TRUE_FALSE";
//           if (activeCategory === "matching")
//             return q.exerciseType === "MATCHING";
//           return true;
//         });
//   useFocusEffect(
//     useCallback(() => {
//       dispatch(setLoading(true));
//       userDetail();
//       getAllRecommendedExercise();

//       // generate date range (30 days back → now)
//       const { from, to } = getDateRange(30);
//       setFrom(from);
//       setTo(to);

//       getUserExerciseStatus({ from, to })
//         .then((res) => {
//           if (res) {
//             setUserExerciseStatus(res?.data);
//             console.log("User Exercise Status:", JSON.stringify(res.data));
//           }
//         })
//         .finally(() => dispatch(setLoading(false)));
//     }, [dispatch, userDetail, getAllRecommendedExercise, getUserExerciseStatus])
//   );

//   return (
//     <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.greeting}>
//             {t("hi")}! {user?.firstName}
//           </Text>
//           <Text style={styles.subGreeting}>{t("welcome_back")}</Text>
//         </View>
//         <View style={styles.rightHeader}>
//           <TouchableOpacity
//             onPress={() => console.log("notification button")}
//             style={styles.notifyCircle}
//           >
//             <Ionicons name="notifications-outline" size={22} color="black" />
//           </TouchableOpacity>
//           <Image
//             source={
//               user?.avatar
//                 ? { uri: user?.avatar?.uri }
//                 : require("../../../assets/images/avatar.png") // ✅ local placeholder
//             }
//             style={styles.avatar}
//           />
//         </View>
//       </View>

//       {/* Cards */}
//       <View style={styles.cardsRow}>
//         <StatCard value={userExerciseStatus?.totalAnswers} />

//         <ProgressCard
//           title={t("accuracy")}
//           percentage={(
//             (userExerciseStatus.correctAnswers /
//               userExerciseStatus.totalAnswers) *
//             100
//           ).toFixed(1)}
//           total={`${userExerciseStatus.correctAnswers}/${userExerciseStatus.totalAnswers}`}
//         />
//       </View>

//       {/* Categories */}
//       <View>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categories}
//         >
//           {categories.map((cat) => (
//             <CategoryButton
//               key={cat}
//               label={t(`${cat}`)}
//               active={cat === activeCategory}
//               onPress={() => handleCategoryPress(cat)}
//             />
//           ))}
//         </ScrollView>
//       </View>

//       {/* Recommended Tasks */}
//       <View style={styles.recommendedContainer}>
//         <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
//           <View style={styles.recommendedInnerContainer}>
//             <View style={styles.recommendedHeader}>
//               <View>
//                 <Text
//                   style={{
//                     fontSize: FONTSIZE.size20,
//                     fontFamily: FONTS.UrbanistMedium,
//                     color: COLORS.black,
//                   }}
//                 >
//                   {t("recommended_tasks")}
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: FONTSIZE.size12,
//                     fontFamily: FONTS.UrbanistMedium,
//                     color: COLORS.secondary,
//                   }}
//                 >
//                   {t("pending_tasks", { count: 20 })}
//                 </Text>
//               </View>
//               <View>
//                 <FilterIcon />
//               </View>
//             </View>

//             {allRecommendedExercise &&
//               filteredQuestions.map((q, index) => (
//                 <QuestionCard
//                   key={q.id}
//                   number={index + 1}
//                   question={q.title}
//                   status={q.status}
//                   onPress={() =>
//                     // navigation.navigate("TaskDetail", { exerciseId: q?.id })
//                     navigation.navigate("TasksTab", {
//                       screen: "TaskDetail",
//                       params: { exerciseId: q?.id }, // optional params
//                     })
//                   }
//                 />
//               ))}
//           </View>
//         </ScrollView>
//       </View>
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
//   greeting: {
//     color: COLORS.black,
//     fontSize: FONTSIZE.size32,
//     fontFamily: FONTS.UrbanistMedium,
//   },
//   subGreeting: {
//     color: COLORS.black,
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistRegular,
//   },
//   rightHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   notifyCircle: {
//     width: 45,
//     height: 45,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: COLORS.secondary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   avatar: {
//     width: 45,
//     height: 45,
//     borderRadius: 100,
//     marginLeft: 12,
//   },
//   cardsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: 20,
//     gap: 10,
//   },
//   categories: {
//     flexDirection: "row",
//     paddingLeft: 20,
//     marginVertical: 20,
//     gap: 5,
//     paddingRight: 30,
//   },
//   recommendedContainer: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     marginHorizontal: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   recommendedInnerContainer: {
//     padding: 20,
//   },
//   recommendedHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
// });

import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
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
import { getDateRange } from "../../utils/helpers";
import AnimatedDatePicker from "../../components/AnimatedDatePicker";

export default function HomeScreen({ navigation }) {
  const [userDetail] = useLazyUserDetailQuery();
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
      // Start of selected day (00:00:00 local time)
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    } else if (type === "to") {
      if (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      ) {
        // If today → current time - 5 minutes
        d = new Date(now.getTime() - 5 * 60000);
      } else {
        // If past day → end of day (23:59:59 local time)
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
      }
    }

    // Manual formatting (local time, no UTC shift)
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  const fetchExerciseStatus = (from, to) => {
    dispatch(setLoading(true));
    getUserExerciseStatus({ from, to })
      .then((res) => {
        if (res) {
          setUserExerciseStatus(res?.data);
        }
      })
      .finally(() => dispatch(setLoading(false)));
  };

  useFocusEffect(
    useCallback(() => {
      const now = new Date();

      const from = new Date(now);
      from.setDate(from.getDate() - 30);
      from.setHours(0, 0, 0, 0);

      const to = new Date(now.getTime() - 5 * 60000);

      setFromDate(from);
      setToDate(to);

      const payload = {
        from: formatDateTime(from, "from"),
        to: formatDateTime(to, "to"),
      };

      console.log("Default payload ::::::::::::::", payload);
      fetchExerciseStatus(payload.from, payload.to);
    }, [])
  );

  const handleApplyFilter = () => {
    if (fromDate && toDate) {
      const from = formatDateTime(fromDate, "from");
      const to = formatDateTime(toDate, "to");

      const payload = { from, to };
      console.log("payload::::::::::::::", payload);

      fetchExerciseStatus(from, to);
      setCalendarVisible(false);
    }
  };

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
                : require("../../../assets/images/avatar.png")
            }
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Cards */}
      <View style={styles.cardsRow}>
        <StatCard
          value={userExerciseStatus?.totalAnswers}
          onCalendarPress={() => setCalendarVisible(true)}
        />

        {userExerciseStatus && (
          <ProgressCard
            title={t("accuracy")}
            percentage={parseFloat(
              (
                (userExerciseStatus.correctAnswers /
                  userExerciseStatus.totalAnswers) *
                100
              ).toFixed(1)
            )}
            total={`${userExerciseStatus.correctAnswers}/${userExerciseStatus.totalAnswers}`}
          />
        )}
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
              allRecommendedExercise.map((q, index) => (
                <QuestionCard
                  key={q.id}
                  number={index + 1}
                  question={q.title}
                  status={q.status}
                  onPress={() =>
                    navigation.navigate("TasksTab", {
                      screen: "TaskDetail",
                      params: { exerciseId: q?.id },
                    })
                  }
                />
              ))}
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
            />

            <AnimatedDatePicker
              label="To Date"
              selectedDate={toDate}
              minimumDate={fromDate || undefined}
              onSelect={(date) => setToDate(date)}
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
              style={{ marginTop: 10, alignItems: "center" }}
              onPress={() => setCalendarVisible(false)}
            >
              <Text style={{ color: COLORS.secondary }}>{t("cancel")}</Text>
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
