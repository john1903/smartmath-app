// import { View, Text, ScrollView, StyleSheet } from "react-native";
// import React from "react";
// import CustomHeader from "../../components/CustomHeader";
// import { SafeAreaView } from "react-native-safe-area-context";
// import COLORS from "../../theme/colors";
// import { useTranslation } from "react-i18next";

// const PurchaseHistory = ({ navigation }: any) => {
//   const { t } = useTranslation();
//   return (
//     <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
//       {/* Header */}
//       <View style={styles.header}>
//         <CustomHeader
//           title={t("purchaseHistory")}
//           onPress={() => navigation.goBack()}
//         />
//       </View>

//       <ScrollView contentContainerStyle={styles.container}></ScrollView>
//     </SafeAreaView>
//   );
// };

// export default PurchaseHistory;

// // ✅ Styles
// const styles = StyleSheet.create({
//   safeContent: { flex: 1, backgroundColor: COLORS.background },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: 20,
//     marginVertical: 20,
//   },
//   container: {
//     paddingHorizontal: 20,
//   },
// });

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import CustomHeader from "../../components/CustomHeader";
import COLORS from "../../theme/colors";
import FONTS from "../../theme/fonts";
import FONTSIZE from "../../theme/fontsSize";
import moment from "moment";

const PurchaseHistory = ({ navigation }: any) => {
  const { t } = useTranslation();

  // Sample purchase data (will be replaced with API data later)
  const [purchases, setPurchases] = useState([
    { id: "#00190", date: "2025-10-07", amount: 5.0 },
    { id: "#00191", date: "2025-10-07", amount: 5.0 },
    { id: "#00192", date: "2025-10-07", amount: 5.0 },
    { id: "#00193", date: "2025-10-07", amount: 5.0 },
    { id: "#00194", date: "2025-10-07", amount: 5.0 },
    { id: "#00195", date: "2025-10-07", amount: 5.0 },
    { id: "#00196", date: "2025-10-07", amount: 5.0 },
    { id: "#00197", date: "2025-10-07", amount: 5.0 },
    { id: "#00198", date: "2025-10-07", amount: 5.0 },
    { id: "#00199", date: "2025-10-07", amount: 5.0 },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API fetch
    setTimeout(() => {
      // You can update the data here once API is integrated
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <CustomHeader
          title={t("purchaseHistory")}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>{t("yourPurchases")}</Text>

        {purchases.map((item, index) => (
          <View key={index} style={styles.purchaseContainer}>
            <View style={styles.purchaseRow}>
              <View>
                <Text style={styles.purchaseId}>{item.id}</Text>
                <Text style={styles.purchaseDate}>
                  ({moment(item.date).format("Do MMMM YYYY")})
                </Text>
              </View>
              <Text style={styles.purchaseAmount}>
                ${item.amount.toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PurchaseHistory;

const styles = StyleSheet.create({
  safeContent: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontFamily: FONTS.UrbanistMedium,
    fontSize: FONTSIZE.size24,
    marginVertical: 15,
    color: COLORS.black,
  },
  purchaseContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.borderColor,
  },
  purchaseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  purchaseId: {
    fontFamily: FONTS.UrbanistMedium,
    fontSize: FONTSIZE.size15,
    color: COLORS.black,
  },
  purchaseDate: {
    fontFamily: FONTS.UrbanistMedium,
    fontSize: FONTSIZE.size11,
    color: COLORS.secondary,
  },
  purchaseAmount: {
    fontFamily: FONTS.UrbanistMedium,
    fontSize: FONTSIZE.size14,
    color: COLORS.secondary,
  },
});
