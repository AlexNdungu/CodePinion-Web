// Get message popup
let message_popup_success = document.getElementById("message_popup_success");
let success_message_popup = document.getElementById("success_message_popup");
let message_popup_failed = document.getElementById("message_popup_failed");
let failed_message_popup = document.getElementById("failed_message_popup");
// Get all the required items
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
//
let profile_pic = null;

// onload function
window.onload = function () {
    // Set the profile picture url
    display_image_section_no_profile_picture.src = original_profile_pic;
    new_profile_image_no_pic.src = original_profile_pic;
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
                display_profile_image_img.src = response.profile_pic_url;
                home_profile_image.innerHTML = `<img src="${response.profile_pic_url}" alt="logged-user">`
                original_profile_pic = response.profile_pic_url;
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