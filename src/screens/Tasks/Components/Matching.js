import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import OptionButton from "../../../components/OptionButton";
import CustomButton from "../../../components/CustomButton";
import { splitMathString } from "../../../utils/helpers";
import MathRenderer from "../../../components/MathRenderer";
import { useSubmitExerciseAnswerMutation } from "../../../services/tasksSlice";
import { useDispatch } from "react-redux";
import { startTimer, stopTimer } from "../../../utils/timeTracker";
import { setLoading } from "../../../store/loading";
import FONTSIZE from "../../../theme/fontsSize";
import FONTS from "../../../theme/fonts";
import COLORS from "../../../theme/colors";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import ImageCarousel from "../../../components/ImageCarousel";

const windowWidth = Dimensions.get("window").width;

const Matching = ({ question, onPress, answer }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedFirst, setSelectedFirst] = useState(null);
  const [selectedSecond, setSelectedSecond] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [submitExerciseAnswer] = useSubmitExerciseAnswerMutation();

  // === PRE-FILL from API if present ===
  useEffect(() => {
    if (answer && answer.answer && Object.keys(answer.answer).length > 0) {
      // API returns: answer: { "C": 1 }  -> convert second to string key "1"
      const [firstKey, secondVal] = Object.entries(answer.answer)[0];
      setSelectedFirst(firstKey);
      setSelectedSecond(String(secondVal)); // ensure it matches option keys
      setSubmitted(true);
      setIsCorrect(answer.feedbackStatus === "CORRECT");
    } else {
      // start timer only for fresh attempt
      startTimer();
    }
  }, [answer]);

  const handleSubmit = () => {
    const duration = stopTimer();
    const payload = {
      id: question?.id,
      data: {
        exerciseType: question?.exerciseType,
        completionTime: duration,
        answer: { [selectedFirst]: selectedSecond },
      },
    };

    dispatch(setLoading(true));
    submitExerciseAnswer(payload)
      .then((res) => {
        // mark feedback and show toast
        if (res?.data?.feedbackStatus === "INCORRECT") {
          setIsCorrect(false);
          showErrorToast(t("yourAnswerIsWrong"));
        } else {
          setIsCorrect(true);
          showSuccessToast(t("yourAnswerIsCorrect"));
        }
        setSubmitted(true);
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  const handleRetry = () => {
    setSubmitted(false);
    setSelectedFirst(null);
    setSelectedSecond(null);
    setIsCorrect(null);
    startTimer();
  };

  // returns `true`/`false`/null for OptionButton's `correct` prop:
  // OptionButton highlights selected && correct===true green
  // selected && correct===false -> red
  const getCorrectProp = (type, key) => {
    if (!submitted) return null;
    const isSelected =
      (type === "first" && selectedFirst === key) ||
      (type === "second" && selectedSecond === key);
    if (!isSelected) return null;
    // if submitted and user selected that option, set correct prop according to isCorrect
    return isCorrect === true ? true : false;
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
          {/* {splitMathString(question.description).map((part, idx) =>
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
          )} */}
        </View>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        {Object.entries(question.optionsRowFirst).map(([key, label]) => (
          <OptionButton
            key={key}
            optionKey={key}
            label={label}
            selected={selectedFirst === key}
            onPress={() => !submitted && setSelectedFirst(key)}
            correct={getCorrectProp("first", key)} // null | true | false
            disabled={submitted}
          />
        ))}

        <View style={styles.gap} />

        {Object.entries(question.optionsRowSecond).map(([key, label]) => (
          <OptionButton
            key={key}
            optionKey={key}
            label={label}
            selected={selectedSecond === key}
            onPress={() => !submitted && setSelectedSecond(key)}
            correct={getCorrectProp("second", key)} // null | true | false
            disabled={submitted}
          />
        ))}
      </View>

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
            submitted ? styles.nextBtn : styles.submitBtn,
            (!selectedFirst || !selectedSecond) &&
              !submitted &&
              styles.submitBtnDisabled,
          ]}
          textStyle={[
            styles.submitText,
            submitted ? styles.nextText : null,
            (!selectedFirst || !selectedSecond) &&
              !submitted &&
              styles.submitTextDisabled,
          ]}
          disabled={!submitted && (!selectedFirst || !selectedSecond)}
          onPress={() => {
            if (submitted) {
              onPress?.();
            } else {
              handleSubmit();
            }
          }}
        />
      </View>
    </View>
  );
};

export default Matching;

const styles = StyleSheet.create({
  carouselContainer: { marginBottom: 16 },
  carouselImage: { width: 280, height: 200, borderRadius: 10 },
  question: {
    fontSize: FONTSIZE.size20,
    fontFamily: FONTS.UrbanistSemiBold,
    marginBottom: 16,
  },
  gap: { marginVertical: 20 },
  buttons: { flexDirection: "row", gap: 20, justifyContent: "center" },
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
  retryBtn: { backgroundColor: COLORS.black },
  retryText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
  nextBtn: { backgroundColor: COLORS.primary },
  nextText: { color: COLORS.white },
});
