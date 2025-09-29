import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import FONTSIZE from "../../../theme/fontsSize";
import FONTS from "../../../theme/fonts";
import COLORS from "../../../theme/colors";
import { splitMathString } from "../../../utils/helpers";
import MathRenderer from "../../../components/MathRenderer";
import { useSubmitExerciseAnswerMutation } from "../../../services/tasksSlice";
import { useDispatch } from "react-redux";
import { startTimer, stopTimer } from "../../../utils/timeTracker";
import CustomButton from "../../../components/CustomButton";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { setLoading } from "../../../store/loading";

const TrueFalse = ({ question, onPress }) => {
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState({}); // { "1": true, "2": false }
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [submitExerciseAnswer] = useSubmitExerciseAnswerMutation();

  const allAnswered =
    Object.keys(answers).length ===
    Object.keys(question?.statements || {}).length;

  // Handle selection
  const handleSelect = (id, value) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Submit
  const handleSubmit = () => {
    const duration = stopTimer(); // "PT3M"
    const payload = {
      id: question?.id,
      data: {
        exerciseType: question?.exerciseType,
        completionTime: duration,
        answer: answers,
      },
    };

    dispatch(setLoading(true));
    submitExerciseAnswer(payload).then((res) => {
      if (res?.data?.feedbackStatus === "INCORRECT") {
        setIsCorrect(false);
        showErrorToast("Your answer is wrong!");
      } else {
        showSuccessToast("Your answer is correct!");
        setIsCorrect(true);
      }

      console.log("True/False submit response ::::::::: ", res);
      setSubmitted(true);
    });
  };

  const handleRetry = () => {
    setSubmitted(false);
    setAnswers({}); // reset
    setIsCorrect(null); // reset feedback
    startTimer(); // restart timer
  };

  useEffect(() => {
    startTimer();
  }, []);

  const getLetter = (index) => String.fromCharCode(65 + index);

  return (
    <View>
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
        <Text style={styles.question}>Question 1: {question?.text}</Text>
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
        {Object.entries(question?.statements || {}).map(
          ([key, statement], index) => {
            const letter = getLetter(index); // A, B, C ...
            return (
              <View key={key} style={{ marginVertical: 10 }}>
                {/* <Text>{`${letter}) ${statement}`}</Text> */}

                <View style={styles.questionDisplay}>
                  <Text style={[styles.optionLetter]}>{`${letter})`}</Text>
                  <View>
                    {splitMathString(statement).map((part, idx) =>
                      part.startsWith("$") ? (
                        <MathRenderer
                          key={idx}
                          formula={part}
                          style={{ marginRight: 4 }}
                        />
                      ) : (
                        <Text key={idx} style={styles.statmentQuestion}>
                          {part}
                        </Text>
                      )
                    )}
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 5 }}>
                  <CustomButton
                    title={"True"}
                    buttonStyle={[
                      styles.btnStyle,
                      styles.tfBtn,
                      {
                        backgroundColor: submitted
                          ? // after submit → color feedback
                            answers[key] === true
                            ? isCorrect
                              ? COLORS.green // correct
                              : COLORS.danger // incorrect
                            : COLORS.white
                          : // before submit → normal selection
                          answers[key] === true
                          ? COLORS.green
                          : COLORS.white,
                        borderColor:
                          answers[key] === true
                            ? answers[key] === true && submitted
                              ? isCorrect
                                ? COLORS.green
                                : COLORS.danger
                              : COLORS.green
                            : COLORS.borderColor2,
                      },
                    ]}
                    textStyle={[
                      styles.tfText,
                      {
                        color:
                          answers[key] === true && submitted
                            ? COLORS.white
                            : answers[key] === true
                            ? COLORS.white
                            : COLORS.black,
                        includeFontPadding: false,
                      },
                    ]}
                    onPress={() => handleSelect(key, true)}
                  />

                  <CustomButton
                    title={"False"}
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
                          ? COLORS.green
                          : COLORS.white,
                        borderColor:
                          answers[key] === false
                            ? answers[key] === false && submitted
                              ? isCorrect
                                ? COLORS.green
                                : COLORS.danger
                              : COLORS.green
                            : COLORS.borderColor2,
                      },
                    ]}
                    textStyle={[
                      styles.tfText,
                      {
                        color:
                          answers[key] === false && submitted
                            ? COLORS.white
                            : answers[key] === false
                            ? COLORS.white
                            : COLORS.black,
                        includeFontPadding: false,
                      },
                    ]}
                    onPress={() => handleSelect(key, false)}
                  />

                  {/* <CustomButton
                    title={"True"}
                    buttonStyle={[
                      styles.btnStyle,
                      styles.tfBtn,
                      {
                        backgroundColor:
                          answers[key] === true ? COLORS.green : COLORS.white,
                        borderColor:
                          answers[key] === true
                            ? COLORS.green
                            : COLORS.borderColor2,
                      },
                    ]}
                    textStyle={[
                      styles.tfText,
                      {
                        color:
                          answers[key] === true ? COLORS.white : COLORS.black,
                        includeFontPadding: false,
                      },
                    ]}
                    onPress={() => handleSelect(key, true)}
                  />

                  <CustomButton
                    title={"False"}
                    buttonStyle={[
                      styles.btnStyle,
                      styles.tfBtn,
                      {
                        backgroundColor:
                          answers[key] === false ? COLORS.green : COLORS.white,
                        borderColor:
                          answers[key] === false
                            ? COLORS.green
                            : COLORS.borderColor2,
                      },
                    ]}
                    textStyle={[
                      styles.tfText,
                      {
                        color:
                          answers[key] === false ? COLORS.white : COLORS.black,
                        includeFontPadding: false,
                      },
                    ]}
                    onPress={() => handleSelect(key, false)}
                  /> */}
                </View>
              </View>
            );
          }
        )}
      </View>
      <View style={styles.buttons}>
        {submitted && isCorrect === false && (
          <CustomButton
            title="Retry"
            buttonStyle={[styles.btnStyle, styles.retryBtn]}
            textStyle={[styles.retryText, { includeFontPadding: false }]}
            onPress={handleRetry}
          />
        )}

        <CustomButton
          title={submitted ? "Next" : "Submit"}
          buttonStyle={[
            styles.btnStyle,
            styles.submitBtn,
            !allAnswered && styles.submitBtnDisabled,
          ]}
          textStyle={[
            styles.submitText,
            !allAnswered && styles.submitTextDisabled,
            { includeFontPadding: false },
          ]}
          disabled={!allAnswered} // only active when all answered
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

export default TrueFalse;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },

  questionDisplay: {
    flexDirection: "row",
    // alignItems: "center",
  },
  question: {
    fontSize: FONTSIZE.size20,
    fontFamily: FONTS.UrbanistSemiBold,
    marginBottom: 16,
  },
  statmentQuestion: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistMedium,
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
  tfContainer: { flexDirection: "row", gap: 20, marginBottom: 30 },
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
