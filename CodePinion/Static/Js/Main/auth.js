//Here, collected the signup inputs, then check if inputs are valid
//The required elements
let email_signup = document.getElementById('email_sign');
let pass1_signup = document.getElementById('pass1');
let pass2_signup = document.getElementById('pass2');

//See paswords buttons
let see_pass1 = document.getElementById('see_pass1');
let see_pass2 = document.getElementById('see_pass2');

//Input containers
let email_container = document.getElementById('email_input');

//Valid Formats
let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


//Email Effects
//Check if email is valid
email_signup.addEventListener('focusout', ()=> {

    if(email_signup.value != ''){

        if(email_signup.value.match(mailformat)){

            if(email_container.classList.contains('invalid_input')){

                email_container.classList.remove('invalid_input');

            }

            email_container.classList.add('valid_input');
    
        }
        else{

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
see_pass1.addEventListener('click', ()=> {

    //Change password to input
    if(pass1_signup.getAttribute("type") == 'password'){

        pass1_signup.setAttribute('type', 'text');

    }
    else{

        pass1_signup.setAttribute('type', 'password');

    }

})

//Check Password strength