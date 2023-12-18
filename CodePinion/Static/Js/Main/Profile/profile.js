// Get message popup
let message_popup_success = document.getElementById("message_popup_success");
let success_message_popup = document.getElementById("success_message_popup");
let message_popup_failed = document.getElementById("message_popup_failed");
let failed_message_popup = document.getElementById("failed_message_popup");
// Get all the required items for the profile picture
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
//
let display_remove_profile_pic_section = document.getElementById("display_remove_profile_pic_section");
let remove_profile_pic_no = document.getElementById("remove_profile_pic_no");
let remove_profile_pic_yes = document.getElementById("remove_profile_pic_yes");
let remove_profile_pic_convo = document.getElementById("remove_profile_pic_convo");
let remove_profile_spinner = document.getElementById("remove_profile_spinner");
let remove_profile_spinner_icon = document.getElementById("remove_profile_spinner_icon");
let sing_det_detail_username = document.getElementById("sing_det_detail_username");
//
let profile_pic = null;

// Get all requerd items for the bio section
let read_the_bio = document.getElementById("read_the_bio");
let edit_the_bio = document.getElementById("edit_the_bio");
let enable_bio_edit_btn = document.getElementById("enable_bio_edit_btn");
let inner_read_bio = document.getElementById("inner_read_bio");
let bio_textarea = document.getElementById("bio_textarea");
let bio_edit_btn_discard = document.getElementById("bio_edit_btn_discard");
let bio_edit_btn_update = document.getElementById("bio_edit_btn_update");
let update_bio_spinner = document.getElementById("update_bio_spinner");
let update_spinner_rep_icon = document.getElementById("update_spinner_rep_icon");

// Get all the required items for all other sections
let save_discard_all_dets = document.getElementById("save_discard_all_dets");
let all_detail_btn_discard = document.getElementById("all_detail_btn_discard");
let all_detail_btn_update = document.getElementById("all_detail_btn_update");
let sing_det_detail_fullname = document.getElementById("sing_det_detail_fullname");
//
let other_det_fullname = document.getElementById("other_det_fullname");
let other_det_secondary_email = document.getElementById("other_det_secondary_email");
let other_det_company = document.getElementById("other_det_company");
let other_det_location = document.getElementById("other_det_location");
let other_det_website = document.getElementById("other_det_website");
let other_det_inputs = document.getElementsByClassName("other_det_input");
let update_detail_spinner = document.getElementById("update_detail_spinner");
let update_spinner_detail_icon = document.getElementById("update_spinner_detail_icon");
//
let original_fullname = null;
let original_secondary_email = null;
let original_company = null;
let original_location = null;
let original_website = null;

// onload function
window.onload = function () {
    // Set the profile picture url
    display_profile_image_img.src = original_profile_pic;
    current_displayed_profile_picture.src = original_profile_pic;
    // Check if profile picture is empty
    if(original_profile_pic == ""){
        // Show initails and hide the profile picture
        display_image_section_no_profile_picture.style.display = "flex";
        new_profile_image_no_pic.style.display = "flex";
        display_profile_image_img.style.display = "none";
        current_displayed_profile_picture.style.display = "none";
    }
    else {
        // hide the initials and show the profile picture
        display_image_section_no_profile_picture.style.display = "none";
        new_profile_image_no_pic.style.display = "none";
        display_profile_image_img.style.display = "flex";
        current_displayed_profile_picture.style.display = "flex";
    }
}

// Add event listener to the display_select_profile_pic_section
display_select_profile_pic_section.addEventListener("click", function () {
    // Show the select profile picture section
    select_profile_pic_section.style.display = "flex";
});

// Add event listener to the upload button
profile_upload_btn.addEventListener("click", function () {
    profile_file_input.click();
    // Return instructions color to normal
    profile_image_checks[0].style.color = "#414141";
    profile_image_checks[1].style.color = "#414141";
    // Reset the profile picture
    profile_file_input.value = "";
});

