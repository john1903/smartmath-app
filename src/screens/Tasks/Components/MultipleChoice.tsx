// import { View, Text, StyleSheet, Dimensions } from "react-native";
// import React, { useEffect, useState } from "react";
// import OptionButton from "../../../components/OptionButton";
// import CustomButton from "../../../components/CustomButton";
// import FONTSIZE from "../../../theme/fontsSize";
// import FONTS from "../../../theme/fonts";
// import COLORS from "../../../theme/colors";
// import MathRenderer from "../../../components/MathRenderer";
// import { useTranslation } from "react-i18next";
// import { startTimer, stopTimer } from "../../../utils/timeTracker";
// import { useSubmitExerciseAnswerMutation } from "../../../services/tasksSlice";
// import { setLoading } from "../../../store/loading";
// import { useDispatch } from "react-redux";
// import { showErrorToast, showSuccessToast } from "../../../utils/toast";
// import ImageCarousel from "../../../components/ImageCarousel";

// const windowWidth = Dimensions.get("window").width;

// const MultipleChoice = ({ question, onPress, answer }) => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [submitted, setSubmitted] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(null);

//   const [submitExerciseAnswer] = useSubmitExerciseAnswerMutation();

//   useEffect(() => {
//     startTimer();

//     // ✅ Preselect backend answer if available
//     if (answer?.answer?.length > 0) {
//       setSelectedOptions(answer.answer);
//       setSubmitted(true);

//       if (answer.feedbackStatus === "CORRECT") {
//         setIsCorrect(true);
//       } else if (answer.feedbackStatus === "INCORRECT") {
//         setIsCorrect(false);
//       }
//     }
//   }, [answer]);

//   const handleSelect = (id) => {
//     if (submitted) return;
//     if (selectedOptions.includes(id)) {
//       setSelectedOptions(selectedOptions.filter((item) => item !== id));
//     } else {
//       setSelectedOptions([...selectedOptions, id]);
//     }
//   };

//   const handleSubmit = () => {
//     if (submitted) {
//       // Go to next question
//       setSubmitted(false);
//       setSelectedOptions([]);
//       setIsCorrect(null);
//       onPress();
//       startTimer();
//       return;
//     }

//     if (selectedOptions.length > 0) {
//       dispatch(setLoading(true));
//       const duration = stopTimer();

//       const payload = {
//         id: question?.id,
//         data: {
//           exerciseType: question?.exerciseType,
//           completionTime: duration,
//           answer: selectedOptions,
//         },
//       };

//       submitExerciseAnswer(payload).then((res) => {
//         dispatch(setLoading(false));
//         const feedback = res?.data?.feedbackStatus;

//         if (feedback === "INCORRECT") {
//           setIsCorrect(false);
//           showErrorToast(t("yourAnswerIsWrong"));
//         } else if (feedback === "CORRECT") {
//           setIsCorrect(true);
//           showSuccessToast(t("yourAnswerIsCorrect"));
//         }

//         setSubmitted(true);
//       });
//     }
//   };

//   return (
//     <View>
//       {question.illustrations && question.illustrations.length > 0 && (
//         <ImageCarousel illustrations={question.illustrations} />
//       )}

//       <View style={{ marginHorizontal: 30 }}>
//         <Text style={styles.question}>{t("question1")}</Text>
//         <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//           <MathRenderer
//             formula={question.description}
//             style={{ marginRight: 4 }}
//             fontSize={20}
//           />
//         </View>
//       </View>

//       <View style={{ marginHorizontal: 30 }}>
//         {Object.entries(question.options).map(([key, value], index) => {
//           // Determine correct/incorrect color state
//           let correct = null;

//           if (submitted && isCorrect === true) {
//             correct = selectedOptions.includes(key) ? true : null;
//           } else if (submitted && isCorrect === false) {
//             correct = selectedOptions.includes(key) ? false : null;
//           }

//           return (
//             <OptionButton
//               key={key}
//               optionKey={key}
//               label={value}
//               selected={selectedOptions.includes(key)}
//               onPress={() => handleSelect(key)}
//               correct={correct}
//               disabled={submitted}
//             />
//           );
//         })}

//         <View style={styles.buttons}>
//           {submitted && isCorrect === false && (
//             <CustomButton
//               title={t("retry")}
//               buttonStyle={[styles.btnStyle, styles.retryBtn]}
//               textStyle={[styles.retryText, { includeFontPadding: false }]}
//               onPress={() => {
//                 setSubmitted(false);
//                 setSelectedOptions([]);
//                 setIsCorrect(null);
//                 startTimer();
//               }}
//             />
//           )}

