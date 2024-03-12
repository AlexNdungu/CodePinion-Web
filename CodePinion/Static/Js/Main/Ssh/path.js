let success_popup = document.getElementById('success_popup');
let not_selected = document.getElementById('not_selected');
let pop_error_auth_ssh = document.getElementById('pop_error_auth_ssh');
let pop_error_auth_ssh_message = document.getElementById('pop_error_auth_ssh_message');
let ssh_login_form = document.getElementById('ssh_login_popup');
let ssh_file_system = document.getElementById('choose_path_ssh_section');
let launch_ssh_login_form = document.getElementById('select-path-btn-connect');
let close_ssh_login_form = document.getElementById('close_ssh_form');
let log_ssh_input_icons = document.querySelectorAll('.log_ssh_input_icon');
let log_ssh_input_icon_inputs = document.querySelectorAll('.log_ssh_input_icon input:not([type=\"checkbox\"])');
let user_dir_indicate = document.getElementById('slash_user_view');
let check_dir_section_for_unchecking = document.getElementById('check_choosen_directory_section');
let current_working_dir = document.getElementById('current_directory_ssh_dispayer');
let windows_icon = document.getElementById('windows_icon');
let linux_icon = document.getElementById('linux_icon');
let choosen_dir_show = document.getElementById('the_selected_path_show');
let close_ssh_section = document.getElementById('close_ssh_filing');
let close_ssh_filing_svg_red = document.getElementById('close_ssh_filing_svg_red');
let close_ssh_filing_svg_green = document.getElementById('close_ssh_filing_svg_green');
export const past_directories = new Map();
export const host_and_home_dir = new Map();
export const host_and_os = new Map();
import { interactWithCmd } from './dir_navigate.js';
import { backToPrevDir } from './dir_navigate.js';
let csrf = document.getElementsByName('csrfmiddlewaretoken');
launch_ssh_login_form.addEventListener('click', ()=> {
    ssh_login_form.style.display = 'flex';
});
close_ssh_login_form.addEventListener('click', ()=> {
    ssh_login_form.style.display = 'none';
});
function login_popup_effects(span,svg,loader) {
    login_ssh_span.style.display = span;
    login_ssh_svg.style.display = svg;
    ssh_login_loader_spin.style.display = loader;
}
export function fill_nav_with_dirs(current_dir,dir_list_members){
    $('#select_ssh_directory_navigation').empty();
    if(dir_list_members.length > 0){
        for(let oneDIR = 0; oneDIR < dir_list_members.length; oneDIR++){
            let ssh_dir = `
                <div class="the_clickable_and_inner_dir">
                    <div class="clickable_ssh_directory">
                        <svg xmlns="http:
                        <span class="clickable_directory_name" >${dir_list_members[oneDIR]}</span>
                        <div class="clickable_dir_spinner"></div>
                    </div>
                    <div class="inner_clicked_dir"> 
                        <div class="drop_inner_dir">
                            <div class="clickable_folder_is_empty">
                                <svg xmlns="http:
                            </div>
                            <div class="minor_dir_them_section">
                                <!--Subdirectories will appear here-->
                            </div>
                            <div class="close_enter_inner_dir_btns">
                                <div class="inner_dir_enter">
                                    <span>Enter</span>
                                    <svg xmlns="http:
                                </div>
                                <div class="inner_dir_close">
                                    <span>Close</span>
                                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http:
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                `
            $("#select_ssh_directory_navigation").append(ssh_dir);
        }
    }
    let all_dir_nav_btns = document.getElementsByClassName('clickable_ssh_directory');
    let all_dir_nav_btns_spinner = document.getElementsByClassName('clickable_dir_spinner');
    let all_dir_names = document.getElementsByClassName('clickable_directory_name');
    let inner_subdirectories = document.getElementsByClassName('inner_clicked_dir');
    let inner_subdirectories_container = document.getElementsByClassName('minor_dir_them_section');
    let clickable_folder_is_empty = document.getElementsByClassName('clickable_folder_is_empty');
    interactWithCmd(all_dir_nav_btns,all_dir_nav_btns_spinner,all_dir_names,inner_subdirectories,inner_subdirectories_container,clickable_folder_is_empty);
    backToPrevDir(current_dir)
}
export function fill_checks_with_dirs(dir_list_members){
    $('#check_choosen_directory_section').empty();
    if(dir_list_members.length > 0){
        for(let oneDIR = 0; oneDIR < dir_list_members.length; oneDIR++){
            let ssh_dir = `
                    <!--The checked_choosen dir-->
                    <div class="ind_checked_and_choosen_dir ">
                        <!--The check dir section-->
                        <div class="check_dir_section">
                            <input type="checkbox" class="checkbox_for_this_dir" >
                            <!--The ckeck box-->
                            <div class="check_dir">
                                <svg class="svg_check_dir_tick" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http:
                            </div>
                        </div>
                        <!--Folder dir icon-->
                        <div class="check_folder_ic">
                            <svg xmlns="http:
                        </div>
                        <!--The checkable dir name-->
                        <div class="checkable_dir_name">
                            <span class="this_divs_dir_name" >${dir_list_members[oneDIR]}</span>
                        </div>
                    </div>
                `
            $("#check_choosen_directory_section").append(ssh_dir);
        }
    }
    let all_dirs_checks = document.getElementsByClassName('ind_checked_and_choosen_dir'); 
    let all_checks_for_dirs = document.getElementsByClassName('checkbox_for_this_dir');
    let svg_check_dir_ticks = document.getElementsByClassName('svg_check_dir_tick');
    let svg_check_containers = document.getElementsByClassName('check_dir');
    let individual_divs_names = document.getElementsByClassName('this_divs_dir_name');
    for(let num_dir = 0; num_dir < all_dirs_checks.length; num_dir++){
        all_dirs_checks[num_dir].addEventListener('click', ()=> {
            for(let num_check = 0; num_check < all_checks_for_dirs.length; num_check++){
                all_checks_for_dirs[num_check].checked = false;
                svg_check_dir_ticks[num_check].style.visibility = 'hidden';
                svg_check_containers[num_check].classList.remove('svg_check_containers_hover');
                if(all_dirs_checks[num_check].classList.contains('ind_onchecked_and_choosen_dir')){
                    all_dirs_checks[num_check].classList.remove('ind_onchecked_and_choosen_dir');
                }
            }
            all_checks_for_dirs[num_dir].checked = true;
            svg_check_dir_ticks[num_dir].style.visibility = 'visible';
            svg_check_containers[num_dir].classList.add('svg_check_containers_hover');
            all_dirs_checks[num_dir].classList.add('ind_onchecked_and_choosen_dir');
            let host_name = document.getElementById('slash_user_view').innerHTML.split('@')[1];
            let host_os = host_and_os.get(host_name);
            if(host_os == 'Windows'){
                choosen_dir_show.innerHTML = current_working_dir.innerHTML + "\\" + individual_divs_names[num_dir].innerHTML;
            }
            else if(host_os == 'Linux'){
                choosen_dir_show.innerHTML = current_working_dir.innerHTML + "/" + individual_divs_names[num_dir].innerHTML;
            }
            close_ssh_section.classList.add('close_ssh_filing_active');
            close_ssh_filing_svg_red.style.display = 'none';
            close_ssh_filing_svg_green.style.display = 'flex';
        });
    }
    check_dir_section_for_unchecking.addEventListener('click', function(event){
        if (check_dir_section_for_unchecking !== event.target) return;
        for(let num_check = 0; num_check < all_checks_for_dirs.length; num_check++){
            all_checks_for_dirs[num_check].checked = false;
            svg_check_dir_ticks[num_check].style.visibility = 'hidden';
            svg_check_containers[num_check].classList.remove('svg_check_containers_hover');
            if(all_dirs_checks[num_check].classList.contains('ind_onchecked_and_choosen_dir')){
                all_dirs_checks[num_check].classList.remove('ind_onchecked_and_choosen_dir');
            }
        }
        close_ssh_section.classList.remove('close_ssh_filing_active');
        close_ssh_filing_svg_red.style.display = 'flex';
        close_ssh_filing_svg_green.style.display = 'none';
        choosen_dir_show.innerHTML = "";
    }, false);
}
close_ssh_section.addEventListener('click', ()=> {
    let selected_dir = document.getElementById('the_selected_path_show').innerHTML;
    let ssh_file_system = document.getElementById('choose_path_ssh_section');
    let current_path = document.getElementById('current_directory_ssh_dispayer');
    current_path.innerHTML = '';
    let logged_in_user = document.getElementById('slash_user_view').innerHTML;
    $('#selected-path-and-ssh-devices').empty();
    $('#select_ssh_directory_navigation').empty();
    $('#check_choosen_directory_section').empty();
    past_directories.clear();
    host_and_home_dir.clear();
    host_and_os.clear();
    ssh_file_system.style.display = 'none';
    if(selected_dir != ''){
        let host_name = logged_in_user.split('@')[1];
        let ssh_dir_and_device = `
            <div class="select-path-device">
                <!--The select button-->
                <div class="select-path-btn-server">
                    <svg xmlns="http:
                    <span>${host_name}</span>
                </div>
                <!--The separation line-->
                <div class="path-separation">
                    <div></div>
                </div>
                <!--See path selected-->
                <div class="path-pasted">
                    <!--Path pasted here-->
                    <span>${selected_dir}</span>
                </div>
            </div>
        `
        $("#selected-path-and-ssh-devices").append(ssh_dir_and_device);
    }
    logged_in_user = '';
});
function ssh_login_exist(){
    if(ssh_devices.length > 0){
        let ssh_login_btns = document.getElementsByClassName('ssh_device_edit_and_connect_enter');
        let ssh_host_names = document.getElementsByClassName('ssh_host_names');
        let ssh_login_spinners = document.getElementsByClassName('loader_ssh_log');
        let ssh_connect_icons = document.getElementsByClassName('loader_ssh_log_opposite');
        for(let num_ssh = 0; num_ssh < ssh_login_btns.length; num_ssh++){
            ssh_login_btns[num_ssh].addEventListener('click', ()=> {
                ssh_login_spinners[num_ssh].style.display = 'flex';
                ssh_connect_icons[num_ssh].style.display = 'none';
                if(window.innerWidth < 720){
                    ssh_login_spinners[num_ssh].style.display = 'none';
                    ssh_connect_icons[num_ssh].style.display = 'flex';
                    pop_error_auth_ssh_message.innerHTML = 'Your Device’s Screen Size Is Too Small To Run This Application.';
                    pop_error_auth_ssh_message.style.padding = '10px';
                    pop_error_auth_ssh.style.display = 'flex';
                    setTimeout(function(){
                        pop_error_auth_ssh.style.display = 'none';
                    },5000);
                }
                else{
                    let clicked_host_name = ssh_host_names[num_ssh].innerHTML;
                    let formData = new FormData();
                    formData.append('csrfmiddlewaretoken', csrf[0].value);
                    formData.append('host_name',clicked_host_name);
                    $.ajax({
                        type:'POST',
                        url:'/getPath/',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(response){
                            if(response.status == 'success'){
                                const current_path_dir = response.current_dir_path.trim();
                                current_working_dir.innerHTML = current_path_dir
                                const dir_list_members = response.dir_list;
                                host_and_home_dir.set(clicked_host_name, current_path_dir);
                                host_and_os.set(clicked_host_name, response.current_os);
                                past_directories.set(clicked_host_name, [
                                    {
                                    subdirectories: dir_list_members,
                                    directoryPath: current_path_dir
                                    }
                                ]);
                                ssh_login_spinners[num_ssh].style.display = 'none';
                                ssh_connect_icons[num_ssh].style.display = 'flex';
                                success_popup.style.display = 'flex';
                                setTimeout(function(){
                                    success_popup.style.display = 'none';
                                },5000);
                                ssh_login_form.style.display = 'none';
                                ssh_file_system.style.display = 'flex';
                                user_dir_indicate.innerHTML = response.host_username + "@" + ssh_host_names[num_ssh].innerHTML;
                                fill_nav_with_dirs(current_path_dir,dir_list_members);
                                fill_checks_with_dirs(dir_list_members)
                                if (response.current_os == 'Windows'){
                                    windows_icon.style.display = 'flex';
                                }
                                else if(response.current_os == 'Linux'){
                                    linux_icon.style.display = 'flex';
                                }
                            }
                            else if(response.status == 'fail'){
                                ssh_login_spinners[num_ssh].style.display = 'none';
                                ssh_connect_icons[num_ssh].style.display = 'flex';
                                pop_error_auth_ssh_message.innerHTML = 'Authentication Error. Try Other Credentials';
                                pop_error_auth_ssh.style.display = 'flex';
                                setTimeout(function(){
                                    pop_error_auth_ssh.style.display = 'none';
                                },5000);
                            }
                        },
                        error: function(error){
                            ssh_login_spinners[num_ssh].style.display = 'none';
                            ssh_connect_icons[num_ssh].style.display = 'flex';
                            pop_error_auth_ssh_message.innerHTML = 'Fatal Error Occured. Try Again In A Few Minutes';
                            pop_error_auth_ssh.style.display = 'flex';
                            setTimeout(function(){
                                pop_error_auth_ssh.style.display = 'none';
                            },5000);
                        }
                    });   
                };
            });
        }
    }
}
window.onload = function() {
    ssh_login_exist();
};
