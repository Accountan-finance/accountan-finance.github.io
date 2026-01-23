import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const list = document.getElementById("requests");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  // 🔹 faqat shu user murojaatlari
  const q = query(
    collection(db, "support_requests"),
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snap) => {
    list.innerHTML = "";

    if (snap.empty) {
      list.innerHTML = "<p class='empty'>Murojaatlar yo‘q</p>";
      return;
    }

    snap.forEach((docSnap) => {
      const d = docSnap.data();
      const id = docSnap.id;

      const card = document.createElement("div");
      card.className = "chat-card";

      card.innerHTML = `
        <div class="user-msg">
          ${d.message}
          <span class="time">🕒 ${new Date(d.createdAt.seconds * 1000).toLocaleString()}</span>
        </div>
        <div class="replies" id="replies-${id}"></div>
      `;

      list.appendChild(card);

      loadReplies(id);
    });
  });
});

function loadReplies(requestId) {
  const repliesBox = document.getElementById(`replies-${requestId}`);
  if (!repliesBox) return;

  const q = query(
    collection(db, "support_requests", requestId, "replies"),
    orderBy("createdAt", "asc")
  );

  onSnapshot(q, (snap) => {
    repliesBox.innerHTML = "";

    snap.forEach((r) => {
      const d = r.data();

      repliesBox.innerHTML += `
        <div class="admin-msg">
          ${d.text}
          <span class="time">🛠 ${new Date(d.createdAt.seconds * 1000).toLocaleString()}</span>
        </div>
      `;
    });
  });
}
