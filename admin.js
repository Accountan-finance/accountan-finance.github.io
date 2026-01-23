import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const ADMIN_EMAILS = ["boshqaishlaruch@gmail.com"];
const box = document.getElementById("adminRequests");

onAuthStateChanged(auth, (user) => {
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    location.href = "profile.html";
    return;
  }

  const q = query(
    collection(db, "support_requests"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snap) => {
    box.innerHTML = "";

    snap.forEach(doc => {
      const d = doc.data();
      box.innerHTML += `
        <div class="chat-card">
          <b>${d.email}</b>
          <div class="user-msg">${d.message}</div>
          <small>${new Date(d.createdAt.seconds*1000).toLocaleString()}</small>
        </div>
      `;
    });
  });
});
