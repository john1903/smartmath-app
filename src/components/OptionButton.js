import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OptionButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>

      {/* Circle on the right side */}
      <View style={[styles.circle, selected && styles.selectedCircle]}>
        {selected && <Ionicons name="ellipse" size={14} color="#fff" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedContainer: {
    backgroundColor: "#4CAF50", // green background
    borderColor: "#4CAF50",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  selectedLabel: {
    color: "#fff",
    fontWeight: "600",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCircle: {
    borderColor: "#fff",
    backgroundColor: "#4CAF50",
  },
});
