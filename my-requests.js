import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

  if (snap.empty) {
  list.innerHTML = `
    <div class="chat-card" style="opacity:.6; align-self:center;">
      Hozircha murojaatlar yo‘q
    </div>
  `;
  return;
}


    snap.forEach(doc => {
      const d = doc.data();
      list.innerHTML += `
        <div class="chat-card">
          <div class="user-msg">${d.message}</div>
          <div class="status">Holat: ${d.status}</div>
        </div>
      `;
    });
  });
});

function loadReplies(requestId) {
  const repliesRef = collection(db, "support_requests", requestId, "replies");

  onSnapshot(repliesRef, (snap) => {
    const box = document.getElementById(`replies-${requestId}`);
    if (!box) return;

    box.innerHTML = "";

    snap.forEach((r) => {
      box.innerHTML += `
        <div class="admin-msg">
          ${r.data().text}
        </div>
      `;
    });
  });
}

