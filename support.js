import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("supportMessage");
  const sendBtn = document.getElementById("sendSupport");
  const statusText = document.getElementById("status");

  if (!textarea || !sendBtn) {
    console.error("HTML elementlar topilmadi");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      location.href = "login.html";
      return;
    }

    sendBtn.addEventListener("click", async () => {
      const text = textarea.value.trim();

      if (!text) {
        statusText.textContent = "Xabar bo‘sh bo‘lmasin";
        return;
      }

      sendBtn.disabled = true;
      statusText.textContent = "Yuborilmoqda...";

      try {
        await addDoc(collection(db, "support_requests"), {
          uid: user.uid,
          email: user.email,
          message: text,
          createdAt: serverTimestamp(),
          status: "new"
        });

        textarea.value = "";
        statusText.textContent = "✅ Yuborildi";
      } catch (err) {
        console.error(err);
        statusText.textContent = "❌ Xatolik yuz berdi";
      }

      sendBtn.disabled = false;
    });
  });
});
