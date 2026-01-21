// Firebase auth
const auth = firebase.auth();

// Login
function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

// Logout
function logout() {
  auth.signOut();
}

// Auth holatini tekshirish
auth.onAuthStateChanged(user => {
  const loginBox = document.getElementById("login-box");
  const userInfo = document.getElementById("user-info");
  const profileForm = document.getElementById("profile-form");

  if (user) {
    loginBox.style.display = "none";
    userInfo.style.display = "block";
    profileForm.style.display = "block";

    document.getElementById("user-name").innerText =
      "Ism: " + user.displayName;
    document.getElementById("user-email").innerText =
      "Email: " + user.email;

  } else {
    loginBox.style.display = "block";
    userInfo.style.display = "none";
    profileForm.style.display = "none";
  }
});

// Firestore ulash
const db = firebase.firestore();

// Profilni saqlash
function saveProfile() {
  const user = auth.currentUser;
  if (!user) return alert("Avval login qiling");

  const phone = document.getElementById("phone").value;
  const fullName = document.getElementById("fullName").value;
  const company = document.getElementById("company").value;
  const city = document.getElementById("city").value;

  db.collection("users").doc(user.uid).set({
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    phone: phone,
    fullName: fullName,
    company: company,
    city: city,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true })
  .then(() => {
    alert("Profil saqlandi ✅");
  })
  .catch(err => {
    console.error(err);
    alert("Xatolik yuz berdi ❌");
  });
}
