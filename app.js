// Auth state listener
auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    console.log('Logged in:', userData);

    // Example: Redirect if logged in
    if (window.location.pathname.endsWith('index.html') || window.location.pathname == '/') {
      window.location.href = "profile.html";
    }

  } else {
    console.log('No user logged in');

    if (window.location.pathname.endsWith('profile.html')) {
      window.location.href = "index.html";
    }
  }
});

// Register
async function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;

  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    await result.user.updateProfile({ displayName: name });
    alert('Registrasi berhasil! Silahkan login.');
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
}

// Login
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = "profile.html";
  } catch (error) {
    alert(error.message);
  }
}

// Logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

// Reset Password
function resetPassword() {
  const email = document.getElementById('email').value;
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert('Link reset password sudah dikirim ke email kamu.');
    })
    .catch(error => {
      alert(error.message);
    });
}

// Update Profile Name
async function updateProfile() {
  const name = document.getElementById('displayName').value;
  const user = auth.currentUser;

  try {
    await user.updateProfile({ displayName: name });
    alert('Nama berhasil diupdate!');
    location.reload();
  } catch (error) {
    alert(error.message);
  }
}
