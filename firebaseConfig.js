// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Fg1cYgwUKJqA3Ufx0S_lpUdi0h4jt-E",
  authDomain: "solaris-expo-app.firebaseapp.com",
  projectId: "solaris-expo-app",
  storageBucket: "solaris-expo-app.firebasestorage.app",
  messagingSenderId: "945095878616",
  appId: "1:945095878616:web:3504a49ab757c61c90f4ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const persistence = getReactNativePersistence(ReactNativeAsyncStorage);

export const auth = initializeAuth(app, {
  persistence
});
export const db = getFirestore(app);
export default app;