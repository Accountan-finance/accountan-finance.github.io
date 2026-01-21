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
