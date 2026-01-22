// auth.js
import { doc, getDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const snap = await getDoc(doc(db, "users", user.uid));

if (snap.exists()) {
  location.href = "profile.html";
} else {
  location.href = "complete-profile.html";
}


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
