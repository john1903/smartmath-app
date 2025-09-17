// components/AnimatedDatePicker.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  label: string;
  onSelect: (date: Date) => void;
}

const AnimatedDatePicker: React.FC<Props> = ({ label, onSelect }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [visible, setVisible] = useState(false);

  const handleConfirm = (selectedDate: Date) => {
    if (selectedDate < new Date()) {
      setVisible(false);
      return; // ❌ ignore past dates
    }
    setDate(selectedDate);
    onSelect(selectedDate);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
        <Text style={{ color: date ? "#000" : "#aaa" }}>
          {date ? date.toDateString() : label}
        </Text>
        <Ionicons name="calendar" size={20} />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        minimumDate={new Date()} // ✅ no back dates
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AnimatedDatePicker;
