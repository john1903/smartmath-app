// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import CalendarIcon from "../../assets/svgs/CalendarIcon.svg";

// interface Props {
//   label: string;
//   selectedDate?: Date | null;
//   minimumDate?: Date;
//   maximumDate?: Date;
//   onSelect: (date: Date) => void;
// }

// const AnimatedDatePicker: React.FC<Props> = ({
//   label,
//   selectedDate,
//   minimumDate,
//   maximumDate,
//   onSelect,
// }) => {
//   const [visible, setVisible] = useState(false);

//   const handleConfirm = (date: Date) => {
//     onSelect(date);
//     setVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
//         <Text style={{ color: selectedDate ? "#000" : "#aaa" }}>
//           {selectedDate ? selectedDate.toDateString() : label}
//         </Text>
//         <CalendarIcon width={22} height={22} />
//       </TouchableOpacity>

//       <DateTimePickerModal
//         isVisible={visible}
//         mode="date"
//         display="inline"
//         minimumDate={minimumDate}
//         maximumDate={maximumDate}
//         onConfirm={handleConfirm}
//         onCancel={() => setVisible(false)}
//         textColor="black"
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

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CalendarIcon from "../../assets/svgs/CalendarIcon.svg";
import COLORS from "../theme/colors";

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
        display={Platform.select({
          ios: "inline", // iOS calendar style
          android: "default", // Android default
        })}
        isDarkModeEnabled={false}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        // only set textColor on iOS
        {...(Platform.OS === "ios" ? { textColor: "black" } : {})}
        pickerContainerStyleIOS={{
          backgroundColor: COLORS.black,
        }}
        pickerComponentStyleIOS={{
          backgroundColor: COLORS.black,
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
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AnimatedDatePicker;
