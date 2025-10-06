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

const SingleChoice = ({ question, onPress }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [submitExerciseAnswer, { isLoading }] =
    useSubmitExerciseAnswerMutation();

  const handleSelect = (id) => {
    if (selectedOption === id) {
      setSelectedOption(null); // deselect if already selected
    } else {
      setSelectedOption(id); // select new option
    }
  };

  const handleSubmit = () => {
    if (submitted) {
      setSubmitted(false);
      onPress();
    } else {
      if (selectedOption) {
        dispatch(setLoading(true));
        const duration = stopTimer(); // e.g. "PT2M15S"
        // console.log("Duration:", duration);

        let payload = {
          id: question?.id,
          data: {
            exerciseType: question?.exerciseType,
            completionTime: duration,
            answer: selectedOption,
          },
        };

        submitExerciseAnswer(payload).then((res) => {
          console.log(
            "submitted answer response :::::::::::: ",
            JSON.stringify(res)
          );
          if (res?.data?.feedbackStatus === "INCORRECT") {
            setIsCorrect(false);
            showErrorToast(t("yourAnswerIsWrong"));
          } else {
            showSuccessToast(t("yourAnswerIsCorrect"));
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
          marginHorizontal: 20,
        }}
      >
        {/* Options */}
        {Object.entries(question.options).map(([key, value], indx) => (
          <OptionButton
            key={key}
            optionKey={key}
            label={value}
            selected={selectedOption === key}
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
                setSelectedOption(null); // reset
                setIsCorrect(null); // reset feedback
                startTimer(); // restart timer
              }}
            />
          )}

          <CustomButton
            title={submitted ? t("next") : t("submit")}
            buttonStyle={[
              styles.btnStyle,
              styles.submitBtn,
              !selectedOption && styles.submitBtnDisabled,
            ]}
            textStyle={[
              styles.submitText,
              !selectedOption && styles.submitTextDisabled,
              { includeFontPadding: false },
            ]}
            disabled={!selectedOption}
            onPress={() => handleSubmit()}
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
