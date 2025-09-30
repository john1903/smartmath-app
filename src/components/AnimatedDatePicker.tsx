// // components/AnimatedDatePicker.tsx
// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { Ionicons } from "@expo/vector-icons";
// import CalendarIcon from "../../assets/svgs/CalendarIcon.svg";

// interface Props {
//   label: string;
//   onSelect: (date: Date) => void;
// }

// const AnimatedDatePicker: React.FC<Props> = ({ label, onSelect }) => {
//   const [date, setDate] = useState<Date | null>(null);
//   const [visible, setVisible] = useState(false);

//   const handleConfirm = (selectedDate: Date) => {
//     setDate(selectedDate);
//     onSelect(selectedDate);
//     setVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
//         <Text style={{ color: date ? "#000" : "#aaa" }}>
//           {date ? date.toDateString() : label}
//         </Text>
//         {/* <Ionicons name="calendar" size={20} /> */}
//         <CalendarIcon width={22} height={22} />
//       </TouchableOpacity>

//       <DateTimePickerModal
//         isVisible={visible}
//         mode="date"
//         minimumDate={new Date()} // ✅ no back dates
//         onConfirm={handleConfirm}
//         onCancel={() => setVisible(false)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { marginBottom: 16, width: "100%" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 12,
//     borderRadius: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
// });

// export default AnimatedDatePicker;

// components/AnimatedDatePicker.tsx
// components/AnimatedDatePicker.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
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
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AnimatedDatePicker;
