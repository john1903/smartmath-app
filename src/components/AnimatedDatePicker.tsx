// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   useColorScheme,
// } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import CalendarIcon from "../../assets/svgs/CalendarIcon.svg";
// import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";

// interface Props {
//   label: string;
//   selectedDate?: Date | null;
//   minimumDate?: Date;
//   maximumDate?: Date;
//   onSelect: (date: Date) => void;
// }

// const AnimatedDatePicker: React.FC<Props> = ({
//   label,
//   selectedDate,
//   minimumDate,
//   maximumDate,
//   onSelect,
// }) => {
//   const colorScheme = useColorScheme(); // "light" or "dark"

//   const { t } = useTranslation();
//   const isDarkMode = colorScheme === "dark";
//   const [visible, setVisible] = useState(false);

//   const { language } = useSelector((state: any) => state?.lang);

//   const handleConfirm = (date: Date) => {
//     onSelect(date);
//     setVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
//         <Text style={{ color: selectedDate ? "#000" : "#aaa" }}>
//           {selectedDate ? selectedDate.toDateString() : label}
//         </Text>
//         <CalendarIcon width={22} height={22} />
//       </TouchableOpacity>

//       <DateTimePickerModal
//         isVisible={visible}
//         mode="date"
//         display={Platform.select({
//           ios: "inline",
//           android: "default",
//         })}
//         isDarkModeEnabled={isDarkMode}
//         minimumDate={minimumDate}
//         maximumDate={maximumDate}
//         onConfirm={handleConfirm}
//         onCancel={() => setVisible(false)}
//         {...(Platform.OS === "ios"
//           ? { textColor: isDarkMode ? "white" : "black" }
//           : {})}
//         pickerContainerStyleIOS={{
//           backgroundColor: isDarkMode ? "#000" : "#fff",
//         }}
//         pickerComponentStyleIOS={{
//           backgroundColor: isDarkMode ? "#000" : "#fff",
//         }}
//         locale={language}
//         confirmTextIOS={t("confirm")}
//         cancelTextIOS={t("cancel")}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { marginBottom: 16, width: "100%" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 12,
//     borderRadius: 100,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
// });

// export default AnimatedDatePicker;

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  useColorScheme,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { enUS, pl } from "date-fns/locale";
import CalendarIcon from "../../assets/svgs/CalendarIcon.svg";
import COLORS from "../theme/colors";

// ✅ Translations
LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "Today",
};

LocaleConfig.locales["pl"] = {
  monthNames: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
  monthNamesShort: [
    "Sty",
    "Lut",
    "Mar",
    "Kwi",
    "Maj",
    "Cze",
    "Lip",
    "Sie",
    "Wrz",
    "Paź",
    "Lis",
    "Gru",
  ],
  dayNames: [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ],
  dayNamesShort: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"],
  today: "Dziś",
};

interface Props {
  label: string;
  selectedDate?: Date | null;
  minimumDate?: Date;
  maximumDate?: Date;
  onSelect: (date: Date) => void;
}

const AnimatedDatePicker: React.FC<Props> = ({
  label,
  selectedDate,
  minimumDate,
  maximumDate,
  onSelect,
}) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { language } = useSelector((state: any) => state?.lang);
  const [visible, setVisible] = useState(false);

  const normalizedLang = language?.split("-")[0] || "en";
  LocaleConfig.defaultLocale = normalizedLang;

  const isDarkMode = colorScheme === "dark";
  const selectedLocale = normalizedLang === "pl" ? pl : enUS;

  // ✅ Highlight selected or range
  const markedDates = useMemo(() => {
    const marked: Record<string, any> = {};
    if (!selectedDate && !minimumDate) return marked;

    const iso = (d: Date) => d.toISOString().split("T")[0];

    // If both from and to are selected → show full range
    if (selectedDate && minimumDate) {
      let start = new Date(minimumDate);
      let end = new Date(selectedDate);

      // Ensure correct order (so range works in either picker)
      if (start > end) {
        const tmp = start;
        start = end;
        end = tmp;
      }

      const startKey = iso(start);
      const endKey = iso(end);

      let d = new Date(start);
      while (d <= end) {
        const key = iso(d);
        marked[key] = {
          color: COLORS.primary,
          textColor: "#fff",
        };
        d.setDate(d.getDate() + 1);
      }

      marked[startKey].startingDay = true;
      marked[endKey].endingDay = true;
      marked[startKey].textColor = isDarkMode ? "#fff" : "#fff";
      marked[endKey].textColor = isDarkMode ? "#fff" : "#fff";
      return marked;
    }

    // Only one date selected → show that single date
    const singleKey = iso(selectedDate || minimumDate!);
    marked[singleKey] = {
      startingDay: true,
      endingDay: true,
      color: COLORS.primary,
      textColor: isDarkMode ? "#fff" : "#fff",
    };
    return marked;
  }, [selectedDate, minimumDate, isDarkMode]);

  const handleDayPress = (day: any) => {
    const date = new Date(day.dateString);
    onSelect(date);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Input */}
      <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
        <Text style={{ color: selectedDate ? "#000" : "#aaa" }}>
          {selectedDate
            ? format(selectedDate, "PPP", { locale: selectedLocale })
            : label}
        </Text>
        <CalendarIcon width={22} height={22} />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.calendarContainer,
              { backgroundColor: isDarkMode ? "#111" : "#fff" },
            ]}
          >
            <Calendar
              markingType="period"
              onDayPress={handleDayPress}
              minDate={
                minimumDate
                  ? minimumDate.toISOString().split("T")[0]
                  : undefined
              }
              maxDate={
                maximumDate
                  ? maximumDate.toISOString().split("T")[0]
                  : undefined
              }
              markedDates={markedDates}
              theme={{
                backgroundColor: isDarkMode ? "#111" : "#fff",
                calendarBackground: isDarkMode ? "#111" : "#fff",
                textSectionTitleColor: isDarkMode ? "#ccc" : "#333",
                dayTextColor: isDarkMode ? "#fff" : "#000",
                monthTextColor: isDarkMode ? "#fff" : "#000",
                arrowColor: COLORS.primary,
                todayTextColor: COLORS.primary,
              }}
            />

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setVisible(false)}
            >
              <Text style={{ color: COLORS.primary, fontSize: 16 }}>
                {t("cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16, width: "100%" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  calendarContainer: {
    width: "90%",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  cancelButton: {
    marginTop: 12,
    alignSelf: "center",
  },
});

export default AnimatedDatePicker;
