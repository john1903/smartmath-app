import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    name: 'SmartMath',
    slug: 'SmartMath',
    version: '1.0.0',
    platforms: ['ios', 'android'],
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      bundleIdentifier: 'pl.smartmath.app',
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription: 'This app uses the camera to allow users to take and upload photos.',
        NSPhotoLibraryUsageDescription: 'This app needs access to your photo library so you can upload and share images.',
        NSDocumentPickerUsageDescription: 'This app needs access to documents for uploads and learning material.'
      }
    },
    android: {
      package: 'pl.smartmath.app',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      permissions: [
        'CAMERA',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE'
      ],
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: './assets/favicon.png'
    },
    plugins: [
      'expo-font',
      'expo-asset',
      "expo-localization"
    ],
    extra: {
      API_URL: process.env.API_URL, // read from your .env file
      eas: {
        projectId: 'f61905c9-ee9f-4931-bbae-bb6102a51c66'
      }
    },
    runtimeVersion: {
      policy: 'appVersion'
    },
    updates: {
      url: 'https://u.expo.dev/f61905c9-ee9f-4931-bbae-bb6102a51c66'
    }
  };
};
