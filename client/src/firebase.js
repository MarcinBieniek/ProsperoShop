// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "prospero-store.firebaseapp.com",
  projectId: "prospero-store",
  storageBucket: "prospero-store.appspot.com",
  messagingSenderId: "953394352527",
  appId: "1:953394352527:web:26da8647752c29247d3bfa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);