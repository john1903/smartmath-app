// import React, { useCallback, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Modal,
//   RefreshControl,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useTranslation } from "react-i18next";
// import { useFocusEffect } from "@react-navigation/native";
// import moment from "moment";
// import { useDispatch, useSelector } from "react-redux";

// import COLORS from "../../theme/colors";
// import FONTSIZE from "../../theme/fontsSize";
// import FONTS from "../../theme/fonts";
// import StatCard from "../../components/StatCard";
// import ProgressCard from "../../components/ProgressCard";
// import CategoryButton from "../../components/CategoryButton";
// import QuestionCard from "../../components/QuestionCard";
// import AnimatedDatePicker from "../../components/AnimatedDatePicker";

// import {
//   useLazyGetAllRecommendedExerciseQuery,
//   useLazyUserDetailQuery,
// } from "../../services/homeSlice";
// import { useLazyGetUserExerciseStatusQuery } from "../../services/tasksSlice";
// import { setLoading } from "../../store/loading";
// import { setUser } from "../../store/auth";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../navigation/types";

// interface HomeScreenProps {
//   navigation: NativeStackNavigationProp<RootStackParamList>;
// }

// interface Exercise {
//   id: string;
//   title: string;
//   exerciseType: string;
//   [key: string]: any;
// }

// interface User {
//   firstName?: string;
//   avatar?: { uri: string };
//   [key: string]: any;
// }

// interface ExerciseStatus {
//   totalAnswers: number;
//   correctAnswers: number;
//   [key: string]: any;
// }

// interface RootState {
//   auth: { user: User };
//   home: { allRecommendedExercise: Exercise[] };
// }

// const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
//   const [triggerUserDetail] = useLazyUserDetailQuery();
//   const [getAllRecommendedExercise] = useLazyGetAllRecommendedExerciseQuery();
//   const [getUserExerciseStatus] = useLazyGetUserExerciseStatusQuery();

//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   const { user } = useSelector((state: RootState) => state.auth);
//   const { allRecommendedExercise } = useSelector(
//     (state: RootState) => state.home
//   );

//   const [userExerciseStatus, setUserExerciseStatus] =
//     useState<ExerciseStatus>();
//   const [fromDate, setFromDate] = useState<Date | null>(null);
//   const [toDate, setToDate] = useState<Date | null>(null);
//   const [calendarVisible, setCalendarVisible] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const categories = [
//     "all_exercises",
//     "mcqs",
//     "true_false",
//     "matching",
//     "open_ended",
//     "single_choice",
//   ];
//   const [activeCategory, setActiveCategory] = useState(categories[0]);

//   const formatDateTime = (date: Date, type: "from" | "to"): string => {
//     let d = new Date(date);
//     const now = new Date();

//     if (type === "from") {
//       d = new Date(
//         Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0)
//       );
//     } else if (type === "to") {
//       if (
//         d.getUTCFullYear() === now.getUTCFullYear() &&
//         d.getUTCMonth() === now.getUTCMonth() &&
//         d.getUTCDate() === now.getUTCDate()
//       ) {
//         d = new Date(Date.now() - 5 * 60000);
//       } else {
//         d = new Date(
//           Date.UTC(
//             d.getUTCFullYear(),
//             d.getUTCMonth(),
//             d.getUTCDate(),
//             23,
//             59,
//             59
//           )
//         );
//       }
//     }

//     const pad = (n: number) => String(n).padStart(2, "0");
//     return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(
//       d.getUTCDate()
//     )}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(
//       d.getUTCSeconds()
//     )}`;
//   };

//   const fetchExerciseStatus = (from: string, to: string) => {
//     dispatch(setLoading(true));
//     getUserExerciseStatus({ from, to })
//       .then((res: any) => {
//         if (res?.data) {
//           setUserExerciseStatus(res.data);
//         }
//       })
//       .finally(() => {
//         dispatch(setLoading(false));
//         setCalendarVisible(false);
//       });
//   };

//   useFocusEffect(
//     useCallback(() => {
//       const now = new Date();
//       const from = new Date(Date.UTC(2025, 0, 1, 0, 0, 0));
//       const to = new Date(now.getTime() - 5 * 60 * 1000);

//       setFromDate(from);
//       setToDate(to);

//       const formatForApi = (d: Date) => d.toISOString().slice(0, 19);
//       fetchExerciseStatus(formatForApi(from), formatForApi(to));