// get the size of the file, width and height of the image once the file is selected
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

            // Check if image is square
            if(w != h){
                message_popup_failed.style.display = "flex";
                failed_message_popup.innerHTML = "Image must be square!";
                profile_image_checks[0].style.color = "#C53B3B";

                // hide the message after 3 seconds
                setTimeout(function () {
                    message_popup_failed.style.display = "none";
                    profile_image_checks[0].style.color = "#414141";
                    // reset the input
                    profile_file_input.value = "";
                }, 3000);

                // Return the original profile picture
                current_displayed_profile_picture.src = original_profile_pic;

                // Check if original profile picture is empty
                if(original_profile_pic == ""){
                    // Show initails and hide the profile picture
                    // display_image_section_no_profile_picture.style.display = "flex";
                    // display_profile_image_img.style.display = "none";
                    new_profile_image_no_pic.style.display = "flex";
                    current_displayed_profile_picture.style.display = "none";

                }
                else {
                    // hide the initials and show the profile picture
                    // display_image_section_no_profile_picture.style.display = "none";
                    // display_profile_image_img.style.display = "flex";
                    new_profile_image_no_pic.style.display = "none";
                    current_displayed_profile_picture.style.display = "flex";
                }

                return;
            }
            else {
                profile_image_checks[0].style.color = "#2CA631";

                // Check if image is less than 2MB
                if(size > 2097152){
                    message_popup_failed.style.display = "flex";
                    failed_message_popup.innerHTML = "Image must be less than 2MB!";
                    profile_image_checks[1].style.color = "#C53B3B";

                    // hide the message after 3 seconds
                    setTimeout(function () {
                        message_popup_failed.style.display = "none";
                        profile_image_checks[0].style.color = "#414141";
                        profile_image_checks[1].style.color = "#414141";
                        // reset the input
                        profile_file_input.value = "";
                    }, 3000);

                    // Return the original profile picture
                    current_displayed_profile_picture.src = original_profile_pic;

                    // Check if original profile picture is empty
                    if(original_profile_pic == ""){
                        // Show initails and hide the profile picture
                        // display_image_section_no_profile_picture.style.display = "flex";
                        // display_profile_image_img.style.display = "none";
                        new_profile_image_no_pic.style.display = "flex";
                        current_displayed_profile_picture.style.display = "none";

                    }
                    else {
                        // hide the initials and show the profile picture
                        // display_image_section_no_profile_picture.style.display = "none";
                        // display_profile_image_img.style.display = "flex";
                        new_profile_image_no_pic.style.display = "none";
                        current_displayed_profile_picture.style.display = "flex";
                    }

                }
                else {
                    message_popup_success.style.display = "flex";
                    success_message_popup.innerHTML = "Image Selected Successfully!";
                    profile_image_checks[1].style.color = "#2CA631";

                    // hide the message after 3 seconds
                    setTimeout(function () {
                        message_popup_success.style.display = "none";
                        // profile_image_checks[0].style.color = "#414141";
                        // profile_image_checks[1].style.color = "#414141";
                    }, 3000);

                    // Get the url of the image current_displayed_profile_picture
                    current_displayed_profile_picture.src = reader.result;

                    // Hide the initials and show the profile picture
                    new_profile_image_no_pic.style.display = "none";
                    current_displayed_profile_picture.style.display = "flex";

                    // Show discard and upload buttons
                    profile_pic_discard.style.display = "flex";
                    profile_pic_update.style.display = "flex";
                    // hide the upload button
                    profile_upload_btn.style.display = "none";

                    // Set the profile picture
                    profile_pic = file;
                }

                return;
            }

        }
    }
});

// Discard the profile picture upload
profile_pic_discard.addEventListener("click", function () {
    // show message popup
    message_popup_failed.style.display = "flex";
    failed_message_popup.innerHTML = "Profile Picture Upload Discarded!";
    // Hide discard and upload buttons
    profile_pic_discard.style.display = "none";
    profile_pic_update.style.display = "none";
    // show the upload button
    profile_upload_btn.style.display = "flex";

    // Reset the profile picture
    current_displayed_profile_picture.src = original_profile_pic;
    // Check if original profile picture is empty
    if(original_profile_pic == ""){
        // Show initails and hide the profile picture
        new_profile_image_no_pic.style.display = "flex";
        current_displayed_profile_picture.style.display = "none";
    }
    else {
        // hide the initials and show the profile picture
        new_profile_image_no_pic.style.display = "none";
        current_displayed_profile_picture.style.display = "flex";
    }

    profile_file_input.value = "";
    // Return instructions color to normal
    profile_image_checks[0].style.color = "#414141";
    profile_image_checks[1].style.color = "#414141";
    // hide the message after 3 seconds
    setTimeout(function () {
        message_popup_failed.style.display = "none";
        //select_profile_pic_section.style.display = "none";
    }, 3000);
});

