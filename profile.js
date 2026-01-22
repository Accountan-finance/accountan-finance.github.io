import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, setDoc }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  email.textContent = user.email;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const d = snap.data();
    firstName.value = d.firstName || "";
    lastName.value = d.lastName || "";
    company.value = d.company || "";
    phone.value = d.phone || "";
  }

  profileForm.onsubmit = async (e) => {
    e.preventDefault();
    await setDoc(ref, {
      firstName: firstName.value,
      lastName: lastName.value,
      company: company.value,
      phone: phone.value,
      googleEmail: user.email,
      updatedAt: new Date()
    });
    alert("Ma’lumotlar saqlandi");
  };
});

logoutBtn.onclick = async () => {
  await signOut(auth);
  location.href = "index.html";
};
