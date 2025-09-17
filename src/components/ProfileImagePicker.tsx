import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../theme/colors";
import EditPencilIcon from "../../assets/svgs/EditPencilIcon.svg";

interface ProfileImagePickerProps {
  size?: number;
  initialImage?: string; // remote image if user already has one
  onImagePicked?: (uri: string) => void;
}

const imageSize = 120;

const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({
  initialImage,
  onImagePicked,
}) => {
  const [image, setImage] = useState<string | undefined>(initialImage);

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    console.log("result :::::::::::::::::: ", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImagePicked?.(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    console.log("result :::::::::::::::::: ", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImagePicked?.(result.assets[0].uri);
    }
  };

  const handleEdit = () => {
    Alert.alert("Select Image", "Choose an option", [
      { text: "Camera", onPress: pickFromCamera },
      { text: "Gallery", onPress: pickFromGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={[styles.imageContainer, styles.image]}>
        <Image
          source={
            image ? { uri: image } : require("../../assets/images/avatar.png") // ✅ local placeholder
          }
          style={styles.image}
        />

        {/* Edit button */}
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <EditPencilIcon width={18} height={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",

    // overflow: "hidden",
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  },
  editButton: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.background,
    padding: 6,
  },
});

export default ProfileImagePicker;
