import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkxYnwFBOTO_vz6bkJJWM1tSatq4H6yeY",
  authDomain: "sweetbites-admin-console.firebaseapp.com",
  projectId: "sweetbites-admin-console",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ordersList = document.getElementById("ordersList");
const loader = document.getElementById("ordersLoader");

async function loadOrders() {
  loader.textContent = "Loading orders...";
  try {
    const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
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
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Order Type:</strong> ${data.orderType}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <p class="timestamp">${data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleString() : ""}</p>
      `;
      ordersList.appendChild(card);
    });

    loader.textContent = "";
  } catch (err) {
    console.error("Error loading orders:", err);
    loader.textContent = "⚠️ Failed to load orders.";
  }
}

loadOrders();
