let email = document.getElementById("log_email");
let password = document.getElementById("log_password");
let login_button = document.getElementById("login_button");
let password_valid = false;
let csrf = document.getElementsByName('csrfmiddlewaretoken');
let spinner = document.getElementById("sign_spinner");
let sign_text = document.getElementById("sign_text");
let log_message = document.getElementById("log_message");
let viewPassword = document.getElementById("viewPassword");
let eye_pass_opens = document.getElementById("eye_pass_open");
let eye_pass_closes = document.getElementById("eye_pass_close");
let password_input = document.getElementById('password_input');
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let email_container = document.getElementById("email_container");
let email_errors_div = document.getElementById('email_errors_div');
let email_error_message = document.getElementById('email_error_message');
email.addEventListener('focusout', ()=> {
    if(email.value != ''){
        if(email.value.match(mailformat)){
            email_errors_div.style.height = '20px';
            email_error_message.innerHTML = "";
            email_error_message.style.display = 'none';
            if(email_container.classList.contains('invalid_input')){
                email_container.classList.remove('invalid_input');
            }
            email_container.classList.add('valid_input');
        }
        else{
            email_errors_div.style.height = '40px';
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
        email_errors_div.style.height = '20px';
        email_error_message.innerHTML = "";
        email_error_message.style.display = 'none';
    }
});
viewPassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        eye_pass_opens.style.display = 'none';
        eye_pass_closes.style.display = 'flex';
        viewPassword.classList.add('view_pass_active');
    } else {
        password.type = "password";
        eye_pass_opens.style.display = 'flex';
        eye_pass_closes.style.display = 'none';
        viewPassword.classList.remove('view_pass_active');
    }
});
login_button.addEventListener('click', ()=>{
    if(email.value != '' && email.value.match(mailformat) && password.value != ''){
        login_button.style.pointerEvents = 'none';
        spinner.style.display = 'flex';
        sign_text.style.display = 'none';
        let formData = new FormData();
        formData.append('csrfmiddlewaretoken', csrf[0].value);
        formData.append('email',email.value);
        formData.append('password',password.value);
        $.ajax({
            type:'POST',
            url:'/signinUser/',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response){
                if(response.status == 'not_found'){
                    login_button.style.pointerEvents = 'auto';
                    spinner.style.display = 'none';
                    sign_text.style.display = 'flex';
                    user_exists_pop.style.display = 'flex';
                    log_message.innerHTML = "User Not Found !";
                    email_container.classList.remove('valid_input');
                    email_container.classList.add('invalid_input');
                    setTimeout(()=>{
                        window.location.href = "/";
                    },2000);  
                }
                else if(response.status == 'wrong_password'){
                    login_button.style.pointerEvents = 'auto';
                    spinner.style.display = 'none';
                    sign_text.style.display = 'flex';
                    user_exists_pop.style.display = 'flex';
                    log_message.innerHTML = "Incorrect Password !";
                    email_container.classList.remove('valid_input');
                    password_input.classList.add('invalid_input');
                }
                else if(response.status == 'found'){
                    window.location.href = "/dash";
                }
            },
            error: function(error){
                login_button.style.pointerEvents = 'auto';
                spinner.style.display = 'none';
                sign_text.style.display = 'flex';
                user_creation_error_pop.style.display = 'flex';
                log_message.innerHTML = "Fatal Error. Try Again !";
            }
        }); 
    }
});