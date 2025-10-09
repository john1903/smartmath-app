import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useColorScheme,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CalendarIcon from "../../assets/svgs/CalendarIcon.svg";

interface Props {
  label: string;
  selectedDate?: Date | null;
  minimumDate?: Date;
  maximumDate?: Date;
  onSelect: (date: Date) => void;
}

const AnimatedDatePicker: React.FC<Props> = ({
  label,
  selectedDate,
  minimumDate,
  maximumDate,
  onSelect,
}) => {
  const colorScheme = useColorScheme(); // "light" or "dark"
  const isDarkMode = colorScheme === "dark";
  const [visible, setVisible] = useState(false);

  const handleConfirm = (date: Date) => {
    onSelect(date);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
        <Text style={{ color: selectedDate ? "#000" : "#aaa" }}>
          {selectedDate ? selectedDate.toDateString() : label}
        </Text>
        <CalendarIcon width={22} height={22} />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        display={Platform.select({
          ios: "inline",
          android: "default",
        })}
        isDarkModeEnabled={isDarkMode}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        {...(Platform.OS === "ios"
          ? { textColor: isDarkMode ? "white" : "black" }
          : {})}
        pickerContainerStyleIOS={{
          backgroundColor: isDarkMode ? "#000" : "#fff",
        }}
        pickerComponentStyleIOS={{
          backgroundColor: isDarkMode ? "#000" : "#fff",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16, width: "100%" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AnimatedDatePicker;
