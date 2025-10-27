// utils/notifications.ts
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

// Global notification handler for foreground behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,

    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Register for push notifications and return Expo push token
 */
export async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  if (!Device.isDevice) {
    alert("Push notifications require a physical device.");
    return;
  }

  // Request permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Permission for push notifications was not granted!");
    return;
  }

  // ✅ Get Expo push token
  const projectId = "f61905c9-ee9f-4931-bbae-bb6102a51c66"; // same as your app.config.ts
  const tokenResponse = await Notifications.getExpoPushTokenAsync({
    projectId,
  });
  const token = tokenResponse.data;
  // console.log("Expo Push Token:", token);

  // ✅ Android notification channel
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

/**
 * Listen for notifications (foreground + tapped)
 * @param onNotificationClick callback when notification is tapped
 */
export function setupNotificationListeners(
  onNotificationClick: (data: any) => void
) {
  const receivedListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("📩 Notification received:", notification);
    }
  );

  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;
      console.log("👉 Notification tapped with data:", data);
      onNotificationClick(data);
    });

  return () => {
    receivedListener.remove();
    responseListener.remove();
  };
}