// Add event listener to the update button
profile_pic_update.addEventListener("click", function () {
    // Check if the profile picture is selected
    if(profile_pic == null){
        message_popup_failed.style.display = "flex";
        failed_message_popup.innerHTML = "Please select a profile picture!";
        // hide the message after 3 seconds
        setTimeout(function () {
            message_popup_failed.style.display = "none";
        }, 3000);
    }
    else {
        upload_profile_pic();
    }
});

// Add event listener to the close button
profile_pic_close.addEventListener("click", function () {
    if(profile_pic_discard.style.display == "flex"){
        // Discard the profile picture upload
        profile_pic_discard.click();
    }
    // Hide the select profile picture section
    select_profile_pic_section.style.display = "none";
});

// Add event listener to the remove profile picture button
display_remove_profile_pic_section.addEventListener("click", function () {

    if (original_profile_pic == ""){
        // Show fail pop up
        message_popup_failed.style.display = "flex";
        failed_message_popup.innerHTML = "You don't have a profile picture!";
        // hide the message after 3 seconds
        setTimeout(function () {
            message_popup_failed.style.display = "none";
        }, 3000);
        return;
    }
    else{
        // Show the remove profile picture section
        remove_profile_pic_convo.style.display = "flex";
    }
});

// Add event listiner to remove_profile_pic_no
remove_profile_pic_no.addEventListener("click", function () {
    // Hide the remove profile picture section
    remove_profile_pic_convo.style.display = "none";

    // Show fail pop up
    message_popup_failed.style.display = "flex";
    failed_message_popup.innerHTML = "Profile Picture Removal Cancelled!";
    // hide the message after 3 seconds
    setTimeout(function () {
        message_popup_failed.style.display = "none";
    }, 3000);
});

// Add event listiner to remove_profile_pic_yes
remove_profile_pic_yes.addEventListener("click", function () {
    remove_profile_pic();
});

// Add event listiner to enable_bio_edit_btn
enable_bio_edit_btn.addEventListener("click", function () {
    // Hide the read bio section
    read_the_bio.style.display = "none";
    // Show the edit bio section
    edit_the_bio.style.display = "flex";
    // Show success pop up
    message_popup_success.style.display = "flex";
    success_message_popup.innerHTML = "You can now edit your bio!";
    // hide the message after 3 seconds
    setTimeout(function () {
        message_popup_success.style.display = "none";
    }, 3000);

});

// Add event listiner to bio_edit_btn_discard
bio_edit_btn_discard.addEventListener("click", function () {
    // Hide the edit bio section
    edit_the_bio.style.display = "none";
    bio_textarea.value = original_bio;
    // Show the read bio section
    read_the_bio.style.display = "flex";
    // Show fail pop up
    message_popup_failed.style.display = "flex";
    failed_message_popup.innerHTML = "Bio Edit Discarded!";
    // hide the message after 3 seconds
    setTimeout(function () {
        message_popup_failed.style.display = "none";
    }, 3000);
});

// Add event listiner to bio_edit_btn_update
bio_edit_btn_update.addEventListener("click", function () {
    // Check if the bio is empty
    if(bio_textarea.value == ""){
        // Show fail pop up
        message_popup_failed.style.display = "flex";
        failed_message_popup.innerHTML = "Bio cannot be empty!";
        // hide the message after 3 seconds
        setTimeout(function () {
            message_popup_failed.style.display = "none";
        }, 3000);
    }
    // Check if the bio is equal to the original bio
    else if(bio_textarea.value == original_bio){
        // Show fail pop up
        message_popup_failed.style.display = "flex";
        failed_message_popup.innerHTML = "No changes made to the bio!";
        // hide the message after 3 seconds
        setTimeout(function () {
            message_popup_failed.style.display = "none";
        }, 3000);
    }
    else {
        update_bio();
    }
});

