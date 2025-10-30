import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkxYnwFBOTO_vz6bkJJWM1tSatq4H6yeY",
  authDomain: "sweetbites-admin-console.firebaseapp.com",
  projectId: "sweetbites-admin-console",
  storageBucket: "sweetbites-admin-console.firebasestorage.app",
  messagingSenderId: "125142981711",
  appId: "1:125142981711:web:7ad785732b705597069e3a"
  measurementId: "G-HX5BYS56CT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
