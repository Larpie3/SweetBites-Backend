import { db, auth } from "./firebase.js";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const ordersList = document.getElementById("ordersList");
const finishedOrdersList = document.getElementById("finishedOrdersList");
const ordersLoader = document.getElementById("ordersLoader");
const searchInput = document.getElementById("searchOrders");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn?.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

const ordersRef = collection(db, "orders");

function renderOrderCard(id, data) {
  const div = document.createElement("div");
  div.className = "order-card visible";

  div.innerHTML = `
    <div class="order-header">
      <h3>${data.name || "Unknown"}</h3>
      <span class="order-tag ${data.status || "pending"}">${data.status || "Pending"}</span>
    </div>
    <div class="order-body">
      <p><b>Email:</b> ${data.email || "N/A"}</p>
      <p><b>Item:</b> ${data.item || "N/A"}</p>
      <p><b>Quantity:</b> ${data.quantity || 1}</p>
      <p><b>Price:</b> ₱${data.price || "?"}</p>
      <p><b>Address:</b> ${data.address || "N/A"}</p>
    </div>
    <div class="order-actions">
      ${
        data.status !== "Completed"
          ? `<button class="btn small success" data-complete="${id}">Mark Complete</button>`
          : ""
      }
      <button class="btn small danger" data-delete="${id}">Delete</button>
    </div>
    <div class="timestamp">${new Date(data.timestamp?.seconds * 1000 || Date.now()).toLocaleString()}</div>
  `;

  return div;
}

function displayOrders(snapshot) {
  ordersLoader.style.display = "none";
  ordersList.innerHTML = "";
  finishedOrdersList.innerHTML = "";

  if (snapshot.empty) {
    ordersList.innerHTML = "<p class='no-orders'>No orders found</p>";
    return;
  }

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const card = renderOrderCard(docSnap.id, data);

    if (data.status === "Completed") {
      finishedOrdersList.appendChild(card);
    } else {
      ordersList.appendChild(card);
    }
  });

  attachButtonHandlers();
}

function attachButtonHandlers() {
  document.querySelectorAll("[data-complete]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-complete");
      const ref = doc(db, "orders", id);
      await updateDoc(ref, { status: "Completed" });
    });
  });

  document.querySelectorAll("[data-delete]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-delete");
      if (confirm("Are you sure you want to delete this order?")) {
        const ref = doc(db, "orders", id);
        await deleteDoc(ref);
      }
    });
  });
}

// Realtime listener
onSnapshot(ordersRef, displayOrders);

// Search filtering
searchInput?.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  document.querySelectorAll(".order-card").forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(term) ? "block" : "none";
  });
});
