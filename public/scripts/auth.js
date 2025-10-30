import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");

loginBtn.addEventListener("click", async () => {
  errorMsg.textContent = "";
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    window.location.href = "dashboard.html";
  } catch (err) {
    errorMsg.textContent = "Invalid credentials or network error.";
  }
});
