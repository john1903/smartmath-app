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
import i18n from "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/lang";

const languages = [
  { id: "1", key: "english", code: "en-GB" },
  { id: "2", key: "polish", code: "pl-PL" },
];

const SelectLanguage = ({ navigation }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { token } = useSelector((state: any) => state?.auth);
  const { language } = useSelector((state: any) => state?.lang);

  console.log("language from redux ::::: ", language);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState(language); // store code instead of name

  useEffect(() => {
    const loadLang = async () => {
      try {
        if (language) {
          setSelectedLang(language);
          await i18n.changeLanguage(language);
        } else {
          setSelectedLang(language);
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
      dispatch(setLanguage(item.code));
      await i18n.changeLanguage(item.code);
    } catch (err) {
      console.warn("Error selecting language:", err);
    }
  };

  return (
    <CustomBackground showImage={false} showBg={token ? false : true}>
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
              buttonStyle={{ width: "40%" }}
              textStyle={{
                color: COLORS.white,
                fontSize: FONTSIZE.size16,
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
    fontSize: FONTSIZE.size15,
    color: COLORS.black,
    marginLeft: 10,
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
