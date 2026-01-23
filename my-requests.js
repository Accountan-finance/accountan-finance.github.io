import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("requests");

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const q = query(
    collection(db, "support_requests"),
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snap) => {
    list.innerHTML = "";
    snap.forEach(doc => {
      list.innerHTML += `
        <div class="chat-card">
          <div class="user-msg">${doc.data().message}</div>
        </div>
      `;
    });
  });
});
