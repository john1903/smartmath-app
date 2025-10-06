import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomHeader from "../../components/CustomHeader";
// import COLORS from "../../theme/colors";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import AccountIcon from "../../../assets/svgs/accountIcon.svg";
import NotificationIcon from "../../../assets/svgs/NotificationIcon.svg";
import MoreIcon from "../../../assets/svgs/MoreIcon.svg";
import ThemeIcon from "../../../assets/svgs/ThemeIcon.svg";
import LogoutIcon from "../../../assets/svgs/LogoutIcon.svg";
import SettingItem from "./SettingItem";
import SwitchItem from "./SwitchItem";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../../utils/logout";
import { useDispatch } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { makeStyles } from "../../utils/makeStyles";

// ✅ Types
type RootStackParamList = {
  Settings: undefined;

  SelectLanguage: undefined;
  EditProfile: undefined;
  Changepassword: undefined;
  Subscription: undefined;
  Tokens: undefined;
  AffiliateLink: undefined;
  Country: undefined;
  SignIn: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

// ✅ Main Settings Screen
export default function SettingsScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { theme, COLORS, toggleTheme } = useTheme();
  const styles = useStyles(); // 👈 Always up-to-date

  const [notification, setNotification] = useState<boolean>(false);
  const [appNotification, setAppNotification] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleLogout = async () => {
    console.log("logout");
    await logoutUser(dispatch);
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "SignIn" }],
    // });
  };

  const changeThemeFunc = () => {
    toggleTheme();
    if (theme === "light") {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <CustomHeader
          title={t("tabs.setting")}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View>
          {/* Account Section */}
          <View>
            <View style={styles.sectionContainer}>
              <AccountIcon width={22} height={22} />
              <Text style={styles.section}>{t("account")}</Text>
            </View>
            <SettingItem
              label={t("editProfile")}
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            />
            <SettingItem
              label={t("changePassword")}
              onPress={() => {
                navigation.navigate("Changepassword");
              }}
            />
            {/* <SettingItem
          label={t("subscription")}
          onPress={() => {
            navigation.navigate("Subscription");
          }}
        /> */}
            <SettingItem
              label={t("tokens")}
              onPress={() => {
                navigation.navigate("Tokens");
              }}
            />
            {/* <SettingItem
          label={t("affiliateLink")}
          onPress={() => {
            navigation.navigate("AffiliateLink");
          }}
        /> */}

            {/* Notification Section */}

            {/* <View style={styles.sectionContainer}>
          <NotificationIcon width={22} height={22} />
          <Text style={styles.section}>{t("notification")}</Text>
        </View>
        <SwitchItem
          label={t("notification")}
          value={notification}
          onValueChange={setNotification}
        />
        <SwitchItem
          label={t("appNotification")}
          value={appNotification}
          onValueChange={setAppNotification}
        /> */}

            {/* More Section */}

            <View style={styles.sectionContainer}>
              <MoreIcon width={22} height={22} />
              <Text style={styles.section}>{t("more")}</Text>
            </View>
            <SettingItem
              label={t("language")}
              onPress={() => {
                navigation.navigate("SelectLanguage");
              }}
            />
            {/* <SettingItem
          label={t("country")}
          onPress={() => {
            navigation.navigate("Country");
          }}
        /> */}

            {/* Theme Section */}
            {/* <View style={styles.sectionContainer}>
          <ThemeIcon width={22} height={22} />
          <Text style={styles.section}>{t("theme")}</Text>
        </View>
        <SwitchItem
          label={t("dark/light")}
          value={darkMode}
          onValueChange={() => changeThemeFunc()}
        />

        <Text style={{ color: COLORS.black }}>Current theme: {theme}</Text> */}
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logout}
            onPress={() => handleLogout()}
          >
            <LogoutIcon width={22} height={22} />
            <Text style={styles.logoutText}>{t("logout")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// // ✅ Styles
// const styles = StyleSheet.create({
//   safeContent: { flex: 1, backgroundColor: COLORS.background },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: 20,
//     marginVertical: 20,
//   },
//   container: {
//     paddingHorizontal: 20,
//   },
//   sectionContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 10,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.borderColor2,
//   },
//   section: {
//     fontSize: FONTSIZE.size16,
//     fontFamily: FONTS.UrbanistSemiBold,
//     color: COLORS.black,
//     marginLeft: 5,
//   },

//   logout: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 40,
//   },
//   logoutText: {
//     fontSize: FONTSIZE.size16,
//     fontFamily: FONTS.UrbanistMedium,
//     marginLeft: 6,
//     color: COLORS.black,
//   },
// });

const useStyles = makeStyles((COLORS) => ({
  safeContent: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
  },
  sectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor2,
  },
  section: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.black,
    marginLeft: 5,
  },

  logout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  logoutText: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistMedium,
    marginLeft: 6,
    color: COLORS.black,
  },
}));
