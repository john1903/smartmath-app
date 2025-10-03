import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, Platform, StatusBar as RNStatusBar } from "react-native";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import COLORS from "../theme/colors";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { token } = useSelector((state) => state?.auth);

  return (
    <>
     <View style={styles.statusBarBg} />
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </>
  );
}
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 60 : RNStatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarBg: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: COLORS.primary, // your desired BG color
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
});