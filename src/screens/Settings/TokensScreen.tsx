import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import CustomHeader from "../../components/CustomHeader";
import COLORS from "../../theme/colors";
import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import TokenIcon from "../../../assets/svgs/TokenIcon.svg";
import { useLazyGetPromptsQuery } from "../../services/prompts";
import TokenTileGrid from "../../components/TokenTileGrid";
import CustomButton from "../../components/CustomButton";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { useFocusEffect } from "@react-navigation/native";

interface TokensScreenProps {
  navigation: { goBack: () => void };
}

interface PromptUsageResponse {
  usage: number;
  limit: number;
}

interface TokenPlan {
  id: number;
  price: string;
  tokens: string;
  save?: string;
}

const TokensScreen: React.FC<TokensScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [getPrompts] = useLazyGetPromptsQuery();

  const [data, setData] = useState<PromptUsageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [plans, setPlans] = useState<TokenPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<TokenPlan | null>(null);

  const usage = data?.usage ?? 0;
  const limit = data?.limit ?? 1;
  const progress = Math.min(usage / limit, 1);
  const limitExceeded = usage >= limit;

  // 🔹 Fetch data
  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPrompts({}).unwrap();
      setData(res);

      showSuccessToast(
        t("congratulations"),
        t("requestMessages.successfully_retrived_token_usage")
      );

      // Example plans (replace with API response if available)
      setPlans([
        { id: 1, price: "$4.99", tokens: "100 Tokens" },
        { id: 2, price: "$9.99", tokens: "500 Tokens" },
        { id: 3, price: "$14.99", tokens: "1000 Tokens", save: "Save 25%" },
        { id: 4, price: "$24.99", tokens: "2000 Tokens", save: "Save 30%" },
        { id: 5, price: "$49.99", tokens: "5000 Tokens", save: "Save 40%" },
        { id: 6, price: "$99.99", tokens: "10000 Tokens", save: "Save 50%" },
      ]);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [getPrompts]);

  // useEffect(() => {
  //   fetchPrompts();
  // }, [fetchPrompts]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await fetchPrompts();
      })();
    }, [fetchPrompts])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPrompts();
  }, [fetchPrompts]);

  const handleBuyToken = () => {
    if (selectedPlan) {
      console.log("Selected Plan:", selectedPlan);

      showSuccessToast(t("congratulations"), t("successFullyPurchasedToken"));
      // You can trigger navigation or purchase API here
    } else {
      console.log("no Selected Plan is there :");
      showErrorToast(t("sorry"), t("pleaseSelectPlan"));
    }
  };

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <CustomHeader title={t("token")} onPress={() => navigation.goBack()} />
      </View>

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
      >
        {/* Token Usage Section */}
        <View style={styles.tokenContainer}>
          <View style={styles.tokenHeader}>
            <TokenIcon width={22} height={22} />
            <Text style={styles.title}>{t("tokenUsage")}</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  {(usage / 1000).toFixed(0)}k {t("used")}
                </Text>
                <Text style={styles.infoText}>
                  {(limit / 1000).toFixed(0)}k {t("total")}
                </Text>
              </View>

              <Progress.Bar
                progress={progress}
                width={null}
                height={12}
                borderRadius={10}
                color={limitExceeded ? COLORS.danger : COLORS.primary}
                unfilledColor={COLORS.D9Gray}
                borderWidth={0}
                style={{ marginVertical: 10 }}
              />

              {limitExceeded && (
                <Text style={styles.limitText}>{t("limitExceeded")}</Text>
              )}
            </>
          )}
        </View>

        {/* 🔹 Token Tile Grid */}
        <TokenTileGrid
          plans={plans}
          selectedId={selectedPlan?.id ?? null}
          onSelect={(plan) => setSelectedPlan(plan)}
        />

        {/* 🔹 Buy Button */}

        <View style={styles.bottomButton}>
          <CustomButton
            title={t("buyNow")}
            buttonStyle={{ width: "50%" }}
            textStyle={{
              color: COLORS.white,
              fontSize: FONTSIZE.size14,
              fontFamily: FONTS.UrbanistSemiBold,
              includeFontPadding: false,
            }}
            onPress={handleBuyToken}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TokensScreen;

const styles = StyleSheet.create({
  safeContent: { flex: 1, backgroundColor: COLORS.background },
  header: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  tokenContainer: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
  },
  tokenHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.black,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.black,
  },
  limitText: {
    textAlign: "center",
    fontSize: FONTSIZE.size12,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.danger,
  },
  errorText: {
    textAlign: "center",
    color: COLORS.danger,
    fontSize: FONTSIZE.size13,
    fontFamily: FONTS.UrbanistMedium,
  },

  bottomButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
