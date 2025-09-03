import { db } from "./firebase-config.js";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const statusEl = document.getElementById("status");
const tbody = document.getElementById("tbody");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const addBtn = document.getElementById("add");

const usersCol = collection(db, "users");

async function health() {
  try {
    await getDocs(usersCol);
    statusEl.textContent = "OK (Firebase)";
  } catch (e) {
    statusEl.textContent = "Offline";
    console.error(e);
  }
}

function trUser(u) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${u.id}</td>
    <td><input value="${u.name}" data-id="${u.id}" data-field="name" /></td>
    <td><input value="${u.email}" data-id="${u.id}" data-field="email" /></td>
    <td>
      <button data-action="save" data-id="${u.id}">Salvar</button>
      <button data-action="del" data-id="${u.id}">Excluir</button>
    </td>
  `;
  return tr;
}

async function load() {
  const snapshot = await getDocs(usersCol);
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  tbody.innerHTML = "";
  users.forEach(u => tbody.appendChild(trUser(u)));
}

addBtn.addEventListener("click", async () => {
  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  if (!name || !email) return alert("Preencha nome e email.");
  await addDoc(usersCol, { name, email });
  nameEl.value = "";
  emailEl.value = "";
  await load();
});

// Salvar e excluir
tbody.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = btn.getAttribute("data-id");
  const action = btn.getAttribute("data-action");
  const userDoc = doc(db, "users", id);

  if (action === "del") {
    await deleteDoc(userDoc);
    await load();
  } else if (action === "save") {
    const row = btn.closest("tr");
    const inputs = row.querySelectorAll("input[data-id='" + id + "']");
    const payload = {};
    inputs.forEach(inp => payload[inp.getAttribute("data-field")] = inp.value.trim());
    await updateDoc(userDoc, payload);
    await load();
  }
});

(async () => {
  await health();
  await load();
})();
