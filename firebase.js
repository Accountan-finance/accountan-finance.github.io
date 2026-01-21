// js/firebase.js

import "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
import "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js";
import "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js";

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
window.db = firebase.firestore();
