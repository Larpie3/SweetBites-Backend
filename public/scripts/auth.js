import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  errorMsg.textContent = "⏳ Signing in...";

  if (!email || !password) {
    errorMsg.textContent = "⚠️ Please fill in both email and password.";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    errorMsg.textContent = "✅ Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);
  } catch (err) {
    errorMsg.textContent = `❌ Login failed: ${err.message}`;
  }
});

console.log("📢 Auth script loaded");
