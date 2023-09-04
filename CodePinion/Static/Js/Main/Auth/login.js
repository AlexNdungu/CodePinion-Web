// Here i will have the login logic
// Get the Email and Password
let email = document.getElementById("log_email");
let password = document.getElementById("log_password");
let login_button = document.getElementById("login_button");

// Import the default_pass function
// For the sake of the function
let password_valid = false;

// Get the CSRF token
let csrf = document.getElementsByName('csrfmiddlewaretoken');

// Get spinner and sign_text
let spinner = document.getElementById("sign_spinner");
let sign_text = document.getElementById("sign_text");
let log_message = document.getElementById("log_message");

// View password
let viewPassword = document.getElementById("viewPassword");
let eye_pass_opens = document.getElementById("eye_pass_open");
let eye_pass_closes = document.getElementById("eye_pass_close");
let password_input = document.getElementById('password_input');

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


// Click event to login user
login_button.addEventListener('click', ()=>{

    // Check if the email is empty and valid and also check if password is empty
    if(email.value != '' && email.value.match(mailformat) && password.value != ''){

        // Send data to server

        // Disable the button
        login_button.style.pointerEvents = 'none';

        // Show the spinner
        spinner.style.display = 'flex';
        sign_text.style.display = 'none';

        //First we create form data
        let formData = new FormData();

        //Append the csrf token
        formData.append('csrfmiddlewaretoken', csrf[0].value);

        //Append hostname,username and password
        formData.append('email',email.value);
        formData.append('password',password.value);

        $.ajax({
            type:'POST',
            url:'/signinUser/',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response){

                // If The user doesnt exists
                if(response.status == 'not_found'){

                    // Enable the button
                    login_button.style.pointerEvents = 'auto';

                    // Hide the spinner
                    spinner.style.display = 'none';
                    sign_text.style.display = 'flex';

                    // Show the error message
                    user_exists_pop.style.display = 'flex';
                    // Show the error message
                    log_message.innerHTML = "User Not Found !";

                    // Error on email
                    email_container.classList.remove('valid_input');
                    email_container.classList.add('invalid_input');

                    // Redirection to the home page
                    setTimeout(()=>{

                        window.location.href = "/";

                    },2000);  

                }

                // If password is wrong
                else if(response.status == 'wrong_password'){

                    // Enable the button
                    login_button.style.pointerEvents = 'auto';

                    // Hide the spinner
                    spinner.style.display = 'none';
                    sign_text.style.display = 'flex';

                    // Show the error message
                    user_exists_pop.style.display = 'flex';
                    // Show the error message
                    log_message.innerHTML = "Incorrect Password !";

                    // Error on email
                    email_container.classList.remove('valid_input');

                    // Highlight password
                    password_input.classList.add('invalid_input');

                }
                
                else if(response.status == 'found'){

                    // Redirect to the dashboard
                    window.location.href = "/dash";

                }
            
            },
            error: function(error){

                // Enable the button
                login_button.style.pointerEvents = 'auto';

                // Hide the spinner
                spinner.style.display = 'none';
                sign_text.style.display = 'flex';

                //Show the error message
                user_creation_error_pop.style.display = 'flex';
                // Show the error message
                log_message.innerHTML = "Fatal Error. Try Again !";
                
                
            }
        }); 

    }

});