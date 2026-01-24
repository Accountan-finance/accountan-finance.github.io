import { auth } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* =====================
   GOOGLE LOGIN
===================== */
const googleBtn = document.getElementById("googleLogin");
googleBtn?.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
});

/* =====================
   EMAIL + PAROL LOGIN
===================== */
document.getElementById("emailLogin")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

 signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    window.location.href = "profile.html";
  })
  .catch((error) => {
    status.textContent = "Email yoki parol noto‘g‘ri ❌";
    status.style.color = "red";
  });

import { db } from "./firebase.js";

try {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", userCred.user.uid), {
    email,
    fullName,
    phone,
    company,
    createdAt: serverTimestamp()
  });

  console.log("Firestore yozildi:", userCred.user.uid);

  window.location.href = "profile.html";

} catch (err) {
  console.error("REG ERROR:", err);
  status.textContent = err.message;
}



// auth.js
import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const company = document.getElementById("company").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    // ✅ MAJBURIY TEKSHIRUV
    if (!fullName || !phone || !company || !email || !password) {
      alert("Barcha maydonlarni to‘ldiring");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 🔐 PROFIL MA’LUMOTLARINI FIRESTORE’GA SAQLASH
      await setDoc(doc(db, "users", userCred.user.uid), {
        fullName,
        phone,
        company,
        email,
        createdAt: serverTimestamp()
      });

      window.location.href = "profile.html";
    } catch (err) {
      alert(err.message);
    }
  });
}



/* =====================
   EMAIL LINK (parolsiz)
===================== */
document.getElementById("sendLink")?.addEventListener("click", async () => {
  const email = document.getElementById("emailLink").value;

  await sendSignInLinkToEmail(auth, email, {
    url: "https://accountan-finance.github.io/profile.html",
    handleCodeInApp: true
  });

  localStorage.setItem("emailForSignIn", email);
  alert("Emailga link yuborildi");
});

/* =====================
   AUTH HOLATI
===================== */
onAuthStateChanged(auth, (user) => {
  if (user && location.pathname.includes("login")) {
    window.location.href = "profile.html";
  }
});
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );
    window.location.href = "profile.html";
  } catch (e) {
    alert("Email yoki parol xato");
  }
});
