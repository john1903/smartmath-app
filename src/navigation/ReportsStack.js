import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportScreen from "../screens/Reports/ReportScreen";

const Stack = createNativeStackNavigator();

export default function ReportsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ReportsMain"
        component={ReportScreen}
        options={{ title: "Report" }}
      />
    </Stack.Navigator>
  );
}
