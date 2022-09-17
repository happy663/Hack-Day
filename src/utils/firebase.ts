// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBUWDuGISmyKlTQrTFBtrdIFeXl-bEtk0Y',
  authDomain: 'hackday-4daec.firebaseapp.com',
  projectId: 'hackday-4daec',
  storageBucket: 'hackday-4daec.appspot.com',
  messagingSenderId: '33897607847',
  appId: '1:33897607847:web:5af4e2bdabc87c1bba6182',
  measurementId: 'G-M0GL6HX96J',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const auth = getAuth(app);
