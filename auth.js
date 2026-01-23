import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth } from "./firebase.js";

/* =========================
   GOOGLE LOGIN
========================= */
const provider = new GoogleAuthProvider();

document.getElementById("googleLogin")?.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    alert(e.message);
  }
});

/* =========================
   EMAIL + PASSWORD LOGIN
========================= */
document.getElementById("loginBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert(e.message);
  }
});

/* =========================
   REGISTRATION
========================= */
document.getElementById("registerBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert(e.message);
  }
});

/* =========================
   SINGLE REDIRECT POINT
========================= */
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Kirdi:", user.email);
    window.location.href = "profile.html";
  }
});
