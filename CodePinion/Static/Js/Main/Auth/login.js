// Here i will have the login logic
// Get the Email and Password
let email = document.getElementById("log_email");
let password = document.getElementById("log_password");

// View password
let viewPassword = document.getElementById("viewPassword");
let eye_pass_opens = document.getElementById("eye_pass_open");
let eye_pass_closes = document.getElementById("eye_pass_close");

// Email regex
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Validate the email
let email_container = document.getElementById("email_container");
let email_errors_div = document.getElementById('email_errors_div');
let email_error_message = document.getElementById('email_error_message');

// focusout event that checks if the email is valid



email.addEventListener('focusout', ()=> {

    if(email.value != ''){

        if(email.value.match(mailformat)){

            //Extend the message div
            email_errors_div.style.height = '20px';
            //Show message
            email_error_message.innerHTML = "";
            email_error_message.style.display = 'none';

            if(email_container.classList.contains('invalid_input')){

                email_container.classList.remove('invalid_input');

            }

            email_container.classList.add('valid_input');

            //Email is valid
            //email_valid = true;
    
        }
        else{

            //Extend the message div
            email_errors_div.style.height = '40px';
            //Show message
            email_error_message.innerHTML = "Email Is Invalid !";
            email_error_message.style.display = 'flex';


            if(email_container.classList.contains('valid_input')){

                email_container.classList.remove('valid_input');

            }
    
            email_container.classList.add('invalid_input');

            //Email is not valid
            //email_valid = false;
    
        }

    }
    else{

        if(email_container.classList.contains('invalid_input') || email_container.classList.contains('valid_input')){

            email_container.classList.remove('invalid_input');
            email_container.classList.remove('valid_input');

        }

        //Extend the message div
        email_errors_div.style.height = '20px';
        //Show message
        email_error_message.innerHTML = "";
        email_error_message.style.display = 'none';

        //Email is not valid
        //email_valid = false;

    }

});


// View password
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