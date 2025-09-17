// // components/AnimatedDropdown.tsx
// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import Animated, {
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated";
// import { Ionicons } from "@expo/vector-icons";

// interface Props {
//   label: string;
//   options: string[];
//   onSelect: (val: string) => void;
// }

// const AnimatedDropdown: React.FC<Props> = ({ label, options, onSelect }) => {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState<string>("");

//   const style = useAnimatedStyle(() => ({
//     height: withTiming(open ? options.length * 45 : 0, { duration: 250 }),
//     opacity: withTiming(open ? 1 : 0, { duration: 200 }),
//   }));

//   return (
//     <View style={[styles.container, open && styles.containerActive]}>
//       {/* Header */}
//       <TouchableOpacity style={styles.header} onPress={() => setOpen(!open)}>
//         <Text style={{ color: selected ? "#000" : "#aaa" }}>
//           {selected || label}
//         </Text>
//         <Ionicons name={open ? "chevron-up" : "chevron-down"} size={20} />
//       </TouchableOpacity>

//       {/* Options list */}
//       <Animated.View style={[style]}>
//         {options.map((item) => (
//           <TouchableOpacity
//             key={item}
//             style={styles.option}
//             onPress={() => {
//               setSelected(item);
//               onSelect(item);
//               setOpen(false);
//             }}
//           >
//             <Text>{item}</Text>
//           </TouchableOpacity>
//         ))}
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 12,
//     marginBottom: 12,
//     overflow: "hidden", // ✅ keeps border clean when open
//   },
//   containerActive: {
//     borderColor: "#3b82f6", // highlight when expanded
//   },
//   header: {
//     padding: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   option: {
//     padding: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//     backgroundColor: "#fff",
//   },
// });

// export default AnimatedDropdown;

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Props {
  label: string;
  options: string[];
  onSelect: (val: string) => void;
}

const AnimatedDropdown: React.FC<Props> = ({ label, options, onSelect }) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  // Convert ["Daily", "Weekly"] → {label, value}
  const data = options.map((item) => ({ label: item, value: item }));

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && styles.dropdownOpen, // 🔑 remove bottom radius on open
        ]}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        data={data}
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder={label}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onSelect(item.value);
        }}
        // 🔑 style for dropdown list container
        containerStyle={styles.dropdownContainer}
      />
    </View>
  );
};

export default AnimatedDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderTopWidth: 0, // 🔑 merge with input border
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: "hidden",
  },
  placeholder: {
    fontSize: 14,
    color: "#aaa",
  },
  selectedText: {
    fontSize: 14,
    color: "#000",
  },
});
