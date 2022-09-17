// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAZD6PUfgvqBycqaOI2DxktOTBGX91eK5Y",
  authDomain: "digital-hack-day.firebaseapp.com",
  projectId: "digital-hack-day",
  storageBucket: "digital-hack-day.appspot.com",
  messagingSenderId: "686458940555",
  appId: "1:686458940555:web:c84f745fc7ec0dd076b88e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const auth = getAuth(app);
