import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection, query, orderBy, onSnapshot,
  addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ADMIN_EMAILS = ["boshqaishlaruch@gmail.com"];
const list = document.getElementById("adminRequests");

onAuthStateChanged(auth, user => {
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    location.href = "profile.html";
    return;
  }

  const q = query(
    collection(db, "support_requests"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, snap => {
    list.innerHTML = "";

    snap.forEach(doc => {
      const d = doc.data();
      list.innerHTML += `
        <div class="chat-card">
          <div class="user-msg">
            <b>${d.name}</b><br>${d.message}
          </div>

          <input placeholder="Javob yozish..."
            onkeydown="if(event.key==='Enter') sendReply('${doc.id}', this)">
        </div>
      `;
    });
  });
});

window.sendReply = async (id, input) => {
  if (!input.value.trim()) return;

  await addDoc(
    collection(db, "support_requests", id, "replies"),
    {
      text: input.value,
      from: "admin",
      createdAt: serverTimestamp()
    }
  );

  input.value = "";
};
