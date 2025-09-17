// components/ReportTile.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

interface Props {
  title: string;
  date: string;
  onOptionSelect: (val: string) => void;
}

const ReportTile: React.FC<Props> = ({ title, date, onOptionSelect }) => {
  return (
    <View style={styles.card}>
      <Ionicons name="document-text-outline" size={28} color="#3b82f6" />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Menu>
        <MenuTrigger>
          <Ionicons name="ellipsis-vertical" size={22} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => onOptionSelect("View")}>
            <Text>View</Text>
          </MenuOption>
          <MenuOption onSelect={() => onOptionSelect("Delete")}>
            <Text style={{ color: "red" }}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginVertical: 6,
    elevation: 2,
  },
  title: { fontWeight: "600", fontSize: 16 },
  date: { fontSize: 12, color: "#888" },
});

export default ReportTile;
