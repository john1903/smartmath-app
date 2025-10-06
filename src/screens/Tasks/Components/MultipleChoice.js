// import { View, Text, StyleSheet, Image } from "react-native";
// import React, { useEffect, useState } from "react";
// import OptionButton from "../../../components/OptionButton";
// import CustomButton from "../../../components/CustomButton";
// import FONTSIZE from "../../../theme/fontsSize";
// import FONTS from "../../../theme/fonts";
// import COLORS from "../../../theme/colors";
// import { splitMathString } from "../../../utils/helpers";
// import MathRenderer from "../../../components/MathRenderer";
// import { useTranslation } from "react-i18next";
// import { startTimer, stopTimer } from "../../../utils/timeTracker";
// import { useSubmitExerciseAnswerMutation } from "../../../services/tasksSlice";
// import { setLoading } from "../../../store/loading";
// import { useDispatch } from "react-redux";
// import { showErrorToast, showSuccessToast } from "../../../utils/toast";

// const MultipleChoice = ({ question, onPress }) => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   const [selectedOptions, setSelectedOptions] = useState([]); // ✅ array instead of single
//   const [submitted, setSubmitted] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(null);

//   const [submitExerciseAnswer, { isLoading }] =
//     useSubmitExerciseAnswerMutation();

//   const handleSelect = (id) => {
//     if (selectedOptions.includes(id)) {
//       // ✅ remove if already selected
//       setSelectedOptions(selectedOptions.filter((item) => item !== id));
//     } else {
//       // ✅ add if not selected
//       setSelectedOptions([...selectedOptions, id]);
//     }
//   };

//   const handleSubmit = () => {
//     if (submitted) {
//       setSubmitted(false);
//       onPress();
//     } else {
//       if (selectedOptions.length > 0) {
//         dispatch(setLoading(true));
//         const duration = stopTimer(); // e.g. "PT2M15S"
//         // console.log("Duration:", duration);

//         let payload = {
//           id: question?.id,
//           data: {
//             exerciseType: question?.exerciseType,
//             completionTime: duration,
//             answer: selectedOptions,
//           },
//         };

//         submitExerciseAnswer(payload).then((res) => {
//           if (res?.data?.feedbackStatus === "INCORRECT") {
//             setIsCorrect(false);
//             showErrorToast(t("yourAnswerIsWrong"));
//           } else {
//             showSuccessToast(t("yourAnswerIsCorrect"));
//             setIsCorrect(true);
//           }
//         });

//         setSubmitted(true);
//       }
//     }
//   };

//   useEffect(() => {
//     startTimer(); // start when screen loads
//   }, []);

//   return (
//     <View>
//       {/* Question Image */}
//       {question?.image ? (
//         <Image source={{ uri: question?.image }} style={styles.image} />
//       ) : (
//         <View style={{ height: 30 }} />
//       )}

//       <View
//         style={{
//           marginHorizontal: 30,
//         }}
//       >
//         {/* Question */}

//         <Text style={styles.question}>{t("question1")}</Text>
//         <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//           {splitMathString(question.description).map((part, idx) =>
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
//           )}
//         </View>
//       </View>

//       <View
//         style={{
//           marginHorizontal: 30,
//         }}
//       >
//         {/* Options */}
//         {Object.entries(question.options).map(([key, value], indx) => (
//           <OptionButton
//             key={key}
//             optionKey={key}
//             label={value}
//             selected={selectedOptions.includes(key)} // ✅ check inside array
//             onPress={() => handleSelect(key)}
//             index={indx}
//             correct={isCorrect}
//             disabled={submitted}
//           />
//         ))}

//         <View style={styles.buttons}>
//           {submitted && isCorrect === false && (
//             <CustomButton
//               title={t("retry")}
//               buttonStyle={[styles.btnStyle, styles.retryBtn]}
//               textStyle={[styles.retryText, { includeFontPadding: false }]}
//               onPress={() => {
//                 setSubmitted(false);
//                 setSelectedOptions([]); // reset
//                 setIsCorrect(null); // reset feedback
//                 startTimer(); // restart timer
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
//             disabled={selectedOptions.length === 0}
//             onPress={handleSubmit}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default MultipleChoice;

// const styles = StyleSheet.create({
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

//   buttons: {
//     flexDirection: "row",
//     gap: 20,
//     justifyContent: "center",
//   },
//   retryBtn: { backgroundColor: COLORS.black },
//   retryText: {
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistSemiBold,
//     color: COLORS.white,
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import OptionButton from "../../../components/OptionButton";
import CustomButton from "../../../components/CustomButton";
import FONTSIZE from "../../../theme/fontsSize";
import FONTS from "../../../theme/fonts";
import COLORS from "../../../theme/colors";
import { splitMathString } from "../../../utils/helpers";
import MathRenderer from "../../../components/MathRenderer";
import { useTranslation } from "react-i18next";
import { startTimer, stopTimer } from "../../../utils/timeTracker";
import { useSubmitExerciseAnswerMutation } from "../../../services/tasksSlice";
import { setLoading } from "../../../store/loading";
import { useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

const windowWidth = Dimensions.get("window").width; // get screen width

const MultipleChoice = ({ question, onPress }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [submitExerciseAnswer] = useSubmitExerciseAnswerMutation();

  const handleSelect = (id) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const handleSubmit = () => {
    if (submitted) {
      setSubmitted(false);
      onPress();
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

      submitExerciseAnswer(payload).then((res) => {
        if (res?.data?.feedbackStatus === "INCORRECT") {
          setIsCorrect(false);
          showErrorToast(t("yourAnswerIsWrong"));
        } else {
          setIsCorrect(true);
          showSuccessToast(t("yourAnswerIsCorrect"));
        }
      });

      setSubmitted(true);
    }
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <View>
      {/* Illustrations */}
      {Array.isArray(question?.illustrations) &&
        question.illustrations.length > 0 &&
        (question.illustrations.length === 1 ? (
          // Single image: use screen width minus container margins
          <Image
            source={{ uri: question.illustrations[0].uri }}
            style={{
              width: windowWidth - 60, // 30 margin each side
              height: 200,
              borderRadius: 10,
              marginBottom: 16,
              alignSelf: "center",
            }}
            resizeMode="cover"
          />
        ) : (
          // Multiple images: horizontal scroll
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carouselContainer}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {question.illustrations.map((item, index) => (
              <Image
                key={index}
                source={{ uri: item.uri }}
                style={[
                  styles.carouselImage,
                  {
                    marginRight:
                      index === question.illustrations.length - 1 ? 0 : 10,
                  },
                ]}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        ))}

      {/* Question Text */}
      <View style={{ marginHorizontal: 30 }}>
        <Text style={styles.question}>{t("question1")}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {splitMathString(question.description).map((part, idx) =>
            part.startsWith("$") ? (
              <MathRenderer
                key={idx}
                formula={part}
                style={{ marginRight: 4 }}
              />
            ) : (
              <Text key={idx} style={styles.question}>
                {part}
              </Text>
            )
          )}
        </View>
      </View>

      {/* Options */}
      <View style={{ marginHorizontal: 30 }}>
        {Object.entries(question.options).map(([key, value], index) => (
          <OptionButton
            key={key}
            optionKey={key}
            label={value}
            selected={selectedOptions.includes(key)}
            onPress={() => handleSelect(key)}
            index={index}
            correct={isCorrect}
            disabled={submitted}
          />
        ))}

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
            disabled={selectedOptions.length === 0}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default MultipleChoice;

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
