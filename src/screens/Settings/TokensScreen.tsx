import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
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
import { setLoading } from "../../store/loading";

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
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [plans, setPlans] = useState<TokenPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<TokenPlan | null>(null);

  const usage = data?.usage ?? 0;
  const limit = data?.limit ?? 1;
  const progress = Math.min(usage / limit, 1);
  const limitExceeded = usage >= limit;

  const fetchPrompts = useCallback(
    async (showGlobalLoader = true) => {
      try {
        if (showGlobalLoader) dispatch(setLoading(true));
        setIsLoading(true);
        setError(null);

        const res = await getPrompts().unwrap();
        setData(res);

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
        setIsLoading(false);
        if (showGlobalLoader) dispatch(setLoading(false));
      }
    },
    [dispatch, getPrompts]
  );

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchPrompts(false); // 👈 don't show global loader on refresh
    } finally {
      setRefreshing(false);
    }
  }, [fetchPrompts]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await fetchPrompts(true); // 👈 show loader on first screen load
      })();
    }, [fetchPrompts])
  );

  const handleBuyToken = () => {
    if (selectedPlan) {
      console.log("Selected Plan:", selectedPlan);
      showSuccessToast(t("congratulations"), t("successFullyPurchasedToken"));
    } else {
      console.log("No selected plan");
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
        alwaysBounceVertical={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        <View style={styles.tokenContainer}>
          <View style={styles.tokenHeader}>
            <TokenIcon width={22} height={22} />
            <Text style={styles.title}>{t("tokenUsage")}</Text>
          </View>

          {isLoading ? (
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

        <TokenTileGrid
          plans={plans}
          selectedId={selectedPlan?.id ?? null}
          onSelect={(plan) => setSelectedPlan(plan)}
        />

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

        <View style={{ height: 60 }} />
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
    flexGrow: 1, // ✅ important for iOS scroll
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
