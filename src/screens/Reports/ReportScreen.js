import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState, useRef } from "react";
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../theme/colors";
import { useTranslation } from "react-i18next";
import AnimatedDatePicker from "../../components/AnimatedDatePicker";
import ReportTile from "../../components/ReportTile";
import { MenuProvider } from "react-native-popup-menu";
import CustomButton from "../../components/CustomButton";

import TokenWhiteIcon from "../../../assets/svgs/TokenWhiteIcon.svg";
import TokenBlackIcon from "../../../assets/svgs/TokenBlackIcon.svg";

import FONTSIZE from "../../theme/fontsSize";
import FONTS from "../../theme/fonts";
import {
  useGenerateReportMutation,
  useLazyGetAllReportsQuery,
} from "../../services/reportSlice";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/loading";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../utils/toast";
import { useLazyGetPromptsQuery } from "../../services/prompts";
import { setAllReports } from "../../store/reports";
import GlobalModal from "../../components/GlobalModal";

const ReportScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onEndReachedCalledDuringMomentum = useRef(true);

  const [getAllReports] = useLazyGetAllReportsQuery();
  const [getPrompts] = useLazyGetPromptsQuery();
  const [generateReport] = useGenerateReportMutation();

  const { allReports } = useSelector((state) => state?.reports);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [appToken, setAppToken] = useState(0);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const formatDateForApi = (date) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds())
    );
  };

  const formatDateForUI = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // console.log("all reprots ::::::::::: ", JSON.stringify(allReports));

  const handleGenerateReport = async () => {
    if (!fromDate || !toDate) {
      showErrorToast(t("pleaseSelectBothFromAndToDates"));
      return;
    }

    if (appToken < 50) {
      // showErrorToast(t("notEnoughTokens"));
      setModalVisible(true);
      showInfoToast(t("newTokensAvailableToPurchase"));
      return;
    }

    const payload = { from: fromDate, to: toDate };

    try {
      dispatch(setLoading(true));
      await generateReport(payload);
      setFromDate(null);
      setToDate(null);
      await fetchReports(0, true);
      await fetchTokens();
      showSuccessToast(t("generationStarted"));
    } catch (err) {
      console.error("Error generating report:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOptionSelect = (val, report) => {
    if (val === "View") {
      if (report?.reportFile?.uri) {
        Linking.openURL(report.reportFile.uri);
      } else {
        showErrorToast("No file available");
      }
    } else if (val === "Delete") {
      console.log("Delete report:", report.id);
    }
  };

  const fetchReports = async (pageNumber = 0, isRefreshing = false) => {
    try {
      const res = await getAllReports({
        page: pageNumber,
        size: 20,
      }).unwrap();

      const content = res?.content || [];

      if (isRefreshing || pageNumber === 0) {
        dispatch(setAllReports(content));
      } else {
        dispatch(setAllReports([...allReports, ...content]));
      }

      setHasMore(content.length === 20);
    } catch (err) {
      console.log("Error fetching reports", err);
    }
    finally {
      setRefreshing(false)
    }
  };

  const fetchTokens = async () => {
    try {
      const res = await getPrompts().unwrap();

      console.log("res of tokens ", JSON.stringify(res));
      if (res?.usage !== undefined && res?.limit !== undefined) {
        const available = res.limit - res.usage;
        setAppToken(available >= 0 ? available : 0);
      }
    } catch (err) {
      setRefreshing(false)
      console.log("Error fetching tokens", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        dispatch(setLoading(true));
        await fetchReports(0, true);
        await fetchTokens();
      })();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchReports(0, true);
    await fetchTokens();
    setRefreshing(false);
    setPage(0);
  }, []);

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;
    await fetchReports(nextPage, false);
    setPage(nextPage);
    setIsLoadingMore(false);
  };

  const renderFooter = () =>
    isLoadingMore ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator color={COLORS.primary} />
      </View>
    ) : null;

  const handleCancel = () => {
    setModalVisible(false);
    console.log("User cancelled");
  };

  const handleConfirm = () => {
    setModalVisible(false);

    navigation.navigate("SettingsTab", { screen: "Tokens" });
    console.log("User confirmed");
  };

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <CustomHeader title={t("report")} onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.whiteSheet}>
        <AnimatedDatePicker
          label={t("selectDateFrom")}
          selectedDate={fromDate ? new Date(fromDate) : null}
          maximumDate={new Date()}
          onSelect={(date) => setFromDate(formatDateForApi(date))}
        />

        <AnimatedDatePicker
          label={t("selectDateTo")}
          selectedDate={toDate ? new Date(toDate) : null}
          minimumDate={fromDate ? new Date(fromDate) : undefined}
          maximumDate={new Date()}
          onSelect={(date) => setToDate(formatDateForApi(date))}
        />

        {appToken > 0 ? (
          <View style={styles.whiteSheetFooter}>
            <CustomButton
              title={t("50TokenToGenerateReport")}
              buttonStyle={styles.generateReportBtn}
              textStyle={styles.generateReportBtnTitle}
              onPress={handleGenerateReport}
              svg={<TokenWhiteIcon width={22} height={22} />}
            />
            <Text style={styles.whiteSheetFooterText}>
              {appToken} {t("tokenAvailable")}
            </Text>
          </View>
        ) : (
          <View style={styles.whiteSheetFooter}>
            <CustomButton
              title={t("50TokenToGenerateReport")}
              buttonStyle={[
                styles.generateReportBtn,
                { backgroundColor: COLORS.D9Gray, borderWidth: 0 },
              ]}
              textStyle={[
                styles.generateReportBtnTitle,
                { color: COLORS.black },
              ]}
              onPress={handleGenerateReport}
              svg={<TokenBlackIcon width={22} height={22} />}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.whiteSheetFooterText, { marginRight: 10 }]}>
                {/* {appToken} {t("tokenAvailable")} */}
                {t("NOT_ENOUGH_TOKENS")}
              </Text>
              <TouchableOpacity onPress={() => console.log("Buy Tokens")}>
                <Text
                  style={[
                    styles.whiteSheetFooterText,
                    { color: COLORS.primary },
                  ]}
                >
                  {t("buyTokens")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <MenuProvider>
        <FlatList
          data={allReports}
          keyExtractor={(item, index) => `${item?.id ?? "no-id"}-${index}`}
          renderItem={({ item }) => (
            <ReportTile
              status={item?.status}
              title={
                item?.status === "SUCCESS"
                  ? "Report " + item?.id
                  : item?.status === "PENDING"
                  ? "Pending"
                  : item?.status === "FAILED"
                  ? "Failed"
                  : item?.status === "IN_PROGRESS"
                  ? "In Progress"
                  : null
              }
              date={formatDateForUI(item?.createdAt)}
              onOptionSelect={(val) => handleOptionSelect(val, item)}
            />
          )}
          ListEmptyComponent={() => (
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                color: COLORS.secondary,
              }}
            >
              {t("noReportsFound")}
            </Text>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum.current) {
              loadMore();
              onEndReachedCalledDuringMomentum.current = true;
            }
          }}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.container}
        />
      </MenuProvider>

      <GlobalModal
        visible={modalVisible}
        title={t("tokenLimitExceeded")}
        message={t("greatProgressToUnlock")}
        cancelText={t("cancel")}
        confirmText={t("buyMore")}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </SafeAreaView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  safeContent: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  container: {
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  whiteSheet: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  whiteSheetFooter: {
    alignItems: "center",
  },
  generateReportBtn: {
    width: "85%",
    alignItems: "center",
  },
  generateReportBtnTitle: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
  whiteSheetFooterText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
    marginTop: 10,
    color: COLORS.black,
  },
});
