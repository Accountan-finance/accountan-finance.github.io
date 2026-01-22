import { auth, db } from "./firebase.js";
import { onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, query, where, orderBy, getDocs }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("requestsList");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  const q = query(
    collection(db, "support_requests"),
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    list.innerHTML = "<p>Hozircha murojaat yo‘q.</p>";
    return;
  }

  snap.forEach(doc => {
    const d = doc.data();

    const item = document.createElement("div");
    item.style.marginBottom = "15px";
    item.style.padding = "12px";
    item.style.borderRadius = "10px";
    item.style.background = "#1e1e1e";

    item.innerHTML = `
      <p><b>Savol:</b><br>${d.message}</p>
      <p><b>Status:</b> ${d.status}</p>
      ${
        d.reply
          ? `<p style="margin-top:8px;"><b>Javob:</b><br>${d.reply}</p>`
          : `<p style="margin-top:8px; color:#ffb400;">⏳ Javob kutilmoqda</p>`
      }
    `;

    list.appendChild(item);
  });
});
