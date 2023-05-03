// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAk7TfI0qu923KW--ew03P3zOuqWkfId8g",
  authDomain: "lucyai-83a55.firebaseapp.com",
  projectId: "lucyai-83a55",
  storageBucket: "lucyai-83a55.appspot.com",
  messagingSenderId: "1083822965482",
  appId: "1:1083822965482:web:1ca6ea0b26c357e6f84d93",
  measurementId: "G-R4026H586X",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
