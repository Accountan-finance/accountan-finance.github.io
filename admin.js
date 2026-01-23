import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const list = document.getElementById("adminRequests");

onAuthStateChanged(auth, (user) => {
  if (!user || user.email !== "boshqaishlaruch@gmail.com") {
    location.href = "profile.html";
    return;
  }

  const q = query(
    collection(db, "support_requests"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snap) => {
    list.innerHTML = "";

    snap.forEach((docSnap) => {
      const d = docSnap.data();

      list.innerHTML += `
        <div class="chat-card">
          <div class="user-msg">
            <b>${d.name || "Mijoz"}</b><br>${d.message}
          </div>
          <textarea id="reply-${docSnap.id}" placeholder="Javob yozing"></textarea>
          <button onclick="sendReply('${docSnap.id}')">Yuborish</button>
        </div>
      `;
    });
  });
});

window.sendReply = async (id) => {
  const text = document.getElementById(`reply-${id}`).value;
  if (!text) return;

  await addDoc(
    collection(db, "support_requests", id, "replies"),
    {
      text,
      from: "admin",
      createdAt: serverTimestamp()
    }
  );
};
