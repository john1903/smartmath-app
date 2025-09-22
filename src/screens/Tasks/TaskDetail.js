import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import COLORS from "../../theme/colors";
import OptionButton from "../../components/OptionButton";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import CustomButton from "../../components/CustomButton";
import { useTranslation } from "react-i18next";

import TokenWhiteIcon from "../../../assets/svgs/TokenWhiteIcon.svg";
import TokenBlackIcon from "../../../assets/svgs/TokenBlackIcon.svg";

const TaskDetail = ({ navigation }) => {
  const { t } = useTranslation();

  const [appToken, setAppToken] = useState(10);
  const [selectedOption, setSelectedOption] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  // const question = {
  //   id: 1,
  //   type: "mcqs",
  //   text: "What is the next prime number after 7?",
  //   // image:
  //   //   "https://img.freepik.com/free-photo/student-solving-math-blackboard_23-2147867095.jpg",
  //   image: "",
  //   options: [
  //     { id: "A", label: "Two solutions –3 and 0" },
  //     { id: "B", label: "Two solutions –3 and 2" },
  //     { id: "C", label: "Three solutions –25, –3, and 0" },
  //     { id: "D", label: "Four solutions –25, –3, 0, and 5" },
  //   ],
  // };

  // const question = {
  //   id: 1,
  //   type: "truefalse",
  //   text: "The square root of 16 is 4?",
  //   image: "",
  // };

  const question = {
    id: 1,
    type: "upload",
    text: "The square root of 16 is 4?",
    image: "",
  };

  const handleSelect = (id) => {
    if (selectedOption === id) {
      setSelectedOption(null); // deselect if already selected
    } else {
      setSelectedOption(id); // select new option
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      alert(`You selected: ${selectedOption}`);
    }
  };

  const renderQuestion = (q) => {
    switch (q.type) {
      case "mcqs":
        return (
          <>
            {/* Question Image */}
            {q?.image ? (
              <Image
                source={{
                  uri: q?.image,
                }}
                style={styles.image}
              />
            ) : (
              <View style={{ height: 30 }}></View>
            )}

            {/* Question */}
            <Text style={styles.question}>Question 1: {q.text}</Text>

            {/* Options */}
            {q.options.map((opt, indx) => (
              <OptionButton
                key={opt.id}
                label={opt.label}
                selected={selectedOption === opt.id}
                onPress={() => handleSelect(opt.id)}
                index={indx}
              />
            ))}
          </>
        );

      case "truefalse":
        return (
          <>
            {/* Question Image */}
            {question?.image ? (
              <Image
                source={{
                  uri: question?.image,
                }}
                style={styles.image}
              />
            ) : (
              <View style={{ height: 30 }}></View>
            )}

            {/* Question */}
            <Text style={styles.question}>Question 1: {question.text}</Text>

            {/* Options */}
            <View style={[styles.tfContainer]}>
              {["True", "False"].map((label, index) => {
                const value = label; // True = 0, False = 1
                let bgColor = "#eee";
                let bdColor = COLORS.borderColor2;
                let txtColor = COLORS.black;

                if (selectedOption === value) {
                  if (submitted) {
                    bgColor = isCorrect ? COLORS.green : COLORS.danger; // after submit → show green/red
                  } else {
                    bgColor = COLORS.green; // selected but not submitted yet
                    bdColor = COLORS.green;
                    txtColor = COLORS.white;
                  }
                }

                return (
                  <>
                    <CustomButton
                      title={label}
                      buttonStyle={[
                        styles.btnStyle,
                        styles.tfBtn,
                        {
                          backgroundColor: bgColor,
                          borderColor: bdColor,
                        },
                      ]}
                      textStyle={[
                        styles.tfText,
                        {
                          color: txtColor,
                          includeFontPadding: false,
                        },
                      ]}
                      onPress={() => setSelectedOption(value)}
                    />
                  </>
                );
              })}
            </View>
          </>
        );

      case "upload":
        return (
          <>
            {/* Question Image */}
            {question?.image ? (
              <Image
                source={{
                  uri: question?.image,
                }}
                style={styles.image}
              />
            ) : (
              <View style={{ height: 30 }}></View>
            )}

            {/* Question */}
            <Text style={styles.question}>Question 1: {question.text}</Text>

            {/* Options */}
            <View style={[styles.tfContainer]}>
              <View></View>
            </View>
          </>
        );

      case "matching":
        return <View style={{ width: "100%" }}></View>;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <CustomHeader
          title="Tasks Detail"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {renderQuestion(question)}

        {/* Submit Button */}
        {question?.type != "upload" && (
          <View style={styles.buttons}>
            {submitted && (
              <CustomButton
                title={t("retry")}
                buttonStyle={[styles.btnStyle, styles.retryBtn]}
                textStyle={[
                  styles.retryText,
                  {
                    includeFontPadding: false,
                  },
                ]}
                onPress={() => handleSubmit()}
              />
            )}

            <CustomButton
              title={selectedOption ? "Next" : "Submit"}
              buttonStyle={[
                styles.btnStyle,
                styles.submitBtn,
                !selectedOption && styles.submitBtnDisabled,
              ]}
              textStyle={[
                styles.submitText,
                !selectedOption && styles.submitTextDisabled,
                {
                  includeFontPadding: false,
                },
              ]}
              disabled={!selectedOption}
              onPress={() => handleSubmit()}
            />
          </View>
        )}

        {question?.type === "upload" && (
          <View>
            {appToken > 0 ? (
              <View style={styles.whiteSheetFooter}>
                <CustomButton
                  title="50 Token to Submit"
                  buttonStyle={styles.generateReportBtn}
                  textStyle={styles.generateReportBtnTitle}
                  onPress={() => navigation.navigate("SignIn")}
                  svg={<TokenWhiteIcon width={22} height={22} />}
                />
                {/* <Text style={styles.whiteSheetFooterText}>
                  {appToken} Token available
                </Text> */}
              </View>
            ) : (
              <View style={styles.whiteSheetFooter}>
                <CustomButton
                  title="50 Token to Submit"
                  buttonStyle={[
                    styles.generateReportBtn,
                    {
                      backgroundColor: COLORS.D9Gray,
                      borderWidth: 0,
                    },
                  ]}
                  textStyle={[
                    styles.generateReportBtnTitle,
                    {
                      color: COLORS.black,
                    },
                  ]}
                  onPress={() => navigation.navigate("SignIn")}
                  svg={<TokenBlackIcon width={22} height={22} />}
                />
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.whiteSheetFooterText,
                      {
                        marginRight: 10,
                      },
                    ]}
                  >
                    {appToken} Token available
                  </Text>
                  <TouchableOpacity onPress={() => console.log("Buy Tokens")}>
                    <Text
                      style={[
                        styles.whiteSheetFooterText,
                        {
                          color: COLORS.primary,
                        },
                      ]}
                    >
                      Buy Tokens
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  safeContent: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
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
    backgroundColor: COLORS.white, // default
    borderWidth: 0,
  },

  submitBtn: {
    backgroundColor: COLORS.primary, // default
  },

  submitBtnDisabled: {
    backgroundColor: COLORS.D9Gray, // 👈 only override this
  },

  submitText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },

  submitTextDisabled: {
    color: COLORS.black,
  },

  tfContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },

  tfBtn: {
    borderWidth: 1,
    borderColor: COLORS.borderColor2,
  },
  tfText: {
    color: COLORS.black,
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
  },

  buttons: {
    flexDirection: "row",
    gap: 20,
  },

  retryBtn: {
    backgroundColor: COLORS.black, // default
  },

  retryText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },

  whiteSheetFooter: {
    alignItems: "center",
  },
  generateReportBtn: {
    width: "100%",
    alignItems: "center",
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  generateReportBtnTitle: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
  whiteSheetFooterText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
    marginTop: 10,
    color: COLORS.black,
  },
});
