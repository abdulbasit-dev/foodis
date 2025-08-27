import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDukDs1WehyVaOio50bluE-xbnJl973dQA",
  authDomain: "foodis-19eea.firebaseapp.com",
  projectId: "foodis-19eea",
  storageBucket: "foodis-19eea.firebasestorage.app",
  messagingSenderId: "1045792255000",
  appId: "1:1045792255000:web:53678b70ea047859d3676d",
  measurementId: "G-PJCE43DC1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;