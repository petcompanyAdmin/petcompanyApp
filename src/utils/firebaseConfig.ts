import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

let getReactNativePersistence: any;
try {
  // ✅ Dynamically import to avoid build-time resolution errors
  ({ getReactNativePersistence } = require("firebase/auth/react-native"));
} catch (e) {
  console.warn("⚠️ Falling back: getReactNativePersistence not found, using memory persistence");
  getReactNativePersistence = undefined;
}

const firebaseConfig = {
  apiKey: "AIzaSyB9GySrzZRJwGYUUSQzSmPCCsFCFIuaqhs",
  authDomain: "petco-475118.firebaseapp.com",
  projectId: "petco-475118",
  storageBucket: "petco-475118.firebasestorage.app",
  messagingSenderId: "454197807801",
  appId: "1:454197807801:web:de976c9e80d35919b0a968",
  measurementId: "G-39RGTJGGPG"
};

export const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth safely
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence
    ? getReactNativePersistence(AsyncStorage)
    : undefined,
});