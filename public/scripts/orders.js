import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const ordersList = document.getElementById("ordersList");
const loader = document.getElementById("ordersLoader");
const searchInput = document.getElementById("searchOrders");

function renderOrders(snapshot) {
  ordersList.innerHTML = "";
  if (snapshot.empty) {
    ordersList.innerHTML = "<p>No orders found.</p>";
    loader.textContent = "";
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();
    const card = document.createElement("div");
    card.className = "order-card";
    card.innerHTML = `
      <h3>${data.name || "Unnamed Order"}</h3>
      <p><strong>Email:</strong> ${data.email || "N/A"}</p>
      <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
      <p><strong>Order Type:</strong> ${data.orderType || "N/A"}</p>
      <p><strong>Message:</strong> ${data.message || "None"}</p>
      <p class="timestamp">${data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleString() : ""}</p>
    `;
    ordersList.appendChild(card);
  });

  loader.textContent = "";
}

function loadOrdersRealtime() {
  loader.textContent = "Loading orders...";
  const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
  onSnapshot(q, snapshot => renderOrders(snapshot));
}

loadOrdersRealtime();

searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".order-card");
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(term) ? "block" : "none";
  });
});
