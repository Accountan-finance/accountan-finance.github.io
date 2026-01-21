// firebase.js (FAOL, TOZA, TO‘G‘RI)

const firebaseConfig = {
  apiKey: "AIzaSyCtnXY6BcQ0YmOS3E_SFj0BLnzb4-ISe2c",
  authDomain: "accountan-finance.firebaseapp.com",
  projectId: "accountan-finance",
  storageBucket: "accountan-finance.appspot.com",
  messagingSenderId: "1057932521410",
  appId: "1:1057932521410:web:19183a86b5a4721db2f05b"
};

// INIT — FAQAT BIR MARTA
firebase.initializeApp(firebaseConfig);

// GLOBAL QILIB QO‘YAMIZ
window.auth = firebase.auth();
window.db = firebase.firestore?.();
