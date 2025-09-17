// import React, { useEffect, useState } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import GetStartedScreen from "../screens/Auth/GetStartedScreen";
// import SignInScreen from "../screens/Auth/SignInScreen";
// import SignUpScreen from "../screens/Auth/SignUpScreen";
// import SelectLanguage from "../screens/Auth/SelectLanguage";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Stack = createNativeStackNavigator();

// export default function AuthStack() {
//   const [firstLaunch, setFirstLaunch] = useState(true);

//   useEffect(() => {
//     AsyncStorage.getItem("alreadyLaunched").then((value) => {
//       if (value === null) {
//         AsyncStorage.setItem("alreadyLaunched", "true");
//         setFirstLaunch(true);
//       } else {
//         setFirstLaunch(false);
//       }
//     });
//   }, []);

//   return (
//     <Stack.Navigator
//       screenOptions={{ headerShown: false }}
//       initialRouteName={firstLaunch ? "GetStarted" : "SignIn"}
//     >
//       <Stack.Screen name="GetStarted" component={GetStartedScreen} />
//       <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
//       <Stack.Screen name="SignIn" component={SignInScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />
//     </Stack.Navigator>
//   );
// }

import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStartedScreen from "../screens/Auth/GetStartedScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import SelectLanguage from "../screens/Auth/SelectLanguage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  // const [firstLaunch, setFirstLaunch] = useState(true);

  // useEffect(() => {
  //   const checkFirstLaunch = async () => {
  //     const value = await AsyncStorage.getItem("alreadyLaunched");
  //     if (value === null) {
  //       await AsyncStorage.setItem("alreadyLaunched", "true");
  //       setFirstLaunch(true);
  //     } else {
  //       setFirstLaunch(false);
  //     }
  //   };
  //   checkFirstLaunch();
  // }, []);

  //
  // if (firstLaunch === null) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
