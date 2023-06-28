//Collecting The Directory to be connected to Code Pinion

//select the  message
let success_popup = document.getElementById('success_popup');
let not_selected = document.getElementById('not_selected');
let pop_error = document.getElementById('pop_error');


//Call the login for and file system
let ssh_login_form = document.getElementById('ssh_login_popup');
let ssh_file_system = document.getElementById('choose_path_ssh_section');


//The collect path button
let launch_ssh_login_form = document.getElementById('select-path-btn-connect');
let close_ssh_login_form = document.getElementById('close_ssh_form');
//
let paste_path = document.getElementById('selected-path');


//get the post ssh credentials
let login_ssh = document.getElementById('post_ssh_credentials'); 
//
let host_name = document.getElementById('host_name');
let user_name = document.getElementById('user_name');
let password = document.getElementById('password');


//Get the CSRF token
let csrf = document.getElementsByName('csrfmiddlewaretoken');

//This click fuctions display and hide the login form
launch_ssh_login_form.addEventListener('click', ()=> {

    //Display the login ssh form
    ssh_login_form.style.display = 'flex';

});

close_ssh_login_form.addEventListener('click', ()=> {

    //Display the login ssh form
    ssh_login_form.style.display = 'none';

});



//This click function logs the user to the server
login_ssh.addEventListener('click', ()=> {
    
    //Now we perform the ajax call

    //First we create form data
    let formData = new FormData();

    //Append the csrf token
    formData.append('csrfmiddlewaretoken', csrf[0].value);

    //Appen hostname,username and password
    formData.append('host_name',host_name.value);
    formData.append('user_name',user_name.value);
    formData.append('password',password.value);

    $.ajax({
        type:'POST',
        url:'/getPath/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            console.log(response)

        },
        error: function(error){

            
        }
    });    
})