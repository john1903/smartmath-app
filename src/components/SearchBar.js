import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import FilterIcon from "../../assets/svgs/FilterIcon.svg";

export default function SearchBar({
  onSearch,
  onFilter,
  showFilter = true,
  style = {},
  placeholder = "Search",
}) {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={22}
          color="#555"
          style={{ marginRight: 5 }}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            onSearch(text);
          }}
        />

        <TouchableOpacity>
          <Ionicons name="mic-outline" size={22} color="#555" />
        </TouchableOpacity>
      </View>

      {showFilter && (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => onFilter?.()}
        >
          <FilterIcon width={20} height={20} />
          {/* <Ionicons name="options-outline" size={22} color="#555" /> */}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistRegular,
    paddingVertical: 8,
    color: COLORS.black,
  },
  filterButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 50,
    padding: 8,
  },
});
