import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../theme/colors";
const ChangepasswordScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <CustomHeader
          title="Change Password"
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}></ScrollView>
    </SafeAreaView>
  );
};

export default ChangepasswordScreen;

// ✅ Styles
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
    paddingHorizontal: 20,
  },
});