//       triggerUserDetail({})
//         .unwrap()
//         .then((res: User) => {
//           if (res) dispatch(setUser(res));
//         })
//         .catch((err: any) => console.log("User detail error:", err));

//       getAllRecommendedExercise({});
//     }, [dispatch, triggerUserDetail, getAllRecommendedExercise])
//   );

//   const resetDefaultDates = () => {
//     const now = new Date();
//     const from = new Date(Date.UTC(2025, 0, 1, 0, 0, 0));
//     const to = new Date(now.getTime() - 5 * 60 * 1000);
//     setFromDate(from);
//     setToDate(to);
//     const formatForApi = (d: Date) => d.toISOString().slice(0, 19);
//     fetchExerciseStatus(formatForApi(from), formatForApi(to));
//   };

//   const handleApplyFilter = () => {
//     if (fromDate && toDate) {
//       const from = formatDateTime(fromDate, "from");
//       const to = formatDateTime(toDate, "to");
//       fetchExerciseStatus(from, to);
//     }
//   };

//   const total = userExerciseStatus?.totalAnswers ?? 0;
//   const correct = userExerciseStatus?.correctAnswers ?? 0;
//   const accuracyPercent =
//     total > 0 ? ((correct / total) * 100).toFixed(1) : "0";

//   const filteredQuestions =
//     activeCategory === "all_exercises"
//       ? allRecommendedExercise
//       : allRecommendedExercise.filter((q) => {
//           switch (activeCategory) {
//             case "mcqs":
//               return q.exerciseType === "MULTIPLE_CHOICE";
//             case "open_ended":
//               return q.exerciseType === "OPEN_ENDED";
//             case "single_choice":
//               return q.exerciseType === "SINGLE_CHOICE";
//             case "true_false":
//               return q.exerciseType === "TRUE_FALSE";
//             case "matching":
//               return q.exerciseType === "MATCHING";
//             default:
//               return true;
//           }
//         });

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await getAllRecommendedExercise({});
//     } catch (err) {
//       console.log("Refresh error", err);
//     } finally {
//       setRefreshing(false);
//     }
//   }, [getAllRecommendedExercise]);

//   return (
//     <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={{ width: "85%", paddingRight: 10 }}>
//           <Text style={styles.greeting} numberOfLines={1} ellipsizeMode="tail">
//             {t("hi")}! {user?.firstName}
//           </Text>
//           <Text style={styles.subGreeting}>{t("welcome_back")}</Text>
//         </View>

//         <View style={[styles.rightHeader, { width: "15%" }]}>
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("SettingsTab", { screen: "EditProfile" })
//             }
//           >
//             <Image
//               source={
//                 user?.avatar
//                   ? { uri: user.avatar.uri }
//                   : require("../../../assets/images/avatar.png")
//               }
//               style={styles.avatar}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Cards */}
//       <View style={styles.cardsRow}>
//         <StatCard
//           value={userExerciseStatus?.totalAnswers}
//           onCalendarPress={() => {
//             // setFromDate(null);
//             // setToDate(null);

//             setCalendarVisible(true);
//           }}
//         />

//         <ProgressCard
//           title={t("accuracy")}
//           percentage={parseFloat(accuracyPercent)}
//           total={`${correct}/${total}`}
//         />
//       </View>

//       <View>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categories}
//         >
//           {categories.map((cat) => (
//             <CategoryButton
//               key={cat}
//               label={t(cat)}
//               active={cat === activeCategory}
//               onPress={() => setActiveCategory(cat)}
//             />
//           ))}
//         </ScrollView>
//       </View>

//       {/* Recommended Tasks */}
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
//                   {t("pending_tasks", {
//                     count: allRecommendedExercise?.length ?? 0,
//                   })}
//                 </Text>
//               </View>
//             </View>

//             {filteredQuestions?.length ? (
//               filteredQuestions.map((q, index) => (
//                 <QuestionCard
//                   key={q.id}
//                   number={index + 1}
//                   question={q.title}
//                   status={"solve"}
//                   onPress={() =>
//                     navigation.navigate("TasksTab", {
//                       screen: "TaskDetail",
//                       params: { exerciseId: q.id },
//                     })
//                   }
//                 />
//               ))
//             ) : (
//               <Text
//                 style={{
//                   textAlign: "center",
//                   marginTop: 20,
//                   color: COLORS.secondary,
//                 }}
//               >
//                 {t("noRecommendedTaskFound")}
//               </Text>
//             )}
//           </View>
//         </ScrollView>
//       </View>

