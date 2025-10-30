import { db, storage, auth } from "./firebase.js";
import { addDoc, collection, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const addBtn = document.getElementById("addProductBtn");
const nameEl = document.getElementById("prodName");
const priceEl = document.getElementById("prodPrice");
const imgEl = document.getElementById("prodImage");
const availEl = document.getElementById("prodAvail");
const grid = document.getElementById("productGrid");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn?.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "index.html");
});

addBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  if(!nameEl.value || !priceEl.value) return;
  const file = imgEl.files[0];
  let url = "";
  if(file){
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    url = await getDownloadURL(storageRef);
  }
  await addDoc(collection(db, "products"), {
    name: nameEl.value,
    price: parseFloat(priceEl.value || 0),
    imageUrl: url,
    available: availEl.value === "true",
    createdAt: Date.now()
  });
  nameEl.value = "";
  priceEl.value = "";
  imgEl.value = null;
});

onSnapshot(collection(db, "products"), (snap) => {
  grid.innerHTML = "";
  snap.forEach(d => {
    const p = d.data();
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `<img src="${p.imageUrl || 'https://via.placeholder.com/320x180?text=No+Image'}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₱${p.price}</p>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="btn ghost delete" data-id="${d.id}">Delete</button>
      </div>`;
    grid.appendChild(card);
  });
});

document.addEventListener("click", async (e) => {
  if(e.target.classList.contains("delete")){
    const id = e.target.getAttribute("data-id");
    await deleteDoc(doc(db, "products", id));
  }
});
