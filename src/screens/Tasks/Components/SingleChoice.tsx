// import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
// import React, { useEffect, useState } from "react";
// import OptionButton from "../../../components/OptionButton";
// import CustomButton from "../../../components/CustomButton";
// import FONTSIZE from "../../../theme/fontsSize";
// import FONTS from "../../../theme/fonts";
// import COLORS from "../../../theme/colors";
// import { splitMathString } from "../../../utils/helpers";
// import MathRenderer from "../../../components/MathRenderer";
// import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
// import { startTimer, stopTimer } from "../../../utils/timeTracker";
// import { useSubmitExerciseAnswerMutation } from "../../../services/tasksSlice";
// import { setLoading } from "../../../store/loading";
// import { showErrorToast, showSuccessToast } from "../../../utils/toast";
// import { Dimensions } from "react-native";
// import ImageCarousel from "../../../components/ImageCarousel";

// const windowWidth = Dimensions.get("window").width;

// const SingleChoice = ({ question, onPress, answer }) => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   const [selectedOption, setSelectedOption] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(null);
//   const [locked, setLocked] = useState(false);

//   const [submitExerciseAnswer, { isLoading }] =
//     useSubmitExerciseAnswerMutation();

//   // Handle when user selects option
//   const handleSelect = (id) => {
//     if (!locked) {
//       setSelectedOption((prev) => (prev === id ? null : id));
//     }
//   };

//   // Submit handler
//   const handleSubmit = () => {
//     if (submitted) {
//       setSubmitted(false);
//       onPress();
//     } else {
//       if (selectedOption) {
//         dispatch(setLoading(true));
//         const duration = stopTimer();

//         let payload = {
//           id: question?.id,
//           data: {
//             exerciseType: question?.exerciseType,
//             completionTime: duration,
//             answer: selectedOption,
//           },
//         };

//         submitExerciseAnswer(payload).then((res) => {
//           const feedback = res?.data?.feedbackStatus;
//           if (feedback === "INCORRECT") {
//             setIsCorrect(false);
//             showErrorToast(t("yourAnswerIsWrong"));
//           } else if (feedback === "CORRECT") {
//             setIsCorrect(true);
//             showSuccessToast(t("yourAnswerIsCorrect"));
//           }
//           setSubmitted(true);
//           setLocked(true);
//         });
//       }
//     }
//   };

//   // Pre-fill state if answer object is provided
//   useEffect(() => {
//     if (answer) {
//       if (answer.feedbackStatus === "CORRECT") {
//         setSelectedOption(answer.answer);
//         setIsCorrect(true);
//         setSubmitted(true);
//         setLocked(true);
//       } else if (answer.feedbackStatus === "INCORRECT") {
//         setSelectedOption(answer.answer);
//         setIsCorrect(false);
//         setSubmitted(true);
//         setLocked(true);
//       }
//     } else {
//       startTimer();
//     }
//   }, [answer]);

//   const handleRetry = () => {
//     setSubmitted(false);
//     setSelectedOption(null);
//     setIsCorrect(null);
//     setLocked(false);
//     startTimer();
//   };

//   return (
//     <View>
//       {question.illustrations && question.illustrations.length > 0 && (
//         <ImageCarousel illustrations={question.illustrations} />
//       )}

//       <View style={{ marginHorizontal: 30 }}>
//         <Text style={styles.question}>Question 1:</Text>
//         <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//           <MathRenderer
//             formula={question.description}
//             style={{ marginRight: 4 }}
//             fontSize={20}
//           />

//           {/* {splitMathString(question.description).map((part, idx) =>
//             part.startsWith("$") ? (
//               <MathRenderer
//                 key={idx}
//                 formula={part}
//                 style={{ marginRight: 4 }}
//               />
//             ) : (
//               <Text key={idx} style={styles.question}>
//                 {part}
//               </Text>
//             )
//           )} */}
//         </View>
//       </View>

//       <View style={{ marginHorizontal: 20 }}>
//         {Object.entries(question.options).map(([key, value], indx) => {
//           let optionCorrectness = null;
//           if (submitted) {
//             if (isCorrect && selectedOption === key) {
//               optionCorrectness = true;
//             } else if (!isCorrect && selectedOption === key) {
//               optionCorrectness = false;
//             } else if (!isCorrect && answer?.solution === key) {
//               // highlight correct one after wrong answer
//               optionCorrectness = true;
//             }
//           }

//           return (
//             <OptionButton
//               key={key}
//               optionKey={key}
//               label={value}
//               selected={selectedOption === key}
//               onPress={() => handleSelect(key)}
//               correct={optionCorrectness}
//               disabled={locked}
//             />
//           );
//         })}

//         <View style={styles.buttons}>
//           {submitted && isCorrect === false && (
//             <CustomButton
//               title={t("retry")}
//               buttonStyle={[styles.btnStyle, styles.retryBtn]}
//               textStyle={[styles.retryText, { includeFontPadding: false }]}
//               onPress={handleRetry}
//             />
//           )}

//           <CustomButton
//             title={submitted ? t("next") : t("submit")}
//             buttonStyle={[
//               styles.btnStyle,
//               styles.submitBtn,
//               !selectedOption && !submitted && styles.submitBtnDisabled,
//             ]}
//             textStyle={[
//               styles.submitText,
//               !selectedOption && !submitted && styles.submitTextDisabled,
//               { includeFontPadding: false },
//             ]}
//             disabled={!selectedOption && !submitted}
//             onPress={handleSubmit}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default SingleChoice;

