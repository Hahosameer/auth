// ========== SIGNUP FUNCTION ==========
function signin() {
  let username = document.getElementById("uname").value.trim();
  let useremail = document.getElementById("uemail").value.trim();
  let userpass = document.getElementById("upass").value.trim();

  if (username === "" || useremail === "" || userpass === "") {
    alert("Please enter all fields!");
    return;
  }

  if (userpass.length < 6) {
    alert("Password must be at least 6 characters!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.some(u => u.useremail === useremail);

  if (userExists) {
    alert("User already exists! Please log in instead.");
    window.location.href = "login.html";
    return;
  }

  // Save new user
  const newUser = { username, useremail, userpass };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! You can now log in.");
  window.location.href = "login.html";
}



// ========== PASSWORD TOGGLE FUNCTION ==========
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("upass");
  const togglePassword = document.getElementById("togglePassword");

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser && window.location.pathname.includes("login.html")) {
    window.location.href = "index.html";
  }

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      togglePassword.classList.toggle("fa-eye");
      togglePassword.classList.toggle("fa-eye-slash");
    });
  }
});



// ========== LOGIN FUNCTION ==========
function login() {
  let useremail = document.getElementById("uemail").value.trim();
  let userpass = document.getElementById("upass").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user exists
  const user = users.find(u => u.useremail === useremail && u.userpass === userpass);

  if (!user) {
    alert("Invalid email or password!");
    return;
  }

  // Save login session
  localStorage.setItem("loggedInUser", user.username);

  alert("Login successful!");
  window.location.href = "index.html";
}



// ========== LOGOUT FUNCTION ==========
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}



// ========== AUTO REDIRECT PROTECTION ==========
document.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");

  // If user is logged in but tries to visit login/signup, redirect to home
  if (
    loggedInUser &&
    (window.location.pathname.includes("login.html") ||
      window.location.pathname.includes("signup.html"))
  ) {
    window.location.href = "index.html";
  }

  // If user is not logged in and tries to visit home, redirect to login
  if (
    !loggedInUser &&
    window.location.pathname.includes("index.html")
  ) {
    window.location.href = "login.html";
  }
});
