import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { doc, getDoc } from 
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const btn = document.getElementById("sendBtn");
const textarea = document.getElementById("message");
const status = document.getElementById("status");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  btn.addEventListener("click", async () => {
    const text = textarea.value.trim();
    if (!text) return;

    try {
      await addDoc(collection(db, "support_requests"), {
        uid: user.uid,
        email: user.email,
        message: text,
        createdAt: serverTimestamp()
      });

      textarea.value = "";
      status.textContent = "✅ Yuborildi";
    } catch (e) {
      console.error(e);
      status.textContent = "❌ Xatolik";
    }
  });
});

async function notifyTelegram(text, email) {
  const TOKEN = "8444694860:AAHCOKSRgS7oSQQo8FysQSogt1B4V_PN70k";
  const CHAT_ID = "1736401983";

 // 🔍 foydalanuvchi profilini olish
const userDoc = await getDoc(doc(db, "users", user.uid));

let fullName = "Noma’lum foydalanuvchi";
let email = user.email || "—";

if (userDoc.exists()) {
  const u = userDoc.data();
  fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim() || fullName;
}

// 🔔 TELEGRAMGA CHIROYLI XABAR
sendTelegram(
  `<b>📩 Yangi bepul maslahat</b>\n\n` +
  `👤 ${fullName}\n` +
  `📧 ${email}\n\n` +
  `📝 ${text}`
);


  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: msg
    })
  });
}
