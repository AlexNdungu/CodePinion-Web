//Collecting The Directory to be connected to Code Pinion

//select the  message
let success_popup = document.getElementById('success_popup');
let not_selected = document.getElementById('not_selected');
//
let pop_error_auth_ssh = document.getElementById('pop_error_auth_ssh');
let pop_error_auth_ssh_message = document.getElementById('pop_error_auth_ssh_message');


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
let edit_port = document.getElementById('edit_default_port');
let check_edit_input = document.getElementById('engage_port_editor');
let show_default_port = document.getElementById('show_default_port');
//let port_input_edit = document.getElementById('engage_port_editor');
//
let ssh_login_loader_spin = document.getElementById('loader_ssh_log');
let login_ssh_span = document.querySelector('#post_ssh_credentials span');
let login_ssh_svg = document.querySelector('#post_ssh_credentials svg');
//
let host_name = document.getElementById('host_name');
let port_number = document.getElementById('port_number');
let user_name = document.getElementById('user_name');
let password = document.getElementById('password');

//Check if the ssh credential inputs are empty
//
let log_ssh_input_icons = document.querySelectorAll('.log_ssh_input_icon');
let log_ssh_input_icon_inputs = document.querySelectorAll('.log_ssh_input_icon input:not([type=\"checkbox\"])');


//Get all the elements in the ssh filing system
let user_dir_indicate = document.getElementById('slash_user_view');
//let list_ssh_navigation = document.getElementById('select_ssh_directory_navigation');

//This will be used to uncheck the checked
let check_dir_section_for_unchecking = document.getElementById('check_choosen_directory_section');
//Current path dir 
let current_working_dir = document.getElementById('current_directory_ssh_dispayer');
//select the wimdows and linux icons
let windows_icon = document.getElementById('windows_icon');
let linux_icon = document.getElementById('linux_icon');
//Choosen dir
let choosen_dir_show = document.getElementById('the_selected_path_show');

//This fuction acts as the dir cd function
//Import the fuction enterSshDir from dir_navigation.js file
import { enterSshDir } from './dir_navigate.js';

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

