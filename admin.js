import { auth, db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const ADMIN_EMAILS = ["boshqaishlaruch@gmail.com"];
const list = document.getElementById("requestsList");

onAuthStateChanged(auth, async (user) => {
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    location.href = "profile.html";
    return;
  }

  const q = query(
    collection(db, "support_requests"),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  list.innerHTML = "";

  snap.forEach(async (docSnap) => {
    const r = docSnap.data();
    const div = document.createElement("div");
    div.className = "request-card";

    div.innerHTML = `
      <p><b>${r.name}</b> (${r.email})</p>
      <p>${r.message}</p>
      <textarea placeholder="Javob yozish..."></textarea>
      <button>Javob yuborish</button>
    `;

    const btn = div.querySelector("button");
    const textarea = div.querySelector("textarea");

    btn.onclick = async () => {
      if (!textarea.value.trim()) return;

      await addDoc(
        collection(db, "support_requests", docSnap.id, "replies"),
        {
          from: "admin",
          text: textarea.value,
          createdAt: new Date()
        }
      );

      textarea.value = "";
      alert("Javob yuborildi ✅");
    };

    list.appendChild(div);
  });
});
