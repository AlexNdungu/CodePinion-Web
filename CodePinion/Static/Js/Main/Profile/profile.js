// Get message popup
let message_popup_success = document.getElementById("message_popup_success");
let success_message_popup = document.getElementById("success_message_popup");
let message_popup_failed = document.getElementById("message_popup_failed");
let failed_message_popup = document.getElementById("failed_message_popup");
// Get all the required items
let profile_upload_btn = document.getElementById("profile_pic_input_btn");
let profile_file_input = document.getElementById("profile_pic_input");
let profile_image_checks = document.getElementsByClassName("profile_image_check");

// Add event listener to the upload button
profile_upload_btn.addEventListener("click", function () {
    profile_file_input.click();
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
                }

                return;
            }

            // profile_upload_btn.innerHTML = "Uploading...";
            // upload_profile_pic(file);
        }
    }
});