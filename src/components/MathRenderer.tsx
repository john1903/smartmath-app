// // components/MathRenderer.js
// import React, { useEffect, useState } from "react";
// import { View, StyleSheet } from "react-native";
// import MathJax from "react-native-mathjax";
// import { normalizeLatex } from "../utils/helpers";
// import COLORS from "../theme/colors";

// export default function MathRenderer({ formula, style, selected, fontSize }) {
//   const color = selected ? COLORS.white : COLORS.black;

//   return (
//     <View style={[styles.container, style]}>
//       <MathJax
//         html={`<span style="font-size: ${fontSize}px; color:${color};">${normalizeLatex(
//           formula
//         )}</span >`}
//         // html={`<div style="font-size: 18px; text-align: left;">
//         //   ${normalizeLatex(formula)}
//         // </div>`}
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
//           "HTML-CSS": { availableFonts: ["TeX"] },
//         }}
//         style={{ backgroundColor: "transparent" }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     justifyContent: "center",
//   },
// });

// components/MathRenderer.js
// import React from "react";
// import { View, StyleSheet } from "react-native";
// import MathJax from "react-native-mathjax";
// import { normalizeLatex } from "../utils/helpers";
// import COLORS from "../theme/colors";

// export default function MathRenderer({
//   formula,
//   style,
//   selected,
//   fontSize = 16,
// }) {
//   const color = selected ? COLORS.white : COLORS.black;

//   return (
//     <View style={[styles.container, style]}>
//       <MathJax
//         html={`
//           <html>
//             <head>
//               <!-- Load Urbanist-Medium (weight 500) from Google Fonts -->
//               <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500&display=swap" rel="stylesheet">
//               <style>
//                 body, span, mjx-container {
//                   font-family: 'Urbanist', sans-serif;
//                   font-weight: 500;
//                   font-size: ${fontSize}px;
//                   color: ${color};
//                   // margin: 0;
//                   // padding: 0;

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
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     justifyContent: "center",
//   },
// });

import React from "react";
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

  return (
    <View style={[styles.container, style]}>
      <MathJax
        html={`
          <html>
            <head>
              <!-- Load Urbanist-Medium (weight 500) from Google Fonts -->
              <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500&display=swap" rel="stylesheet">
              <style>
                body, span, mjx-container {
                  font-family: 'Urbanist', sans-serif;
                  font-weight: 500;
                  font-size: ${fontSize}px;
                  color: ${color};
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
          jax: ["input/TeX", "output/HTML-CSS"],
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
          "HTML-CSS": {
            availableFonts: [],
            webFont: "none",
          },
        }}
        style={{ backgroundColor: "transparent" }}
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
