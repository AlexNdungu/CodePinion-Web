// Here i will have the login logic
// Get the Email and Password
let email = document.getElementById("log_email");
let password = document.getElementById("log_password");

// View password

let viewPassword = document.getElementById("viewPassword");

viewPassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
});