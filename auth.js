// auth.js

function login() {
  const email = document.getElementById("email").value;
  const pass  = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      window.location.href = "profile.html";
    })
    .catch(e => alert(e.message));
}

function register() {
  const email = document.getElementById("email").value;
  const pass  = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => {
      window.location.href = "profile.html";
    })
    .catch(e => alert(e.message));
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
