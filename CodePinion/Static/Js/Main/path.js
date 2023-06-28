//Collecting The Directory to be connected to Code Pinion

//select the  message
let success_popup = document.getElementById('success_popup');
let not_selected = document.getElementById('not_selected');
let pop_error = document.getElementById('pop_error');


//The collect path button
let collect_path_btn = document.getElementById('select-path-btn-connect');
let paste_path = document.getElementById('selected-path');

//get the post ssh credentials
let login_ssh = document.getElementById('post_ssh_credentials'); 
//
let host_name = document.getElementById('host_name');
let user_name = document.getElementById('user_name');
let password = document.getElementById('password');


//Get the CSRF token
let csrf = document.getElementsByName('csrfmiddlewaretoken');

//Add click to ssh post credentials

login_ssh.addEventListener('click', ()=> {
    

    console.log(csrf)

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


        },
        error: function(error){

            
        }
    });    
})