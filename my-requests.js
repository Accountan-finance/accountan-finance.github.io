import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const list = document.getElementById("requestsList");
  list.innerHTML = "";

  const q = query(
    collection(db, "support_requests"),
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    list.innerHTML = "<p class='empty'>Hozircha murojaat yo‘q</p>";
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();

    const item = document.createElement("div");
    item.className = "request-item";

    item.innerHTML = `
      <div class="msg user">${data.message}</div>
      <div class="status">${data.status}</div>
      <a href="request-chat.html?id=${doc.id}" class="open-chat">
        Chatni ochish →
      </a>
    `;

    list.appendChild(item);
  });
});
