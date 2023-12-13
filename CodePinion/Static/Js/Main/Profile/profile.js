// Get message popup
let message_popup_success = document.getElementById("message_popup_success");
let success_message_popup = document.getElementById("success_message_popup");
let message_popup_failed = document.getElementById("message_popup_failed");
let failed_message_popup = document.getElementById("failed_message_popup");
// Get all the required items
let csrf = document.getElementsByName('csrfmiddlewaretoken');
let select_profile_pic_section = document.getElementById("select_profile_pic_section");
let profile_upload_btn = document.getElementById("profile_pic_input_btn");
let profile_file_input = document.getElementById("profile_pic_input");
let profile_image_checks = document.getElementsByClassName("profile_image_check");
let profile_pic_discard = document.getElementById("profile_pic_discard");
let profile_pic_update = document.getElementById("profile_pic_update");
let update_spinner = document.getElementById("update_spinner");
let update_spinner_replaced = document.getElementById("update_spinner_replaced");
let current_displayed_profile_picture = document.getElementById("current_displayed_profile_picture");
let display_profile_image_img = document.getElementById("display_profile_image_img");
let home_profile_image = document.getElementById("logged-user-image");
//
let original_profile_pic = current_displayed_profile_picture.src;
let profile_pic = null;

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
                display_profile_image_img.src = response.profile_pic;
                home_profile_image.innerHTML = `<img src="${response.profile_pic}" alt="logged-user">`
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