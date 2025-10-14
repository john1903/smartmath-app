// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import CustomHeader from "../../components/CustomHeader";
// import COLORS from "../../theme/colors";
// import OptionButton from "../../components/OptionButton";
// import FONTSIZE from "../../theme/fontsSize";
// import FONTS from "../../theme/fonts";
// import CustomButton from "../../components/CustomButton";
// import { useTranslation } from "react-i18next";

// import TokenWhiteIcon from "../../../assets/svgs/TokenWhiteIcon.svg";
// import TokenBlackIcon from "../../../assets/svgs/TokenBlackIcon.svg";
// import { useLazyGetExerciseQuery } from "../../services/tasksSlice";
// import MathRenderer from "../../components/MathRenderer";
// import { splitMathString } from "../../utils/helpers";
// import MultipleChoice from "./Components/MultipleChoice";
// import TrueFalse from "./Components/TrueFalse";
// import SingleChoice from "./Components/SingleChoice";
// import OpenEnded from "./Components/OpenEnded";
// import Matching from "./Components/Matching";

// const TaskDetail = ({ navigation, route }) => {
//   const { t } = useTranslation();
//   const [appToken, setAppToken] = useState(10);

//   const [question, setQuestion] = useState(null);

//   const [getExercise] = useLazyGetExerciseQuery();

//   const gobackScreen = () => {
//     navigation.goBack();
//   };

//   const renderQuestion = (q) => {
//     // console.log("qqqqqqqqqqqqqq", JSON.stringify(q?.exercise));
//     if (!q) return null;

//     switch (q?.exercise?.exerciseType) {
//       case "MULTIPLE_CHOICE":
//         return (
//           <MultipleChoice
//             question={q?.exercise}
//             onPress={gobackScreen}
//             answer={q?.answer}
//           />
//         );

//       case "TRUE_FALSE":
//         return (
//           <TrueFalse
//             question={q?.exercise}
//             onPress={gobackScreen}
//             answer={q?.answer}
//           />
//         );
//       case "SINGLE_CHOICE":
//         return (
//           <SingleChoice
//             question={q?.exercise}
//             onPress={gobackScreen}
//             answer={q?.answer}
//           />
//         );
//       case "OPEN_ENDED":
//         return (
//           <OpenEnded
//             question={q?.exercise}
//             onPress={gobackScreen}
//             navigation={navigation}
//             answerData={q?.answer}
//           />
//         );
//       case "MATCHING":
//         return (
//           <Matching
//             question={q?.exercise}
//             onPress={gobackScreen}
//             answer={q?.answer}
//           />
//         );

//       default:
//         return null;
//     }
//   };

//   useEffect(() => {
//     getExercise({
//       id: route?.params?.exerciseId,
//     }).then((res) => {
//       if (res) {
//         setQuestion(res?.data);
//       }
//       console.log(
//         "single question response ::::::::::: ",
//         JSON.stringify(res?.data)
//       );
//     });
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
//       {/* Header */}
//       <View style={styles.header}>
//         <CustomHeader
//           title={t("taskDetail")}
//           onPress={() => navigation.goBack()}
//         />
//       </View>

//       <ScrollView contentContainerStyle={styles.container}>
//         {renderQuestion(question)}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default TaskDetail;

// const styles = StyleSheet.create({
//   safeContent: { flex: 1, backgroundColor: COLORS.background },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: 20,
//     marginVertical: 20,
//   },
//   container: {
//     padding: 16,
//     alignItems: "center",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 16,
//   },
//   question: {
//     fontSize: FONTSIZE.size20,
//     fontFamily: FONTS.UrbanistSemiBold,
//     marginBottom: 16,
//   },
//   btnStyle: {
//     width: "45%",
//     paddingVertical: 14,
//     borderRadius: 100,
//     marginTop: 20,
//     alignItems: "center",
//     backgroundColor: COLORS.white,
//     borderWidth: 0,
//   },
//   submitBtn: { backgroundColor: COLORS.primary },
//   submitBtnDisabled: { backgroundColor: COLORS.D9Gray },
//   submitText: {
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistSemiBold,
//     color: COLORS.white,
//   },
//   submitTextDisabled: { color: COLORS.black },
//   tfContainer: { flexDirection: "row", gap: 20, marginBottom: 30 },
//   tfBtn: { borderWidth: 1, borderColor: COLORS.borderColor2 },
//   tfText: {
//     color: COLORS.black,
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistMedium,
//   },
//   buttons: { flexDirection: "row", gap: 20 },
//   retryBtn: { backgroundColor: COLORS.black },
//   retryText: {
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistSemiBold,
//     color: COLORS.white,
//   },
//   whiteSheetFooter: { alignItems: "center" },
//   generateReportBtn: {
//     width: "100%",
//     alignItems: "center",
//     backgroundColor: COLORS.black,
//     borderColor: COLORS.black,
//   },
//   generateReportBtnTitle: {
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistSemiBold,
//     color: COLORS.white,
//   },
//   whiteSheetFooterText: {
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistMedium,
//     marginTop: 10,
//     color: COLORS.black,
//   },
// });

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import CustomHeader from "../../components/CustomHeader";
import COLORS from "../../theme/colors";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import { useLazyGetExerciseQuery } from "../../services/tasksSlice";

