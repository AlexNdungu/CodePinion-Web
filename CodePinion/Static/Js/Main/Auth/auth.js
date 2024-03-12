let email_signup = document.getElementById('email_sign');
let pass1_signup = document.getElementById('pass1');
let pass2_signup = document.getElementById('pass2');
let pass_inputs = document.getElementsByClassName('pass_input_place');
let csrf = document.getElementsByName('csrfmiddlewaretoken');
let create_user = document.getElementById('create_user');
let view_passes = document.getElementsByClassName('view_pass');
let eye_pass_opens = document.getElementsByClassName('eye_pass_open');
let eye_pass_closes = document.getElementsByClassName('eye_pass_close');
let password_errors_div = document.getElementById('password_errors_div');
let password_error_message = document.getElementById('password_error_message');
let password_errors_div1 = document.getElementById('password_errors_div1');
let password_error_message1 = document.getElementById('password_error_message1');
let email_errors_div = document.getElementById('email_errors_div');
let email_error_message = document.getElementById('email_error_message');
let password_input_1 = document.getElementById('password_input_1');
let password_input_2 = document.getElementById('password_input_2');
let spinner = document.getElementById('sign_spinner');
let sign_text = document.getElementById('sign_text');
let user_exists_pop = document.getElementById('user_exists_pop');
let user_exists_pop_close = document.getElementById('user_exists_pop_close');
let user_creation_error_pop = document.getElementById('user_creation_error_pop');
let user_creation_error_pop_close = document.getElementById('user_creation_error_pop_close');
let email_container = document.getElementById('email_input');
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const lengthRegex = /.{8,}/; 
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const numberRegex = /\d/;
const specialRegex = /[^A-Za-z0-9]/;
let email_valid = false;
let password_valid = false;
email_signup.addEventListener('focusout', ()=> {
    if(email_signup.value != ''){
        if(email_signup.value.match(mailformat)){
            email_errors_div.style.height = '20px';
            email_error_message.innerHTML = "";
            email_error_message.style.display = 'none';
            if(email_container.classList.contains('invalid_input')){
                email_container.classList.remove('invalid_input');
            }
            email_container.classList.add('valid_input');
            email_valid = true;
        }
        else{
            email_errors_div.style.height = '40px';
            email_error_message.innerHTML = "Email Is Invalid !";
            email_error_message.style.display = 'flex';
            if(email_container.classList.contains('valid_input')){
                email_container.classList.remove('valid_input');
            }
            email_container.classList.add('invalid_input');
            email_valid = false;
        }
    }
    else{
        if(email_container.classList.contains('invalid_input') || email_container.classList.contains('valid_input')){
            email_container.classList.remove('invalid_input');
            email_container.classList.remove('valid_input');
        }
        email_errors_div.style.height = '20px';
        email_error_message.innerHTML = "";
        email_error_message.style.display = 'none';
        email_valid = false;
    }
});
email_signup.addEventListener('focus', ()=> {
    if(email_container.classList.contains('invalid_input') || email_container.classList.contains('valid_input')){
        email_container.classList.remove('invalid_input');
        email_container.classList.remove('valid_input');
    }
});
for(let a =0; a < view_passes.length; a++){
    view_passes[a].addEventListener('click', ()=> {
        if(pass_inputs[a].getAttribute("type") == 'password'){
            pass_inputs[a].setAttribute('type', 'text');
            eye_pass_opens[a].style.display = 'none';
            eye_pass_closes[a].style.display = 'flex';
            view_passes[a].classList.add('view_pass_active');
        }
        else{
            pass_inputs[a].setAttribute('type', 'password');
            eye_pass_opens[a].style.display = 'flex';
            eye_pass_closes[a].style.display = 'none';
            view_passes[a].classList.remove('view_pass_active');
        }
    });
}
function compare_pass(){
    let pass_1 = pass1_signup.value
    let pass_2 = pass2_signup.value
    if(pass_1 != pass_2){
        password_errors_div1.style.height = '40px';
        password_error_message1.innerHTML = "Passwords Dont Match !";
        password_error_message1.style.display = 'flex';
        if(password_input_2.classList.contains('valid_input')){
            password_input_2.classList.remove('valid_input');
        }
        password_input_2.classList.add('invalid_input');
        password_valid = false;
    }
    else{
        password_errors_div1.style.height = '20px';
        password_error_message1.innerHTML = "";
        password_error_message1.style.display = 'none';
        if(password_input_2.classList.contains('invalid_input')){
            password_input_2.classList.remove('invalid_input');
        }
        password_input_2.classList.add('valid_input');
        password_valid = true;
    }
};
function default_pass(password_errors_container,password_error_out,pass_input,pass_sign){
    password_errors_container.style.height = '20px';
    password_error_out.innerHTML = "";
    password_error_out.style.display = 'none';
    if(pass_input.classList.contains('invalid_input') || pass_input.classList.contains('valid_input')){
        pass_input.classList.remove('invalid_input');
        pass_input.classList.remove('valid_input');
    }
    pass_sign.value = "";
    password_valid = false;
};
pass1_signup.addEventListener('focusout', ()=> {
    let pass_value = pass1_signup.value;
    pass2_signup.removeEventListener("focusout", compare_pass);
    default_pass(password_errors_div1,password_error_message1,password_input_2,pass2_signup);
    if(pass_value != ''){
        if(!lengthRegex.test(pass_value)){
            password_errors_div.style.height = '40px';
            password_error_message.innerHTML = "Password Is Too Short !";
            password_error_message.style.display = 'flex';
            if(password_input_1.classList.contains('valid_input')){
                password_input_1.classList.remove('valid_input');
            }
            password_input_1.classList.add('invalid_input');
            password_valid = false;
        }
        else{
            if(!uppercaseRegex.test(pass_value) || !lowercaseRegex.test(pass_value) || !numberRegex.test(pass_value) || !specialRegex.test(pass_value)){
                password_errors_div.style.height = '60px';
                password_error_message.innerHTML = "Require Atleast One (UpperCase, LowerCase, Number, Special Character)";
                password_error_message.style.display = 'flex';
                if(password_input_1.classList.contains('valid_input')){
                    password_input_1.classList.remove('valid_input');
                }
                password_input_1.classList.add('invalid_input');
                password_valid = false;
            }
            else{
                password_errors_div.style.height = '20px';
                password_error_message.innerHTML = "";
                password_error_message.style.display = 'none';
                if(password_input_1.classList.contains('invalid_input')){
                    password_input_1.classList.remove('invalid_input');
                }
                password_input_1.classList.add('valid_input');
                pass2_signup.addEventListener("focusout", compare_pass);
            }
        }
    }
    else{
        if(password_input_1.classList.contains('invalid_input') || password_input_1.classList.contains('valid_input')){
            password_input_1.classList.remove('invalid_input');
            password_input_1.classList.remove('valid_input');
        }
        default_pass(password_errors_div,password_error_message,password_input_1,pass1_signup);
    }
});
user_exists_pop_close.addEventListener('click', ()=> {
     user_exists_pop.style.display = 'none';
     email_container.classList.remove('invalid_input');
});
user_creation_error_pop_close.addEventListener('click', ()=> {
    user_creation_error_pop.style.display = 'none';
});
function create_new_user(){
    create_user.style.pointerEvents = 'none';
    spinner.style.display = 'flex';
    sign_text.style.display = 'none';
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('email',email_signup.value);
    formData.append('password',pass1_signup.value);
    $.ajax({
        type:'POST',
        url:'/createNewUser/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
           if(response.status == 'exists'){
                create_user.style.pointerEvents = 'auto';
                spinner.style.display = 'none';
                sign_text.style.display = 'flex';
                user_exists_pop.style.display = 'flex';
                email_container.classList.remove('valid_input');
                email_container.classList.add('invalid_input');
                default_pass(password_errors_div,password_error_message,password_input_1,pass1_signup);
                default_pass(password_errors_div1,password_error_message1,password_input_2,pass2_signup);
           }
            else if(response.status == 'created'){
                window.location.href = "/dash";
            }
        },
        error: function(error){
            create_user.style.pointerEvents = 'auto';
            spinner.style.display = 'none';
            sign_text.style.display = 'flex';
            user_creation_error_pop.style.display = 'flex';
            email_container.classList.remove('valid_input');
            default_pass(password_errors_div,password_error_message,password_input_1,pass1_signup);
            default_pass(password_errors_div1,password_error_message1,password_input_2,pass2_signup);
        }
    });    
}
create_user.addEventListener('click', ()=> {
    if(email_valid == true && password_valid == true){
        create_new_user();
    }
});
