// Here, collected the signup inputs, then check if inputs are valid
// The required elements
let email_signup = document.getElementById('email_sign');
let pass1_signup = document.getElementById('pass1');
let pass2_signup = document.getElementById('pass2');
let pass_inputs = document.getElementsByClassName('pass_input_place');

// Get the CSRF token
let csrf = document.getElementsByName('csrfmiddlewaretoken');

// The sign in button
let create_user = document.getElementById('create_user');

// See paswords buttons
let view_passes = document.getElementsByClassName('view_pass');
//
let eye_pass_opens = document.getElementsByClassName('eye_pass_open');
let eye_pass_closes = document.getElementsByClassName('eye_pass_close');

// This input div will show password error
let password_errors_div = document.getElementById('password_errors_div');
let password_error_message = document.getElementById('password_error_message');
//
let password_errors_div1 = document.getElementById('password_errors_div1');
let password_error_message1 = document.getElementById('password_error_message1');
//
let email_errors_div = document.getElementById('email_errors_div');
let email_error_message = document.getElementById('email_error_message');

// The password border containers
let password_input_1 = document.getElementById('password_input_1');
let password_input_2 = document.getElementById('password_input_2');

// The spinner and the text
let spinner = document.getElementById('sign_spinner');
let sign_text = document.getElementById('sign_text');

// The signin popups
let user_exists_pop = document.getElementById('user_exists_pop');
let user_exists_pop_close = document.getElementById('user_exists_pop_close');
//
let user_creation_error_pop = document.getElementById('user_creation_error_pop');
let user_creation_error_pop_close = document.getElementById('user_creation_error_pop_close');

// Input containers
let email_container = document.getElementById('email_input');

// Valid Formats
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const lengthRegex = /.{8,}/; 
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const numberRegex = /\d/;
const specialRegex = /[^A-Za-z0-9]/;

//These two variables will keep track of if to create account or not
let email_valid = false;
let password_valid = false;


