//Here, collected the signup inputs, then check if inputs are valid
//The required elements
let email_signup = document.getElementById('email_sign');
let pass1_signup = document.getElementById('pass1');
let pass2_signup = document.getElementById('pass2');

//Input containers
let email_container = document.getElementById('email_input');

//Valid Formats
let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


//Check if email is valid
email_signup.addEventListener('focusout', ()=> {

    if(email_signup.value != ''){

        if(email_signup.value.match(mailformat)){

            email_container.style.
    
        }
        else{
    
            console.log('no match')
    
        }

    }


});