import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkxYnwFBOTO_vz6bkJJWM1tSatq4H6yeY",
  authDomain: "sweetbites-admin-console.firebaseapp.com",
  projectId: "sweetbites-admin-console",
  storageBucket: "sweetbites-admin-console.firebasestorage.app",
  messagingSenderId: "125142981711",
  appId: "1:125142981711:web:7ad785732b705597069e3a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

console.log("✅ Firebase fully initialized (Auth, Firestore, Storage)");


