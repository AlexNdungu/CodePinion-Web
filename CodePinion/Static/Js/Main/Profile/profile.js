// Get all the required items
let profile_upload_btn = document.getElementById("profile_pic_input_btn");
let profile_file_input = document.getElementById("profile_pic_input");

// Add event listener to the upload button
profile_upload_btn.addEventListener("click", function () {
    profile_file_input.click();
});