import MultipleChoice from "./Components/MultipleChoice";
import TrueFalse from "./Components/TrueFalse";
import SingleChoice from "./Components/SingleChoice";
import OpenEnded from "./Components/OpenEnded";
import Matching from "./Components/Matching";

interface ExerciseData {
  id?: number;
  title?: string;
  description?: string;
  difficultyLevel?: string;
  maxPoints?: number;
  exerciseType?:
    | "MULTIPLE_CHOICE"
    | "TRUE_FALSE"
    | "SINGLE_CHOICE"
    | "OPEN_ENDED"
    | "MATCHING";
  illustrations?: { id: number; uri: string }[];
}

interface ExerciseResponse {
  exercise: ExerciseData;
  answer?: {
    feedbackStatus?: string;
    answerText?: string;
    [key: string]: any;
  };
}

interface TaskDetailProps {
  navigation: any;
  route: {
    params: {
      exerciseId: number;
    };
  };
}

const TaskDetail: React.FC<TaskDetailProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [appToken] = useState<number>(10);
  const [question, setQuestion] = useState<ExerciseResponse | null>(null);

  const [getExercise] = useLazyGetExerciseQuery();

  const gobackScreen = () => {
    navigation.goBack();
  };

  const renderQuestion = (q: ExerciseResponse | null) => {
    if (!q?.exercise) return null;

    switch (q.exercise.exerciseType) {
      case "MULTIPLE_CHOICE":
        return (
          <MultipleChoice
            question={q.exercise}
            onPress={gobackScreen}
            answer={q.answer}
          />
        );
      case "TRUE_FALSE":
        return (
          <TrueFalse
            question={q.exercise}
            onPress={gobackScreen}
            answer={q.answer}
          />
        );
      case "SINGLE_CHOICE":
        return (
          <SingleChoice
            question={q.exercise}
            onPress={gobackScreen}
            answer={q.answer}
          />
        );
      case "OPEN_ENDED":
        return (
          <OpenEnded
            question={q.exercise}
            onPress={gobackScreen}
            navigation={navigation}
            answerData={q.answer}
          />
        );
      case "MATCHING":
        return (
          <Matching
            question={q.exercise}
            onPress={gobackScreen}
            answer={q.answer}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!route?.params?.exerciseId) return;
    getExercise({ id: route.params.exerciseId })
      .then((res: any) => {
        if (res?.data) {
          setQuestion(res.data);
        }
        console.log("Exercise response:", JSON.stringify(res?.data, null, 2));
      })
      .catch((err: any) => console.error("❌ Fetch error", err));
  }, [route?.params?.exerciseId]);

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <CustomHeader title={t("taskDetail")} onPress={gobackScreen} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {renderQuestion(question)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  safeContent: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  question: {
    fontSize: FONTSIZE.size20,
    fontFamily: FONTS.UrbanistSemiBold,
    marginBottom: 16,
  },
  btnStyle: {
    width: "45%",
    paddingVertical: 14,
    borderRadius: 100,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 0,
  },
  submitBtn: { backgroundColor: COLORS.primary },
  submitBtnDisabled: { backgroundColor: COLORS.D9Gray },
  submitText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
  submitTextDisabled: { color: COLORS.black },
  tfContainer: { flexDirection: "row", gap: 20, marginBottom: 30 },
  tfBtn: { borderWidth: 1, borderColor: COLORS.borderColor2 },
  tfText: {
    color: COLORS.black,
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
  },
  buttons: { flexDirection: "row", gap: 20 },
  retryBtn: { backgroundColor: COLORS.black },
  retryText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
  whiteSheetFooter: { alignItems: "center" },
  generateReportBtn: {
    width: "100%",
    alignItems: "center",
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  generateReportBtnTitle: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
  whiteSheetFooterText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
    marginTop: 10,
    color: COLORS.black,
  },
});
