import { db, auth } from "./firebase.js";
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const messagesList = document.getElementById("messagesList");
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn?.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "index.html");
});
const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
onSnapshot(q, (snap) => {
  messagesList.innerHTML = "";
  snap.forEach(doc => {
    const m = doc.data();
    const el = document.createElement("div");
    el.className = "message-item";
    el.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-weight:700;color:#fff">${m.name}</div>
        <div class="muted">${m.email} • ${new Date(m.timestamp?.seconds * 1000).toLocaleString()}</div>
      </div>
      <div><button class="btn ghost">Reply</button></div>
    </div>
    <div style="margin-top:8px;color:var(--muted)">${m.subject || 'Message'}</div>
    <div style="margin-top:6px">${m.message}</div>`;
    messagesList.appendChild(el);
  });
});
