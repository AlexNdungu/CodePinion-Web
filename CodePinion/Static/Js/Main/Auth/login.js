// Here i will have the login logic
// Get the Email and Password
let email = document.getElementById("log_email");
let password = document.getElementById("log_password");

// View password
let viewPassword = document.getElementById("viewPassword");
let eye_pass_opens = document.getElementById("eye_pass_open");
let eye_pass_closes = document.getElementById("eye_pass_close");

viewPassword.addEventListener("click", () => {
    if (password.type === "password") {

        password.type = "text";

        //Change eye
        eye_pass_opens.style.display = 'none';
        eye_pass_closes.style.display = 'flex';
        //Button background
        viewPassword.classList.add('view_pass_active');

    } else {

        password.type = "password";

        //Change eye
        eye_pass_opens.style.display = 'flex';
        eye_pass_closes.style.display = 'none';
        //Button background
        viewPassword.classList.remove('view_pass_active');
    }
});