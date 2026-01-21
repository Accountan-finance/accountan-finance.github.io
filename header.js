// header.js

auth.onAuthStateChanged(user => {
  const loginLink = document.getElementById("nav-login");
  const profileLink = document.getElementById("nav-profile");

  if (!loginLink || !profileLink) return;

  if (user) {
    loginLink.style.display = "none";
    profileLink.style.display = "inline-block";
  } else {
    loginLink.style.display = "inline-block";
    profileLink.style.display = "none";
  }
});
