// import React, { useRef } from "react";
// import {
//   View,
//   StyleSheet,
//   ViewStyle,
//   StyleProp,
//   TextStyle,
// } from "react-native";
// import MathJax from "react-native-mathjax";
// import { normalizeLatex } from "../utils/helpers";
// import COLORS from "../theme/colors";
// import { setLoading } from "../store/loading";
// import { useDispatch } from "react-redux";

// interface MathRendererProps {
//   formula: any;
//   style?: StyleProp<ViewStyle | TextStyle>;
//   selected?: boolean;
//   fontSize?: number;
// }

// const MathRenderer: React.FC<MathRendererProps> = ({
//   formula,
//   style,
//   selected = false,
//   fontSize = 16,
// }) => {
//   const color = selected ? COLORS.white : COLORS.black;
//   const dispatch = useDispatch();

//   // Track if it's the first load
//   const isFirstLoad = useRef(true);

//   const handleLoadStart = () => {
//     if (isFirstLoad.current) {
//       dispatch(setLoading(true));
//     }
//   };

//   const handleLoadEnd = () => {
//     if (isFirstLoad.current) {
//       setTimeout(() => {
//         dispatch(setLoading(false));
//         isFirstLoad.current = false; // ✅ Mark first load as complete
//       }, 800);
//     }
//   };

//   return (
//     <View style={[styles.container, style]}>
//       <MathJax
//         html={`
//           <html>
//             <head>
//               <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500&display=swap" rel="stylesheet">
//               <style>
//                 body, span, mjx-container {
//                   font-family: 'Urbanist', sans-serif;
//                   font-weight: 500;
//                   font-size: ${fontSize}px;
//                   color: ${color};
//                   padding: 0;
//                   margin: 0;
//                 }
//               </style>
//             </head>
//             <body>
//               <span>${normalizeLatex(formula)}</span>
//             </body>
//           </html>
//         `}
//         mathJaxOptions={{
//           messageStyle: "none",
//           extensions: ["tex2jax.js"],
//           jax: ["input/TeX", "output/HTML-CSS"],
//           tex2jax: {
//             inlineMath: [
//               ["$", "$"],
//               ["\\(", "\\)"],
//             ],
//             displayMath: [
//               ["$$", "$$"],
//               ["\\[", "\\]"],
//             ],
//             processEscapes: true,
//           },
//           "HTML-CSS": {
//             availableFonts: [],
//             webFont: "none",
//           },
//         }}
//         style={{ backgroundColor: "transparent" }}
//         onLoadStart={handleLoadStart}
//         onLoadEnd={handleLoadEnd}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     justifyContent: "center",
//   },
// });

// export default MathRenderer;

import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";
import MathJax from "react-native-mathjax";
import { normalizeLatex } from "../utils/helpers";
import COLORS from "../theme/colors";
import { setLoading } from "../store/loading";
import { useDispatch } from "react-redux";

interface MathRendererProps {
  formula: any;
  style?: StyleProp<ViewStyle | TextStyle>;
  selected?: boolean;
  fontSize?: number;
}

const MathRenderer: React.FC<MathRendererProps> = ({
  formula,
  style,
  selected = false,
  fontSize = 16,
}) => {
  const color = selected ? COLORS.white : COLORS.black;
  const dispatch = useDispatch();

  const isFirstLoad = useRef(true);

  const handleLoadStart = () => {
    if (isFirstLoad.current) {
      dispatch(setLoading(true));
    }
  };

  const handleLoadEnd = () => {
    if (isFirstLoad.current) {
      setTimeout(() => {
        dispatch(setLoading(false));
        isFirstLoad.current = false;
      }, 800);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <MathJax
        html={`
          <html>
            <head>
              <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500&display=swap" rel="stylesheet">
              <style>
                body, span, mjx-container {
                  font-family: 'Urbanist', sans-serif;
                  font-weight: 500;
                  font-size: ${fontSize}px;
                  color: ${color};
                  padding: 0;
                  margin: 0;
                  letter-spacing: 0.5px; /* adds spacing between characters */
                  line-height: 1.4;       /* better vertical alignment */
                }
                mjx-mi {
                  padding: 0 1px; /* adds spacing between math identifiers */
                }
                mjx-mo {
                  padding: 0 1px;
                }
                mjx-sub {
                  margin-left: 1px; /* separates subscripts like logₓ */
                }
              </style>
            </head>
            <body>
              <span>${normalizeLatex(formula)}</span>
            </body>
          </html>
        `}
        mathJaxOptions={{
          messageStyle: "none",
          extensions: ["tex2jax.js"],
          jax: ["input/TeX", "output/SVG"],
          tex2jax: {
            inlineMath: [
              ["$", "$"],
              ["\\(", "\\)"],
            ],
            displayMath: [
              ["$$", "$$"],
              ["\\[", "\\]"],
            ],
            processEscapes: true,
          },
          SVG: {
            scale: 100,
            font: "TeX",
          },
        }}
        style={{ backgroundColor: "transparent" }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
  },
});

export default MathRenderer;
