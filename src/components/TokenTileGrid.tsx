import React, { useTransition } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import TokenIcon from "../../assets/svgs/TokenIcon.svg";
import COLORS from "../theme/colors";
import FONTSIZE from "../theme/fontsSize";
import FONTS from "../theme/fonts";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

interface TokenPlan {
  id: number;
  price: string;
  tokens: string;
  save?: string;
}

interface TokenTileGridProps {
  plans: TokenPlan[];
  selectedId?: number | null;
  onSelect: (plan: TokenPlan | null) => void;
}

const TokenTileGrid: React.FC<TokenTileGridProps> = ({
  plans,
  selectedId,
  onSelect,
}) => {
  const { t } = useTranslation();
  const renderItem = ({ item }: { item: TokenPlan }) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onSelect(isSelected ? null : item)}
        style={[styles.tile, isSelected && styles.selectedTile]}
      >
        <TokenIcon width={24} height={24} />
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.tokens}>{item.tokens}</Text>

        {item.save && (
          <View style={styles.saveBadge}>
            <Text style={styles.saveText}>{t("save") + " " + item.save}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={plans}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      numColumns={3}
      contentContainerStyle={styles.gridContainer}
      columnWrapperStyle={styles.row}
      scrollEnabled={false}
    />
  );
};

// Responsive tile sizing
const TILE_MARGIN = 8;
const TILE_WIDTH = (width - TILE_MARGIN * 8) / 3; // Adjust gap & width perfectly

const styles = StyleSheet.create({
  gridContainer: {
    marginTop: 20,
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: TILE_MARGIN * 2,
  },
  tile: {
    width: TILE_WIDTH,
    height: TILE_WIDTH * 1.2, // Slightly taller like your design
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedTile: {
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  price: {
    fontSize: FONTSIZE.size24,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.primary,
    marginHorizontal: 4,
  },
  tokens: {
    fontSize: FONTSIZE.size11,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.secondary,
  },
  saveBadge: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    position: "absolute",
    bottom: -10,
  },
  saveText: {
    color: COLORS.white,
    fontSize: FONTSIZE.size10,
    fontFamily: FONTS.UrbanistMedium,
  },
});

export default TokenTileGrid;
