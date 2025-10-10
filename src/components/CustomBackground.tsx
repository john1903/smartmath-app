// import React from "react";
// import {
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
//   ImageBackground,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import COLORS from "../theme/colors";

// const { width, height } = Dimensions.get("window");

// const CustomBackground = ({
//   children,
//   showImage = false,
//   imageSource = require("../../assets/images/student.png"), // overlay image
//   backgroundImage = require("../../assets/images/bg.png"), // <-- your background image
//   style = {},
// }) => {
//   return (
//     <ImageBackground
//       source={backgroundImage}
//       style={[styles.container, style]}
//       resizeMode="cover" // or "contain" / "stretch"
//     >
//       {showImage && imageSource && (
//         <View style={styles.imageWrapper}>
//           <Image
//             source={imageSource}
//             style={styles.image}
//             resizeMode="contain"
//           />
//         </View>
//       )}

//       <SafeAreaView style={styles.safeContent}>{children}</SafeAreaView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   imageWrapper: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: width * 0.85,
//     height: height * 0.7,
//   },
//   safeContent: {
//     flex: 1,
//   },
// });

// export default CustomBackground;

import React, { ReactNode } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../theme/colors";

const { width, height } = Dimensions.get("window");

interface CustomBackgroundProps {
  children: ReactNode;
  showImage?: boolean;
  imageSource?: ImageSourcePropType;
  backgroundImage?: ImageSourcePropType;
  style?: ViewStyle;
  showBg?: boolean;
}

const CustomBackground: React.FC<CustomBackgroundProps> = ({
  children,
  showImage = false,
  imageSource = require("../../assets/images/student.png"),
  backgroundImage = require("../../assets/images/bg.png"),
  style = {},
  showBg = true,
}) => {
  return (
    <>
      {showBg ? (
        <ImageBackground
          source={backgroundImage}
          style={[styles.container, style]}
          resizeMode="cover"
        >
          {showImage && imageSource && (
            <View style={styles.imageWrapper}>
              <Image
                source={imageSource}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          )}

          <SafeAreaView style={styles.safeContent}>{children}</SafeAreaView>
        </ImageBackground>
      ) : (
        <View style={[styles.container, style]}>
          <SafeAreaView style={styles.safeContent}>{children}</SafeAreaView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.85,
    height: height * 0.7,
  },
  safeContent: {
    flex: 1,
  },
});

export default CustomBackground;
