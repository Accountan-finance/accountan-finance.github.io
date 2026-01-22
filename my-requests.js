import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const list = document.getElementById("requestsList");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const q = query(
    collection(db, "support_requests"),
    where("uid", "==", user.uid),
    orderBy("createdAt", "asc")
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    list.innerHTML = "<p class='empty'>Hali murojaatlar yo‘q</p>";
    return;
  }

  for (const docSnap of snap.docs) {
    const req = docSnap.data();

    const block = document.createElement("div");
    block.className = "request-block";

    block.innerHTML = `
      <div class="msg user-msg">
        ${req.message}
      </div>
      <div id="replies-${docSnap.id}"></div>
    `;

    list.appendChild(block);

    // 🔽 JAVOBLARNI O‘QISH
    const repliesSnap = await getDocs(
      collection(db, "support_requests", docSnap.id, "replies")
    );

    const repliesBox = document.getElementById(`replies-${docSnap.id}`);

    repliesSnap.forEach(r => {
      const reply = r.data();
      const div = document.createElement("div");
      div.className = "msg admin-msg";
      div.textContent = reply.text;
      repliesBox.appendChild(div);
    });
  }
});
