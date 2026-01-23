import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ADMIN_EMAILS = ["boshqaishlaruch@gmail.com"];
const box = document.getElementById("adminList");

onAuthStateChanged(auth, (user) => {
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    alert("Admin emas");
    location.href = "profile.html";
    return;
  }

  const q = query(
    collection(db, "support_requests"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snap) => {
    box.innerHTML = "";

    if (snap.empty) {
      box.innerHTML = "<p>Murojaatlar yo‘q</p>";
      return;
    }

    snap.forEach((doc) => {
      const d = doc.data();
      box.innerHTML += `
        <div class="chat-card">
          <b>${d.email}</b>
          <div class="user-msg">${d.message}</div>
        </div>
      `;
    });
  });
});
