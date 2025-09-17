import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomBackground from "../../components/CustomBackground";
import CustomHeader from "../../components/CustomHeader";
import SearchBar from "../../components/SearchBar";
import FONTS from "../../theme/fonts";
import FONTSIZE from "../../theme/fontsSize";
import COLORS from "../../theme/colors";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const languages = [
  { id: "1", key: "english", code: "en" },
  { id: "2", key: "polish", code: "pl" },
];

const LANGUAGE_KEY = "appLanguage";

const SelectLanguage = ({ navigation }: any) => {
  const { t } = useTranslation();

  const { token } = useSelector((state: any) => state?.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState("en"); // store code instead of name

  useEffect(() => {
    const loadLang = async () => {
      try {
        const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (saved) {
          setSelectedLang(saved);
          await i18n.changeLanguage(saved);
        } else {
          setSelectedLang(i18n.language || "en");
        }
      } catch (err) {
        console.warn("Error loading saved language:", err);
      }
    };
    loadLang();
  }, []);

  const handleSearch = (query: string) => setSearchQuery(query);

  const filteredLanguages = languages.filter((lang) =>
    t(lang.key).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const languageSelectionFunc = async (item: { key: string; code: string }) => {
    try {
      setSelectedLang(item.code);
      await AsyncStorage.setItem(LANGUAGE_KEY, item.code);
      await i18n.changeLanguage(item.code);
    } catch (err) {
      console.warn("Error selecting language:", err);
    }
  };

  return (
    <CustomBackground showImage={false} showGradient={true}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <CustomHeader
            title={t("language")}
            onPress={() => navigation.goBack()}
          />
        </View>

        {/* Search */}
        <View style={styles.innerContainer}>
          <SearchBar
            onSearch={handleSearch}
            showFilter={false}
            onFilter={{}}
            style={{ marginHorizontal: 0 }}
            placeholder={t("search")}
          />
        </View>

        {/* Select Language Title */}
        <Text style={styles.title}>{t("select_language")}</Text>

        {/* Language List */}
        <View style={{ marginTop: 10 }}>
          {filteredLanguages.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.languageItem,
                selectedLang === item.code && styles.selectedItem,
              ]}
              onPress={() => languageSelectionFunc(item)}
            >
              <Text
                style={[
                  styles.languageText,
                  selectedLang === item.code && styles.selectedText,
                ]}
              >
                {t(item.key)}
              </Text>

              {/* Radio Button */}
              <View
                style={[
                  styles.radioOuter,
                  selectedLang === item.code && styles.radioOuterSelected,
                ]}
              >
                {selectedLang === item.code && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        {!token && (
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CustomButton
              title={t("next")}
              buttonStyle={{ width: "50%" }}
              textStyle={{
                color: COLORS.white,
                fontSize: FONTSIZE.size20,
                fontFamily: FONTS.UrbanistSemiBold,
                includeFontPadding: false,
              }}
              onPress={() => navigation.navigate("SignIn")}
            />
          </View>
        )}
      </ScrollView>
    </CustomBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerContainer: {
    marginTop: 20,
  },
  title: {
    fontFamily: FONTS.UrbanistSemiBold,
    fontSize: FONTSIZE.size16,
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 10,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.borderColor2,
  },
  selectedItem: {
    backgroundColor: COLORS.primary,
  },
  languageText: {
    fontFamily: FONTS.UrbanistMedium,
    fontSize: FONTSIZE.size14,
    color: COLORS.black,
  },
  selectedText: {
    color: COLORS.white,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.borderColor2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 100,
    backgroundColor: COLORS.white,
  },
});

export default SelectLanguage;
