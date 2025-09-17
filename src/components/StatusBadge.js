// // import React from "react";
// // import { Text, View, StyleSheet } from "react-native";
// // import FONTSIZE from "../theme/fontsSize";
// // import FONTS from "../theme/fonts";
// // import COLORS from "../theme/colors";
// // import { useTranslation } from "react-i18next";

// // const STATUS_STYLES = {
// //   solve: { backgroundColor: COLORS.primary }, // Blue
// //   completed: { backgroundColor: "#3CCB3C" }, // Green
// //   failed: { backgroundColor: "#FD1207" }, // Red
// //   limitexceeded: { backgroundColor: "#BCAAA4" }, // Brown
// //   pending: { backgroundColor: "#FFD54F" }, // Yellow
// // };

// // export default function StatusBadge({ status }) {
// //   console.log("status :::>>>>>>>>>>>>>>>> ", status);

// //   const { t } = useTranslation();

// //   // Normalize key (in case API sends "Completed" instead of "completed")
// //   const normalizedKey = status?.toLowerCase().replace(/\s+/g, "");
// //   console.log("normalizedKey ::: ", normalizedKey);

// //   return (
// //     <View style={[styles.badge, STATUS_STYLES[normalizedKey]]}>
// //       <Text style={styles.text}>{t(`status.${normalizedKey}`)}</Text>
// //     </View>
// //     // <View style={[styles.badge, STATUS_STYLES[normalizedKey]]}>
// //     //   <Text style={styles.text}>{t(`status.${normalizedKey}`)}</Text>
// //     // </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   badge: {
// //     paddingHorizontal: 15,
// //     paddingVertical: 6,
// //     borderRadius: 60,
// //   },
// //   text: {
// //     color: "#fff",
// //     fontSize: FONTSIZE.size14,
// //     fontFamily: FONTS.UrbanistMedium,
// //   },
// // });

// import React from "react";
// import { Text, View, StyleSheet } from "react-native";
// import FONTSIZE from "../theme/fontsSize";
// import FONTS from "../theme/fonts";
// import COLORS from "../theme/colors";
// import { useTranslation } from "react-i18next";

// const STATUS_STYLES = {
//   solve: { backgroundColor: COLORS.primary }, // Blue
//   completed: { backgroundColor: "#3CCB3C" }, // Green
//   failed: { backgroundColor: "#FD1207" }, // Red
//   limitexceeded: { backgroundColor: "#BCAAA4" }, // Brown
//   pending: { backgroundColor: "#FFD54F" }, // Yellow
// };

// export default function StatusBadge({ status }) {
//   const { t } = useTranslation();

//   // status must be a stable key like: "completed", "failed", "solve"
//   const style = STATUS_STYLES[status] || { backgroundColor: "#999" };

//   return (
//     <View style={[styles.badge, style]}>
//       <Text style={styles.text}>{t(`status.${status}`)}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   badge: {
//     paddingHorizontal: 15,
//     paddingVertical: 6,
//     borderRadius: 60,
//   },
//   text: {
//     color: "#fff",
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistMedium,
//   },
// });

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import COLORS from "../theme/colors";
import { useTranslation } from "react-i18next";

const STATUS_STYLES = {
  solve: { backgroundColor: COLORS.primary },
  completed: { backgroundColor: "#3CCB3C" },
  failed: { backgroundColor: "#FD1207" },
  limitexceeded: { backgroundColor: "#BCAAA4" },
  pending: { backgroundColor: "#FFD54F" },
};

export default function StatusBadge({ status }) {
  const { t } = useTranslation();
  const style = STATUS_STYLES[status] || { backgroundColor: "#999" };

  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{t(`status.${status}`)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 60,
  },
  text: {
    color: "#fff",
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
  },
});
