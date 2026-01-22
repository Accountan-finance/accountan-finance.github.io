// auth.js
import { auth } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("googleLogin");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "profile.html";
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  });
}
