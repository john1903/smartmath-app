import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import FilterIcon from "../../assets/svgs/FilterIcon.svg";
import { useSelector } from "react-redux";

interface RootState {
  auth: {
    token?: string;
  };
}

interface SearchBarProps {
  onSearch: (text: string) => void;
  onFilter?: () => void;
  showFilter?: boolean;
  style?: ViewStyle;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilter,
  showFilter = true,
  style = {},
  placeholder = "Search",
}) => {
  const { token } = useSelector((state: RootState) => state?.auth);
  const [searchText, setSearchText] = useState<string>("");

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.searchContainer,
          { borderColor: token ? COLORS.borderColor : COLORS.secondary },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={22}
          color="#555"
          style={{ marginRight: 5 }}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.black}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            onSearch(text);
          }}
        />

        {/* 
        <TouchableOpacity>
          <Ionicons name="mic-outline" size={22} color="#555" />
        </TouchableOpacity> 
        */}
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
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  } as ViewStyle,
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  } as ViewStyle,
  input: {
    flex: 1,
    fontSize: FONTSIZE.size15,
    fontFamily: FONTS.UrbanistRegular,
    paddingVertical: 10,
    color: COLORS.black,
  } as TextStyle,
  filterButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 50,
    padding: 8,
  } as ViewStyle,
});
