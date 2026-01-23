import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("supportForm");
const textarea = document.getElementById("message");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Avval login qiling");
    location.href = "login.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = textarea.value.trim();
    if (!text) return alert("Xabar bo‘sh");

    await addDoc(collection(db, "support_requests"), {
      uid: user.uid,
      email: user.email,
      message: text,
      createdAt: serverTimestamp(),
      status: "new"
    });

    textarea.value = "";
    alert("Murojaat yuborildi");
  });
});
