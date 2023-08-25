// Get the CSRF token
let csrf1 = document.getElementsByName('csrfmiddlewaretoken');

// Importing the functions from path.js
import { fill_nav_with_dirs } from './path.js';
import { fill_checks_with_dirs } from './path.js';

// Import ssh_dir_info and host_and_home_dir
import { past_directories } from './path.js';
import { host_and_home_dir } from './path.js';

// Helper fuctions below

// This function is used to display sub directories
function viewSubDirs(index_value,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty,intended_dir_path,sub_dir_list){

    // The popup messages
    let empty_folder_popup = document.getElementById('information_popup');

    let success_folder_popup = document.getElementById('success_popup');
    let success_folder_popup_message = document.getElementById('pop_success_auth_ssh_message');

    let back_btn = document.getElementById('back_dir_btn');

    // Take the current path
    let current_dir_path = document.getElementById('current_directory_ssh_dispayer');
    let select_h3_show = document.getElementById('h3_show_after_dir_change');

    // Show the sub directories section
    inner_subdirectories[index_value].style.display = 'flex';

    $(inner_subdirectories_container[index_value]).empty();

    // Check if sub_dir_list is empty
    if(sub_dir_list.length == 0){

        // Show the sub directories section
        clickable_folder_is_empty[index_value].style.display = 'flex';

        empty_folder_popup.style.display = 'flex';

        setTimeout(() => {
            empty_folder_popup.style.display = 'none';
        }, 5000);

    }
    else{

        success_folder_popup.style.display = 'flex';
        success_folder_popup_message.innerHTML = 'Successfully Retrieved The Directory !';

        setTimeout(() => {
            success_folder_popup.style.display = 'none';
        }, 5000);

        for(let oneDIR = 0; oneDIR < sub_dir_list.length; oneDIR++){

            // This is the html structure of the sub directories
            let sub_drectory = `
                <div class="minor_dir">

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>

                    <span>${sub_dir_list[oneDIR]}</span>
                    

                </div>
                `

            // Append all the lists
            $(inner_subdirectories_container[index_value]).append(sub_drectory);

        }

        // Get all enter into directory buttons
        let enter_into_directory_btns = document.getElementsByClassName('inner_dir_enter');

        for(let enter = 0; enter < enter_into_directory_btns.length; enter++){

            enter_into_directory_btns[enter].addEventListener('click', ()=> {

                // Entry message
                success_folder_popup.style.display = 'flex';
                success_folder_popup_message.innerHTML = 'Successfully Entered The Directory !';

                setTimeout(() => {
                    success_folder_popup.style.display = 'none';
                }, 5000);

                // Call the import function
                fill_nav_with_dirs(intended_dir_path,sub_dir_list);
                fill_checks_with_dirs(sub_dir_list);

                // Update the path
                current_dir_path.innerHTML = intended_dir_path;

                // Show the back button
                back_btn.style.display = 'flex';
                // Hide the select h3
                select_h3_show.style.display = 'none';

            })

        }

    }

}


// This fuction is used to interact with the directory navigation buttons
export function interactWithCmd(all_dir_nav_btns,all_dir_nav_btns_spinner,all_dir_names,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty){
    
    // Get the login_user
    let login_user = document.getElementById('slash_user_view').innerHTML

    // Get the host name from login_user
    let host_name = login_user.split('@')[1];

    // Click event to the navigation buttons ssh
    for(let nav = 0; nav < all_dir_nav_btns.length; nav++ ){

        all_dir_nav_btns[nav].addEventListener('click', ()=> {

            //Show the spinner
            all_dir_nav_btns_spinner[nav].style.display = 'flex';

            let folder_index = nav;

            // The current ssh dir
            let current_dir_path = document.getElementById('current_directory_ssh_dispayer').innerHTML;

            let intended_dir_path = current_dir_path + "\\" + all_dir_names[nav].innerHTML;

            // Get the home directory
            // let parent_dir = host_and_home_dir.get(host_name);

            // Check if directory has been accessed earlier
            let the_past_dirs = past_directories.get(host_name);

            let object = the_past_dirs.find(function (obj) {
                return obj.directoryPath === intended_dir_path;
            });


            // Check if the object exists
            if (object) {

                all_dir_nav_btns_spinner[nav].style.display = 'none';

                // Call the function to display the sub directories
                viewSubDirs(folder_index,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty,intended_dir_path,object.subdirectories);

            }

            else{

                // First we create form data
                let formData = new FormData();

                formData.append('csrfmiddlewaretoken', csrf1[0].value);
                formData.append('intended_path',intended_dir_path);
                formData.append('host_name',host_name);

                $.ajax({
                    type:'POST',
                    url:'/cdDir/',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response){

                        // On success

                        // Add the directory to the past directories
                        past_directories.get(host_name).push({
                            subdirectories: response.sub_dirs,
                            directoryPath: intended_dir_path
                        });

                        all_dir_nav_btns_spinner[nav].style.display = 'none';

                        // Call the function to display the sub directories
                        viewSubDirs(folder_index,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty,intended_dir_path,response.sub_dirs);

                    },
                    error: function(error){

                        
                    }
                });    

            }
            
        });

    };

}


// This function takes you back to the previous directory
export function backToPrevDir(current_dir_path){

    let back_btn = document.getElementById('back_dir_btn');
    let select_h3_show = document.getElementById('h3_show_after_dir_change');

    // Get the login_user
    let login_user = document.getElementById('slash_user_view').innerHTML
    // Get the host name 
    let host_name = login_user.split('@')[1];

    // Get the home directory
    let parent_dir = host_and_home_dir.get(host_name);

    // Check if the current dir is the root dir
    if(current_dir_path == parent_dir){

        // Show h3 tag
        select_h3_show.style.display = 'flex';

        // Hide the back button
        back_btn.style.display = 'none';

    }
    else{

        // Hide h3 tag
        select_h3_show.style.display = 'none';
        // Show the back button
        back_btn.style.display = 'flex';

        // Get the previous directory path
        let remove_current_dir = current_dir_path.lastIndexOf("\\");
        let previous_directory_path = current_dir_path.slice(0, remove_current_dir);


        let the_past_dirs = past_directories.get(host_name);

        let object = the_past_dirs.find(function (obj) {
            return obj.directoryPath === previous_directory_path;
        });


        // Click event to the back button
        back_btn.addEventListener('click', ()=> {

            if (object) {

                // Call the import function
                fill_nav_with_dirs(previous_directory_path,object.subdirectories);
                fill_checks_with_dirs(object.subdirectories);
    
                // Update the path
                document.getElementById('current_directory_ssh_dispayer').innerHTML = previous_directory_path;
                
            }

            else{

                // First we create form data
                let formData = new FormData();

                formData.append('csrfmiddlewaretoken', csrf1[0].value);
                formData.append('intended_path',previous_directory_path);
                formData.append('host_name',host_name);

                $.ajax({
                    type:'POST',
                    url:'/cdDir/',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response){

                        // On success

                        // Call the import function
                        fill_nav_with_dirs(previous_directory_path,response.sub_dirs);
                        fill_checks_with_dirs(response.sub_dirs);

                        // Update the path
                        document.getElementById('current_directory_ssh_dispayer').innerHTML = previous_directory_path;

                    },
                    error: function(error){

                        
                    }
                });

            }

        });    

    }


}