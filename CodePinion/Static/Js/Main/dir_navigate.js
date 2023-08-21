// Importing the functions from path.js
import { fill_nav_with_dirs } from './path.js';
import { fill_checks_with_dirs } from './path.js';

// Helper fuctions below

// This function is used to display sub directories
function enterSubDir(index_value,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty,sub_dir_list){

    // The popup messages
    let empty_folder_popup = document.getElementById('information_popup');

    let success_folder_popup = document.getElementById('success_popup');
    let success_folder_popup_message = document.getElementById('pop_success_auth_ssh_message');

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

    }

}

// This function is used to enter the directory and work with its sub directories
function usedSubDir(enter_buttons,intended_dir_path,sub_dir_list){

    // The popup messages
    let empty_folder_popup = document.getElementById('information_popup');

    let success_folder_popup = document.getElementById('success_popup');
    let success_folder_popup_message = document.getElementById('pop_success_auth_ssh_message');

    // Take the current path
    let current_dir_path = document.getElementById('current_directory_ssh_dispayer');

    // Check if sub_dir_list is empty
    if(sub_dir_list.length == 0){

        // Show the sub directories section
        empty_folder_popup.style.display = 'flex';

        setTimeout(() => {
            empty_folder_popup.style.display = 'none';
        }, 5000);

    }
    else{

        // Show success message
        success_folder_popup.style.display = 'flex';
        success_folder_popup_message.innerHTML = 'Successfully Entered The Directory !';

        setTimeout(() => {
            success_folder_popup.style.display = 'none';
        }, 5000);


        for(let enter = 0; enter < enter_buttons.length; enter++){

            enter_buttons[enter].addEventListener('click', ()=> {

                // Call the import function
                fill_nav_with_dirs(sub_dir_list);
                fill_checks_with_dirs(sub_dir_list);

                // Update the path
                current_dir_path.innerHTML = intended_dir_path;

            })


        }       

    }

}

export function enterSshDir(all_dir_nav_btns,all_dir_nav_btns_spinner,all_dir_names,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty,enter_into_directory_btns,csrf,login_user){
    
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

            console.log(intended_dir_path)

            // First we create form data
            let formData = new FormData();

            formData.append('csrfmiddlewaretoken', csrf[0].value);
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
                    all_dir_nav_btns_spinner[nav].style.display = 'none';

                    // Call the function to display the sub directories
                    enterSubDir(folder_index,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty,response.sub_dirs);

                    // Call the function to work with the sub directories
                    usedSubDir(enter_into_directory_btns,intended_dir_path,response.sub_dirs)


                },
                error: function(error){

                    
                }
            });    

            });

    };

}


//This function takes you back to the previous directory
export function backToPrevDir(parent_dir,csrf,login_user){

    let back_btn = document.getElementById('back_dir_btn');
    let select_h3_show = document.getElementsByTagName('.inner_show_selected_path h3')[0];

    // The current ssh dir
    let current_dir_path = document.getElementById('current_directory_ssh_dispayer').innerHTML;

    // Check if the current dir is the root dir
    if(current_dir_path == parent_dir){

        // Show h3 tag
        select_h3_show.style.display = 'flex';

        //Hide the back button
        back_btn.style.display = 'none';

    }
    else{

        // Hide h3 tag
        select_h3_show.style.display = 'none';

        //Show the back button
        back_btn.style.display = 'flex';

        // Click event to the back button
        back_btn.addEventListener('click', ()=> {

            // Get the host name from login_user
            let host_name = login_user.split('@')[1];

            // Get the previous directory path
            let remove_current_dir = current_dir_path.lastIndexOf("\\");
            let previous_directory_path = str.slice(0, remove_current_dir);

            // First we create form data
            let formData = new FormData();

            formData.append('csrfmiddlewaretoken', csrf[0].value);
            formData.append('current_path',previous_directory_path);
            formData.append('host_name',host_name);

            $.ajax({
                type:'POST',
                url:'/cdDir/',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response){

                    // On success
                    console.log(response);

                    // Call the import function
                    fill_nav_with_dirs(response.sub_dirs);
                    fill_checks_with_dirs(response.sub_dirs);

                    // Update the path
                    document.getElementById('current_directory_ssh_dispayer').innerHTML = response.current_dir;

                },
                error: function(error){

                    
                }
            });

        });    

    }

}