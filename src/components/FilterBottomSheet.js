// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import Modal from "react-native-modal";
// import COLORS from "../theme/colors";

// import { Entypo } from "@expo/vector-icons";
// import FONTSIZE from "../theme/fontsSize";
// import FONTS from "../theme/fonts";
// import CategoryButton from "./CategoryButton";
// import CustomButton from "./CustomButton";

// const OPTIONS = {
//   status: [
//     "All tasks",
//     "Completed",
//     "Pending",
//     "Failed",
//     "Limit Reached",
//     "Not Completed",
//   ],
//   difficulty: ["Hard", "Normal", "Easy"],
//   taskType: ["MCQs", "True/False", "Matching Pair"],
// };

// export default function FilterBottomSheet({ isVisible, onClose, onApply }) {
//   const [selectedStatus, setSelectedStatus] = useState("All tasks");
//   const [selectedDifficulty, setSelectedDifficulty] = useState("Hard");
//   const [selectedTaskType, setSelectedTaskType] = useState("MCQs");

//   const handleApply = () => {
//     onApply({
//       status: selectedStatus,
//       difficulty: selectedDifficulty,
//       taskType: selectedTaskType,
//     });
//     onClose();
//   };

//   const handleCancel = () => {
//     onApply({
//       status: "",
//       difficulty: "",
//       taskType: "",
//     });
//     onClose();
//   };

//   return (
//     <Modal
//       isVisible={isVisible}
//       onBackdropPress={() => handleCancel()}
//       style={styles.modal}
//     >
//       <View style={styles.container}>
//         <View
//           style={{
//             width: "100%",
//             alignItems: "center",
//             marginTop: 10,
//           }}
//         >
//           <View style={styles.sheetHandle} />
//         </View>
//         <View style={styles.filterSection}>
//           <Text style={styles.title}>Filter By:</Text>
//           <TouchableOpacity
//             onPress={() => handleCancel()}
//             style={styles.crossCircle}
//           >
//             <Entypo name="cross" size={14} color="black" />
//           </TouchableOpacity>
//         </View>

//         {/* Exercise Status */}
//         <Text style={styles.sectionTitle}>Exercise Status</Text>
//         <View style={styles.row}>
//           {OPTIONS.status.map((item) => (
//             <CategoryButton
//               key={item}
//               label={item}
//               active={item === selectedStatus}
//               onPress={() => setSelectedStatus(item)}
//               textStyle={{
//                 fontSize: FONTSIZE.size10,
//               }}
//             />
//           ))}
//         </View>
//         <View style={styles.spacing}></View>

//         {/* Difficulty */}
//         <Text style={styles.sectionTitle}>Difficulty</Text>
//         <View style={styles.row}>
//           {OPTIONS.difficulty.map((item) => (
//             <CategoryButton
//               key={item}
//               label={item}
//               active={item === selectedDifficulty}
//               onPress={() => setSelectedDifficulty(item)}
//               textStyle={{
//                 fontSize: FONTSIZE.size10,
//               }}
//             />
//           ))}
//         </View>

//         <View style={styles.spacing}></View>

//         {/* Task Type */}
//         <Text style={styles.sectionTitle}>Task Type</Text>
//         <View style={styles.row}>
//           {OPTIONS.taskType.map((item) => (
//             <CategoryButton
//               key={item}
//               label={item}
//               active={item === selectedTaskType}
//               onPress={() => setSelectedTaskType(item)}
//               textStyle={{
//                 fontSize: FONTSIZE.size10,
//               }}
//             />
//           ))}
//         </View>

//         {/* Buttons */}
//         <View style={styles.footer}>
//           <CustomButton
//             title="Cancel"
//             buttonStyle={{
//               flex: 1,
//               backgroundColor: COLORS.white,
//               borderColor: COLORS.borderColor2,
//             }}
//             textStyle={{
//               color: COLORS.black,
//               fontSize: FONTSIZE.size14,
//               fontFamily: FONTS.UrbanistSemiBold,
//             }}
//             onPress={() => handleCancel()}
//           />

