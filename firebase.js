
// js/firebase.js

const firebaseConfig = {
  apiKey: "AIzaSyCtnXY6BcQ0YmOS3E_SFj0BLnzb4-ISe2c",
  authDomain: "accountan-finance.firebaseapp.com",
  projectId: "accountan-finance",
  storageBucket: "accountan-finance.firebasestorage.app",
  messagingSenderId: "1057932521410",
  appId: "1:1057932521410:web:19183a86b5a4721db2f05b"
};

// INIT – FAQAT 1 MARTA
firebase.initializeApp(firebaseConfig);

// GLOBAL EXPORT
window.auth = firebase.auth();
window.db   = firebase.firestore();
