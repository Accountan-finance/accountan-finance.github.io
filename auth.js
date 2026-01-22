import { auth, db } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("googleLogin");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // user Firestore ga yoziladi (birinchi marta bo‘lsa)
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          name: user.displayName,
          createdAt: serverTimestamp()
        },
        { merge: true }
      );

      window.location.href = "profile.html";
    } catch (err) {
      alert("Kirishda xatolik: " + err.message);
      console.error(err);
    }
  });
}
