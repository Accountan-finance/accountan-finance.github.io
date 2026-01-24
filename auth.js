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

      const userRef = doc(db, "users", result.user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          email: result.user.email,
          name: result.user.displayName || "",
          phone: "",
          organization: "",
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
   EMAIL LOGIN
===================== */
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail")?.value;
    const password = document.getElementById("loginPassword")?.value;

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
    const name = document.getElementById("fullName")?.value;
    const phone = document.getElementById("phone")?.value;
    const organization = document.getElementById("organization")?.value;
    const email = document.getElementById("regEmail")?.value;
    const password = document.getElementById("regPassword")?.value;

    if (!name || !phone || !organization || !email || !password) {
      alert("Barcha maydonlarni to‘ldiring");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        name,
        phone,
        organization,
        email,
        createdAt: serverTimestamp()
      });

      window.location.href = "profile.html";
    } catch (e) {
      alert(e.message);
    }
  });
}
