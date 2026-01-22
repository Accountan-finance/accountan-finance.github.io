import { auth, db } from "./firebase.js";
import { onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, query, where, getDocs }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("requestsList");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  const q = query(
    collection(db, "support_requests"),
    where("uid", "==", user.uid)
  );

  const snap = await getDocs(q);

  console.log("Murojaatlar soni:", snap.size); // 🔍 MUHIM

  if (snap.empty) {
    list.innerHTML = "<p style='color:#aaa'>Hozircha murojaat yo‘q.</p>";
    return;
  }

  list.innerHTML = ""; // tozalash

  snap.forEach(doc => {
    const d = doc.data();

    const item = document.createElement("div");
    item.className = "request-card";

    item.innerHTML = `
      <p><b>Savol:</b><br>${d.message || "-"}</p>
      <p><b>Status:</b> ${d.status || "new"}</p>
      ${
        d.reply
          ? `<div class="reply-box"><b>Javob:</b><br>${d.reply}</div>`
          : `<p class="waiting">⏳ Javob kutilmoqda</p>`
      }
    `;

    list.appendChild(item);
  });
});
