import { db, auth } from "./firebase.js";
import { collection, query, orderBy, onSnapshot, getCountFromServer } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const totalOrdersEl = document.getElementById("totalOrders");
const totalProductsEl = document.getElementById("totalProducts");
const totalMessagesEl = document.getElementById("totalMessages");
const recentList = document.getElementById("recentList");
const refreshBtn = document.getElementById("refreshBtn");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn?.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "index.html");
});

async function loadCounts(){
  try {
    const productsSnap = await getCountFromServer(collection(db, "products"));
    const ordersSnap = await getCountFromServer(collection(db, "orders"));
    const messagesSnap = await getCountFromServer(collection(db, "messages"));
    totalProductsEl.textContent = productsSnap.data().count;
    totalOrdersEl.textContent = ordersSnap.data().count;
    totalMessagesEl.textContent = messagesSnap.data().count;
  } catch (err) {
    totalProductsEl.textContent = "—";
    totalOrdersEl.textContent = "—";
    totalMessagesEl.textContent = "—";
  }
}

function renderOrderItem(doc){
  const d = doc.data();
  const el = document.createElement("div");
  el.className = "item";
  el.innerHTML = `<div>
    <div style="font-weight:600;color:#fff">${d.name}</div>
    <div class="muted">${d.email} • ${new Date(d.timestamp?.seconds * 1000).toLocaleString()}</div>
  </div>
  <div class="muted">${d.order}</div>`;
  recentList.appendChild(el);
}

function listenRecent(){
  const q = query(collection(db, "orders"), orderBy("timestamp","desc"));
  onSnapshot(q, snapshot => {
    recentList.innerHTML = "";
    let i = 0;
    snapshot.forEach(doc => {
      if(i < 6) renderOrderItem(doc);
      i++;
    });
  });
}

refreshBtn?.addEventListener("click", () => {
  loadCounts();
});

loadCounts();
listenRecent();
