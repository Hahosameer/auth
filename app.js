//  SIGNUP FUNCTION






function signin() {
    let username = document.getElementById("uname").value;
    let useremail = document.getElementById("uemail").value;
    let userpass = document.getElementById("upass").value;

    if (username === "" || useremail === "" || userpass === "") {
        alert("Please enter all fields!");
        return;
    }

    if (userpass.length < 6) {
        alert("Password is too short!");
        return;
    }

    //  Save user data in localStorage
    const user = { username, useremail, userpass };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup successful! You can now log in.");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("upass");
  const togglePassword = document.getElementById("togglePassword");

  togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text"; // password show
      togglePassword.textContent = "🙈"; // change icon
    } else {
      passwordInput.type = "password"; // password hide
      togglePassword.textContent = "👁️"; // back to eye
    }
  });
});



//  LOGIN FUNCTION
function login() {
    let useremail = document.getElementById("uemail").value;
    let userpass = document.getElementById("upass").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No user found! Please sign up first.");
        return;
    }

    //  Check credentials
    if (useremail === user.useremail && userpass === user.userpass) {
        localStorage.setItem("loggedInUser", user.username);
        alert("Login successful!");
        window.location.href = "index.html"; 
    } else {
        alert("Invalid email or password!");
    }
}


function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = "login.html";   
}
