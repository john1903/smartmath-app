import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import FONTSIZE from "../../../theme/fontsSize";
import FONTS from "../../../theme/fonts";
import COLORS from "../../../theme/colors";

import { splitMathString } from "../../../utils/helpers";
import MathRenderer from "../../../components/MathRenderer";
import CustomButton from "../../../components/CustomButton";
import ImageCarousel from "../../../components/ImageCarousel";
import GlobalModal from "../../../components/GlobalModal";

import CloudIcon from "../../../../assets/svgs/CloudIcon.svg";
import UploadIcon from "../../../../assets/svgs/UploadIcon.svg";
import GalleryIcon from "../../../../assets/svgs/GalleryIcon.svg";
import TokenWhiteIcon from "../../../../assets/svgs/TokenWhiteIcon.svg";
import TokenBlackIcon from "../../../../assets/svgs/TokenBlackIcon.svg";

import { Ionicons } from "@expo/vector-icons";

import {
  useDeleteFileMutation,
  useUpdateFileMutation,
} from "../../../services/authSlice";
import { useSubmitExerciseAnswerMutation } from "../../../services/tasksSlice";
import { useLazyGetPromptsQuery } from "../../../services/prompts";
import { setLoading } from "../../../store/loading";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../../utils/toast";
import { startTimer, stopTimer } from "../../../utils/timeTracker";

import * as ImagePicker from "expo-image-picker";

const windowWidth = Dimensions.get("window").width;

interface FileItem {
  id: string | number;
  name: string;
  uri: string;
  size?: string;
  type?: string;
}

interface OpenEndedProps {
  question: any;
  onPress: () => void;
  navigation: any;
  answerData?: any | null;
}

