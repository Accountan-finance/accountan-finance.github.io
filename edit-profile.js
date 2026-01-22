import { auth, db } from "./firebase.js";
import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, setDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const organization = document.getElementById("organization");
const phone = document.getElementById("phone");
const status = document.getElementById("status");

let uid = null;

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  uid = user.uid;

  const snap = await getDoc(doc(db, "users", uid));
  if (snap.exists()) {
    const d = snap.data();
    firstName.value = d.firstName || "";
    lastName.value = d.lastName || "";
    organization.value = d.organization || "";
    phone.value = d.phone || "";
  }
});

document.getElementById("saveProfile").onclick = async () => {
  await setDoc(doc(db, "users", uid), {
    firstName: firstName.value,
    lastName: lastName.value,
    organization: organization.value,
    phone: phone.value,
    updatedAt: new Date()
  }, { merge: true });

  status.textContent = "✅ Ma’lumotlar saqlandi";
  setTimeout(() => location.href = "profile.html", 800);
};
