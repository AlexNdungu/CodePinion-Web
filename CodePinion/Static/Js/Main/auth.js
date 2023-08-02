//Here, collected the signup inputs, then check if inputs are valid
//The required elements
let email_signup = document.getElementById('email_sign');
let pass1_signup = document.getElementById('pass1');
let pass2_signup = document.getElementById('pass2');
let pass_inputs = document.getElementsByClassName('pass_input_place')

//See paswords buttons
let view_passes = document.getElementsByClassName('view_pass');
//
let eye_pass_opens = document.getElementsByClassName('eye_pass_open');
let eye_pass_closes = document.getElementsByClassName('eye_pass_close');

//This input div will show password error
let password_errors_div = document.getElementById('password_errors_div');
let password_error_message = document.getElementById('password_error_message');
//
let password_errors_div1 = document.getElementById('password_errors_div1');
let password_error_message1 = document.getElementById('password_error_message1');
//
let email_errors_div = document.getElementById('email_errors_div');
let email_error_message = document.getElementById('email_error_message');

//The password border containers
let password_input_1 = document.getElementById('password_input_1');
let password_input_2 = document.getElementById('password_input_2')


//Input containers
let email_container = document.getElementById('email_input');

//Valid Formats
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const lengthRegex = /.{8,}/; 
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const numberRegex = /\d/;
const specialRegex = /[^A-Za-z0-9]/;


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

        pass_inputs
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

    })

}


//Password comparison function
function compare_pass(pass_1, pass_2){

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

    }

}


//Check Password strength
pass1_signup.addEventListener('focusout', ()=> {

    let pass_value = pass1_signup.value

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
                pass2_signup.addEventListener('focusout', ()=> {

                    let pass_value2 = pass2_signup.value

                    compare_pass(pass_value,pass_value2);

                });


            }

        }

    }
    else{

        if(password_input_1.classList.contains('invalid_input') || password_input_1.classList.contains('valid_input')){

            password_input_1.classList.remove('invalid_input');
            password_input_1.classList.remove('valid_input');
    
        }

        //Reduce the message div
        password_errors_div.style.height = '20px';
        //Show message
        password_error_message.innerHTML = "";
        password_error_message.style.display = 'none';

        //Remove all changes from password 2
        if(password_input_2.classList.contains('invalid_input') || password_input_2.classList.contains('valid_input')){

            password_input_2.classList.remove('invalid_input');
            password_input_2.classList.remove('valid_input');

            //Emplty input
            pass2_signup.value = "";
    
        }

    }
    

});



