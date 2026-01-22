// auth.js
import { auth, db } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithRedirect
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("googleLogin");

loginBtn.addEventListener("click", async () => {
  await signInWithRedirect(auth, provider);
});