// Add event listeners to other_det_inputs to show the inputs
for (let i = 0; i < other_det_inputs.length; i++) {

    // Update the original values
    original_fullname = other_det_fullname.value;
    original_secondary_email = other_det_secondary_email.value;
    original_company = other_det_company.value;
    original_location = other_det_location.value;
    original_website = other_det_website.value;

    other_det_inputs[i].addEventListener("input", function () {
        // Check if any input has been changed
        if(other_det_fullname.value !== original_fullname || other_det_secondary_email.value !== original_secondary_email || other_det_company.value !== original_company || other_det_location.value !== original_location || other_det_website.value !== original_website){
            // Show the save and discard buttons
            save_discard_all_dets.style.display = "flex";
        }
        else {
            // Hide the save and discard buttons
            save_discard_all_dets.style.display = "none";
        }

    });
}

// Add event listener to all_detail_btn_discard
all_detail_btn_discard.addEventListener("click", function () {
    // Show fail pop up
    message_popup_failed.style.display = "flex";
    failed_message_popup.innerHTML = "Detail Changes Discarded!";
    // Reset the values
    other_det_fullname.value = original_fullname_server;
    other_det_secondary_email.value = original_secondary_email_server;
    other_det_company.value = original_company_server;
    other_det_location.value = original_location_server;
    other_det_website.value = original_website_server;
    // hide the message after 3 seconds
    setTimeout(function () {
        message_popup_failed.style.display = "none";
        // Hide the save and discard buttons
        save_discard_all_dets.style.display = "none";
    }, 3000);
});

// Add event listener to all_detail_btn_update
all_detail_btn_update.addEventListener("click", function () {
    // Check if any input has been changed
    if(other_det_fullname.value !== original_fullname_server || other_det_secondary_email.value !== original_secondary_email_server || other_det_company.value !== original_company_server || other_det_location.value !== original_location_server || other_det_website.value !== original_website_server){

        // Check if secondary email is empty
        if(other_det_secondary_email.value != ""){
            // Check if secondary email is valid
            if(!validateEmail(other_det_secondary_email.value)){
                // Show fail pop up
                message_popup_failed.style.display = "flex";
                failed_message_popup.innerHTML = "Secondary email is not valid!";
                // hide the message after 3 seconds
                setTimeout(function () {
                    message_popup_failed.style.display = "none";
                }, 3000);
                return;
            }
        }

        // Check if website is empty
        if(other_det_website.value != ""){
            // Check if website is valid
            if(!validateWebsite(other_det_website.value)){
                // Show fail pop up
                message_popup_failed.style.display = "flex";
                failed_message_popup.innerHTML = "Website is not valid!";
                // hide the message after 3 seconds
                setTimeout(function () {
                    message_popup_failed.style.display = "none";
                }, 3000);
                return;
            }
        }

        // Check if company is empty
        if(other_det_company.value != ""){
            // check if company name is more than 20 characters
            if(other_det_company.value.length > 20){
                // Show fail pop up
                message_popup_failed.style.display = "flex";
                failed_message_popup.innerHTML = "Company name cannot be more than 20 characters!";
                // hide the message after 3 seconds
                setTimeout(function () {
                    message_popup_failed.style.display = "none";
                }, 3000);
                return;
            }
        }

        // Update all the details
        update_all_details();

    }
    else {
        // Show fail pop up
        message_popup_failed.style.display = "flex";
        failed_message_popup.innerHTML = "No changes made to the details!";
        // hide the message after 3 seconds
        setTimeout(function () {
            message_popup_failed.style.display = "none";
        }, 3000);
    }
});

