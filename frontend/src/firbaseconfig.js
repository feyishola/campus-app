// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEk0P6JB_qA7-VPqujH9bDHf5N7qBaOwM",
  authDomain: "nda-location-based-app.firebaseapp.com",
  projectId: "nda-location-based-app",
  storageBucket: "nda-location-based-app.firebasestorage.app",
  messagingSenderId: "842310442274",
  appId: "1:842310442274:web:c9f3f04cb08b1982b5597b",
  measurementId: "G-NT7Y32EHKX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const storage = getStorage(app);
