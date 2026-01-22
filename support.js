import { auth, db } from "./firebase.js";
import { onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const messageInput = document.getElementById("supportMessage");
const sendBtn = document.getElementById("sendSupport");
const status = document.getElementById("status");

let currentUser = null;

// 🔐 Login majburiy
onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html";
  } else {
    currentUser = user;
  }
});

sendBtn.onclick = async () => {
  if (!messageInput.value.trim()) {
    status.textContent = "❗ Iltimos, savol yozing";
    status.style.color = "#ffb400";
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Yuborilmoqda...";

  try {
    await addDoc(collection(db, "support_requests"), {
      uid: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email,
      message: messageInput.value,
      createdAt: new Date(),
      status: "new"
    });

    status.textContent = "✅ So‘rovingiz yuborildi. Tez orada javob beramiz.";
    status.style.color = "#00ff9c";
    messageInput.value = "";

  } catch (err) {
    status.textContent = "❌ Xatolik: " + err.message;
    status.style.color = "#ff4444";
  }

  sendBtn.disabled = false;
  sendBtn.textContent = "Yuborish";
};
