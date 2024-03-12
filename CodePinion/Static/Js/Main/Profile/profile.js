let message_popup_success = document.getElementById("message_popup_success");
let success_message_popup = document.getElementById("success_message_popup");
let message_popup_failed = document.getElementById("message_popup_failed");
let failed_message_popup = document.getElementById("failed_message_popup");
let csrf = document.getElementsByName('csrfmiddlewaretoken');
let select_profile_pic_section = document.getElementById("select_profile_pic_section");
let display_select_profile_pic_section = document.getElementById("display_select_profile_pic_section");
let profile_upload_btn = document.getElementById("profile_pic_input_btn");
let profile_file_input = document.getElementById("profile_pic_input");
let profile_image_checks = document.getElementsByClassName("profile_image_check");
let profile_pic_discard = document.getElementById("profile_pic_discard");
let profile_pic_update = document.getElementById("profile_pic_update");
let update_spinner = document.getElementById("update_spinner");
let update_spinner_replaced = document.getElementById("update_spinner_replaced");
let current_displayed_profile_picture = document.getElementById("current_displayed_profile_picture");
let new_profile_image_no_pic = document.getElementById("new_profile_image_no_pic");
let display_profile_image_img = document.getElementById("display_profile_image_img");
let display_image_section_no_profile_picture = document.getElementById("display_image_section_no_profile_picture");
let home_profile_image = document.getElementById("logged-user-image");
let profile_pic_close = document.getElementById("profile_pic_close");
let display_remove_profile_pic_section = document.getElementById("display_remove_profile_pic_section");
let remove_profile_pic_no = document.getElementById("remove_profile_pic_no");
let remove_profile_pic_yes = document.getElementById("remove_profile_pic_yes");
let remove_profile_pic_convo = document.getElementById("remove_profile_pic_convo");
let remove_profile_spinner = document.getElementById("remove_profile_spinner");
let remove_profile_spinner_icon = document.getElementById("remove_profile_spinner_icon");
let sing_det_detail_username = document.getElementById("sing_det_detail_username");
let profile_pic = null;
let read_the_bio = document.getElementById("read_the_bio");
let edit_the_bio = document.getElementById("edit_the_bio");
let enable_bio_edit_btn = document.getElementById("enable_bio_edit_btn");
let inner_read_bio = document.getElementById("inner_read_bio");
let bio_textarea = document.getElementById("bio_textarea");
let bio_edit_btn_discard = document.getElementById("bio_edit_btn_discard");
let bio_edit_btn_update = document.getElementById("bio_edit_btn_update");
let update_bio_spinner = document.getElementById("update_bio_spinner");
let update_spinner_rep_icon = document.getElementById("update_spinner_rep_icon");
let save_discard_all_dets = document.getElementById("save_discard_all_dets");
let all_detail_btn_discard = document.getElementById("all_detail_btn_discard");
let all_detail_btn_update = document.getElementById("all_detail_btn_update");
let sing_det_detail_fullname = document.getElementById("sing_det_detail_fullname");
let other_det_fullname = document.getElementById("other_det_fullname");
let other_det_secondary_email = document.getElementById("other_det_secondary_email");
let other_det_company = document.getElementById("other_det_company");
let other_det_location = document.getElementById("other_det_location");
let other_det_website = document.getElementById("other_det_website");
let other_det_inputs = document.getElementsByClassName("other_det_input");
let update_detail_spinner = document.getElementById("update_detail_spinner");
let update_spinner_detail_icon = document.getElementById("update_spinner_detail_icon");
let original_fullname = null;
let original_secondary_email = null;
let original_company = null;
let original_location = null;
let original_website = null;
window.onload = function () {
    display_profile_image_img.src = original_profile_pic;
    current_displayed_profile_picture.src = original_profile_pic;
    if(original_profile_pic == ""){
        display_image_section_no_profile_picture.style.display = "flex";
        new_profile_image_no_pic.style.display = "flex";
        display_profile_image_img.style.display = "none";
        current_displayed_profile_picture.style.display = "none";
    }
    else {
        display_image_section_no_profile_picture.style.display = "none";
        new_profile_image_no_pic.style.display = "none";
        display_profile_image_img.style.display = "flex";
        current_displayed_profile_picture.style.display = "flex";
    }
}
display_select_profile_pic_section.addEventListener("click", function () {
    select_profile_pic_section.style.display = "flex";
});
profile_upload_btn.addEventListener("click", function () {
    profile_file_input.click();
    profile_image_checks[0].style.color = "#414141";
    profile_image_checks[1].style.color = "#414141";
    profile_file_input.value = "";
});
profile_file_input.addEventListener("change", function () {
    let file = this.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        let img = new Image();
        img.src = reader.result;
        img.onload = function () {
            let w = this.width;
            let h = this.height;
            let size = file.size;
            if(w != h){
                message_popup_failed.style.display = "flex";
                failed_message_popup.innerHTML = "Image must be square!";
                profile_image_checks[0].style.color = "#C53B3B";
                setTimeout(function () {
                    message_popup_failed.style.display = "none";
                    profile_image_checks[0].style.color = "#414141";
                    profile_file_input.value = "";
                }, 3000);
                current_displayed_profile_picture.src = original_profile_pic;
                if(original_profile_pic == ""){
                    new_profile_image_no_pic.style.display = "flex";
                    current_displayed_profile_picture.style.display = "none";
                }
                else {
                    new_profile_image_no_pic.style.display = "none";
                    current_displayed_profile_picture.style.display = "flex";
                }
                return;
            }
            else {
                profile_image_checks[0].style.color = "#2CA631";
                if(size > 2097152){
                    message_popup_failed.style.display = "flex";
                    failed_message_popup.innerHTML = "Image must be less than 2MB!";
                    profile_image_checks[1].style.color = "#C53B3B";
                    setTimeout(function () {
                        message_popup_failed.style.display = "none";
                        profile_image_checks[0].style.color = "#414141";
                        profile_image_checks[1].style.color = "#414141";
                        profile_file_input.value = "";
                    }, 3000);
                    current_displayed_profile_picture.src = original_profile_pic;
                    if(original_profile_pic == ""){
                        new_profile_image_no_pic.style.display = "flex";
                        current_displayed_profile_picture.style.display = "none";
                    }
                    else {
                        new_profile_image_no_pic.style.display = "none";
                        current_displayed_profile_picture.style.display = "flex";
                    }
                }
                else {
                    message_popup_success.style.display = "flex";
                    success_message_popup.innerHTML = "Image Selected Successfully!";
                    profile_image_checks[1].style.color = "#2CA631";
                    setTimeout(function () {
                        message_popup_success.style.display = "none";
                    }, 3000);
                    current_displayed_profile_picture.src = reader.result;
                    new_profile_image_no_pic.style.display = "none";
                    current_displayed_profile_picture.style.display = "flex";
                    profile_pic_discard.style.display = "flex";
                    profile_pic_update.style.display = "flex";
                    profile_upload_btn.style.display = "none";
                    profile_pic = file;
                }
                return;
            }
        }
    }
});
profile_pic_discard.addEventListener("click", function () {
    message_popup_failed.style.display = "flex";
    failed_message_popup.innerHTML = "Profile Picture Upload Discarded!";
    profile_pic_discard.style.display = "none";
    profile_pic_update.style.display = "none";
    profile_upload_btn.style.display = "flex";
    current_displayed_profile_picture.src = original_profile_pic;
    if(original_profile_pic == ""){
        new_profile_image_no_pic.style.display = "flex";
        current_displayed_profile_picture.style.display = "none";
    }
    else {
        new_profile_image_no_pic.style.display = "none";
        current_displayed_profile_picture.style.display = "flex";
    }
    profile_file_input.value = "";
    profile_image_checks[0].style.color = "#414141";
    profile_image_checks[1].style.color = "#414141";
    setTimeout(function () {
        message_popup_failed.style.display = "none";
    }, 3000);
});
profile_pic_update.addEventListener("click", function () {
    if(profile_pic == null){
        message_popup_failed.style.display = "flex";
        failed_message_popup.innerHTML = "Please select a profile picture!";
        setTimeout(function () {
            message_popup_failed.style.display = "none";
        }, 3000);
    }
    else {
        upload_profile_pic();
    }
});
profile_pic_close.addEventListener("click", function () {
    if(profile_pic_discard.style.display == "flex"){
        profile_pic_discard.click();
    }
    select_profile_pic_section.style.display = "none";
});
display_remove_profile_pic_section.addEventListener("click", function () {
    if (original_profile_pic == ""){
        message_popup_failed.style.display = "flex";
        failed_message_popup.innerHTML = "You don't have a profile picture!";
        setTimeout(function () {
            message_popup_failed.style.display = "none";
        }, 3000);
        return;
    }
    else{
        remove_profile_pic_convo.style.display = "flex";
    }
});
remove_profile_pic_no.addEventListener("click", function () {
    remove_profile_pic_convo.style.display = "none";
    message_popup_failed.style.display = "flex";
    failed_message_popup.innerHTML = "Profile Picture Removal Cancelled!";
    setTimeout(function () {
        message_popup_failed.style.display = "none";
    }, 3000);
});
remove_profile_pic_yes.addEventListener("click", function () {
    remove_profile_pic();
});
enable_bio_edit_btn.addEventListener("click", function () {
    read_the_bio.style.display = "none";
    edit_the_bio.style.display = "flex";
    message_popup_success.style.display = "flex";
    success_message_popup.innerHTML = "You can now edit your bio!";
    setTimeout(function () {
        message_popup_success.style.display = "none";
    }, 3000);
});
bio_edit_btn_discard.addEventListener("click", function () {
    edit_the_bio.style.display = "none";
    bio_textarea.value = original_bio;
    read_the_bio.style.display = "flex";
    message_popup_failed.style.display = "flex";
    failed_message_popup.innerHTML = "Bio Edit Discarded!";
    setTimeout(function () {
        message_popup_failed.style.display = "none";
    }, 3000);
});
bio_edit_btn_update.addEventListener("click", function () {
    if(bio_textarea.value == ""){
        message_popup_failed.style.display = "flex";
        failed_message_popup.innerHTML = "Bio cannot be empty!";
        setTimeout(function () {
            message_popup_failed.style.display = "none";
        }, 3000);
    }
    else if(bio_textarea.value == original_bio){
        message_popup_failed.style.display = "flex";
        failed_message_popup.innerHTML = "No changes made to the bio!";
        setTimeout(function () {
            message_popup_failed.style.display = "none";
        }, 3000);
    }
    else {
        update_bio();
    }
});
for (let i = 0; i < other_det_inputs.length; i++) {
    original_fullname = other_det_fullname.value;
    original_secondary_email = other_det_secondary_email.value;
    original_company = other_det_company.value;
    original_location = other_det_location.value;
    original_website = other_det_website.value;
    other_det_inputs[i].addEventListener("input", function () {
        if(other_det_fullname.value !== original_fullname || other_det_secondary_email.value !== original_secondary_email || other_det_company.value !== original_company || other_det_location.value !== original_location || other_det_website.value !== original_website){
            save_discard_all_dets.style.display = "flex";
        }
        else {
            save_discard_all_dets.style.display = "none";
        }
    });
}
all_detail_btn_discard.addEventListener("click", function () {
    message_popup_failed.style.display = "flex";
    failed_message_popup.innerHTML = "Detail Changes Discarded!";
    other_det_fullname.value = original_fullname_server;
    other_det_secondary_email.value = original_secondary_email_server;
    other_det_company.value = original_company_server;
    other_det_location.value = original_location_server;
    other_det_website.value = original_website_server;
    setTimeout(function () {
        message_popup_failed.style.display = "none";
        save_discard_all_dets.style.display = "none";
    }, 3000);
});
all_detail_btn_update.addEventListener("click", function () {
    if(other_det_fullname.value !== original_fullname_server || other_det_secondary_email.value !== original_secondary_email_server || other_det_company.value !== original_company_server || other_det_location.value !== original_location_server || other_det_website.value !== original_website_server){
        if(other_det_secondary_email.value != ""){
            if(!validateEmail(other_det_secondary_email.value)){
                message_popup_failed.style.display = "flex";
                failed_message_popup.innerHTML = "Secondary email is not valid!";
                setTimeout(function () {
                    message_popup_failed.style.display = "none";
                }, 3000);
                return;
            }
        }
        if(other_det_website.value != ""){
            if(!validateWebsite(other_det_website.value)){
                message_popup_failed.style.display = "flex";
                failed_message_popup.innerHTML = "Website is not valid!";
                setTimeout(function () {
                    message_popup_failed.style.display = "none";
                }, 3000);
                return;
            }
        }
        if(other_det_company.value != ""){
            if(other_det_company.value.length > 20){
                message_popup_failed.style.display = "flex";
                failed_message_popup.innerHTML = "Company name cannot be more than 20 characters!";
                setTimeout(function () {
                    message_popup_failed.style.display = "none";
                }, 3000);
                return;
            }
        }
        update_all_details();
    }
    else {
        message_popup_failed.style.display = "flex";
        failed_message_popup.innerHTML = "No changes made to the details!";
        setTimeout(function () {
            message_popup_failed.style.display = "none";
        }, 3000);
    }
});
function upload_profile_pic() {
    update_spinner.style.display = "flex";
    update_spinner_replaced.style.display = "none";
    profile_pic_update.style.pointerEvents = "none";
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('to_update', 'profile_pic');
    formData.append('profile_pic', profile_pic);
    $.ajax({
        type:'POST',
        url:'/updateProfile/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            update_spinner.style.display = "none";
            update_spinner_replaced.style.display = "flex";
            message_popup_success.style.display = "flex";
            success_message_popup.innerHTML = "Profile Picture Updated Successfully!";
            setTimeout(function(){
                message_popup_success.style.display = "none";
                original_profile_pic = response.profile_pic_url;
                display_image_section_no_profile_picture.style.display = "none";
                new_profile_image_no_pic.style.display = "none";
                display_profile_image_img.style.display = "flex";
                current_displayed_profile_picture.style.display = "flex";
                current_displayed_profile_picture.src = original_profile_pic;
                display_profile_image_img.src = original_profile_pic;
                home_profile_image.innerHTML = `<img src="${original_profile_pic}" alt="logged-user">`
                profile_file_input.value = "";
                profile_pic_discard.style.display = "none";
                profile_pic_update.style.display = "none";
                profile_pic_update.style.pointerEvents = "auto";
                profile_upload_btn.style.display = "flex";
                profile_image_checks[0].style.color = "#414141";
                profile_image_checks[1].style.color = "#414141";
            }, 4000);
        },
        error: function(error){
            update_spinner.style.display = "none";
            update_spinner_replaced.style.display = "flex";
            message_popup_failed.style.display = "flex";
            failed_message_popup.innerHTML = "Failed To Update Profile Picture! Please try again, and if the issue persists, contact our support team.";
            setTimeout(function(){
                message_popup_failed.style.display = "none";
                current_displayed_profile_picture.src = original_profile_pic;
                if(original_profile_pic == ""){
                    new_profile_image_no_pic.style.display = "flex";
                    current_displayed_profile_picture.style.display = "none";
                }
                else {
                    new_profile_image_no_pic.style.display = "none";
                    current_displayed_profile_picture.style.display = "flex";
                }
                profile_file_input.value = "";
                profile_pic_discard.style.display = "none";
                profile_pic_update.style.display = "none";
                profile_pic_update.style.pointerEvents = "auto";
                profile_upload_btn.style.display = "flex";
                profile_image_checks[0].style.color = "#414141";
                profile_image_checks[1].style.color = "#414141";
            }, 4000);
        }
    });
}
function remove_profile_pic(){
    remove_profile_spinner.style.display = "flex";
    remove_profile_spinner_icon.style.display = "none";
    remove_profile_pic_yes.style.pointerEvents = "none";
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('to_update', 'remove_profile_pic');
    $.ajax({
        type:'POST',
        url:'/updateProfile/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            remove_profile_spinner.style.display = "none";
            remove_profile_spinner_icon.style.display = "flex";
            remove_profile_pic_yes.style.pointerEvents = "auto";
            message_popup_success.style.display = "flex";
            success_message_popup.innerHTML = "Profile Picture Removed Successfully!";
            setTimeout(function(){
                message_popup_success.style.display = "none";
                remove_profile_pic_convo.style.display = "none";
                display_profile_image_img.style.display = "none";
                current_displayed_profile_picture.style.display = "none";
                display_profile_image_img.src = "";
                current_displayed_profile_picture.src = "";
                original_profile_pic = "";
                let user_initials = sing_det_detail_username.innerHTML[0].toUpperCase();;
                home_profile_image.innerHTML = `<div class="profile_pic_absent"><span>${user_initials}</span></div>`
                display_image_section_no_profile_picture.style.display = "flex";
                new_profile_image_no_pic.style.display = "flex";
            }, 4000);
        },
        error: function(error){
            remove_profile_spinner.style.display = "none";
            remove_profile_spinner_icon.style.display = "flex";
            remove_profile_pic_yes.style.pointerEvents = "auto";
            message_popup_failed.style.display = "flex";
            failed_message_popup.innerHTML = "Failed To Remove Profile Picture! Please try again, and if the issue persists, contact our support team.";
            setTimeout(function(){
                message_popup_failed.style.display = "none";
            }, 4000);   
        }
    });
}
function update_bio() {
    update_bio_spinner.style.display = "flex";
    update_spinner_rep_icon.style.display = "none";
    bio_edit_btn_update.style.pointerEvents = "none";
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('to_update', 'bio');
    formData.append('bio', bio_textarea.value);
    $.ajax({
        type:'POST',
        url:'/updateProfile/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            message_popup_success.style.display = "flex";
            success_message_popup.innerHTML = "Bio Updated Successfully!";
            update_bio_spinner.style.display = "none";
            update_spinner_rep_icon.style.display = "flex";
            bio_edit_btn_update.style.pointerEvents = "auto";
            setTimeout(function(){
                message_popup_success.style.display = "none";
                original_bio = response.bio;
                inner_read_bio.innerHTML = original_bio;
                edit_the_bio.style.display = "none";
                read_the_bio.style.display = "flex";
            }, 4000);
        },
        error: function(error){
            message_popup_failed.style.display = "flex";
            failed_message_popup.innerHTML = "Failed To Update Bio! Please try again, and if the issue persists, contact our support team.";
            update_bio_spinner.style.display = "none";
            update_spinner_rep_icon.style.display = "flex";
            bio_edit_btn_update.style.pointerEvents = "auto";
            setTimeout(function(){
                message_popup_failed.style.display = "none";
            }, 4000);
        }
    });
}
function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function validateWebsite(website) {
    let re = /^(http|https):\/\/[^ "]+$/;
    return re.test(website);
}
function update_all_details() {
    update_detail_spinner.style.display = "flex";
    update_spinner_detail_icon.style.display = "none";
    all_detail_btn_update.style.pointerEvents = "none";
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('to_update', 'all_details');
    formData.append('fullname', other_det_fullname.value);
    formData.append('secondary_email', other_det_secondary_email.value);
    formData.append('company', other_det_company.value);
    formData.append('location', other_det_location.value);
    formData.append('website', other_det_website.value);
    $.ajax({
        type:'POST',
        url:'/updateProfile/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            message_popup_success.style.display = "flex";
            success_message_popup.innerHTML = "Details Updated Successfully!";
            update_detail_spinner.style.display = "none";
            update_spinner_detail_icon.style.display = "flex";
            all_detail_btn_update.style.pointerEvents = "auto";
            setTimeout(function(){
                message_popup_success.style.display = "none";
                original_fullname_server = response.fullname;
                original_secondary_email_server = response.secondary_email;
                original_company_server = response.company;
                original_location_server = response.location;
                original_website_server = response.website;
                other_det_fullname.value = original_fullname_server;
                other_det_secondary_email.value = original_secondary_email_server;
                other_det_company.value = original_company_server;
                other_det_location.value = original_location_server;
                other_det_website.value = original_website_server;
                original_fullname = other_det_fullname.value;
                sing_det_detail_fullname.innerHTML = other_det_fullname.value;
                original_secondary_email = other_det_secondary_email.value;
                original_company = other_det_company.value;
                original_location = other_det_location.value;
                original_website = other_det_website.value;
                save_discard_all_dets.style.display = "none";
            }, 4000);
        },
        error: function(error){
            message_popup_failed.style.display = "flex";
            failed_message_popup.innerHTML = "Failed To Update Details! Please try again, and if the issue persists, contact our support team.";
            update_detail_spinner.style.display = "none";
            update_spinner_detail_icon.style.display = "flex";
            all_detail_btn_update.style.pointerEvents = "auto";
            setTimeout(function(){
                message_popup_failed.style.display = "none";
            }, 4000);
        }
    });
}