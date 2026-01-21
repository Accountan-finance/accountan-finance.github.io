// firebase.js
const firebaseConfig = {
  apiKey: "SENING_API_KEY",
  authDomain: "SENING_PROJECT.firebaseapp.com",
  projectId: "SENING_PROJECT",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
