console.log("AUTH.JS ISHLADI");

import { auth, db } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =====================
   GOOGLE LOGIN
===================== */
const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          fullName: user.displayName || "",
          email: user.email,
          phone: user.phoneNumber || "",
          company: "",
          provider: "google",
          createdAt: serverTimestamp()
        });
      }

      window.location.href = "profile.html";
    } catch (e) {
      alert(e.message);
    }
  });
}

/* =====================
   EMAIL + PASSWORD LOGIN
===================== */
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      alert("Email va parolni kiriting");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "profile.html";
    } catch (e) {
      alert("Email yoki parol xato");
    }
  });
}

/* =====================
   REGISTRATION
===================== */
const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const company = document.getElementById("company").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!fullName || !phone || !company || !email || !password) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        fullName,
        phone,
        company,
        email,
        provider: "email",
        createdAt: serverTimestamp()
      });

      window.location.href = "profile.html";
    } catch (e) {
      alert(e.message);
    }
  });
}
