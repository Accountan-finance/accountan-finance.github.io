import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const btn = document.getElementById("sendBtn");
const textarea = document.getElementById("message");
const status = document.getElementById("status");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  btn.addEventListener("click", async () => {
    const text = textarea.value.trim();
    if (!text) return;

    try {
      await addDoc(collection(db, "support_requests"), {
        uid: user.uid,
        email: user.email,
        message: text,
        createdAt: serverTimestamp()
      });

      textarea.value = "";
      status.textContent = "✅ Yuborildi";
    } catch (e) {
      console.error(e);
      status.textContent = "❌ Xatolik";
    }
  });
});
