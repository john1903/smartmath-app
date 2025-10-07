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

const windowWidth = Dimensions.get("window").width;

const MultipleChoice = ({ question, onPress, answer }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [submitExerciseAnswer] = useSubmitExerciseAnswerMutation();

  useEffect(() => {
    startTimer();

    // ✅ Preselect from backend answer if available
    if (answer?.answer?.length > 0) {
      setSelectedOptions(answer.answer);
      setSubmitted(true);

      if (answer.feedbackStatus === "CORRECT") {
        setIsCorrect(true);
      } else if (answer.feedbackStatus === "INCORRECT") {
        setIsCorrect(false);
      }
    }
  }, [answer]);

  const handleSelect = (id) => {
    if (submitted) return; // disable selection after submit
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const handleSubmit = () => {
    if (submitted) {
      // Go to next question
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

      submitExerciseAnswer(payload).then((res) => {
        dispatch(setLoading(false));
        const feedback = res?.data?.feedbackStatus;

        if (feedback === "INCORRECT") {
          setIsCorrect(false);
          showErrorToast(t("yourAnswerIsWrong"));
        } else if (feedback === "CORRECT") {
          setIsCorrect(true);
          showSuccessToast(t("yourAnswerIsCorrect"));
        }

        setSubmitted(true);
      });
    }
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
        {Object.entries(question.options).map(([key, value], index) => {
          let correct = false;
          let incorrect = false;

          // ✅ If feedbackStatus is incorrect → mark only selected as red
          if (submitted && isCorrect === false) {
            incorrect = selectedOptions.includes(key);
          }

          // ✅ If correct → show normal correct feedback (like true/false)
          if (submitted && isCorrect === true) {
            correct = selectedOptions.includes(key);
          }

          return (
            <OptionButton
              key={key}
              optionKey={key}
              label={value}
              selected={selectedOptions.includes(key)}
              onPress={() => handleSelect(key)}
              index={index}
              correct={correct}
              incorrect={incorrect}
              disabled={submitted}
            />
          );
        })}

        {/* Buttons */}
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
