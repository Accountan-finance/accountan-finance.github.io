auth.onAuthStateChanged(user => {
  const btn = document.getElementById("auth-btn");
  if (!btn) return;

  if (user) {
    btn.innerText = "PROFIL";
    btn.href = "profile.html";
  } else {
    btn.innerText = "KIRISH";
    btn.href = "login.html";
  }
});

auth.onAuthStateChanged(user => {
  const loginLink = document.getElementById("login-link");
  const profileLink = document.getElementById("profile-link");

  if (!loginLink || !profileLink) return;

  if (user) {
    loginLink.style.display = "none";
    profileLink.style.display = "inline-block";
  } else {
    loginLink.style.display = "inline-block";
    profileLink.style.display = "none";
  }
});
