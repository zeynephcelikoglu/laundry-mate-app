import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; 
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtD6vuysPgStv4UbHupfRncDrUF0ak5M0",
  authDomain: "laundry-app-8b26e.firebaseapp.com",
  projectId: "laundry-app-8b26e",
  storageBucket: "laundry-app-8b26e.firebasestorage.app",
  messagingSenderId: "33028159275",
  appId: "1:33028159275:web:add848703bfe5f5022b76e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore();

export { auth, db };