const OpenEnded: React.FC<OpenEndedProps> = ({
  question,
  onPress,
  navigation,
  answerData,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [updateFile] = useUpdateFileMutation();
  const [deleteFile] = useDeleteFileMutation();
  const [submitExerciseAnswer] = useSubmitExerciseAnswerMutation();
  const [getPrompts] = useLazyGetPromptsQuery();

  const [submitted, setSubmitted] = useState(false);
  const [waitingPopup, setWaitingPopup] = useState(false);
  const [answer, setAnswer] = useState(answerData || null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [appToken, setAppToken] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);

  // const pickFile = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: ["image/png", "image/jpeg", "application/pdf"],
  //       copyToCacheDirectory: true,
  //       multiple: false,
  //     });

  //     if (!result.canceled) {
  //       const file = result.assets[0];
  //       const sizeInBytes = file.size ?? 0; // if undefined, treat as 0
  //       const fileSizeInMB = Number((sizeInBytes / (1024 * 1024)).toFixed(2));

  //       if (fileSizeInMB > 10) {
  //         showErrorToast(
  //           "File size is more than 10MB. Please select a smaller file."
  //         );
  //         return;
  //       }

  //       const formData = new FormData();
  //       formData.append("category", "ANSWER");
  //       formData.append("file", {
  //         uri: file.uri,
  //         name: file.name,
  //         type: file.mimeType!,
  //       } as any);

  //       dispatch(setLoading(true));
  //       const uploadedFile = await updateFile({ data: formData }).unwrap();

  //       if (uploadedFile?.id) {
  //         const newFile: FileItem = {
  //           id: uploadedFile.id,
  //           name: file.name,
  //           uri: file.uri,
  //           type: file.mimeType,
  //         };
  //         setFiles((prev) => [...prev, newFile]);
  //         dispatch(setLoading(false));
  //       } else {
  //         dispatch(setLoading(false));
  //         showErrorToast("Upload succeeded but no file ID returned.");
  //       }
  //     }
  //   } catch (err) {
  //     dispatch(setLoading(false));
  //     console.log("File picking/upload error:", err);
  //   }
  // };

  const pickFile = async () => {
    Alert.alert(
      t("selectFileFrom"), // Title (you can localize this)
      "",
      [
        {
          text: t("camera"),
          onPress: async () => {
            try {
              const permission =
                await ImagePicker.requestCameraPermissionsAsync();
              if (!permission.granted) {
                showErrorToast(t("cameraPermissionDenied"));
                return;
              }

              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
              });

              if (!result.canceled && result.assets?.length) {
                const file = result.assets[0];
                await handleFileUpload(file);
              }
            } catch (err) {
              console.log("Camera error:", err);
              showErrorToast(t("somethingWentWrong"));
            }
          },
        },
        {
          text: t("gallery"),
          onPress: async () => {
            try {
              const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (!permission.granted) {
                showErrorToast(t("galleryPermissionDenied"));
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                quality: 0.8,
              });

              if (!result.canceled && result.assets?.length) {
                const file = result.assets[0];
                await handleFileUpload(file);
              }
            } catch (err) {
              console.log("Gallery error:", err);
              showErrorToast(t("somethingWentWrong"));
            }
          },
        },
        {
          text: t("document"),
          onPress: async () => {
            try {
              const result = await DocumentPicker.getDocumentAsync({
                type: ["image/png", "image/jpeg", "application/pdf"],
                copyToCacheDirectory: true,
                multiple: false,
              });

              if (!result.canceled && result.assets?.length) {
                const file = result.assets[0];
                await handleFileUpload(file);
              }
            } catch (err) {
              console.log("Document error:", err);
              showErrorToast(t("somethingWentWrong"));
            }
          },
        },
        {
          text: t("cancel"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleFileUpload = async (file: any) => {
    try {
      const sizeInBytes = file.fileSize || file.size || 0;
      const fileSizeInMB = Number((sizeInBytes / (1024 * 1024)).toFixed(2));

      if (fileSizeInMB > 10) {
        showErrorToast(t("fileTooLarge"));
        return;
      }

      const mimeType =
        file.mimeType ||
        file.type ||
        (file.uri?.endsWith(".pdf") ? "application/pdf" : "image/jpeg");

      const formData = new FormData();
      formData.append("category", "ANSWER");
      formData.append("file", {
        uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
        name: file.fileName || file.name || "upload.jpg",
        type: mimeType,
      } as any);

      dispatch(setLoading(true));
      const uploadedFile = await updateFile({ data: formData }).unwrap();

      if (uploadedFile?.id) {
        const newFile: FileItem = {
          id: uploadedFile.id,
          name: file.fileName || file.name,
          uri: file.uri,
          type: mimeType,
        };
        setFiles((prev) => [...prev, newFile]);
        showSuccessToast(t("fileUploadedSuccessfully"));
      } else {
        showErrorToast(t("uploadFailed"));
      }
    } catch (err) {
      console.log("Upload error:", err);
      showErrorToast(t("somethingWentWrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const removeFile = async (index: number) => {
    try {
      const fileToRemove = files[index];
      if (!fileToRemove?.id) return;

      dispatch(setLoading(true));
      await deleteFile({ id: fileToRemove.id }).unwrap();

      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      dispatch(setLoading(false));
      showSuccessToast("File removed successfully!");
    } catch (err) {
      dispatch(setLoading(false));
      console.log("File delete failed:", err);
      showErrorToast("Failed to remove file!");
    }
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      showErrorToast(t("pleaseUploadOneFile"));
      return;
    }

    if (appToken < 50) {
      setModalVisible(true);
      showInfoToast(t("newTokensAvailableToPurchase"));
      return;
    }

    try {
      dispatch(setLoading(true));
      const duration = stopTimer();
      const answerFileIds = files.map((f) => String(f.id));

      const payload = {
        id: question?.id,
        data: {
          exerciseType: question?.exerciseType,
          completionTime: duration,
          answerFileIds,
        },
      };

      const response = await submitExerciseAnswer(payload).unwrap();
      dispatch(setLoading(false));

      showSuccessToast(t("answerSubmittedSuccessfully"));
      if (response?.feedbackStatus === "PENDING") {
        setTimeout(() => setWaitingPopup(true), 1000);
      }
      setSubmitted(true);
    } catch (err) {
      dispatch(setLoading(false));
      console.log("Submit failed:", err);
      showErrorToast(t("somethingWentWrong"));
    }
  };

  useEffect(() => {
    startTimer();

    const fetchPrompts = async () => {
      try {
        const res = await getPrompts({}).unwrap();
        if (res?.usage !== undefined && res?.limit !== undefined) {
          const available = res.limit - res.usage;
          setAppToken(available >= 0 ? available : 0);
        }
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };

    fetchPrompts();
  }, []);

  const handleCancel = () => setModalVisible(false);

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.navigate("SettingsTab", { screen: "Tokens" });
  };

  return (
    <View>
      {question.illustrations && question.illustrations.length > 0 && (
        <ImageCarousel illustrations={question.illustrations} />
      )}

      <View style={{ marginHorizontal: 30 }}>
        <Text style={styles.question}>{t("question1")}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <MathRenderer
            formula={question.description}
            style={{ marginRight: 4 }}
            fontSize={20}
          />
        </View>
      </View>

      {!answer ? (
        <View>
          <View style={styles.container}>
            <CloudIcon />
            <Text style={styles.uploadText}>{t("selectFileToUpload")}</Text>
            <Text style={styles.supported}>{t("sypportedFormate")}</Text>
            <Text style={styles.supported}>{t("maxSize")}</Text>

            <CustomButton
              title={t("selectFile")}
              buttonStyle={[styles.btnStyle, styles.submitBtn]}
              textStyle={[
                styles.submitText,
                { includeFontPadding: false, marginRight: 4 },
              ]}
              contentStyle={{ flexDirection: "row-reverse" }}
              iconStyle={{ marginRight: 0 }}
              onPress={pickFile}
              svg={<UploadIcon />}
            />
          </View>

          <View style={styles.fileTile}>
            {files.map((item, index) => (
              <View key={index} style={styles.fileItem}>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    borderRadius: 100,
                    padding: 5,
                  }}
                >
                  <GalleryIcon width={35} height={35} />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.fileName}>{t("solutionOfQuestion")}</Text>
                  <Text style={styles.fileInfo}>
                    {item.type?.split("/")[1]?.toUpperCase()} • {item.size}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeFile(index)}
                  style={styles.crossIcon}
                >
                  <Ionicons name="close" size={20} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={{ marginHorizontal: 30 }}>
            {appToken > 0 ? (
              <View style={styles.whiteSheetFooter}>
                <CustomButton
                  title={t("50TokenToSubmit")}
                  buttonStyle={[
                    styles.generateReportBtn,
                    files.length === 0 && {
                      backgroundColor: COLORS.D9Gray,
                      borderWidth: 0,
                    },
                  ]}
                  textStyle={[
                    styles.generateReportBtnTitle,
                    files.length === 0 && { color: COLORS.black },
                  ]}
                  onPress={handleSubmit}
                  svg={
                    files.length === 0 ? (
                      <TokenBlackIcon width={22} height={22} />
                    ) : (
                      <TokenWhiteIcon width={22} height={22} />
                    )
                  }
                />
              </View>
            ) : (
              <View style={styles.whiteSheetFooter}>
                <CustomButton
                  title={t("50TokenToSubmit")}
                  buttonStyle={[
                    styles.generateReportBtn,
                    { backgroundColor: COLORS.D9Gray, borderWidth: 0 },
                  ]}
                  textStyle={[
                    styles.generateReportBtnTitle,
                    { color: COLORS.black },
                  ]}
                  onPress={handleSubmit}
                  svg={<TokenBlackIcon width={22} height={22} />}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[styles.whiteSheetFooterText, { marginRight: 10 }]}
                  >
                    {appToken} {t("tokenAvailable")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SettingsTab")}
                  >
                    <Text
                      style={[
                        styles.whiteSheetFooterText,
                        {
                          color: COLORS.primary,
                          fontFamily: FONTS.UrbanistSemiBold,
                        },
                      ]}
                    >
                      {t("buyTokens")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View>
          {answer?.feedbackStatus === "PENDING" ? (
            <View style={{ marginVertical: 20 }}>
              <Text style={styles.commentHeading}>{t("systemComment")}</Text>
              <Text
                style={[
                  styles.commentStatus,
                  { marginTop: 30, color: "#FFD54F" },
                ]}
              >
                {t("exerciseInReview")}
              </Text>
            </View>
          ) : (
            <View style={styles.answerContainer}>
              <Text style={styles.commentHeading}>{t("systemComment")}</Text>

              <View
                style={{
                  marginVertical: answer?.feedback ? 0 : 20,
                }}
              >
                {answer?.feedback && (
                  <MathRenderer
                    formula={answer?.feedback}
                    style={{ marginRight: 4 }}
                    fontSize={14}
                  />
                )}

                <Text
                  style={[
                    styles.commentStatus,
                    {
                      color:
                        answer?.feedbackStatus === "INCORRECT" ||
                        answer?.feedbackStatus === "FAILED"
                          ? COLORS.danger
                          : COLORS.green,
                    },
                  ]}
                >
                  {answer?.feedbackStatus === "INCORRECT" ||
                  answer?.feedbackStatus === "FAILED"
                    ? t("exerciseWrong")
                    : t("exerciseCorrectly")}
                </Text>
              </View>

              <View style={styles.buttons}>
                {(answer?.feedbackStatus === "INCORRECT" ||
                  answer?.feedbackStatus === "FAILED") && (
                  <CustomButton
                    title={t("retry")}
                    buttonStyle={[styles.btnStyle, styles.retryBtn]}
                    textStyle={[
                      styles.retryText,
                      { includeFontPadding: false },
                    ]}
                    onPress={() => setAnswer(null)}
                  />
                )}

                <CustomButton
                  title={submitted ? t("next") : t("submit")}
                  buttonStyle={[styles.btnStyle, styles.submitBtn]}
                  textStyle={[styles.submitText, { includeFontPadding: false }]}
                  disabled={!submitted}
                  onPress={onPress}
                />
              </View>
            </View>
          )}
        </View>
      )}

      <Modal
        transparent
        visible={waitingPopup}
        animationType="fade"
        onRequestClose={() => setWaitingPopup(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.white} />
            <Text style={styles.title}>{t("yourAnswerhasBeenSubmitted")}</Text>
            <Text style={styles.subtitle}>{t("feedbackInFewMins")}</Text>
            <View style={styles.buttonRow}>
              <CustomButton
                title={t("goToHome")}
                buttonStyle={[styles.button]}
                textStyle={[styles.buttonText]}
                onPress={() => {
                  setWaitingPopup(false);

                  setTimeout(() => {
                    navigation.navigate("HomeTab", { screen: "HomeMain" });
                  }, 1000);
                }}
              />
              <CustomButton
                title={t("backToTasks")}
                buttonStyle={[styles.button, { backgroundColor: COLORS.white }]}
                textStyle={[styles.buttonText, { color: COLORS.black }]}
                onPress={() => {
                  setWaitingPopup(false);
                  setTimeout(() => {
                    navigation.navigate("TasksMain");
                  }, 1000);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <GlobalModal
        visible={modalVisible}
        title={t("tokenLimitExceeded")}
        message={t("greatProgressToUnlock")}
        cancelText={t("cancel")}
        confirmText={t("buyMore")}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </View>
  );
};

export default OpenEnded;

const styles = StyleSheet.create({
  answerContainer: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  commentHeading: {
    fontSize: FONTSIZE.size24,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.primary,
  },
  answerFeedback: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.black,
  },
  commentStatus: {
    fontSize: FONTSIZE.size16,
    fontFamily: FONTS.UrbanistMedium,
    marginLeft: 8,
    marginVertical: 10,
  },

  retryBtn: { backgroundColor: COLORS.black },
  retryText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },

  buttons: { flexDirection: "row", gap: 20, justifyContent: "center" },

  carouselContainer: {
    marginBottom: 16,
  },
  carouselImage: {
    width: 280,
    height: 200,
    borderRadius: 10,
  },
  question: {
    fontSize: FONTSIZE.size20,
    fontFamily: FONTS.UrbanistSemiBold,
    marginBottom: 16,
  },

  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderStyle: "dashed",
    borderColor: COLORS.primary,
    borderWidth: 1.5,
    borderRadius: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },

  uploadText: {
    fontSize: FONTSIZE.size24,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.primary,
    marginTop: 14,
  },
  supported: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
    color: COLORS.black,
    marginTop: 4,
  },

  btnStyle: {
    width: "45%",
    paddingVertical: 14,
    borderRadius: 100,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 0,
  },
  submitBtn: { backgroundColor: COLORS.primary },
  submitBtnDisabled: { backgroundColor: COLORS.D9Gray },
  submitText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },

  fileTile: {
    marginHorizontal: 20,
    marginTop: 15,
  },

  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.borderColor2,
  },
  fileName: {
    fontSize: FONTSIZE.size16,
    color: COLORS.black,
    fontFamily: FONTS.UrbanistMedium,
  },
  fileInfo: {
    fontSize: FONTSIZE.size14,
    color: COLORS.secondary,
    fontFamily: FONTS.UrbanistMedium,
  },

  crossIcon: {
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 8,
  },

  whiteSheetFooter: {
    alignItems: "center",
    marginTop: 20,
  },
  generateReportBtn: {
    width: "60%",
    alignItems: "center",
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
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

  // =============================================

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // dim background
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    backgroundColor: "transparent",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
  title: {
    color: COLORS.white,
    fontSize: FONTSIZE.size22,
    fontFamily: FONTS.UrbanistSemiBold,
    marginTop: 15,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.white,
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistMedium,
    marginTop: 5,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    gap: 10,
    // width: "100%",
  },

  button: {
    width: "40%",
    paddingVertical: 14,
    borderRadius: 100,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: COLORS.white,
    borderWidth: 1,
  },

  buttonText: {
    fontSize: FONTSIZE.size14,
    fontFamily: FONTS.UrbanistSemiBold,
    color: COLORS.white,
  },
});
