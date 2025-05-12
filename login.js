const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const forgotPassword = document.getElementById("forgotPassword");
const backToLogin = document.getElementById("backToLogin");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
  container.classList.remove("reset-active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
  container.classList.remove("reset-active");
});

forgotPassword.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("reset-active");
});

backToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("reset-active");
});
// Simple validation function (replace with real authentication)
function validateCredentials(email, password) {
  // Very basic validation - replace with actual authentication logic
  return email.includes('@') && password.length >= 6;
}

document.getElementById('signInForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = this.querySelector('input[type="email"]').value;
  const password = this.querySelector('input[type="password"]').value;
  
  if (validateCredentials(email, password)) {
      // Store login state (simple version)
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to dashboard
      window.location.href = 'dashboard_pengguna.html';
  } else {
      alert('Please enter a valid email and password (min 6 characters)');
  }
});