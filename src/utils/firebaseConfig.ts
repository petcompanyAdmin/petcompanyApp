import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

export const auth = getAuth(app);