// const styles = StyleSheet.create({
//   carouselContainer: {
//     marginBottom: 16,
//   },
//   carouselImage: {
//     width: 280,
//     height: 200,
//     borderRadius: 10,
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
//   buttons: { flexDirection: "row", gap: 20, justifyContent: "center" },
//   retryBtn: { backgroundColor: COLORS.black },
//   retryText: {
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistSemiBold,
//     color: COLORS.white,
//   },
// });

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import OptionButton from "../../../components/OptionButton";
import CustomButton from "../../../components/CustomButton";
import FONTSIZE from "../../../theme/fontsSize";
import FONTS from "../../../theme/fonts";
import COLORS from "../../../theme/colors";
import MathRenderer from "../../../components/MathRenderer";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { startTimer, stopTimer } from "../../../utils/timeTracker";
import { useSubmitExerciseAnswerMutation } from "../../../services/tasksSlice";
import { setLoading } from "../../../store/loading";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import ImageCarousel from "../../../components/ImageCarousel";

// =============== Types ==================

interface Answer {
  answer: string;
  feedbackStatus: "CORRECT" | "INCORRECT" | "PENDING";
  solution?: string;
}

interface SingleChoiceProps {
  question: any;
  onPress: () => void;
  answer?: any | null;
}

const windowWidth = Dimensions.get("window").width;

// =============== Component ==================

const SingleChoice: React.FC<SingleChoiceProps> = ({
  question,
  onPress,
  answer,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [locked, setLocked] = useState(false);

  const [submitExerciseAnswer] = useSubmitExerciseAnswerMutation();

  // ✅ Handle option selection
  const handleSelect = (id: string) => {
    if (!locked) {
      setSelectedOption((prev) => (prev === id ? null : id));
    }
  };

  // ✅ Handle submit or next
  const handleSubmit = async () => {
    if (submitted) {
      setSubmitted(false);
      onPress();
      return;
    }

    if (selectedOption) {
      dispatch(setLoading(true));
      const duration = stopTimer();

      const payload = {
        id: question.id,
        data: {
          exerciseType: question.exerciseType,
          completionTime: duration,
          answer: selectedOption,
        },
      };

      try {
        const res = await submitExerciseAnswer(payload).unwrap();
        const feedback = res?.feedbackStatus as Answer["feedbackStatus"];

        if (feedback === "INCORRECT") {
          setIsCorrect(false);
          showErrorToast(t("yourAnswerIsWrong"));
        } else if (feedback === "CORRECT") {
          setIsCorrect(true);
          showSuccessToast(t("yourAnswerIsCorrect"));
        }

        setSubmitted(true);
        setLocked(true);
      } catch (error) {
        console.error("Submit error:", error);
        showErrorToast(t("somethingWentWrong"));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  // ✅ Prefill previous answer
  useEffect(() => {
    if (answer) {
      if (answer.feedbackStatus === "CORRECT") {
        setSelectedOption(answer.answer);
        setIsCorrect(true);
        setSubmitted(true);
        setLocked(true);
      } else if (answer.feedbackStatus === "INCORRECT") {
        setSelectedOption(answer.answer);
        setIsCorrect(false);
        setSubmitted(true);
        setLocked(true);
      }
    } else {
      startTimer();
    }
  }, [answer]);

  // ✅ Retry question
  const handleRetry = () => {
    setSubmitted(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setLocked(false);
    startTimer();
  };

  // ✅ Render
  return (
    <View>
      {question.illustrations && question.illustrations.length > 0 && (
        <ImageCarousel illustrations={question.illustrations} />
      )}

      <View style={{ marginHorizontal: 30 }}>
        <Text style={styles.question}>{t("question1")}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <MathRenderer
            formula={question.description}
            style={{ marginRight: 4 }}
            fontSize={20}
          />
        </View>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        {Object.entries(question.options).map(([key, value]) => {
          let optionCorrectness: boolean | null = null;

          if (submitted) {
            if (isCorrect && selectedOption === key) {
              optionCorrectness = true;
            } else if (!isCorrect && selectedOption === key) {
              optionCorrectness = false;
            } else if (!isCorrect && answer?.solution === key) {
              optionCorrectness = true; // highlight correct one
            }
          }

          return (
            <OptionButton
              key={key}
              optionKey={key}
              label={value}
              selected={selectedOption === key}
              onPress={() => handleSelect(key)}
              correct={optionCorrectness}
              disabled={locked}
            />
          );
        })}

        <View style={styles.buttons}>
          {submitted && isCorrect === false && (
            <CustomButton
              title={t("retry")}
              buttonStyle={[styles.btnStyle, styles.retryBtn]}
              textStyle={[styles.retryText, { includeFontPadding: false }]}
              onPress={handleRetry}
            />
          )}

          <CustomButton
            title={submitted ? t("next") : t("submit")}
            buttonStyle={[
              styles.btnStyle,
              styles.submitBtn,
              !selectedOption && !submitted && styles.submitBtnDisabled,
            ]}
            textStyle={[
              styles.submitText,
              !selectedOption && !submitted && styles.submitTextDisabled,
              { includeFontPadding: false },
            ]}
            disabled={!selectedOption && !submitted}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default SingleChoice;

// =============== Styles ==================

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 16,
  },
  carouselImage: {
    width: 280,
    height: 200,
    borderRadius: 10,
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
  buttons: { flexDirection: "row", gap: 20, justifyContent: "center" },
  retryBtn: { backgroundColor: COLORS.black },
  retryText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
});
