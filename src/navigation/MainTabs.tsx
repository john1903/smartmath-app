// import React, { FC } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { useTranslation } from "react-i18next";

// import * as Linking from "expo-linking";

// // Stack Navigators
// import HomeStack from "./HomeStack";
// import SettingsStack from "./SettingsStack";
// import TasksStack from "./TasksStack";
// import ReportsStack from "./ReportsStack";

// // SVG Icons
// import HomeActiveIcon from "../../assets/svgs/HomeActiveIcon.svg";
// import HomeIcon from "../../assets/svgs/HomeIcon.svg";

// import TasksActiveIcon from "../../assets/svgs/TasksActiveIcon.svg";
// import TasksIcon from "../../assets/svgs/TasksIcon.svg";

// import ReportsActiveIcon from "../../assets/svgs/ReportsActiveIcon.svg";
// import ReportsIcon from "../../assets/svgs/ReportsIcon.svg";

// import SettingsActiveIcon from "../../assets/svgs/SettingsActiveIcon.svg";
// import SettingsIcon from "../../assets/svgs/SettingsIcon.svg";

// // Define bottom tab parameter types
// export type MainTabsParamList = {
//   HomeTab: undefined;
//   TasksTab: undefined;
//   ReportsTab: undefined;
//   SettingsTab: undefined;
// };

// const Tab = createBottomTabNavigator<MainTabsParamList>();

// const MainTabs: FC = () => {
//   const { t } = useTranslation();

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: true,
//         detachInactiveScreens: true,
//         tabBarIcon: ({ focused }) => {
//           switch (route.name) {
//             case "HomeTab":
//               return focused ? (
//                 <HomeActiveIcon width={24} height={24} />
//               ) : (
//                 <HomeIcon width={24} height={24} />
//               );
//             case "TasksTab":
//               return focused ? (
//                 <TasksActiveIcon width={24} height={24} />
//               ) : (
//                 <TasksIcon width={24} height={24} />
//               );
//             case "ReportsTab":
//               return focused ? (
//                 <ReportsActiveIcon width={24} height={24} />
//               ) : (
//                 <ReportsIcon width={24} height={24} />
//               );
//             case "SettingsTab":
//               return focused ? (
//                 <SettingsActiveIcon width={24} height={24} />
//               ) : (
//                 <SettingsIcon width={24} height={24} />
//               );
//             default:
//               return null;
//           }
//         },
//         tabBarActiveTintColor: "#007AFF",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen
//         name="HomeTab"
//         component={HomeStack}
//         options={{ title: t("tabs.home") }}
//       />
//       <Tab.Screen
//         name="TasksTab"
//         component={TasksStack}
//         options={{ title: t("tabs.tasks") }}
//         listeners={({ navigation }: any) => ({
//           tabPress: (e) => {
//             e.preventDefault();
//             navigation.navigate("TasksTab", { screen: "TasksMain" });
//           },
//         })}
//       />
//       <Tab.Screen
//         name="ReportsTab"
//         component={ReportsStack}
//         options={{ title: t("tabs.reports") }}
//       />
//       <Tab.Screen
//         name="SettingsTab"
//         component={SettingsStack}
//         options={{ title: t("tabs.setting") }}
//         listeners={({ navigation }: any) => ({
//           tabPress: (e) => {
//             e.preventDefault();
//             navigation.navigate("SettingsTab", { screen: "SettingsMain" });
//           },
//         })}
//       />
//     </Tab.Navigator>
//   );
// };

// export default MainTabs;

import React, { useEffect, FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import {
  registerForPushNotificationsAsync,
  setupNotificationListeners,
} from "../utils/notifications";

// Stacks
import HomeStack from "./HomeStack";
import SettingsStack from "./SettingsStack";
import TasksStack from "./TasksStack";
import ReportsStack from "./ReportsStack";

// Icons
import HomeActiveIcon from "../../assets/svgs/HomeActiveIcon.svg";
import HomeIcon from "../../assets/svgs/HomeIcon.svg";
import TasksActiveIcon from "../../assets/svgs/TasksActiveIcon.svg";
import TasksIcon from "../../assets/svgs/TasksIcon.svg";
import ReportsActiveIcon from "../../assets/svgs/ReportsActiveIcon.svg";
import ReportsIcon from "../../assets/svgs/ReportsIcon.svg";
import SettingsActiveIcon from "../../assets/svgs/SettingsActiveIcon.svg";
import SettingsIcon from "../../assets/svgs/SettingsIcon.svg";
import { navigationRef } from "./RootNavigation";

const Tab = createBottomTabNavigator();

const MainTabs: FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync();

    // Listen for when a notification is tapped
    const unsubscribe = setupNotificationListeners((data: any) => {
      if (data?.screen) {
        console.log("🧭 Navigating to screen:", data.screen);
        navigationRef.navigate(data.screen);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        detachInactiveScreens: true,
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case "HomeTab":
              return focused ? (
                <HomeActiveIcon width={24} height={24} />
              ) : (
                <HomeIcon width={24} height={24} />
              );
            case "TasksTab":
              return focused ? (
                <TasksActiveIcon width={24} height={24} />
              ) : (
                <TasksIcon width={24} height={24} />
              );
            case "ReportsTab":
              return focused ? (
                <ReportsActiveIcon width={24} height={24} />
              ) : (
                <ReportsIcon width={24} height={24} />
              );
            case "SettingsTab":
              return focused ? (
                <SettingsActiveIcon width={24} height={24} />
              ) : (
                <SettingsIcon width={24} height={24} />
              );
            default:
              return null;
          }
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: t("tabs.home") }}
      />
      <Tab.Screen
        name="TasksTab"
        component={TasksStack}
        options={{ title: t("tabs.tasks") }}
      />
      <Tab.Screen
        name="ReportsTab"
        component={ReportsStack}
        options={{ title: t("tabs.reports") }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{ title: t("tabs.setting") }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