//           <CustomButton
//             title={submitted ? t("next") : t("submit")}
//             buttonStyle={[
//               styles.btnStyle,
//               styles.submitBtn,
//               selectedOptions.length === 0 && styles.submitBtnDisabled,
//             ]}
//             textStyle={[
//               styles.submitText,
//               selectedOptions.length === 0 && styles.submitTextDisabled,
//               { includeFontPadding: false },
//             ]}
//             disabled={selectedOptions.length === 0 && !submitted}
//             onPress={handleSubmit}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default MultipleChoice;

// const styles = StyleSheet.create({
//   carouselContainer: {
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
//   buttons: {
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 20,
//   },
//   retryBtn: { backgroundColor: COLORS.black },
//   retryText: {
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistSemiBold,
//     color: COLORS.white,
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import OptionButton from "../../../components/OptionButton";
import CustomButton from "../../../components/CustomButton";
import FONTSIZE from "../../../theme/fontsSize";
import FONTS from "../../../theme/fonts";
import COLORS from "../../../theme/colors";
import MathRenderer from "../../../components/MathRenderer";
import ImageCarousel from "../../../components/ImageCarousel";

import { startTimer, stopTimer } from "../../../utils/timeTracker";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { setLoading } from "../../../store/loading";
import { useSubmitExerciseAnswerMutation } from "../../../services/tasksSlice";

const windowWidth = Dimensions.get("window").width;

interface MultipleChoiceProps {
  question: any;
  onPress: () => void;
  answer?: any;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  onPress,
  answer,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [submitExerciseAnswer] = useSubmitExerciseAnswerMutation();

  useEffect(() => {
    startTimer();

    // ✅ Preselect backend answer if available
    if (answer?.answer?.length) {
      setSelectedOptions(answer.answer);
      setSubmitted(true);

      if (answer.feedbackStatus === "CORRECT") setIsCorrect(true);
      else if (answer.feedbackStatus === "INCORRECT") setIsCorrect(false);
    }
  }, [answer]);

  const handleSelect = (id: string) => {
    if (submitted) return;
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (submitted) {
      setSubmitted(false);
      setSelectedOptions([]);
      setIsCorrect(null);
      onPress();
      startTimer();
      return;
    }

    if (selectedOptions.length > 0) {
      dispatch(setLoading(true));
      const duration = stopTimer();

      const payload = {
        id: question?.id,
        data: {
          exerciseType: question?.exerciseType,
          completionTime: duration,
          answer: selectedOptions,
        },
      };

      try {
        const res = await submitExerciseAnswer(payload).unwrap();
        const feedback = res?.feedbackStatus;

        if (feedback === "INCORRECT") {
          setIsCorrect(false);
          showErrorToast(t("yourAnswerIsWrong"));
        } else if (feedback === "CORRECT") {
          setIsCorrect(true);
          showSuccessToast(t("yourAnswerIsCorrect"));
        }

        setSubmitted(true);
      } catch (error) {
        showErrorToast(t("somethingWentWrong"));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

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

      <View style={{ marginHorizontal: 30 }}>
        {Object.entries(question.options).map(([key, value]) => {
          let correct: boolean | null = null;

          if (submitted && isCorrect === true) {
            correct = selectedOptions.includes(key) ? true : null;
          } else if (submitted && isCorrect === false) {
            correct = selectedOptions.includes(key) ? false : null;
          }

          return (
            <OptionButton
              key={key}
              optionKey={key}
              label={value}
              selected={selectedOptions.includes(key)}
              onPress={() => handleSelect(key)}
              correct={correct}
              disabled={submitted}
            />
          );
        })}

        <View style={styles.buttons}>
          {submitted && isCorrect === false && (
            <CustomButton
              title={t("retry")}
              buttonStyle={[styles.btnStyle, styles.retryBtn]}
              textStyle={[styles.retryText, { includeFontPadding: false }]}
              onPress={() => {
                setSubmitted(false);
                setSelectedOptions([]);
                setIsCorrect(null);
                startTimer();
              }}
            />
          )}

          <CustomButton
            title={submitted ? t("next") : t("submit")}
            buttonStyle={[
              styles.btnStyle,
              styles.submitBtn,
              selectedOptions.length === 0 && styles.submitBtnDisabled,
            ]}
            textStyle={[
              styles.submitText,
              selectedOptions.length === 0 && styles.submitTextDisabled,
              { includeFontPadding: false },
            ]}
            disabled={selectedOptions.length === 0 && !submitted}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default MultipleChoice;

interface Style {
  carouselContainer: ViewStyle;
  question: TextStyle;
  btnStyle: ViewStyle;
  submitBtn: ViewStyle;
  submitBtnDisabled: ViewStyle;
  submitText: TextStyle;
  submitTextDisabled: TextStyle;
  buttons: ViewStyle;
  retryBtn: ViewStyle;
  retryText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  carouselContainer: {
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  retryBtn: { backgroundColor: COLORS.black },
  retryText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
});
