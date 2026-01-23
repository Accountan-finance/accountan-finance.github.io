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


import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

/* =====================
   RO‘YXATDAN O‘TISH (TO‘LIQ)
===================== */
document.getElementById("registerBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const fullName = document.getElementById("fullName")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const company = document.getElementById("company")?.value.trim();

  const status = document.getElementById("status");

  // 🔴 Majburiy tekshiruv
  if (!email || !password || !fullName || !phone) {
    status.textContent = "Barcha majburiy maydonlarni to‘ldiring ❗";
    status.style.color = "orange";
    return;
  }

  try {
    // 1️⃣ Firebase Auth
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 2️⃣ Firestore — profil ma’lumotlari
    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      fullName,
      phone,
      company: company || "",
      createdAt: serverTimestamp()
    });

    status.textContent = "Ro‘yxatdan o‘tish muvaffaqiyatli ✅";
    status.style.color = "green";

    // 3️⃣ Profilga o‘tish
    window.location.href = "profile.html";

  } catch (err) {
    status.textContent = err.message;
    status.style.color = "red";
  }
});


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
