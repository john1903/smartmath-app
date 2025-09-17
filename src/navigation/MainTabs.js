// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeStack from "./HomeStack";
// import SettingsStack from "./SettingsStack";
// import TasksStack from "./TasksStack";
// import ReportsStack from "./ReportsStack";

// const Tab = createBottomTabNavigator();

// export default function MainTabs() {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen
//         name="HomeTab"
//         component={HomeStack}
//         options={{ title: "Home" }}
//       />
//       <Tab.Screen
//         name="TasksTab"
//         component={TasksStack}
//         options={{ title: "Tasks" }}
//       />
//       <Tab.Screen
//         name="ReportsTab"
//         component={ReportsStack}
//         options={{ title: "Reports" }}
//       />

//       <Tab.Screen
//         name="SettingsTab"
//         component={SettingsStack}
//         options={{ title: "Setting" }}
//       />
//     </Tab.Navigator>
//   );
// }

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeStack from "./HomeStack";
import SettingsStack from "./SettingsStack";
import TasksStack from "./TasksStack";
import ReportsStack from "./ReportsStack";

import HomeActiveIcon from "../../assets/svgs/HomeActiveIcon.svg";
import HomeIcon from "../../assets/svgs/HomeIcon.svg";

import TasksActiveIcon from "../../assets/svgs/TasksActiveIcon.svg";
import TasksIcon from "../../assets/svgs/TasksIcon.svg";

import ReportsActiveIcon from "../../assets/svgs/ReportsActiveIcon.svg";
import ReportsIcon from "../../assets/svgs/ReportsIcon.svg";

import SettingsActiveIcon from "../../assets/svgs/SettingsActiveIcon.svg";
import SettingsIcon from "../../assets/svgs/SettingsIcon.svg";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        lazy: false,
        tabBarIcon: ({ focused }) => {
          if (route.name === "HomeTab") {
            return focused ? (
              <HomeActiveIcon width={24} height={24} />
            ) : (
              <HomeIcon width={24} height={24} />
            );
          } else if (route.name === "TasksTab") {
            return focused ? (
              <TasksActiveIcon width={24} height={24} />
            ) : (
              <TasksIcon width={24} height={24} />
            );
          } else if (route.name === "ReportsTab") {
            return focused ? (
              <ReportsActiveIcon width={24} height={24} />
            ) : (
              <ReportsIcon width={24} height={24} />
            );
          } else if (route.name === "SettingsTab") {
            return focused ? (
              <SettingsActiveIcon width={24} height={24} />
            ) : (
              <SettingsIcon width={24} height={24} />
            );
          }
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: t("tabs.home"), unmountOnBlur: false }}
      />
      <Tab.Screen
        name="TasksTab"
        component={TasksStack}
        options={{ title: t("tabs.tasks"), unmountOnBlur: false }}
      />
      <Tab.Screen
        name="ReportsTab"
        component={ReportsStack}
        options={{ title: t("tabs.reports"), unmountOnBlur: false }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{ title: t("tabs.setting"), unmountOnBlur: false }}
      />
    </Tab.Navigator>
  );
}
