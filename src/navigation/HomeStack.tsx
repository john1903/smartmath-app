import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";

// Define navigation param types
export type HomeStackParamList = {
  HomeMain: undefined;
};

// Create stack navigator with typed params
const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