//Email Effects
//Check if email is valid
email_signup.addEventListener('focusout', ()=> {

    if(email_signup.value != ''){

        if(email_signup.value.match(mailformat)){

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
            email_valid = true;
    
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
            email_valid = false;
    
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
        email_valid = false;

    }

});

email_signup.addEventListener('focus', ()=> {

    if(email_container.classList.contains('invalid_input') || email_container.classList.contains('valid_input')){

        email_container.classList.remove('invalid_input');
        email_container.classList.remove('valid_input');

    }
});


//Password Effects
//See password
for(let a =0; a < view_passes.length; a++){

    view_passes[a].addEventListener('click', ()=> {

        //pass_inputs
        //Change password to input
        if(pass_inputs[a].getAttribute("type") == 'password'){

            pass_inputs[a].setAttribute('type', 'text');
            //Change eye
            eye_pass_opens[a].style.display = 'none';
            eye_pass_closes[a].style.display = 'flex';
            //Button background
            view_passes[a].classList.add('view_pass_active');

        }
        else{

            pass_inputs[a].setAttribute('type', 'password');
            //Change eye
            eye_pass_opens[a].style.display = 'flex';
            eye_pass_closes[a].style.display = 'none';
            //Button background
            view_passes[a].classList.remove('view_pass_active');

        }

    });

}


//Password comparison function
function compare_pass(){

    let pass_1 = pass1_signup.value
    let pass_2 = pass2_signup.value

    if(pass_1 != pass_2){

        //Extend the message div
        password_errors_div1.style.height = '40px';
        //Show message
        password_error_message1.innerHTML = "Passwords Dont Match !";
        password_error_message1.style.display = 'flex';

        //Change the border of password container
        if(password_input_2.classList.contains('valid_input')){

            password_input_2.classList.remove('valid_input');

        }

        password_input_2.classList.add('invalid_input');

        //password is not valid
        password_valid = false;

    }
    else{
        //Extend the message div
        password_errors_div1.style.height = '20px';
        //Show message
        password_error_message1.innerHTML = "";
        password_error_message1.style.display = 'none';

        //Change the border of password container
        if(password_input_2.classList.contains('invalid_input')){

            password_input_2.classList.remove('invalid_input');

        }

        password_input_2.classList.add('valid_input');

        //password is valid
        password_valid = true;

    }

};


function default_pass(password_errors_container,password_error_out,pass_input,pass_sign){

    //Reduce the message div
    password_errors_container.style.height = '20px';
    //Show message
    password_error_out.innerHTML = "";
    password_error_out.style.display = 'none';

    //Remove all changes from password 2
    if(pass_input.classList.contains('invalid_input') || pass_input.classList.contains('valid_input')){

        pass_input.classList.remove('invalid_input');
        pass_input.classList.remove('valid_input');

    }

    //Emplty input
    pass_sign.value = "";

    //password is invalid
    password_valid = false;

};

//Check Password strength
pass1_signup.addEventListener('focusout', ()=> {

    let pass_value = pass1_signup.value;

    //Remove focus event
    pass2_signup.removeEventListener("focusout", compare_pass);

    //default password 2
    default_pass(password_errors_div1,password_error_message1,password_input_2,pass2_signup);

    if(pass_value != ''){

        if(!lengthRegex.test(pass_value)){

            //Extend the message div
            password_errors_div.style.height = '40px';
            //Show message
            password_error_message.innerHTML = "Password Is Too Short !";
            password_error_message.style.display = 'flex';
            //Change the border of password container
            if(password_input_1.classList.contains('valid_input')){

                password_input_1.classList.remove('valid_input');

            }

            password_input_1.classList.add('invalid_input');

            //password is invalid
            password_valid = false;


        }
        else{

            if(!uppercaseRegex.test(pass_value) || !lowercaseRegex.test(pass_value) || !numberRegex.test(pass_value) || !specialRegex.test(pass_value)){

                //Extend the message div
                password_errors_div.style.height = '60px';
                //Show message
                password_error_message.innerHTML = "Require Atleast One (UpperCase, LowerCase, Number, Special Character)";
                password_error_message.style.display = 'flex';
                //Change the border of password container
                if(password_input_1.classList.contains('valid_input')){

                    password_input_1.classList.remove('valid_input');

                }

                password_input_1.classList.add('invalid_input');

                //password is invalid
                password_valid = false;


            }

            else{

                //Reduce the message div
                password_errors_div.style.height = '20px';
                //Show message
                password_error_message.innerHTML = "";
                password_error_message.style.display = 'none';
                //Change the border of password container
                if(password_input_1.classList.contains('invalid_input')){

                    password_input_1.classList.remove('invalid_input');

                }

                password_input_1.classList.add('valid_input');


                //Call the password comparison
                pass2_signup.addEventListener("focusout", compare_pass);


            }

        }

    }
    else{

        if(password_input_1.classList.contains('invalid_input') || password_input_1.classList.contains('valid_input')){

            password_input_1.classList.remove('invalid_input');
            password_input_1.classList.remove('valid_input');
    
        }

        //Default password 1
        default_pass(password_errors_div,password_error_message,password_input_1,pass1_signup);

    }
    

});


//This event listiner closes the user_exists_pop
user_exists_pop_close.addEventListener('click', ()=> {

     //Show the error message
     user_exists_pop.style.display = 'none';

     //Error on email
     email_container.classList.remove('invalid_input');

});

//This event listiner closes the user_creation_error_pop
user_creation_error_pop_close.addEventListener('click', ()=> {

    //Show the error message
    user_creation_error_pop.style.display = 'none';

});


//This fuction creates new user
function create_new_user(){

    // Disable the button
    create_user.style.pointerEvents = 'none';

    // Show the spinner
    spinner.style.display = 'flex';
    sign_text.style.display = 'none';

    //First we create form data
    let formData = new FormData();

    //Append the csrf token
    formData.append('csrfmiddlewaretoken', csrf[0].value);

    //Append hostname,username and password
    formData.append('email',email_signup.value);
    formData.append('password',pass1_signup.value);

    $.ajax({
        type:'POST',
        url:'/createNewUser/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            // If The user exists
           if(response.status == 'exists'){

                // Enable the button
                create_user.style.pointerEvents = 'auto';

                // Hide the spinner
                spinner.style.display = 'none';
                sign_text.style.display = 'flex';

                // Show the error message
                user_exists_pop.style.display = 'flex';

                // Error on email
                email_container.classList.remove('valid_input');
                email_container.classList.add('invalid_input');

                // Default email and passwords
                // Default password 1
                default_pass(password_errors_div,password_error_message,password_input_1,pass1_signup);
                // default password 2
                default_pass(password_errors_div1,password_error_message1,password_input_2,pass2_signup);

           }
            else if(response.status == 'created'){

                // Redirect to the dashboard
                window.location.href = "/dash";

            }
           
        },
        error: function(error){

            // Enable the button
            create_user.style.pointerEvents = 'auto';

            // Hide the spinner
            spinner.style.display = 'none';
            sign_text.style.display = 'flex';

            //Show the error message
            user_creation_error_pop.style.display = 'flex';

            //Error on email
            email_container.classList.remove('valid_input');

            //Default email and passwords
            //Default password 1
            default_pass(password_errors_div,password_error_message,password_input_1,pass1_signup);
            //default password 2
            default_pass(password_errors_div1,password_error_message1,password_input_2,pass2_signup);
            
        }
    });    

}


//When create button is clicked
create_user.addEventListener('click', ()=> {


    if(email_valid == true && password_valid == true){

        //Call the create user function
        create_new_user();

    }

});

