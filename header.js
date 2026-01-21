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
