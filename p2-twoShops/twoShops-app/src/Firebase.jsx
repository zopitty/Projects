import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh8TETIDN8tm61gmH71VXh9_uy4RZxheM",
  authDomain: "shops-8d84b.firebaseapp.com",
  projectId: "shops-8d84b",
  storageBucket: "shops-8d84b.appspot.com",
  messagingSenderId: "346412311127",
  appId: "1:346412311127:web:92e9128d8f3f91a6b07912",
  measurementId: "G-M6D8K557TD",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
