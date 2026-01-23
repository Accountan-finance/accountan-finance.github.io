import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔐 ADMIN EMAIL
const ADMIN_EMAILS = [
  "boshqaishlaruch@gmail.com"
];

const listEl = document.getElementById("requestsList");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  if (!ADMIN_EMAILS.includes(user.email)) {
    alert("Bu sahifa faqat admin uchun");
    location.href = "profile.html";
    return;
  }

  loadRequests();
});

async function loadRequests() {
  listEl.innerHTML = "";

  const q = query(
    collection(db, "support_requests"),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    listEl.innerHTML = "<p>Hozircha murojaatlar yo‘q</p>";
    return;
  }

  snap.forEach((docSnap) => {
    const d = docSnap.data();

    const div = document.createElement("div");
    div.className = "request-item";

    div.innerHTML = `
      <b>${d.name || "Noma’lum"}</b><br>
      <small>${d.email}</small><br><br>
      <p>${d.message}</p>

      <textarea placeholder="Javob yozing..." id="reply-${docSnap.id}"></textarea>
      <button class="btn-save" onclick="sendReply('${docSnap.id}')">
        Javob yuborish
      </button>
      <hr>
    `;

    listEl.appendChild(div);
  });
}

window.sendReply = async function (requestId) {
  const textarea = document.getElementById(`reply-${requestId}`);
  const text = textarea.value.trim();

  if (!text) {
    alert("Javob yozilmadi");
    return;
  }

  await addDoc(
    collection(db, "support_requests", requestId, "replies"),
    {
      from: "admin",
      text: text,
      createdAt: serverTimestamp()
    }
  );

  textarea.value = "";
  alert("Javob yuborildi ✅");
};
