<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <title>Profil | Accountan Finance</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Firebase (compat) -->
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #0e0e0e;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .profile-box {
      background: rgba(255,255,255,0.05);
      padding: 30px;
      border-radius: 12px;
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    button {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }
    .login-btn {
      background: #ff6b6b;
      color: #fff;
    }
    .logout-btn {
      background: #444;
      color: #fff;
      margin-top: 15px;
    }
  </style>
</head>
<body>

<div class="profile-box">
  <h2>Profil</h2>

  <div id="user-info" style="display:none;">
    <p id="user-name"></p>
    <p id="user-email"></p>
    <button class="logout-btn" onclick="logout()">Chiqish</button>
  </div>

  <div id="login-box">
    <p>Profilga kirish uchun Google orqali kiring</p>
    <button class="login-btn" onclick="login()">Google bilan kirish</button>
  </div>
</div>

<script>
  // 🔐 Firebase config (TO‘G‘RI, BITTA MARTA)
  const firebaseConfig = {
    apiKey: "AIzaSyCtnXY6BcQ0YmOS3E_SFj0BLnzb4-ISe2c",
    authDomain: "accountan-finance.firebaseapp.com",
    projectId: "accountan-finance",
    storageBucket: "accountan-finance.firebasestorage.app",
    messagingSenderId: "1057932521410",
    appId: "1:1057932521410:web:19183a86b5a4721db2f05b"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  function logout() {
    auth.signOut();
  }

  auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById("login-box").style.display = "none";
      document.getElementById("user-info").style.display = "block";
      document.getElementById("user-name").innerText = "Ism: " + user.displayName;
      document.getElementById("user-email").innerText = "Email: " + user.email;
    } else {
      document.getElementById("login-box").style.display = "block";
      document.getElementById("user-info").style.display = "none";
    }
  });
</script>

</body>
</html>
