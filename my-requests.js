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
        <div class="chat-card" style="opacity:.6">
          Hozircha murojaatlar yo‘q
        </div>`;
      return;
    }

    snap.forEach(docSnap => {
      const d = docSnap.data();
      const id = docSnap.id;

      list.innerHTML += `
        <div class="chat-card">
          <div class="user-msg">${d.message}</div>
          <div class="status">Holat: ${d.status || "new"}</div>
          <div class="replies" id="replies-${id}"></div>
        </div>
      `;

      // admin javoblari
      onSnapshot(
        query(
          collection(db, "support_requests", id, "replies"),
          orderBy("createdAt")
        ),
        (rsnap) => {
          const box = document.getElementById(`replies-${id}`);
          if (!box) return;

          box.innerHTML = "";
          rsnap.forEach(r => {
            box.innerHTML += `
              <div class="admin-msg">${r.data().text}</div>
            `;
          });
        }
      );
    });
  });
});
import { sendToTelegram } from "./telegram.js";

await addDoc(collection(db, "support_requests"), {
  userId: auth.currentUser.uid,
  message: text,
  createdAt: serverTimestamp(),
  status: "new"
});

// 🔔 TELEGRAMGA XABAR
sendToTelegram(
  `<b>📩 Yangi murojaat</b>\n\n` +
  `👤 User: ${auth.currentUser.email}\n` +
  `📝 Matn: ${text}`
);

