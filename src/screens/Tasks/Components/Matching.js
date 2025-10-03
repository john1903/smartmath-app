import { View, Text, StyleSheet } from "react-native";
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

const Matching = ({ question, onPress }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [selectedFirst, setSelectedFirst] = useState(null); // A or B
  const [selectedSecond, setSelectedSecond] = useState(null); // 1,2,3
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [submitExerciseAnswer] = useSubmitExerciseAnswerMutation();

  // Handle submit
  const handleSubmit = () => {
    const duration = stopTimer();
    const payload = {
      id: question?.id,
      data: {
        exerciseType: question?.exerciseType,
        completionTime: duration,
        answer: { [selectedFirst]: selectedSecond }, // e.g. { "A": "1" }
      },
    };

    dispatch(setLoading(true));
    submitExerciseAnswer(payload).then((res) => {
      // console.log("resssssssssss", JSON.stringify(res));
      if (res?.data?.feedbackStatus === "INCORRECT") {
        setIsCorrect(false);
        showErrorToast(t("yourAnswerIsWrong"));
      } else {
        setIsCorrect(true);
        showSuccessToast(t("yourAnswerIsCorrect"));
      }
      setSubmitted(true);
    });
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <View>
      {/* Description */}
      <View style={{ marginHorizontal: 20 }}>
        {splitMathString(question.description).map((part, idx) =>
          part.startsWith("$") ? (
            <MathRenderer key={idx} formula={part} style={{ marginRight: 4 }} />
          ) : (
            <Text key={idx} style={styles.description}>
              {part}
            </Text>
          )
        )}
      </View>

      <View style={{ marginHorizontal: 20 }}>
        {/* Row First (A, B) */}
        {/* <Text style={styles.heading}>Choose a binomial:</Text> */}
        {Object.entries(question.optionsRowFirst).map(([key, value]) => (
          <OptionButton
            key={key}
            optionKey={key}
            label={value}
            selected={selectedFirst === key}
            onPress={() => !submitted && setSelectedFirst(key)}
            correct={submitted ? isCorrect : null}
          />
        ))}

        {/* Row Second (1,2,3) */}
        {/* <Text style={styles.heading}>Choose justification:</Text> */}
        <View style={[styles.gap]}></View>
        {Object.entries(question.optionsRowSecond).map(([key, value]) => (
          <OptionButton
            key={key}
            optionKey={key}
            label={value}
            selected={selectedSecond === key}
            onPress={() => !submitted && setSelectedSecond(key)}
            correct={submitted ? isCorrect : null}
          />
        ))}
      </View>

      <View style={styles.buttons}>
        {submitted && isCorrect === false && (
          <CustomButton
            title={"Retry"}
            buttonStyle={[styles.btnStyle, styles.retryBtn]}
            textStyle={styles.retryText}
            onPress={() => {
              setSubmitted(false);
              setIsCorrect(null);
              setSelectedFirst(null);
              setSelectedSecond(null);
              startTimer();
            }}
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
              onPress?.(); // go to next question
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
  gap: {
    marginVertical: 20,
  },
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

  nextBtn: { backgroundColor: COLORS.primary }, // always blue after submit
  nextText: { color: COLORS.white },
});
