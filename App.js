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

const LANGUAGE_KEY = "appLanguage";

export default function App() {
  const [loadingLang, setLoadingLang] = useState(true);

  // ✅ Load saved language from AsyncStorage before showing UI
  useEffect(() => {
    const initLanguage = async () => {
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

  // ✅ Load fonts
  const [fontsLoaded] = useFonts({
    [FONTS.UrbanistBold]: require("./assets/fonts/Urbanist-Bold.ttf"),
    [FONTS.UrbanistSemiBold]: require("./assets/fonts/Urbanist-SemiBold.ttf"),
    [FONTS.UrbanistMedium]: require("./assets/fonts/Urbanist-Medium.ttf"),
    [FONTS.UrbanistRegular]: require("./assets/fonts/Urbanist-Regular.ttf"),
    [FONTS.UrbanistThin]: require("./assets/fonts/Urbanist-Thin.ttf"),
    [FONTS.UrbanistLight]: require("./assets/fonts/Urbanist-Light.ttf"),
  });

  // ✅ Show loader until both fonts + language are ready
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
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </I18nextProvider>
      </PersistGate>
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
