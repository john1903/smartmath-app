import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../screens/Settings/SettingsScreen";
import SelectLanguage from "../screens/Auth/SelectLanguage";
import EditProfileScreen from "../screens/Settings/EditProfileScreen";
import ChangepasswordScreen from "../screens/Settings/ChangepasswordScreen";
import SubscriptionScreen from "../screens/Settings/SubscriptionScreen";
import TokensScreen from "../screens/Settings/TokensScreen";
import AffiliateLinkScreen from "../screens/Settings/AffiliateLinkScreen";
import CountryScreen from "../screens/Settings/CountryScreen";
import PurchaseHistory from "../screens/Settings/PurchaseHistory";

// --- Navigation types ---
export type SettingsStackParamList = {
  SettingsMain: undefined;
  SelectLanguage: undefined;
  EditProfile: undefined;
  Changepassword: undefined;
  Subscription: undefined;
  Tokens: undefined;
  PurchaseHistory: undefined;
  AffiliateLink: undefined;
  Country: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStack: FC = () => {
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
      <Stack.Screen name="PurchaseHistory" component={PurchaseHistory} />
      <Stack.Screen name="AffiliateLink" component={AffiliateLinkScreen} />
      <Stack.Screen name="Country" component={CountryScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
