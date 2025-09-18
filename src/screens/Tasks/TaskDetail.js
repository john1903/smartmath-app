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

const TaskDetail = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const question = {
    id: 1,
    text: "What is the next prime number after 7?",
    options: [
      { id: "A", label: "Two solutions –3 and 0" },
      { id: "B", label: "Two solutions –3 and 2" },
      { id: "C", label: "Three solutions –25, –3, and 0" },
      { id: "D", label: "Four solutions –25, –3, 0, and 5" },
    ],
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
        {/* Question Image */}
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/student-solving-math-blackboard_23-2147867095.jpg",
          }}
          style={styles.image}
        />

        {/* Question */}
        <Text style={styles.question}>Question 1: {question.text}</Text>

        {/* Options */}
        {question.options.map((opt, indx) => (
          <OptionButton
            key={opt.id}
            label={opt.label}
            selected={selectedOption === opt.id}
            onPress={() => handleSelect(opt.id)}
            index={indx}
          />
        ))}

        {/* Submit Button */}
        <View
          style={{
            flexDirection: "row",
            // backgroundColor: "red",
            gap: 20,
          }}
        >
          <TouchableOpacity
            style={[
              styles.submitBtn,
              !selectedOption && styles.submitBtnDisabled,
            ]}
            disabled={!selectedOption}
            onPress={handleSubmit}
          >
            <Text
              style={[
                styles.submitText,
                !selectedOption && styles.submitTextDisabled,
              ]}
            >
              {selectedOption ? "Next" : "Submit"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.retryBtn,
              // !selectedOption && styles.submitBtnDisabled,
            ]}
            // disabled={!selectedOption}
            onPress={handleSubmit}
          >
            <Text
              style={[
                styles.retryText,
                // !selectedOption && styles.submitTextDisabled,
              ]}
            >
              Retry
            </Text>
          </TouchableOpacity>
        </View>
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
  submitBtn: {
    width: "50%",
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 100,
    marginTop: 20,
    alignItems: "center",
  },

  submitBtn: {
    width: "45%",
    paddingVertical: 14,
    borderRadius: 100,
    marginTop: 20,
    alignItems: "center",
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

  retryBtn: {
    width: "45%",
    paddingVertical: 14,
    borderRadius: 100,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: COLORS.black, // default
  },

  retryText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
});
