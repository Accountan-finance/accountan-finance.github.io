
// 🔑 LOGIN
function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

// 🚪 LOGOUT
function logout() {
  auth.signOut();
}

// 💾 SAVE PROFILE
async function saveProfile() {
  const user = auth.currentUser;
  if (!user) return;

  await db.collection("users").doc(user.uid).set({
    fullname: document.getElementById("fullname").value,
    phone: document.getElementById("phone").value,
    company: document.getElementById("company").value,
    city: document.getElementById("city").value,
    email: user.email,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  alert("Ma’lumotlar saqlandi ✅");
}

// 🔁 AUTH STATE
auth.onAuthStateChanged(async (user) => {
  if (user) {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("profile-box").style.display = "block";

    document.getElementById("user-name").innerText = user.displayName;
    document.getElementById("user-email").innerText = user.email;

    const doc = await db.collection("users").doc(user.uid).get();
    if (doc.exists) {
      const d = doc.data();
      document.getElementById("fullname").value = d.fullname || "";
      document.getElementById("phone").value = d.phone || "";
      document.getElementById("company").value = d.company || "";
      document.getElementById("city").value = d.city || "";
    }
  } else {
    document.getElementById("login-box").style.display = "block";
    document.getElementById("profile-box").style.display = "none";
  }
});
