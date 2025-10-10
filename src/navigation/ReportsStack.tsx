import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportScreen from "../screens/Reports/ReportScreen";

// Define navigation parameter types for this stack
export type ReportsStackParamList = {
  ReportsMain: undefined;
};

// Create the stack navigator with types
const Stack = createNativeStackNavigator<ReportsStackParamList>();

const ReportsStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ReportsMain"
        component={ReportScreen}
        options={{ title: "Report" }}
      />
    </Stack.Navigator>
  );
};

export default ReportsStack;
