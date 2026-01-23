import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const msg = document.getElementById("supportMessage");
const btn = document.getElementById("sendSupport");
const status = document.getElementById("status");

let user = null;

onAuthStateChanged(auth, u => {
  if (!u) location.href = "login.html";
  user = u;
});

btn.onclick = async () => {
  if (!msg.value.trim()) return;

  btn.disabled = true;

  await addDoc(collection(db, "support_requests"), {
    uid: user.uid,
    email: user.email,
    name: user.displayName || "Mijoz",
    message: msg.value,
    createdAt: serverTimestamp()
  });

  msg.value = "";
  status.textContent = "✅ Yuborildi";
  btn.disabled = false;
};
