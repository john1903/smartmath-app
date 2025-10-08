import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import COLORS from "../theme/colors";

// Define Root Stack param types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// Define Redux state type (adjust to your actual store shape)
interface RootState {
  auth: {
    token: string | null;
  };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <StatusBar
        style={Platform.OS === "ios" ? "dark" : "light"}
        backgroundColor={COLORS.primary}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default RootNavigator;
