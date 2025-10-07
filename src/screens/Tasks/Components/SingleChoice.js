import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import OptionButton from "../../../components/OptionButton";
import CustomButton from "../../../components/CustomButton";
import FONTSIZE from "../../../theme/fontsSize";
import FONTS from "../../../theme/fonts";
import COLORS from "../../../theme/colors";
import { splitMathString } from "../../../utils/helpers";
import MathRenderer from "../../../components/MathRenderer";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { startTimer, stopTimer } from "../../../utils/timeTracker";
import { useSubmitExerciseAnswerMutation } from "../../../services/tasksSlice";
import { setLoading } from "../../../store/loading";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const SingleChoice = ({ question, onPress, answer }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [locked, setLocked] = useState(false); // prevent changes after submit

  const [submitExerciseAnswer, { isLoading }] =
    useSubmitExerciseAnswerMutation();

  // Handle when user selects option
  const handleSelect = (id) => {
    if (!locked) {
      setSelectedOption((prev) => (prev === id ? null : id));
    }
  };

  // Submit handler
  const handleSubmit = () => {
    if (submitted) {
      setSubmitted(false);
      onPress();
    } else {
      if (selectedOption) {
        dispatch(setLoading(true));
        const duration = stopTimer();

        let payload = {
          id: question?.id,
          data: {
            exerciseType: question?.exerciseType,
            completionTime: duration,
            answer: selectedOption,
          },
        };

        submitExerciseAnswer(payload).then((res) => {
          const feedback = res?.data?.feedbackStatus;
          if (feedback === "INCORRECT") {
            setIsCorrect(false);
            showErrorToast(t("yourAnswerIsWrong"));
          } else if (feedback === "CORRECT") {
            setIsCorrect(true);
            showSuccessToast(t("yourAnswerIsCorrect"));
          }
          setSubmitted(true);
          setLocked(true);
        });
      }
    }
  };

  // Pre-fill state if answer object is provided
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

  const handleRetry = () => {
    setSubmitted(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setLocked(false);
    startTimer();
  };

  return (
    <View>
      {/* Illustrations */}
      {Array.isArray(question?.illustrations) &&
        question.illustrations.length > 0 &&
        (question.illustrations.length === 1 ? (
          <Image
            source={{ uri: question.illustrations[0].uri }}
            style={{
              width: windowWidth - 60,
              height: 200,
              borderRadius: 10,
              marginBottom: 16,
              alignSelf: "center",
            }}
            resizeMode="stretch"
          />
        ) : (
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
                resizeMode="stretch"
              />
            ))}
          </ScrollView>
        ))}

      {/* Question */}
      <View style={{ marginHorizontal: 30 }}>
        <Text style={styles.question}>Question 1:</Text>
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
      <View style={{ marginHorizontal: 20 }}>
        {Object.entries(question.options).map(([key, value], indx) => {
          // Determine style for each option
          let optionCorrectness = null;
          if (submitted) {
            if (isCorrect && selectedOption === key) {
              optionCorrectness = true;
            } else if (!isCorrect && selectedOption === key) {
              optionCorrectness = false;
            } else if (!isCorrect && answer?.solution === key) {
              // highlight correct one after wrong answer
              optionCorrectness = true;
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