//This fuction will activate or deactivate port number edit
edit_port.addEventListener('click', ()=> {

    //edit_default_active

    if(check_edit_input.checked == false){

        check_edit_input.checked = true; //Check the edit toggle checkbox
        edit_port.classList.add('edit_default_active'); //Button is blue since edit is on
        show_default_port.style.display = 'none'; //Edit active hence default show is hidden
        port_number.style.display = 'flex'; //Edit active hence input is shown
    }
    else{

        check_edit_input.checked = false; //uncheck the edit toggle checkbox
        edit_port.classList.remove('edit_default_active'); //Button is blue since edit is off
        show_default_port.style.display = 'flex'; //Edit inactive hence default show is shown
        port_number.style.display = 'none'; //Edit inactive hence input is hidden
        port_number.value = '22';
    }


})

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
                <div class="the_clickable_and_inner_dir">

                    <div class="clickable_ssh_directory">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>

                        <span class="clickable_directory_name" >${dir_list_members[oneDIR]}</span>

                        <div class="clickable_dir_spinner"></div>

                    </div>

                    <div class="inner_clicked_dir"> 

                        <div class="drop_inner_dir">

                            <div class="minor_dir_them_section">

                                <!--Subdirectories will appear here-->

                            </div>

                            <div class="close_enter_inner_dir_btns">

                                <div class="inner_dir_enter">

                                    <span>Enter</span>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
                                    
                                </div>

                                <div class="inner_dir_close">

                                    <span>Close</span>

                                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>

                                </div>

                            </div>

                        </div>
                        
                    </div>

                </div> 
                `

            //Append all the lists
            $("#select_ssh_directory_navigation").append(ssh_dir);

        }

    }

    // Get All the dir navigation buttons
    let all_dir_nav_btns = document.getElementsByClassName('clickable_ssh_directory');
    // Get all the spinner
    let all_dir_nav_btns_spinner = document.getElementsByClassName('clickable_dir_spinner');
    // Get all dir names
    let all_dir_names = document.getElementsByClassName('clickable_directory_name');
    // Get the login_user
    let login_user = document.getElementById('slash_user_view').innerHTML
    // Get the inner subdirectories
    let inner_subdirectories = document.getElementsByClassName('inner_clicked_dir');
    // Get the container holding all the inner subdirectories
    let inner_subdirectories_container = document.getElementsByClassName('minor_dir_them_section');

    //Use the imported function
    enterSshDir(all_dir_nav_btns,all_dir_nav_btns_spinner,all_dir_names,inner_subdirectories,inner_subdirectories_container,csrf,login_user);
}

//This fuction fill the check dir section with the dirs
function fill_checks_with_dirs(dir_list_members){

    $('#check_choosen_directory_section').empty();

    if(dir_list_members.length > 0){

        for(let oneDIR = 0; oneDIR < dir_list_members.length; oneDIR++){

            //This is the html of one dir in the navigation
            let ssh_dir = `
                    <!--The checked_choosen dir-->
                    <div class="ind_checked_and_choosen_dir ">

                        <!--The check dir section-->
                        <div class="check_dir_section">

                            <input type="checkbox" class="checkbox_for_this_dir" >

                            <!--The ckeck box-->
                            <div class="check_dir">

                                <svg class="svg_check_dir_tick" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.25 12.321 7.27 6.491c.143.127.321.19.499.19.206 0 .41-.084.559-.249l11.23-12.501c.129-.143.192-.321.192-.5 0-.419-.338-.75-.749-.75-.206 0-.411.084-.559.249l-10.731 11.945-6.711-5.994c-.144-.127-.322-.19-.5-.19-.417 0-.75.336-.75.749 0 .206.084.412.25.56" fill-rule="nonzero"/></svg>

                            </div>

                        </div>

                        <!--Folder dir icon-->
                        <div class="check_folder_ic">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>

                        </div>

                        <!--The checkable dir name-->
                        <div class="checkable_dir_name">

                            <span class="this_divs_dir_name" >${dir_list_members[oneDIR]}</span>

                        </div>

                    </div>
                `

            //Append all the lists
            $("#check_choosen_directory_section").append(ssh_dir);

        }

    }

    //Now give all the dirs click events
    let all_dirs_checks = document.getElementsByClassName('ind_checked_and_choosen_dir'); 
    let all_checks_for_dirs = document.getElementsByClassName('checkbox_for_this_dir');
    let svg_check_dir_ticks = document.getElementsByClassName('svg_check_dir_tick');
    let svg_check_containers = document.getElementsByClassName('check_dir');
    let individual_divs_names = document.getElementsByClassName('this_divs_dir_name');

    for(let num_dir = 0; num_dir < all_dirs_checks.length; num_dir++){

        all_dirs_checks[num_dir].addEventListener('click', ()=> {

            for(let num_check = 0; num_check < all_checks_for_dirs.length; num_check++){

                //Uncheck the checkbox
                all_checks_for_dirs[num_check].checked = false;
                //Hide the chech tick
                svg_check_dir_ticks[num_check].style.visibility = 'hidden';
                //Change border of check tick container
                svg_check_containers[num_check].classList.remove('svg_check_containers_hover');
                //Return background to original
                if(all_dirs_checks[num_check].classList.contains('ind_onchecked_and_choosen_dir')){
                    all_dirs_checks[num_check].classList.remove('ind_onchecked_and_choosen_dir');
                }

            }

            //Check the checkbox
            all_checks_for_dirs[num_dir].checked = true;
            //Display the tick
            svg_check_dir_ticks[num_dir].style.visibility = 'visible';
            //Change border of check tick container
            svg_check_containers[num_dir].classList.add('svg_check_containers_hover');
            //Change styling of checked dir
            all_dirs_checks[num_dir].classList.add('ind_onchecked_and_choosen_dir');
            //Change selected path
            choosen_dir_show.innerHTML = current_working_dir.innerHTML + "\\" + individual_divs_names[num_dir].innerHTML;

        });

    }


    //If the parent dir is clicked, uncheck the checked dir
    check_dir_section_for_unchecking.addEventListener('click', function(event){
        if (check_dir_section_for_unchecking !== event.target) return;
      
        for(let num_check = 0; num_check < all_checks_for_dirs.length; num_check++){

            //Uncheck the checkbox
            all_checks_for_dirs[num_check].checked = false;
            //Hide the chech tick
            svg_check_dir_ticks[num_check].style.visibility = 'hidden';
            //Change border of check tick container
            svg_check_containers[num_check].classList.remove('svg_check_containers_hover');
            //Return background to original
            if(all_dirs_checks[num_check].classList.contains('ind_onchecked_and_choosen_dir')){
                all_dirs_checks[num_check].classList.remove('ind_onchecked_and_choosen_dir');
            }

        }

        //Remove the selected dir
        choosen_dir_show.innerHTML = "";
      
    }, false);

}


//This click function logs the user to the server
login_ssh.addEventListener('click', ()=> {

    let ssh_inputs_empty = false;

    //Check if any input is empty and change ssh_inputs_empty to true
    for(let a = 0; a < log_ssh_input_icon_inputs.length;a++){

        log_ssh_input_icons[a].style.border = '1.5px solid #D9D9D9';

        if(log_ssh_input_icon_inputs[a].value == ''){

            log_ssh_input_icons[a].style.border = '2px solid #C53B3B';

            ssh_inputs_empty = true;

        }

    }

    //If no input is empty
    if(ssh_inputs_empty == false){

        //Call the function that affect the login popup
        login_popup_effects('none','none','flex')
            
        //Now we perform the ajax call

        //First we create form data
        let formData = new FormData();

        //Append the csrf token
        formData.append('csrfmiddlewaretoken', csrf[0].value);

        //Append hostname,username and password
        formData.append('host_name',host_name.value);
        formData.append('port_number',port_number.value);
        formData.append('user_name',user_name.value);
        formData.append('password',password.value);

        $.ajax({
            type:'POST',
            url:'/getPath/',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response){

                console.log(response.status)

                if(response.status == 'success'){

                    //On success

                    //Success popup
                    success_popup.style.display = 'flex';

                    setTimeout(function(){

                        success_popup.style.display = 'none';
                        
                    },2500);

                    
                    //Call the function that affect the login popup
                    login_popup_effects('flex','flex','none');

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

                    //Change the os icons
                    if (response.current_os == 'Windows'){

                        windows_icon.style.display = 'flex';

                    }
                    else if(response.current_os == 'Linux'){

                        linux_icon.style.display = 'flex';

                    }

                    //Now lets add the current path to the interface
                    const current_path_dir = response.current_dir_path;
                    current_working_dir.innerHTML = current_path_dir

                }
                else if(response.status == 'fail'){

                    //On success
                    //Call the function that affect the login popup
                    login_popup_effects('flex','flex','none')

                    //Success popup
                    pop_error_auth_ssh_message.innerHTML = 'Authentication Error. Try Other Credentials';
                    pop_error_auth_ssh.style.display = 'flex';

                    setTimeout(function(){

                        pop_error_auth_ssh.style.display = 'none';
                        
                    },2500);

                }

            },
            error: function(error){

                
            }

        });   

    }

})