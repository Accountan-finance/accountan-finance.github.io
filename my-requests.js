import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection, query, where, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const box = document.getElementById("requests");

onAuthStateChanged(auth, user => {
  if (!user) location.href = "login.html";

  const q = query(
    collection(db, "support_requests"),
    where("uid", "==", user.uid),
    orderBy("createdAt", "asc")
  );

  onSnapshot(q, snap => {
    box.innerHTML = "";
    if (snap.empty) {
      box.innerHTML = "<p class='empty'>Hali murojaat yo‘q</p>";
      return;
    }

    snap.forEach(d => {
      box.innerHTML += `
        <div class="chat-msg user">
          ${d.data().message}
        </div>
      `;
    });
  });
});
