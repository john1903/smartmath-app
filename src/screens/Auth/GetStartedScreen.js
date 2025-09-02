import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CustomBackground from "../../components/CustomBackground";
import COLORS from "../../theme/colors";
import CustomButton from "../../components/CustomButton";
import FONTS from "../../theme/fonts";
import FONTSIZE from "../../theme/fontsSize";

const GetStartedScreen = ({ navigation }) => {
  return (
    <CustomBackground
      showImage={true}
      //   imageSource={require("../../../assets/images/student.png")}
      showGradient={true}
      gradientColors={["#cce5fcff", "#ffffff"]}
    >
      <View style={styles.container}>
        <View style={styles.bottomText}>
          <Text style={styles.text}>
            Your <Text style={styles.highlight}>Shortcut</Text> to{"\n"}
            Math <Text style={styles.highlight}>Success</Text>
          </Text>
        </View>
        <CustomButton
          title="Get Started"
          buttonStyle={{
            width: "50%",
          }}
          textStyle={{
            color: COLORS.white,
            fontSize: FONTSIZE.size20,
            fontFamily: FONTS.UrbanistSemiBold,
          }}
          onPress={() => navigation.navigate("SignIn")}
        />
      </View>
    </CustomBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // push content to bottom
    alignItems: "center", // center horizontally
    marginBottom: 20,
  },
  bottomText: {
    marginBottom: 20, // adjust distance from bottom
    alignItems: "center",
  },
  text: {
    fontSize: FONTSIZE.size37,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.black,
    textAlign: "center",
  },
  highlight: {
    color: COLORS.primary,
    fontFamily: FONTS.UrbanistBold,
  },
});

export default GetStartedScreen;