//       {/* Calendar Modal */}
//       {calendarVisible && (
//         <Modal
//           visible
//           transparent
//           animationType="fade"
//           onRequestClose={() => setCalendarVisible(false)}
//         >
//           <View style={styles.modalBackdrop}>
//             <View style={styles.modalContainer}>
//               <Text style={styles.modalTitle}>{t("select_date_range")}</Text>

//               <Text style={styles.modalFromToDate}>
//                 {fromDate &&
//                   toDate &&
//                   `${moment(fromDate).format("Do MMM YYYY")} - ${moment(
//                     toDate
//                   ).format("Do MMM YYYY")}`}
//               </Text>

//               {/* <AnimatedDatePicker
//                 label="From Date"
//                 selectedDate={fromDate}
//                 onSelect={(date) => setFromDate(date)}
//                 maximumDate={toDate ?? undefined}
//               />

//               <AnimatedDatePicker
//                 label="To Date"
//                 selectedDate={toDate}
//                 onSelect={(date) => setToDate(date)}
//                 minimumDate={fromDate ?? undefined}
//               /> */}

//               <AnimatedDatePicker
//                 label="From Date"
//                 selectedDate={fromDate}
//                 onSelect={(date) => {
//                   setFromDate(date);

//                   // ✅ Ensure "To" date stays after "From" date
//                   if (toDate && date > toDate) {
//                     setToDate(null); // reset To if it's before From
//                   }
//                 }}
//                 maximumDate={toDate ?? new Date()} // no future, limit to "To" if available
//               />

//               <AnimatedDatePicker
//                 label="To Date"
//                 selectedDate={toDate}
//                 onSelect={(date) => {
//                   setToDate(date);

//                   // ✅ Ensure "From" date stays before "To" date
//                   if (fromDate && date < fromDate) {
//                     setFromDate(null); // reset From if it's after To
//                   }
//                 }}
//                 minimumDate={fromDate ?? undefined} // can't pick before "From"
//                 maximumDate={new Date()} // can't pick future dates
//               />

//               <View style={styles.modalButtonsRow}>
//                 <TouchableOpacity
//                   style={styles.cancelButton}
//                   onPress={() => {
//                     setCalendarVisible(false);
//                     dispatch(setLoading(true));
//                     setTimeout(() => {
//                       resetDefaultDates();
//                     }, 1000);
//                   }}
//                 >
//                   <Text style={styles.cancelButtonText}>{t("cancel")}</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.applyButton}
//                   onPress={handleApplyFilter}
//                 >
//                   <Text style={styles.applyButtonText}>{t("applyDate")}</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       )}
//     </SafeAreaView>
//   );
// };

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
//     justifyContent: "flex-end",
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
//   modalBackdrop: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 20,
//   },
//   modalContainer: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: FONTSIZE.size24,
//     fontFamily: FONTS.UrbanistMedium,
//   },
//   modalFromToDate: {
//     fontSize: FONTSIZE.size12,
//     fontFamily: FONTS.UrbanistMedium,
//     color: COLORS.secondary,
//     marginBottom: 20,
//   },
//   modalButtonsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 10,
//   },
//   applyButton: {
//     marginTop: 10,
//     padding: 12,
//     borderRadius: 100,
//     backgroundColor: COLORS.primary,
//     alignItems: "center",
//     width: "48%",
//   },
//   applyButtonText: {
//     color: COLORS.white,
//     fontFamily: FONTS.UrbanistMedium,
//   },
//   cancelButton: {
//     marginTop: 10,
//     padding: 12,
//     borderRadius: 100,
//     backgroundColor: COLORS.transparent,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#cccccc",
//     width: "48%",
//   },
//   cancelButtonText: {
//     color: COLORS.secondary,
//     fontFamily: FONTS.UrbanistMedium,
//   },
// });

// export default HomeScreen;

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
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import COLORS from "../../theme/colors";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import StatCard from "../../components/StatCard";
import ProgressCard from "../../components/ProgressCard";
import CategoryButton from "../../components/CategoryButton";
import QuestionCard from "../../components/QuestionCard";
import AnimatedDatePicker from "../../components/AnimatedDatePicker";

