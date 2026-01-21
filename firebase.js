// firebase.js

// Firebase config
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
const db = firebase.firestore();

// Global services
const auth = firebase.auth();
const db = firebase.firestore();