// Function to upload the profile picture
function upload_profile_pic() {

    // Show spinner
    update_spinner.style.display = "flex";
    update_spinner_replaced.style.display = "none";

    // Disable the pointer events
    profile_pic_update.style.pointerEvents = "none";

    // First we create form data
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

            // Show icon
            update_spinner.style.display = "none";
            update_spinner_replaced.style.display = "flex";

            // Display the success pop up
            message_popup_success.style.display = "flex";
            success_message_popup.innerHTML = "Profile Picture Updated Successfully!";

            // Hide the success pop up after 2 seconds
            setTimeout(function(){
                message_popup_success.style.display = "none";

                // Change the profile picture
                original_profile_pic = response.profile_pic_url;
                // hide the initials and show the profile picture
                display_image_section_no_profile_picture.style.display = "none";
                new_profile_image_no_pic.style.display = "none";
                display_profile_image_img.style.display = "flex";
                current_displayed_profile_picture.style.display = "flex";
                // Set the profile picture
                current_displayed_profile_picture.src = original_profile_pic;
                display_profile_image_img.src = original_profile_pic;
                // Set home profile picture
                home_profile_image.innerHTML = `<img src="${original_profile_pic}" alt="logged-user">`
                
                // Reset the profile picture
                profile_file_input.value = "";
                // Hide discard and upload buttons
                profile_pic_discard.style.display = "none";
                profile_pic_update.style.display = "none";
                profile_pic_update.style.pointerEvents = "auto";
                // show the upload button
                profile_upload_btn.style.display = "flex";
                // Return instructions color to normal
                profile_image_checks[0].style.color = "#414141";
                profile_image_checks[1].style.color = "#414141";
            }, 4000);

        },
        error: function(error){

            // Hide spinner
            update_spinner.style.display = "none";
            update_spinner_replaced.style.display = "flex";

            // Display the fail pop up
            message_popup_failed.style.display = "flex";
            failed_message_popup.innerHTML = "Failed To Update Profile Picture! Please try again, and if the issue persists, contact our support team.";

            // Hide the fail pop up after 2 seconds
            setTimeout(function(){
                message_popup_failed.style.display = "none";

                // Return the original profile picture
                current_displayed_profile_picture.src = original_profile_pic;
                // Check if original profile picture is empty
                if(original_profile_pic == ""){
                    // Show initails and hide the profile picture
                    new_profile_image_no_pic.style.display = "flex";
                    current_displayed_profile_picture.style.display = "none";
                }
                else {
                    // hide the initials and show the profile picture
                    new_profile_image_no_pic.style.display = "none";
                    current_displayed_profile_picture.style.display = "flex";
                }

                // Reset the profile picture
                profile_file_input.value = "";
                // Hide discard and upload buttons
                profile_pic_discard.style.display = "none";
                profile_pic_update.style.display = "none";
                profile_pic_update.style.pointerEvents = "auto";
                // show the upload button
                profile_upload_btn.style.display = "flex";
                // Return instructions color to normal
                profile_image_checks[0].style.color = "#414141";
                profile_image_checks[1].style.color = "#414141";
            }, 4000);
            
        }
    });
}

// Function to remove the profile picture
function remove_profile_pic(){
    
    // Show spinner
    remove_profile_spinner.style.display = "flex";
    remove_profile_spinner_icon.style.display = "none";

    // Disable the pointer events
    remove_profile_pic_yes.style.pointerEvents = "none";

    // First we create form data
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

            // Show icon
            remove_profile_spinner.style.display = "none";
            remove_profile_spinner_icon.style.display = "flex";

            // enable the pointer events
            remove_profile_pic_yes.style.pointerEvents = "auto";

            // Display the success pop up
            message_popup_success.style.display = "flex";
            success_message_popup.innerHTML = "Profile Picture Removed Successfully!";

            // Hide the success pop up after 2 seconds
            setTimeout(function(){
                message_popup_success.style.display = "none";
                // Hide the remove profile picture section
                remove_profile_pic_convo.style.display = "none";

                // Hide the profile picture
                display_profile_image_img.style.display = "none";
                current_displayed_profile_picture.style.display = "none";
                // set url to empty
                display_profile_image_img.src = "";
                current_displayed_profile_picture.src = "";
                original_profile_pic = "";

                // Remove image from home
                let user_initials = sing_det_detail_username.innerHTML[0].toUpperCase();;
                home_profile_image.innerHTML = `<div class="profile_pic_absent"><span>${user_initials}</span></div>`

                // Show the initials
                display_image_section_no_profile_picture.style.display = "flex";
                new_profile_image_no_pic.style.display = "flex";
                
            }, 4000);

        },
        error: function(error){

            // Hide spinner
            remove_profile_spinner.style.display = "none";
            remove_profile_spinner_icon.style.display = "flex";

            // enable the pointer events
            remove_profile_pic_yes.style.pointerEvents = "auto";

            // Display the fail pop up
            message_popup_failed.style.display = "flex";
            failed_message_popup.innerHTML = "Failed To Remove Profile Picture! Please try again, and if the issue persists, contact our support team.";

            // Hide the fail pop up after 2 seconds
            setTimeout(function(){
                message_popup_failed.style.display = "none";
            }, 4000);   
        }
    });
}

