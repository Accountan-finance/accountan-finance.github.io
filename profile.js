import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, setDoc }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// DOM elementlar
const email = document.getElementById("email");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const company = document.getElementById("company");
const phone = document.getElementById("phone");
const profileForm = document.getElementById("profileForm");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  email.textContent = user.email;

  const ref = doc(db, "users", user.uid);

  try {
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const d = snap.data();
      firstName.value = d.firstName || "";
      lastName.value = d.lastName || "";
      company.value = d.company || "";
      phone.value = d.phone || "";
    }
  } catch (err) {
    console.error("O‘qishda xato:", err);
  }

  profileForm.onsubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(ref, {
        firstName: firstName.value,
        lastName: lastName.value,
        company: company.value,
        phone: phone.value,
        googleEmail: user.email,
        updatedAt: new Date()
      });

      alert("Ma’lumotlar saqlandi");
      location.href = "profile.html"; // xohlasang index.html qilamiz

    } catch (err) {
      alert("Saqlashda xato: " + err.message);
      console.error(err);
    }
  };
});

logoutBtn.onclick = async () => {
  await signOut(auth);
  location.href = "index.html";
};
