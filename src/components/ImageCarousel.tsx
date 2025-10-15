// import React, { useRef } from "react";
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
// import { Ionicons } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");

// interface Illustration {
//   id: number;
//   fileName: string;
//   uri: string;
//   mimeType: string;
// }

// interface Props {
//   illustrations: Illustration[];
// }

// const ImageCarousel: React.FC<Props> = ({ illustrations }) => {
//   const carouselRef = useRef<ICarouselInstance>(null);

//   // Extract all image URLs
//   const imageUris = illustrations?.map((item) => item.uri) || [];

//   if (!imageUris.length) return null;

//   return (
//     <View style={styles.container}>
//       <Carousel
//         ref={carouselRef}
//         width={width}
//         height={220}
//         data={imageUris}
//         loop={imageUris.length > 1}
//         scrollAnimationDuration={800}
//         renderItem={({ item }) => (
//           <View style={styles.slide}>
//             <Image
//               source={{ uri: item }}
//               style={styles.image}
//               //   resizeMode="contain"
//             />
//           </View>
//         )}
//       />

//       {imageUris.length > 1 && (
//         <>
//           <TouchableOpacity
//             style={[styles.arrowButton, { left: 10 }]}
//             onPress={() => carouselRef.current?.prev()}
//           >
//             <Ionicons name="chevron-back" size={28} color="#fff" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.arrowButton, { right: 10 }]}
//             onPress={() => carouselRef.current?.next()}
//           >
//             <Ionicons name="chevron-forward" size={28} color="#fff" />
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: "relative",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   slide: {
//     borderRadius: 15,
//     overflow: "hidden",
//     // backgroundColor: "#eee",
//   },
//   image: {
//     width: width * 0.9,
//     height: 220,
//     borderRadius: 12,
//     resizeMode: "cover",
//     alignSelf: "center",
//   },
//   arrowButton: {
//     position: "absolute",
//     top: "40%",
//     backgroundColor: "rgba(0, 0, 0, 0.21)",
//     padding: 4,
//     borderRadius: 25,
//   },
// });

// export default ImageCarousel;

import React, { useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

interface Illustration {
  id: number;
  fileName: string;
  uri: string;
  mimeType: string;
}

interface Props {
  illustrations: Illustration[];
}

const ImageCarousel: React.FC<Props> = ({ illustrations }) => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const imageUris = illustrations?.map((item) => item.uri) || [];

  if (!imageUris.length) return null;

  const carouselWidth = screenWidth * 0.9; // 90% width of screen
  const carouselHeight = carouselWidth * 0.55; // keep good aspect ratio

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { width: carouselWidth }]}>
        <Carousel
          ref={carouselRef}
          width={carouselWidth}
          height={carouselHeight}
          data={imageUris}
          loop={imageUris.length > 1}
          scrollAnimationDuration={800}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image
                source={{ uri: item }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}
        />

        {imageUris.length > 1 && (
          <>
            <TouchableOpacity
              style={[styles.arrowButton, { left: -12 }]}
              onPress={() => carouselRef.current?.prev()}
            >
              <Ionicons name="chevron-back" size={26} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.arrowButton, { right: -12 }]}
              onPress={() => carouselRef.current?.next()}
            >
              <Ionicons name="chevron-forward" size={26} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center", // center in parent
    justifyContent: "center",
    marginVertical: 12,
  },
  container: {
    position: "relative",
  },
  slide: {
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    resizeMode: "cover",
  },
  arrowButton: {
    position: "absolute",
    top: "40%",
    backgroundColor: "rgba(3, 3, 3, 0.25)",
    padding: 5,
    borderRadius: 25,
  },
});

export default ImageCarousel;
