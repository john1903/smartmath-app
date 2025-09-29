// components/MathRenderer.js
import React from "react";
import { View, StyleSheet } from "react-native";
import MathJax from "react-native-mathjax";
import { normalizeLatex } from "../utils/helpers";
import COLORS from "../theme/colors";

export default function MathRenderer({ formula, style, selected }) {
  const color = selected ? COLORS.white : COLORS.black;
  return (
    <View style={[styles.container, style]}>
      <MathJax
        html={`<span style="font-size: 14px; color:${color};">${formula}</span >`}
        // html={`<div style="font-size: 18px; text-align: left;">
        //   ${normalizeLatex(formula)}
        // </div>`}
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
          "HTML-CSS": { availableFonts: ["TeX"] },
        }}
        style={{ backgroundColor: "transparent" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // minHeight: 1, // 👈 force visible area
    width: "100%",
    justifyContent: "center",
  },
});
