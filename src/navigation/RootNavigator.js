import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
