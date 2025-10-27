import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { useFonts } from "expo-font";
import FONTS from "./src/theme/fonts";
import i18n from "./src/i18n/i18n";
import { I18nextProvider } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";
import GlobalLoader from "./src/components/GlobalLoader";
import Toast from "react-native-toast-message";
import { enableScreens } from "react-native-screens";
import { ThemeProvider } from "./src/context/ThemeContext";
import { ToastConfigComponent } from "./src/utils/toast";
import { navigationRef } from "./src/navigation/RootNavigation"; // 👈 NEW IMPORT

const LANGUAGE_KEY = "appLanguage";

enableScreens();

export default function App() {
  const [loadingLang, setLoadingLang] = useState<boolean>(true);

  useEffect(() => {
    const initLanguage = async (): Promise<void> => {
      try {
        const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLang) {
          await i18n.changeLanguage(savedLang);
        }
      } catch (e) {
        console.log("Error loading saved language:", e);
      } finally {
        setLoadingLang(false);
      }
    };
    initLanguage();
  }, []);

  const [fontsLoaded] = useFonts({
    [FONTS.UrbanistBold]: require("./assets/fonts/Urbanist-Bold.ttf"),
    [FONTS.UrbanistSemiBold]: require("./assets/fonts/Urbanist-SemiBold.ttf"),
    [FONTS.UrbanistMedium]: require("./assets/fonts/Urbanist-Medium.ttf"),
    [FONTS.UrbanistRegular]: require("./assets/fonts/Urbanist-Regular.ttf"),
    [FONTS.UrbanistThin]: require("./assets/fonts/Urbanist-Thin.ttf"),
    [FONTS.UrbanistLight]: require("./assets/fonts/Urbanist-Light.ttf"),
  });

  if (!fontsLoaded || loadingLang) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer ref={navigationRef}>
            <ThemeProvider>
              <RootNavigator />
              <ToastConfigComponent />
              <StatusBar style="auto" />
            </ThemeProvider>
          </NavigationContainer>
        </I18nextProvider>
      </PersistGate>
      <GlobalLoader />
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
