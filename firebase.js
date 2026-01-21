<!-- firebase.js -->
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "AIzaSyCtnXY6BcQ0YmOS3E_SFj0BLnzb4-ISe2c",
    authDomain: "accountan-finance.firebaseapp.com",
    projectId: "accountan-finance",
    storageBucket: "accountan-finance.appspot.com",
    messagingSenderId: "1057932521410",
    appId: "1:1057932521410:web:19183a86b5a4721db2f05b"
  };

  firebase.initializeApp(firebaseConfig);

  window.auth = firebase.auth();
  window.db   = firebase.firestore();
</script>
