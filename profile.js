auth.onAuthStateChanged(async user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("user-email").innerText = user.email;

  const ref = db.collection("users").doc(user.uid);
  const doc = await ref.get();

  if (doc.exists) {
    const d = doc.data();
    fullname.value = d.fullname || "";
    phone.value    = d.phone || "";
    company.value  = d.company || "";
    city.value     = d.city || "";
  }
});

function saveProfile() {
  const user = auth.currentUser;
  if (!user) return;

  db.collection("users").doc(user.uid).set({
    fullname: fullname.value,
    phone: phone.value,
    company: company.value,
    city: city.value,
    email: user.email,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Saqlandi ✅");
  });
}
