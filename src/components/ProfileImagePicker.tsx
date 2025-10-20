import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../theme/colors";
import EditPencilIcon from "../../assets/svgs/EditPencilIcon.svg";
import { useDispatch } from "react-redux";
import {
  useUpdateFileMutation,
  useUpdateUserMutation,
} from "../services/authSlice";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useTranslation } from "react-i18next";
import { UploadFilePayload } from "../models/File";

interface ProfileImagePickerProps {
  size?: number;
  initialImage?: string;
  onImagePicked?: (uri: string) => void;
}

const imageSize = 120;

const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({
  initialImage,
  onImagePicked,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [updateFile, { isLoading }] = useUpdateFileMutation();
  const [updateUser] = useUpdateUserMutation();
  const [image, setImage] = useState<string | undefined>(initialImage);

  const requestPermission = async (type: "camera" | "gallery") => {
    if (type === "camera") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        showErrorToast(t("cameraPermissionRequired"));
        return false;
      }
    } else {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        showErrorToast(t("galleryPermissionRequired"));
        return false;
      }
    }
    return true;
  };

  const compressImage = async (uri: string) => {
    try {
      const result = await ImageManipulator.manipulateAsync(uri, [], {
        compress: 0.6,
        format: ImageManipulator.SaveFormat.JPEG,
      });
      return result.uri;
    } catch (error) {
      console.log("Compression failed", error);
      return uri;
    }
  };

  const handleImageUpload = async (uri: string) => {
    try {
      const compressedUri = await compressImage(uri);
      setImage(compressedUri);
      onImagePicked?.(compressedUri);

      const formData = new FormData();
      formData.append("category", "USER");
      formData.append("file", {
        uri: compressedUri,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);

      const payload: UploadFilePayload = { data: formData };
      console.log("Uploading compressed image...");
      const uploadedFile = await updateFile(payload).unwrap();

      if (uploadedFile?.id) {
        const updatePayload = { data: { avatarFileId: uploadedFile.id } };
        await updateUser(updatePayload).unwrap();
        // showSuccessToast(t("profileUpdateSuccessfully"));
      } else {
        showErrorToast(t("fileUploadError"));
      }
    } catch (err) {
      console.log("Upload failed ::::::::::::::: ", err);
      showErrorToast(t("somethingWentWrong"));
    }
  };

  const pickFromGallery = async () => {
    const permission = await requestPermission("gallery");
    if (!permission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selected = result.assets[0];
      await handleImageUpload(selected.uri);
    }
  };

  const pickFromCamera = async () => {
    const permission = await requestPermission("camera");
    if (!permission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selected = result.assets[0];
      await handleImageUpload(selected.uri);
    }
  };

  const handleEdit = () => {
    Alert.alert(t("selectImage"), t("chooseAnOption"), [
      { text: t("camera"), onPress: pickFromCamera },
      { text: t("gallery"), onPress: pickFromGallery },
      { text: t("cancel"), style: "cancel" },
    ]);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={[styles.imageContainer, styles.image]}>
        <Image
          source={
            image ? { uri: image } : require("../../assets/images/avatar.png")
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
