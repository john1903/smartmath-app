import { View, Text, StyleSheet, Image } from "react-native";
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

const MultipleChoice = ({ question, onPress }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState([]); // ✅ array instead of single
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [submitExerciseAnswer, { isLoading }] =
    useSubmitExerciseAnswerMutation();

  const handleSelect = (id) => {
    if (selectedOptions.includes(id)) {
      // ✅ remove if already selected
      setSelectedOptions(selectedOptions.filter((item) => item !== id));
    } else {
      // ✅ add if not selected
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const handleSubmit = () => {
    if (submitted) {
      setSubmitted(false);
      onPress();
    } else {
      if (selectedOptions.length > 0) {
        dispatch(setLoading(true));
        const duration = stopTimer(); // e.g. "PT2M15S"
        console.log("Duration:", duration);

        let payload = {
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
            showErrorToast("Your answer is wrong!");
          } else {
            showSuccessToast("Your answer is correct!");
            setIsCorrect(true);
          }
        });

        setSubmitted(true);
      }
    }
  };

  useEffect(() => {
    startTimer(); // start when screen loads
  }, []);

  return (
    <View>
      {/* Question Image */}
      {question?.image ? (
        <Image source={{ uri: question?.image }} style={styles.image} />
      ) : (
        <View style={{ height: 30 }} />
      )}

      <View
        style={{
          marginHorizontal: 30,
        }}
      >
        {/* Question */}

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

      <View
        style={{
          marginHorizontal: 30,
        }}
      >
        {/* Options */}
        {Object.entries(question.options).map(([key, value], indx) => (
          <OptionButton
            key={key}
            optionKey={key}
            label={value}
            selected={selectedOptions.includes(key)} // ✅ check inside array
            onPress={() => handleSelect(key)}
            index={indx}
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
                setSelectedOptions([]); // reset
                setIsCorrect(null); // reset feedback
                startTimer(); // restart timer
              }}
            />
          )}

          <CustomButton
            title={submitted ? "Next" : "Submit"}
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

  buttons: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  retryBtn: { backgroundColor: COLORS.black },
  retryText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
});
