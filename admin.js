import { auth, db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const ADMIN_EMAILS = ["boshqaishlaruch@gmail.com"];
const container = document.getElementById("requests");

onAuthStateChanged(auth, async (user) => {
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    alert("Admin emas!");
    location.href = "login.html";
    return;
  }

  const q = query(
    collection(db, "support_requests"),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  snap.forEach(doc => {
    const d = doc.data();

    const div = document.createElement("div");
    div.className = "admin-card";
    div.innerHTML = `
      <p><b>${d.name}</b>: ${d.message}</p>
      <textarea placeholder="Javob yoz"></textarea>
      <button>Yuborish</button>
    `;

    const btn = div.querySelector("button");
    const ta = div.querySelector("textarea");

    btn.onclick = async () => {
      await addDoc(
        collection(db, "support_requests", doc.id, "replies"),
        {
          from: "admin",
          text: ta.value,
          createdAt: new Date()
        }
      );
      ta.value = "";
      alert("Javob yuborildi");
    };

    container.appendChild(div);
  });
});
