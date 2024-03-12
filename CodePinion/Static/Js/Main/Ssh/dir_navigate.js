let csrf1 = document.getElementsByName('csrfmiddlewaretoken');
import { fill_nav_with_dirs } from './path.js';
import { fill_checks_with_dirs } from './path.js';
import { past_directories } from './path.js';
import { host_and_home_dir } from './path.js';
import { host_and_os } from './path.js';
function viewSubDirs(index_value,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty,intended_dir_path,sub_dir_list){
    let empty_folder_popup = document.getElementById('information_popup');
    let success_folder_popup = document.getElementById('success_popup');
    let success_folder_popup_message = document.getElementById('pop_success_auth_ssh_message');
    let back_btn = document.getElementById('back_dir_btn');
    let current_dir_path = document.getElementById('current_directory_ssh_dispayer');
    let select_h3_show = document.getElementById('h3_show_after_dir_change');
    inner_subdirectories[index_value].style.display = 'flex';
    $(inner_subdirectories_container[index_value]).empty();
    if(sub_dir_list.length == 0){
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
            let sub_drectory = `
                <div class="minor_dir">
                    <svg xmlns="http:
                    <span>${sub_dir_list[oneDIR]}</span>
                </div>
                `
            $(inner_subdirectories_container[index_value]).append(sub_drectory);
        }
        let enter_into_directory_btns = document.getElementsByClassName('inner_dir_enter');
        for(let enter = 0; enter < enter_into_directory_btns.length; enter++){
            enter_into_directory_btns[enter].addEventListener('click', ()=> {
                success_folder_popup.style.display = 'flex';
                success_folder_popup_message.innerHTML = 'Successfully Entered The Directory !';
                setTimeout(() => {
                    success_folder_popup.style.display = 'none';
                }, 5000);
                fill_nav_with_dirs(intended_dir_path,sub_dir_list);
                fill_checks_with_dirs(sub_dir_list);
                current_dir_path.innerHTML = intended_dir_path;
                back_btn.style.display = 'flex';
                select_h3_show.style.display = 'none';
            })
        }
    }
}
export function interactWithCmd(all_dir_nav_btns,all_dir_nav_btns_spinner,all_dir_names,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty){
    let login_user = document.getElementById('slash_user_view').innerHTML
    let host_name = login_user.split('@')[1];
    for(let nav = 0; nav < all_dir_nav_btns.length; nav++ ){
        all_dir_nav_btns[nav].addEventListener('click', ()=> {
            all_dir_nav_btns_spinner[nav].style.display = 'flex';
            let folder_index = nav;
            let current_dir_path = document.getElementById('current_directory_ssh_dispayer').innerHTML;
            let intended_dir_path = ''
            let host_name = document.getElementById('slash_user_view').innerHTML.split('@')[1];
            let host_os = host_and_os.get(host_name);
            if(host_os == 'Windows'){
                intended_dir_path = current_dir_path + "\\" + all_dir_names[nav].innerHTML;
            }
            else if(host_os == 'Linux'){
                intended_dir_path = current_dir_path + "/" + all_dir_names[nav].innerHTML;
            }
            let the_past_dirs = past_directories.get(host_name);
            let object = the_past_dirs.find(function (obj) {
                return obj.directoryPath === intended_dir_path;
            });
            if (object) {
                all_dir_nav_btns_spinner[nav].style.display = 'none';
                viewSubDirs(folder_index,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty,intended_dir_path,object.subdirectories);
            }
            else{
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
                        past_directories.get(host_name).push({
                            subdirectories: response.sub_dirs,
                            directoryPath: intended_dir_path
                        });
                        all_dir_nav_btns_spinner[nav].style.display = 'none';
                        viewSubDirs(folder_index,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty,intended_dir_path,response.sub_dirs);
                    },
                    error: function(error){
                    }
                });    
            }
        });
    };
}
export function backToPrevDir(current_dir_path){
    let back_btn = document.getElementById('back_dir_btn');
    let select_h3_show = document.getElementById('h3_show_after_dir_change');
    let login_user = document.getElementById('slash_user_view').innerHTML
    let host_name = login_user.split('@')[1];
    let parent_dir = host_and_home_dir.get(host_name);
    if(current_dir_path == parent_dir){
        select_h3_show.style.display = 'flex';
        back_btn.style.display = 'none';
    }
    else{
        select_h3_show.style.display = 'none';
        back_btn.style.display = 'flex';
        let previous_directory_path = ''
        let host_name = document.getElementById('slash_user_view').innerHTML.split('@')[1];
        let host_os = host_and_os.get(host_name);
        if(host_os == 'Windows'){
            let remove_current_dir = current_dir_path.lastIndexOf("\\");
            previous_directory_path = current_dir_path.slice(0, remove_current_dir);
        }
        else if(host_os == 'Linux'){
            let remove_current_dir = current_dir_path.lastIndexOf("/");
            previous_directory_path = current_dir_path.slice(0, remove_current_dir);
        }
        let the_past_dirs = past_directories.get(host_name);
        let object = the_past_dirs.find(function (obj) {
            return obj.directoryPath === previous_directory_path;
        });
        back_btn.addEventListener('click', ()=> {
            if (object) {
                fill_nav_with_dirs(previous_directory_path,object.subdirectories);
                fill_checks_with_dirs(object.subdirectories);
                document.getElementById('current_directory_ssh_dispayer').innerHTML = previous_directory_path;
            }
            else{
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
                        fill_nav_with_dirs(previous_directory_path,response.sub_dirs);
                        fill_checks_with_dirs(response.sub_dirs);
                        document.getElementById('current_directory_ssh_dispayer').innerHTML = previous_directory_path;
                    },
                    error: function(error){
                    }
                });
            }
        });    
    }
}