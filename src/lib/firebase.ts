// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDukDs1WehyVaOio50bluE-xbnJl973dQA",
  authDomain: "foodis-19eea.firebaseapp.com",
  projectId: "foodis-19eea",
  storageBucket: "foodis-19eea.firebasestorage.app",
  messagingSenderId: "1045792255000",
  appId: "1:1045792255000:web:53678b70ea047859d3676d",
  measurementId: "G-PJCE43DC1L"
//   apiKey: "AIzaSyDFOSXyLiKe02mshSlwYiYKOQpnjWaW2NU",
//   authDomain: "doctor-booking-81f28.firebaseapp.com",
//   databaseURL: "https://doctor-booking-81f28.firebaseio.com",
//   projectId: "doctor-booking-81f28",
//   storageBucket: "doctor-booking-81f28.appspot.com",
//   messagingSenderId: "1001900535989",
//   appId: "1:1001900535989:web:6139be47126e7bb432cefc",
//   measurementId: "G-NR1Z21T4K4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;