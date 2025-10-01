import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../theme/colors";
import { useTranslation } from "react-i18next";
import AnimatedDropdown from "../../components/AnimatedDropdown";
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
import { showErrorToast } from "../../utils/toast";

const ReportScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [getAllReports] = useLazyGetAllReportsQuery();
  const [generateReport] = useGenerateReportMutation();

  const { allReports } = useSelector((state) => state?.reports);

  const [appToken, setAppToken] = useState(10);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // ✅ fetch reports on screen focus
  // useFocusEffect(
  //   useCallback(() => {
  //     console.log("useeffect call ???????????");

  //     dispatch(setLoading(true));
  //     getAllReports();
  //   }, [dispatch])
  // );

  useFocusEffect(
    useCallback(() => {
      const fetchReports = async () => {
        try {
          dispatch(setLoading(true));
          await getAllReports().unwrap(); // 👈 this ensures onQueryStarted runs
        } catch (err) {
          console.log("fetch error", err);
        } finally {
          dispatch(setLoading(false));
        }
      };

      fetchReports();
    }, [dispatch, getAllReports])
  );

  // console.log(
  //   " reports res ::::::>>>>>>>>>>>>>>:>>>>  ",
  //   JSON.stringify(allReports)
  // );

  // ✅ format date for API
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

  // ✅ format for UI (dd-mm-yyyy)
  const formatDateForUI = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };
  // ✅ Generate report handler
  const handleGenerateReport = async () => {
    if (!fromDate || !toDate) {
      showErrorToast("Please select both From and To dates");
      return;
    }

    const payload = {
      from: fromDate,
      to: toDate,
    };

    try {
      dispatch(setLoading(true));
      await generateReport(payload).unwrap();

      // ✅ clear dates
      setFromDate(null);
      setToDate(null);

      // ✅ refresh report list
      // getAllReports();
    } catch (err) {
      console.error("Error generating report:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ✅ Handle View/Delete
  const handleOptionSelect = (val, report) => {
    if (val === "View") {
      if (report?.reportFile?.uri) {
        Linking.openURL(report.reportFile.uri);
      } else {
        showErrorToast("No file available");
      }
    } else if (val === "Delete") {
      console.log("Delete report:", report.id);
      // TODO: add delete API if available
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getAllReports().unwrap(); // 👈
    } catch (e) {
      console.log("Refresh error", e);
    } finally {
      setRefreshing(false);
    }
  }, [getAllReports]);

  return (
    <SafeAreaView style={styles.safeContent} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <CustomHeader title={t("report")} onPress={() => navigation.goBack()} />
      </View>
      {/* Generate report section */}
      <View style={styles.whiteSheet}>
        {/* <AnimatedDropdown
          label="Generate report by"
          options={["Daily", "Weekly", "Monthly"]}
          onSelect={(val) => console.log("Selected:", val)}
        /> */}

        <AnimatedDatePicker
          label="Select Date From"
          selectedDate={fromDate ? new Date(fromDate) : null}
          maximumDate={toDate ? new Date(toDate) : undefined} // if To selected → restrict From
          onSelect={(date) => setFromDate(formatDateForApi(date))}
        />

        <AnimatedDatePicker
          label="Select Date To"
          selectedDate={toDate ? new Date(toDate) : null}
          minimumDate={fromDate ? new Date(fromDate) : undefined} // if From selected → restrict To
          onSelect={(date) => setToDate(formatDateForApi(date))}
        />

        {appToken > 0 ? (
          <View style={styles.whiteSheetFooter}>
            <CustomButton
              title="50 Token to generate report"
              buttonStyle={styles.generateReportBtn}
              textStyle={styles.generateReportBtnTitle}
              onPress={handleGenerateReport}
              svg={<TokenWhiteIcon width={22} height={22} />}
            />
            <Text style={styles.whiteSheetFooterText}>
              {appToken} Token available
            </Text>
          </View>
        ) : (
          <View style={styles.whiteSheetFooter}>
            <CustomButton
              title="50 Token to generate report"
              buttonStyle={[
                styles.generateReportBtn,
                { backgroundColor: COLORS.D9Gray, borderWidth: 0 },
              ]}
              textStyle={[
                styles.generateReportBtnTitle,
                { color: COLORS.black },
              ]}
              onPress={() => navigation.navigate("SignIn")}
              svg={<TokenBlackIcon width={22} height={22} />}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.whiteSheetFooterText, { marginRight: 10 }]}>
                {appToken} Token available
              </Text>
              <TouchableOpacity onPress={() => console.log("Buy Tokens")}>
                <Text
                  style={[
                    styles.whiteSheetFooterText,
                    { color: COLORS.primary },
                  ]}
                >
                  Buy Tokens
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {/* Reports list */}
      <MenuProvider>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {allReports && allReports.length > 0 ? (
            allReports.map((report) => (
              <ReportTile
                key={report.id}
                title={report.id || "Report"}
                date={formatDateForUI(report.createdAt)}
                onOptionSelect={(val) => handleOptionSelect(val, report)}
              />
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No reports found
            </Text>
          )}
        </ScrollView>
      </MenuProvider>
    </SafeAreaView>
  );
};

export default ReportScreen;

// ✅ Styles
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