import {
  useLazyGetAllRecommendedExerciseQuery,
  useLazyUserDetailQuery,
} from "../../services/homeSlice";
import { useLazyGetUserExerciseStatusQuery } from "../../services/tasksSlice";
import { setLoading } from "../../store/loading";
import { setUser } from "../../store/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

interface Exercise {
  id: string;
  title: string;
  exerciseType: string;
  [key: string]: any;
}

interface User {
  firstName?: string;
  avatar?: { uri: string };
  [key: string]: any;
}

interface ExerciseStatus {
  totalAnswers: number;
  correctAnswers: number;
  [key: string]: any;
}

interface RootState {
  auth: { user: User };
  home: { allRecommendedExercise: Exercise[] };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [triggerUserDetail] = useLazyUserDetailQuery();
  const [getAllRecommendedExercise] = useLazyGetAllRecommendedExerciseQuery();
  const [getUserExerciseStatus] = useLazyGetUserExerciseStatusQuery();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { user } = useSelector((state: RootState) => state.auth);
  const { allRecommendedExercise } = useSelector(
    (state: RootState) => state.home
  );

  const [userExerciseStatus, setUserExerciseStatus] =
    useState<ExerciseStatus>();
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
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

  // /** ✅ Format date for API */
  // const formatDateTime = (date: Date, type: "from" | "to"): string => {
  //   const d = new Date(date);

  //   if (type === "from") {
  //     d.setHours(0, 0, 0, 0); // start of day
  //   } else if (type === "to") {
  //     // current time - 3 seconds
  //     const now = new Date();
  //     const threeSecondsAgo = new Date(now.getTime() - 3000);
  //     d.setHours(
  //       threeSecondsAgo.getHours(),
  //       threeSecondsAgo.getMinutes(),
  //       threeSecondsAgo.getSeconds(),
  //       0
  //     );
  //   }

  //   const pad = (n: number) => String(n).padStart(2, "0");
  //   return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
  //     d.getDate()
  //   )}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  // };

