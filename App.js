import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { useFonts } from "expo-font";
import FONTS from "./src/theme/fonts";

export default function App() {
  const [fontsLoaded] = useFonts({
    [FONTS.UrbanistBold]: require("./assets/fonts/Urbanist-Bold.ttf"),
    [FONTS.UrbanistSemiBold]: require("./assets/fonts/Urbanist-SemiBold.ttf"),
    [FONTS.UrbanistMedium]: require("./assets/fonts/Urbanist-Medium.ttf"),
    [FONTS.UrbanistRegular]: require("./assets/fonts/Urbanist-Regular.ttf"),
    [FONTS.UrbanistThin]: require("./assets/fonts/Urbanist-Thin.ttf"),
    [FONTS.UrbanistLight]: require("./assets/fonts/Urbanist-Light.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
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
