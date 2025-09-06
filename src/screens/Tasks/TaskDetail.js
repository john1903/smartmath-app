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
        {question.options.map((opt) => (
          <OptionButton
            key={opt.id}
            label={opt.label}
            selected={selectedOption === opt.id}
            onPress={() => handleSelect(opt.id)}
          />
        ))}

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            !selectedOption && styles.submitBtnDisabled,
          ]}
          disabled={!selectedOption}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
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
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: "#333",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
