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


/* =====================
   RO‘YXATDAN O‘TISH
===================== */
document.getElementById("registerBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await createUserWithEmailAndPassword(auth, email, password);
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
