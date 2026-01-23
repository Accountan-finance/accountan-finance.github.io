import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const list = document.getElementById("requests");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  const q = query(
    collection(db, "support_requests"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snap) => {
    list.innerHTML = "";

    if (snap.empty) {
      list.innerHTML = `<p style="opacity:.6">Murojaatlar yo‘q</p>`;
      return;
    }

    snap.forEach((doc) => {
      const d = doc.data();

      const div = document.createElement("div");
      div.className = "chat-card admin-card";

      div.innerHTML = `
        <div class="chat-head">
          <b>${d.email}</b>
          <small>${new Date(d.createdAt?.seconds * 1000).toLocaleString()}</small>
        </div>

        <div class="user-msg">${d.message}</div>

        <div class="reply-box">
          <textarea placeholder="Javob yozing..." id="reply-${doc.id}"></textarea>
          <button data-id="${doc.id}">Yuborish</button>
        </div>
      `;

      list.appendChild(div);
    });

    // buttonlarga event beramiz
    list.querySelectorAll("button").forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.dataset.id;
        const text = document.getElementById(`reply-${id}`).value.trim();
        if (!text) return;

        await addDoc(
          collection(db, "support_requests", id, "replies"),
          {
            text,
            from: "admin",
            createdAt: serverTimestamp()
          }
        );

        document.getElementById(`reply-${id}`).value = "";
      };
    });
  });
});
