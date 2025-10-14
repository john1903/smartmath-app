import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FONTSIZE from "../../../theme/fontsSize";
import FONTS from "../../../theme/fonts";
import COLORS from "../../../theme/colors";
import MathRenderer from "../../../components/MathRenderer";
import { useSubmitExerciseAnswerMutation } from "../../../services/tasksSlice";
import { useDispatch } from "react-redux";
import { startTimer, stopTimer } from "../../../utils/timeTracker";
import CustomButton from "../../../components/CustomButton";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { setLoading } from "../../../store/loading";
import { useTranslation } from "react-i18next";
import ImageCarousel from "../../../components/ImageCarousel";

interface TrueFalseProps {
  question: any;
  onPress?: () => void;
  answer?: any;
}

const TrueFalse: React.FC<TrueFalseProps> = ({ question, onPress, answer }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [submitExerciseAnswer] = useSubmitExerciseAnswerMutation();

  const allAnswered =
    Object.keys(answers).length ===
    Object.keys(question?.statements || {}).length;

  useEffect(() => {
    if (answer) {
      if (answer.answer) setAnswers(answer.answer);
      if (answer.feedbackStatus === "CORRECT") {
        setIsCorrect(true);
        setSubmitted(true);
      } else if (answer.feedbackStatus === "INCORRECT") {
        setIsCorrect(false);
        setSubmitted(true);
      }
    } else {
      startTimer();
    }
  }, [answer]);

  const handleSelect = (id: string, value: boolean) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async () => {
    if (submitted) {
      onPress?.();
      return;
    }

    const duration = stopTimer();
    const payload = {
      id: question?.id,
      data: {
        exerciseType: question?.exerciseType,
        completionTime: duration,
        answer: answers,
      },
    };

    dispatch(setLoading(true));
    try {
      const res = await submitExerciseAnswer(payload);
      const feedback = (res as any)?.data?.feedbackStatus;

      if (feedback === "INCORRECT") {
        setIsCorrect(false);
        showErrorToast(t("yourAnswerIsWrong"));
      } else if (feedback === "CORRECT") {
        setIsCorrect(true);
        showSuccessToast(t("yourAnswerIsCorrect"));
      }

      setSubmitted(true);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Retry handler
  const handleRetry = () => {
    setSubmitted(false);
    setAnswers({});
    setIsCorrect(null);
    startTimer();
  };

  const getLetter = (index: number) => String.fromCharCode(65 + index);

  return (
    <View>
      {question.illustrations && question.illustrations.length > 0 && (
        <ImageCarousel illustrations={question.illustrations} />
      )}

      {/* Question Text */}
      <View style={{ marginHorizontal: 30 }}>
        <Text style={styles.question}>Question 1: {question?.text ?? ""}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <MathRenderer
            formula={question.description}
            style={{ marginRight: 4 }}
            fontSize={20}
          />
        </View>
      </View>

      {/* True/False Statements */}
      <View style={{ marginHorizontal: 30 }}>
        {Object.entries(question?.statements || {}).map(
          ([key, statement], index) => {
            const letter = getLetter(index);
            return (
              <View key={key} style={{ marginVertical: 10, marginBottom: 50 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.optionLetter}>{`${letter})`}</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <MathRenderer
                      formula={statement}
                      style={{ marginRight: 4 }}
                      fontSize={14}
                    />
                  </View>
                </View>

                {/* True / False Buttons */}
                <View style={{ flexDirection: "row", gap: 10, marginTop: 5 }}>
                  {/* TRUE */}
                  <CustomButton
                    title={t("true")}
                    buttonStyle={[
                      styles.btnStyle,
                      styles.tfBtn,
                      {
                        backgroundColor: submitted
                          ? answers[key] === true
                            ? isCorrect
                              ? COLORS.green
                              : COLORS.danger
                            : COLORS.white
                          : answers[key] === true
                          ? COLORS.primary
                          : COLORS.white,
                        borderColor:
                          answers[key] === true
                            ? submitted
                              ? isCorrect
                                ? COLORS.green
                                : COLORS.danger
                              : COLORS.primary
                            : COLORS.borderColor2,
                      },
                    ]}
                    textStyle={[
                      styles.tfText,
                      {
                        color:
                          answers[key] === true ? COLORS.white : COLORS.black,
                      },
                    ]}
                    onPress={() => handleSelect(key, true)}
                  />

                  {/* FALSE */}
                  <CustomButton
                    title={t("false")}
                    buttonStyle={[
                      styles.btnStyle,
                      styles.tfBtn,
                      {
                        backgroundColor: submitted
                          ? answers[key] === false
                            ? isCorrect
                              ? COLORS.green
                              : COLORS.danger
                            : COLORS.white
                          : answers[key] === false
                          ? COLORS.primary
                          : COLORS.white,
                        borderColor:
                          answers[key] === false
                            ? submitted
                              ? isCorrect
                                ? COLORS.green
                                : COLORS.danger
                              : COLORS.primary
                            : COLORS.borderColor2,
                      },
                    ]}
                    textStyle={[
                      styles.tfText,
                      {
                        color:
                          answers[key] === false ? COLORS.white : COLORS.black,
                      },
                    ]}
                    onPress={() => handleSelect(key, false)}
                  />
                </View>
              </View>
            );
          }
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        {submitted && isCorrect === false && (
          <CustomButton
            title={t("retry")}
            buttonStyle={[styles.btnStyle, styles.retryBtn]}
            textStyle={styles.retryText}
            onPress={handleRetry}
          />
        )}

        <CustomButton
          title={submitted ? t("next") : t("submit")}
          buttonStyle={[
            styles.btnStyle,
            styles.submitBtn,
            !allAnswered && !submitted && styles.submitBtnDisabled,
          ]}
          textStyle={[
            styles.submitText,
            !allAnswered && !submitted && styles.submitTextDisabled,
          ]}
          disabled={!allAnswered && !submitted}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default TrueFalse;

// ===== STYLES =====
const styles = StyleSheet.create({
  carouselContainer: { marginBottom: 16 },
  carouselImage: { width: 280, height: 200, borderRadius: 10 },
  question: {
    fontSize: FONTSIZE.size20,
    fontFamily: FONTS.UrbanistSemiBold,
    marginBottom: 16,
  },
  optionLetter: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.black,
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
  tfBtn: { borderWidth: 1, borderColor: COLORS.borderColor2 },
  tfText: {
    color: COLORS.black,
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
  },
  buttons: { flexDirection: "row", gap: 20, justifyContent: "center" },
  retryBtn: { backgroundColor: COLORS.black },
  retryText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
});
