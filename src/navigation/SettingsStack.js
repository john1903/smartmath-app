import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import SelectLanguage from "../screens/Auth/SelectLanguage";
import EditProfileScreen from "../screens/Settings/EditProfileScreen";
import ChangepasswordScreen from "../screens/Settings/ChangepasswordScreen";
import SubscriptionScreen from "../screens/Settings/SubscriptionScreen";
import TokensScreen from "../screens/Settings/TokensScreen";
import AffiliateLinkScreen from "../screens/Settings/AffiliateLinkScreen";
import CountryScreen from "../screens/Settings/CountryScreen";

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SettingsMain"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
      <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Changepassword" component={ChangepasswordScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="Tokens" component={TokensScreen} />
      <Stack.Screen name="AffiliateLink" component={AffiliateLinkScreen} />
      <Stack.Screen name="Country" component={CountryScreen} />
    </Stack.Navigator>
  );
}