//           <CustomButton
//             title="Apply Filter"
//             buttonStyle={{ flex: 1 }}
//             textStyle={{
//               color: COLORS.white,
//               fontSize: FONTSIZE.size14,
//               fontFamily: FONTS.UrbanistSemiBold,
//             }}
//             onPress={() => handleApply()}
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   modal: {
//     justifyContent: "flex-end",
//     margin: 0,
//   },
//   container: {
//     backgroundColor: COLORS.background,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//   },
//   sheetHandle: {
//     backgroundColor: COLORS.secondary,
//     height: 4,
//     borderRadius: 40,
//     width: "20%",
//     alignContent: "center",
//     justifyContent: "center",
//   },

//   filterSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 20,
//   },
//   crossCircle: {
//     width: 20,
//     height: 20,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: COLORS.black,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   spacing: {
//     marginVertical: 10,
//   },
//   title: {
//     fontSize: FONTSIZE.size16,
//     fontFamily: FONTS.UrbanistMedium,
//     color: COLORS.secondary,
//   },
//   sectionTitle: {
//     fontSize: FONTSIZE.size14,
//     fontFamily: FONTS.UrbanistMedium,
//     color: COLORS.black,
//     marginVertical: 10,
//   },
//   row: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 5,
//     marginTop: 5,
//   },

//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 25,
//     gap: 10,
//   },
// });

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next"; // ✅ import hook

import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import CategoryButton from "./CategoryButton";
import CustomButton from "./CustomButton";

export default function FilterBottomSheet({ isVisible, onClose, onApply }) {
  const { t } = useTranslation();

  const OPTIONS = {
    status: [
      t("categories.all"),
      t("categories.completed"),
      t("categories.pending"),
      t("categories.failed"),
      t("categories.limitexceeded"),
      t("categories.notCompleted"),
    ],
    difficulty: [
      t("difficulty.hard"),
      t("difficulty.normal"),
      t("difficulty.easy"),
    ],
    taskType: [
      t("taskType.mcq"),
      t("taskType.trueFalse"),
      t("taskType.matching"),
    ],
  };

  const [selectedStatus, setSelectedStatus] = useState(OPTIONS.status[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    OPTIONS.difficulty[0]
  );
  const [selectedTaskType, setSelectedTaskType] = useState(OPTIONS.taskType[0]);

  const handleApply = () => {
    onApply({
      status: selectedStatus,
      difficulty: selectedDifficulty,
      taskType: selectedTaskType,
    });
    onClose();
  };

  const handleCancel = () => {
    onApply({
      status: "",
      difficulty: "",
      taskType: "",
    });
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => handleCancel()}
      style={styles.modal}
    >
      <View style={styles.container}>
        {/* Handle bar */}
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <View style={styles.sheetHandle} />
        </View>

        {/* Header */}
        <View style={styles.filterSection}>
          <Text style={styles.title}>{t("filter.title")}</Text>
          <TouchableOpacity
            onPress={() => handleCancel()}
            style={styles.crossCircle}
          >
            <Entypo name="cross" size={14} color="black" />
          </TouchableOpacity>
        </View>

        {/* Status */}
        <Text style={styles.sectionTitle}>{t("filter.status")}</Text>
        <View style={styles.row}>
          {OPTIONS.status.map((item) => (
            <CategoryButton
              key={item}
              label={item}
              active={item === selectedStatus}
              onPress={() => setSelectedStatus(item)}
              textStyle={{ fontSize: FONTSIZE.size10 }}
            />
          ))}
        </View>

        <View style={styles.spacing}></View>

        {/* Difficulty */}
        <Text style={styles.sectionTitle}>{t("filter.difficulty")}</Text>
        <View style={styles.row}>
          {OPTIONS.difficulty.map((item) => (
            <CategoryButton
              key={item}
              label={item}
              active={item === selectedDifficulty}
              onPress={() => setSelectedDifficulty(item)}
              textStyle={{ fontSize: FONTSIZE.size10 }}
            />
          ))}
        </View>

        <View style={styles.spacing}></View>

        {/* Task Type */}
        <Text style={styles.sectionTitle}>{t("filter.taskType")}</Text>
        <View style={styles.row}>
          {OPTIONS.taskType.map((item) => (
            <CategoryButton
              key={item}
              label={item}
              active={item === selectedTaskType}
              onPress={() => setSelectedTaskType(item)}
              textStyle={{ fontSize: FONTSIZE.size10 }}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.footer}>
          <CustomButton
            title={t("actions.cancel")}
            buttonStyle={{
              flex: 1,
              backgroundColor: COLORS.white,
              borderColor: COLORS.borderColor2,
            }}
            textStyle={{
              color: COLORS.black,
              fontSize: FONTSIZE.size14,
              fontFamily: FONTS.UrbanistSemiBold,
              includeFontPadding: false,
            }}
            onPress={() => handleCancel()}
          />

          <CustomButton
            title={t("actions.apply")}
            buttonStyle={{ flex: 1 }}
            textStyle={{
              color: COLORS.white,
              fontSize: FONTSIZE.size14,
              fontFamily: FONTS.UrbanistSemiBold,
              includeFontPadding: false,
            }}
            onPress={() => handleApply()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  sheetHandle: {
    backgroundColor: COLORS.secondary,
    height: 4,
    borderRadius: 40,
    width: "20%",
  },
  filterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  crossCircle: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
  },
  spacing: {
    marginVertical: 10,
  },
  title: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.secondary,
  },
  sectionTitle: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.black,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 25,
    gap: 10,
  },
});
