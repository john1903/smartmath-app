import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../theme/colors";
import EditPencilIcon from "../../assets/svgs/EditPencilIcon.svg";
import { useDispatch } from "react-redux";
import {
  useUpdateFileMutation,
  useUpdateUserMutation,
} from "../services/authSlice";
import { setLoading } from "../store/loading";
import { showErrorToast, showSuccessToast } from "../utils/toast";

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
  const dispatch = useDispatch();
  const [updateFile, { isLoading }] = useUpdateFileMutation();
  const [updateUser] = useUpdateUserMutation();

  const [image, setImage] = useState<string | undefined>(initialImage);

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    const image = result.assets[0];
    setImage(image.uri);
    onImagePicked?.(image.uri);

    // dispatch(setLoading(true));

    try {
      // 1. Upload file
      const formData = new FormData();
      formData.append("category", "USER");
      formData.append("file", {
        uri: image.uri,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);

      console.log("Uploading file...");
      const uploadedFile = await updateFile({ data: formData }).unwrap();
      console.log("Uploaded file :::::::::::: ", uploadedFile);

      // 2. Update user with avatarFileId
      if (uploadedFile?.id) {
        const updatePayload = {
          data: {
            avatarFileId: uploadedFile.id,
          },
        };

        console.log(
          "Updating user with fileId ::::::::::::: ",
          uploadedFile.id
        );
        const updatedUser = await updateUser(updatePayload).unwrap();
        console.log("User updated ::::::::::::: ", updatedUser);

        showSuccessToast("Profile updated successfully!");
      } else {
        showErrorToast("File upload succeeded but no file ID returned.");
      }
    } catch (err) {
      console.log("Upload or update failed ::::::::::::::: ", err);
      showErrorToast("Something went wrong!");
    } finally {
      // setTimeout(() => {
      //   dispatch(setLoading(false));
      // }, 500);
    }
  };

  const pickFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      console.log("result :::::::: result:::::::::: ", result);

      const image = result.assets[0];
      setImage(image.uri);
      onImagePicked?.(image.uri);

      // dispatch(setLoading(true));
      try {
        const formData = new FormData();
        formData.append("category", "USER");
        formData.append("file", {
          uri: image.uri,
          name: "profile.jpg",
          type: "image/jpeg", // or "image/png"
        });

        console.log("FormData sending...");

        // const res = await updateFile({ data: formData });
        // console.log("res:::::::::::::: ", res);

        console.log("Uploading file...");
        const uploadedFile = await updateFile({ data: formData }).unwrap();
        console.log("Uploaded file :::::::::::: ", uploadedFile);

        // 2. Update user with avatarFileId
        if (uploadedFile?.id) {
          const updatePayload = {
            data: {
              avatarFileId: uploadedFile.id,
            },
          };

          console.log(
            "Updating user with fileId camera ::::::::::::: ",
            uploadedFile.id
          );
          const updatedUser = await updateUser(updatePayload).unwrap();
          console.log("User updated camera ::::::::::::: ", updatedUser);

          showSuccessToast("Profile updated successfully!");
        } else {
          showErrorToast("File upload succeeded but no file ID returned.");
        }
      } catch (err) {
        console.log("Upload failed", err);
      } finally {
        // dispatch(setLoading(false));
      }
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
