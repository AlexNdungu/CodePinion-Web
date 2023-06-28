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
let ssh_login_loader_spin = document.getElementById('loader_ssh_log');
let login_ssh_span = document.querySelector('#post_ssh_credentials span')
let login_ssh_svg = document.querySelector('#post_ssh_credentials svg')
//
let host_name = document.getElementById('host_name');
let user_name = document.getElementById('user_name');
let password = document.getElementById('password');


//Get all the elements in the ssh filing system
let user_dir_indicate = document.getElementById('slash_user_view');
let list_ssh_navigation = document.getElementById('select_ssh_directory_navigation');
let check_dir_section = document.getElementById('check_choosen_directory_section');


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



//Helper fuctions

//This fuction either displays or hides the elements in the login form popup
function login_popup_effects(span,svg,loader) {

    //Here we remove the writings in the button and add a spinner
    login_ssh_span.style.display = span;
    login_ssh_svg.style.display = svg;
    ssh_login_loader_spin.style.display = loader;

}

//This function will fill the ssh navigation with dirs
function fill_nav_with_dirs(dir_list_members){

    $('#select_ssh_directory_navigation').empty();

    if(dir_list_members.length > 0){

        for(let oneDIR = 0; oneDIR < dir_list_members.length; oneDIR++){

            //This is the html of one dir in the navigation
            let ssh_dir = `
                <!--The clickable and inner directories-->
                <div class="the_clickable_and_inner_dir">

                    <!--Individual clickable directory-->
                    <div class="clickable_ssh_directory">

                        <!--clickable directory content-->
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>

                        <span class="clickable_directory_name" >${dir_list_members[oneDIR]}</span>

                    </div>

                    <!--inner clicked dir-->
                    <div class="inner_clicked_dir">
                        <!--Here will be the inner dirs when this dir is clicked-->
                    </div>

                </div>
                `

            //Append all the lists
            $("#select_ssh_directory_navigation").append(ssh_dir);

        }

    }

}

//This fuction fill the check dir section with the dirs
function fill_checks_with_dirs(dir_list_members){

    $('#check_choosen_directory_section').empty();

    if(dir_list_members.length > 0){

        for(let oneDIR = 0; oneDIR < dir_list_members.length; oneDIR++){

            //This is the html of one dir in the navigation
            let ssh_dir = `
                    <!--The checked_choosen dir-->
                    <div class="ind_checked_and_choosen_dir">

                        <!--The check dir section-->
                        <div class="check_dir_section">

                            <!--The ckeck box-->
                            <div class="check_dir">

                                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.25 12.321 7.27 6.491c.143.127.321.19.499.19.206 0 .41-.084.559-.249l11.23-12.501c.129-.143.192-.321.192-.5 0-.419-.338-.75-.749-.75-.206 0-.411.084-.559.249l-10.731 11.945-6.711-5.994c-.144-.127-.322-.19-.5-.19-.417 0-.75.336-.75.749 0 .206.084.412.25.56" fill-rule="nonzero"/></svg>

                            </div>

                        </div>

                        <!--Folder dir icon-->
                        <div class="check_folder_ic">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>

                        </div>

                        <!--The checkable dir name-->
                        <div class="checkable_dir_name">

                            <span>${dir_list_members[oneDIR]}</span>

                        </div>

                    </div>
                `

            //Append all the lists
            $("#check_choosen_directory_section").append(ssh_dir);

        }

    }

}


//This click function logs the user to the server
login_ssh.addEventListener('click', ()=> {

    //Call the function that affect the login popup
    login_popup_effects('none','none','flex')
    
    //Now we perform the ajax call

    //First we create form data
    let formData = new FormData();

    //Append the csrf token
    formData.append('csrfmiddlewaretoken', csrf[0].value);

    //Append hostname,username and password
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

            //On success

            //Success popup
            success_popup.style.visibility = 'visible';

            setTimeout(function(){

                success_popup.style.visibility = 'hidden';
                
            },2500);

            
            //Call the function that affect the login popup
            login_popup_effects('flex','flex','none')

            //Remove login popup
            ssh_login_form.style.display = 'none';
            //Show the ssh filing system
            ssh_file_system.style.display = 'flex';

            //Now we display the name as required
            user_dir_indicate.innerHTML = user_name.value + "@" + host_name.value;

            //Now we add all the directories to the navigation
            const dir_list_members = response.dir_list;
            //Call the fuction which adds the dirs to navs
            fill_nav_with_dirs(dir_list_members);

            //Now we add the checkable dirs
            fill_checks_with_dirs(dir_list_members)


            //change username
            console.log(dir_list_members)

        },
        error: function(error){

            
        }
    });    
})