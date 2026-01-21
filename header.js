// header.js
auth.onAuthStateChanged(user => {
  const login = document.getElementById("nav-login");
  const profile = document.getElementById("nav-profile");

  if (!login || !profile) return;

  if (user) {
    login.style.display = "none";
    profile.style.display = "inline-block";
  } else {
    login.style.display = "inline-block";
    profile.style.display = "none";
  }
});