// Function that updates the bio
function update_bio() {

    // Show spinner
    update_bio_spinner.style.display = "flex";
    update_spinner_rep_icon.style.display = "none";

    // Disable the pointer events
    bio_edit_btn_update.style.pointerEvents = "none";

    // First we create form data
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

            // Display the success pop up
            message_popup_success.style.display = "flex";
            success_message_popup.innerHTML = "Bio Updated Successfully!";

            // Show icon
            update_bio_spinner.style.display = "none";
            update_spinner_rep_icon.style.display = "flex";

            // enable the pointer events
            bio_edit_btn_update.style.pointerEvents = "auto";

            // Hide the success pop up after 2 seconds
            setTimeout(function(){
                message_popup_success.style.display = "none";

                // Change the bio
                original_bio = response.bio;
                // Set the bio
                inner_read_bio.innerHTML = original_bio;
                // Hide the edit bio section
                edit_the_bio.style.display = "none";
                // Show the read bio section
                read_the_bio.style.display = "flex";
            }, 4000);

        },
        error: function(error){

            // Display the fail pop up
            message_popup_failed.style.display = "flex";
            failed_message_popup.innerHTML = "Failed To Update Bio! Please try again, and if the issue persists, contact our support team.";

            // Show icon
            update_bio_spinner.style.display = "none";
            update_spinner_rep_icon.style.display = "flex";

            // enable the pointer events
            bio_edit_btn_update.style.pointerEvents = "auto";

            // Hide the fail pop up after 2 seconds
            setTimeout(function(){
                message_popup_failed.style.display = "none";
            }, 4000);
            
        }
    });
}

// Function that validates the email
function validateEmail(email) {
    // Regex for email validation
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Function that validates the website
function validateWebsite(website) {
    // Regex for website validation
    let re = /^(http|https):\/\/[^ "]+$/;
    return re.test(website);
}

// Function that updates all the other details
function update_all_details() {

    // Show spinner
    update_detail_spinner.style.display = "flex";
    update_spinner_detail_icon.style.display = "none";

    // Disable the pointer events
    all_detail_btn_update.style.pointerEvents = "none";

    // First we create form data
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

            // Display the success pop up
            message_popup_success.style.display = "flex";
            success_message_popup.innerHTML = "Details Updated Successfully!";

            // Show icon
            update_detail_spinner.style.display = "none";
            update_spinner_detail_icon.style.display = "flex";

            // enable the pointer events
            all_detail_btn_update.style.pointerEvents = "auto";

            // Hide the success pop up after 2 seconds
            setTimeout(function(){
                message_popup_success.style.display = "none";

                // Change the details
                original_fullname_server = response.fullname;
                original_secondary_email_server = response.secondary_email;
                original_company_server = response.company;
                original_location_server = response.location;
                original_website_server = response.website;

                // Set the details
                other_det_fullname.value = original_fullname_server;
                other_det_secondary_email.value = original_secondary_email_server;
                other_det_company.value = original_company_server;
                other_det_location.value = original_location_server;
                other_det_website.value = original_website_server;

                // Update the original values
                original_fullname = other_det_fullname.value;
                sing_det_detail_fullname.innerHTML = other_det_fullname.value;
                original_secondary_email = other_det_secondary_email.value;
                original_company = other_det_company.value;
                original_location = other_det_location.value;
                original_website = other_det_website.value;

                // Hide the save and discard buttons
                save_discard_all_dets.style.display = "none";
            }, 4000);

        },
        error: function(error){

            // Display the fail pop up
            message_popup_failed.style.display = "flex";
            failed_message_popup.innerHTML = "Failed To Update Details! Please try again, and if the issue persists, contact our support team.";

            // Show icon
            update_detail_spinner.style.display = "none";
            update_spinner_detail_icon.style.display = "flex";

            // enable the pointer events
            all_detail_btn_update.style.pointerEvents = "auto";

            // Hide the fail pop up after 2 seconds
            setTimeout(function(){
                message_popup_failed.style.display = "none";
            }, 4000);

        }
    });
}