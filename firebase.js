// Firebase SDK allaqachon HTML'da ulangan bo‘lishi shart

const firebaseConfig = {
  apiKey: "AIzaSyCtnXY6BcQ0YmOS3E_SFj0BLnzb4-ISe2c",
  authDomain: "accountan-finance.firebaseapp.com",
  projectId: "accountan-finance",
  storageBucket: "accountan-finance.firebasestorage.app",
  messagingSenderId: "1057932521410",
  appId: "1:1057932521410:web:19183a86b5a4721db2f05b"
};

// ❗ Faqat BIR MARTA
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db   = firebase.firestore();
