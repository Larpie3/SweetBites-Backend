import { db, auth } from "./firebase.js";
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const ordersBody = document.getElementById("ordersBody");
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn?.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "index.html");
});

const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
onSnapshot(q, (snap) => {
  ordersBody.innerHTML = "";
  snap.forEach(doc => {
    const d = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${new Date(d.timestamp?.seconds * 1000).toLocaleString()}</td>
      <td>${d.name}</td>
      <td>${d.phone}</td>
      <td>${d.order || d.message || ''}</td>
      <td><button class="btn ghost view" data-id="${doc.id}">View</button></td>`;
    ordersBody.appendChild(tr);
  });
});
