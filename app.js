// --- Ganti ini dengan Firebase config milikmu ---
const firebaseConfig = {
   apiKey: "AIzaSyCt0e0bDAHtZeKc8voyHt64RZhBgQi6-uQ",
  authDomain: "kelasf-be7e9.firebaseapp.com",
  projectId: "kelasf-be7e9",
  storageBucket: "kelasf-be7e9.firebasestorage.app",
  messagingSenderId: "412551956117",
  appId: "1:412551956117:web:acdc18b11265314e92fd9c",
  measurementId: "G-ENS3CQ4685"
};
// --------------------------------------------

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- Register ---
async function register() {
  const username = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value.trim();

  if (!username || !email || !password) {
    alert('Lengkapi semua data!');
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await db.collection('users').doc(user.uid).set({
      username: username,
      email: email
    });

    alert('Daftar berhasil! Silakan login.');
    window.location.href = 'index.html';
  } catch (error) {
    alert(error.message);
  }
}

// --- Login ---
async function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!username || !password) {
    alert('Isi username dan password!');
    return;
  }

  try {
    // Cari email berdasarkan username
    const snapshot = await db.collection('users').where('username', '==', username).get();

    if (snapshot.empty) {
      alert('Username tidak ditemukan!');
      return;
    }

    const userData = snapshot.docs[0].data();
    const email = userData.email;

    // Login pakai email
    await auth.signInWithEmailAndPassword(email, password);

    window.location.href = 'profile.html';
  } catch (error) {
    alert(error.message);
  }
}

// --- Tampil username di profil ---
auth.onAuthStateChanged(async user => {
  if (user && document.getElementById('profile-username')) {
    const doc = await db.collection('users').doc(user.uid).get();
    document.getElementById('profile-username').textContent = doc.data().username;
  }
});

// --- Logout ---
function logout() {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  });
}