import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsXN3yET_kXiDXHGjWfU9a4mDXCVWZnps",
  authDomain: "agenticdisasterai.firebaseapp.com",
  projectId: "agenticdisasterai",
  storageBucket: "agenticdisasterai.firebasestorage.app",
  messagingSenderId: "532832837387",
  appId: "1:532832837387:web:055a7e423960f51f840c0e",
  measurementId: "G-ZZ5T7BH6H6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;