  const formatDateTime = (date: Date, type: "from" | "to"): string => {
    const d = new Date(date);

    if (type === "from") {
      // Start of selected day in UTC
      d.setUTCHours(0, 0, 0, 0);
    } else if (type === "to") {
      const now = new Date();
      const isToday =
        d.getUTCFullYear() === now.getUTCFullYear() &&
        d.getUTCMonth() === now.getUTCMonth() &&
        d.getUTCDate() === now.getUTCDate();

      if (isToday) {
        // If "To" date is today → current UTC time (minus 30s)
        const adjustedNow = new Date(now.getTime() - 30 * 1000);
        d.setUTCHours(
          adjustedNow.getUTCHours(),
          adjustedNow.getUTCMinutes(),
          adjustedNow.getUTCSeconds(),
          0
        );
      } else {
        // If "To" date is past → end of that day in UTC
        d.setUTCHours(23, 59, 59, 0);
      }
    }

    // Return ISO-like format (no timezone suffix)
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(
      d.getUTCDate()
    )}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(
      d.getUTCSeconds()
    )}`;
  };
  const fetchExerciseStatus = (from?: string, to?: string) => {
    dispatch(setLoading(true));

    const params: any = {};
    if (from) params.from = from;
    if (to) params.to = to;

    getUserExerciseStatus(params)
      .then((res: any) => {
        if (res?.data) setUserExerciseStatus(res.data);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useFocusEffect(
    useCallback(() => {
      setFromDate(null);
      setToDate(null);
      fetchExerciseStatus();

      triggerUserDetail({})
        .unwrap()
        .then((res: User) => {
          if (res) dispatch(setUser(res));
        })
        .catch((err: any) => console.log("User detail error:", err));

      getAllRecommendedExercise({});
    }, [dispatch, triggerUserDetail, getAllRecommendedExercise])
  );

  const resetDefaultDates = () => {
    setFromDate(null);
    setToDate(null);
    fetchExerciseStatus();
  };

  const handleApplyFilter = () => {
    if (fromDate && toDate) {
      const from = formatDateTime(fromDate, "from");
      const to = formatDateTime(toDate, "to");
      setCalendarVisible(false);

      setTimeout(() => {
        fetchExerciseStatus(from, to);
      }, 1000);
    }
  };

  const total = userExerciseStatus?.totalAnswers ?? 0;
  const correct = userExerciseStatus?.correctAnswers ?? 0;
  const accuracyPercent =
    total > 0 ? ((correct / total) * 100).toFixed(1) : "0";

  const filteredQuestions =
    activeCategory === "all_exercises"
      ? allRecommendedExercise
      : allRecommendedExercise.filter((q) => {
          switch (activeCategory) {
            case "mcqs":
              return q.exerciseType === "MULTIPLE_CHOICE";
            case "open_ended":
              return q.exerciseType === "OPEN_ENDED";
            case "single_choice":
              return q.exerciseType === "SINGLE_CHOICE";
            case "true_false":
              return q.exerciseType === "TRUE_FALSE";
            case "matching":
              return q.exerciseType === "MATCHING";
            default:
              return true;
          }
        });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getAllRecommendedExercise({});
    } catch (err) {
      console.log("Refresh error", err);
    } finally {
      setRefreshing(false);
    }
  }, [getAllRecommendedExercise]);

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: "85%", paddingRight: 10 }}>
          <Text style={styles.greeting} numberOfLines={1} ellipsizeMode="tail">
            {t("hi")}! {user?.firstName}
          </Text>
          <Text style={styles.subGreeting}>{t("welcome_back")}</Text>
        </View>

        <View style={[styles.rightHeader, { width: "15%" }]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SettingsTab", { screen: "EditProfile" })
            }
          >
            <Image
              source={
                user?.avatar
                  ? { uri: user.avatar.uri }
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
          onCalendarPress={() => setCalendarVisible(true)}
        />
        <ProgressCard
          title={t("accuracy")}
          percentage={parseFloat(accuracyPercent)}
          total={`${correct}/${total}`}
        />
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              label={t(cat)}
              active={cat === activeCategory}
              onPress={() => setActiveCategory(cat)}
            />
          ))}
        </ScrollView>
      </View>

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
                    count: allRecommendedExercise?.length ?? 0,
                  })}
                </Text>
              </View>
            </View>

            {filteredQuestions?.length ? (
              filteredQuestions.map((q, index) => (
                <QuestionCard
                  key={q.id}
                  number={index + 1}
                  question={q.title}
                  status={"solve"}
                  onPress={() =>
                    navigation.navigate("TasksTab", {
                      screen: "TaskDetail",
                      params: { exerciseId: q.id },
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

      {calendarVisible && (
        <Modal
          visible
          transparent
          animationType="fade"
          onRequestClose={() => setCalendarVisible(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{t("select_date_range")}</Text>

              <Text style={styles.modalFromToDate}>
                {fromDate && toDate
                  ? `${moment(fromDate).format("Do MMM YYYY")} - ${moment(
                      toDate
                    ).format("Do MMM YYYY")}`
                  : t("no_date_selected")}
              </Text>

              <AnimatedDatePicker
                label="From Date"
                selectedDate={fromDate}
                onSelect={(date) => {
                  setFromDate(date);
                  if (toDate && date > toDate) setToDate(null);
                }}
                maximumDate={toDate ?? new Date()}
              />

              <AnimatedDatePicker
                label="To Date"
                selectedDate={toDate}
                onSelect={(date) => {
                  setToDate(date);
                  if (fromDate && date < fromDate) setFromDate(null);
                }}
                minimumDate={fromDate ?? undefined}
                maximumDate={new Date()}
              />

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setCalendarVisible(false);
                    setTimeout(() => {
                      resetDefaultDates();
                    }, 500);
                  }}
                >
                  <Text style={styles.cancelButtonText}>{t("cancel")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={handleApplyFilter}
                >
                  <Text style={styles.applyButtonText}>{t("applyDate")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

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
  recommendedInnerContainer: { padding: 20 },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: FONTSIZE.size24,
    fontFamily: FONTS.UrbanistMedium,
  },
  modalFromToDate: {
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.secondary,
    marginBottom: 20,
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  applyButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    width: "48%",
  },
  applyButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.UrbanistMedium,
  },
  cancelButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 100,
    backgroundColor: COLORS.transparent,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "48%",
  },
  cancelButtonText: {
    color: COLORS.secondary,
    fontFamily: FONTS.UrbanistMedium,
  },
});

export default HomeScreen;
