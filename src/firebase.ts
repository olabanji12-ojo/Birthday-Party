import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDUC7vY5bzv3tx19ccEPYzfbGU_ustOKYc",
  authDomain: "solomonojo-f4e4a.firebaseapp.com",
  projectId: "solomonojo-f4e4a",
  storageBucket: "solomonojo-f4e4a.firebasestorage.app",
  messagingSenderId: "719929331922",
  appId: "1:719929331922:web:432eb805922b0ceae55d0b",
  measurementId: "G-E9YVKC201Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, db, analytics };
