//Get all the elements required for the demo
let bug_title_input = document.getElementById("bug_title_input");
let report_bug_btn = document.getElementById("report_bug_btn");
let csrf = document.getElementsByName('csrfmiddlewaretoken');

// Values to be posted
let bug_title = null;
let bug_body = null;
let bug_screenshot = null;
let report_bug_now = document.getElementById("report_bug_to_admin");

// Here we will give the rich text its fuctionality
const richButtons = document.querySelectorAll('.btnOption');
// Rich text editor section
let bodyText = document.getElementById('bodyText');
let bodyTextContent = document.getElementById('richEdit');
let bodyTextReview = document.getElementById('bodyTextReview');
let EditRechTextBtn = document.getElementById('edit_rich_text');
let ReviewRechTextBtn = document.getElementById('review_rich_text');

// Bug screen shot section
let bug_shot = document.getElementById('bug_shot');
let retake_shot = document.getElementById('retake_btn');

// Discard report section
let discard_bug_report_btns = document.getElementsByClassName('discard_bug_report');
// Pop ups
let success_pop = document.getElementById('message_popup_success');
let success_pop_msg = document.getElementById('success_message_popup');
let fail_pop = document.getElementById('message_popup_failed');
let fail_pop_msg = document.getElementById('failed_message_popup');

// Display all the bugs
let see_all_bugs_section = document.getElementById('see_all_bugs_section');
let bug_min_menu_btns = document.getElementsByClassName('bug_min_menu');
let pending_bug_number_on_btn = document.getElementById('pending_bug_number_on_btn');
let fixed_bug_number_on_btn = document.getElementById('fixed_bug_number_on_btn');
let view_status_section = document.getElementById('view_status_section');
let show_which_status_in_view_bugs = document.getElementById('show_which_status_in_view_bugs');
let requested_bug_count = document.getElementById('requested_bug_count');


// Rich text editor
richButtons.forEach(richBtn => {
    richBtn.addEventListener('click', () => {

        let myEvent = richBtn.dataset['command'];
        
        //document.execCommand(myEvent, false, null);

        if(myEvent === 'createLink'){
            let url = prompt('Insert Link Here');
            document.execCommand(myEvent, false, url);
        }
        else if(myEvent === 'formatBlock'){
            let formattingValue = richBtn.dataset['block'];
            document.execCommand(myEvent, false, formattingValue);
        }
        else{
            document.execCommand(myEvent, false, null);
        }


    });
});

// Add click event to retake_shot
retake_shot.addEventListener("click", function () {
    // Remove the canvas from bug_shot
    bug_shot.innerHTML = "";

    // Call the screenshot function
    takeScreenShot();
});

// Add click event to EditRechTextBtn
EditRechTextBtn.addEventListener("click", function () {
    edit_rich_text();
});

// Add click event to ReviewRechTextBtn
ReviewRechTextBtn.addEventListener("click", function () {
    review_rich_text();
});

//Add event listeners
report_bug_btn.addEventListener("click", function () {

    document.getElementById("report_bug_section").style.display = "flex";
    
    // Take the screenshot
    takeScreenShot();
});

// Add click event to all the discard_bug_report_btns
for (let i = 0; i < discard_bug_report_btns.length; i++) {
    discard_bug_report_btns[i].addEventListener("click", function () {
        discard_report();
    });
}

// Add event listiner to view all bugs button
for (let i = 0; i < bug_min_menu_btns.length; i++) {
    bug_min_menu_btns[i].addEventListener("click", function () {

        // Call the display bugs function
        display_bugs(bug_min_menu_btns[i].id);

    })
}
        
// The screenshot function
function takeScreenShot(){
    html2canvas(document.getElementById('the_editor')).then(function (canvas) {
        
        // Append canvas to bug_shot
        bug_shot.appendChild(canvas);

        bug_screenshot = canvas.toDataURL();

    });
    return bug_screenshot;
}

// Review RichText
function review_rich_text(){
    // Get all the inner html of the bodyText
    let bodyTextHtml = bodyTextContent.innerHTML;

    // Check if the bodyTextHtml is empty
    if (bodyTextHtml == ""){
        bodyTextReview.innerHTML = "No Content To Review ...";
    }
    else{
        // Set the inner html of the bodyTextReview
        bodyTextReview.innerHTML = bodyTextHtml;
    }
    
    // Hide the rich text editor
    bodyText.style.display = "none";
    // Show the review rich text
    bodyTextReview.style.display = "flex";
    // Remove from EditRechTextBtn class wrr_btn_color
    EditRechTextBtn.classList.remove("wrr_btn_color");
    // Add to ReviewRechTextBtn class wrr_btn_color
    ReviewRechTextBtn.classList.add("wrr_btn_color");
}

// Edit RichText
function edit_rich_text(){
    // Hide the review rich text
    bodyTextReview.style.display = "none";
    // Show the rich text editor
    bodyText.style.display = "flex";
    // Remove from ReviewRechTextBtn class wrr_btn_color
    ReviewRechTextBtn.classList.remove("wrr_btn_color");
    // Add to EditRechTextBtn class wrr_btn_color
    EditRechTextBtn.classList.add("wrr_btn_color");
}

// Discard report
function discard_report(){
    // set bug_title_input value to empty
    bug_title_input.value = "";
    // set bodyTextContent inner html to empty
    bodyTextContent.innerHTML = "";
    // set bodyTextReview inner html to empty
    bodyTextReview.innerHTML = "No Content To Review ...";
    // Remove from ReviewRechTextBtn class wrr_btn_color
    ReviewRechTextBtn.classList.remove("wrr_btn_color");
    // Add to EditRechTextBtn class wrr_btn_color
    EditRechTextBtn.classList.add("wrr_btn_color");
    // Remove the canvas from bug_shot
    bug_shot.innerHTML = "";
    // Hide the whole report bug section
    document.getElementById("report_bug_section").style.display = "none";
}

// Display bugs
function display_bugs(status){

    let status_is = status.split("-");
    let firstWord_status = status_is[0];

    // Display flex the see_all_bugs_section
    see_all_bugs_section.style.display = "flex";

    // Check status
    if(firstWord_status == "pending"){

        show_which_status_in_view_bugs.innerHTML = "Pending";
        // Change theme according to status
        view_status_section.classList.remove("view_status_fixed");
        view_status_section.classList.add("view_status_pending");
    }
    else if(firstWord_status == "fixed"){

        show_which_status_in_view_bugs.innerHTML = "Fixed";
        // Change theme according to status
        view_status_section.classList.remove("view_status_pending");
        view_status_section.classList.add("view_status_fixed");        
    }

    // Fetch bugs
    fetch_bugs(firstWord_status);

}

// Fetch bugs 
function fetch_bugs(status){
    
    // First we create form data
    let formData = new FormData();

    //Append the csrf token
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('bug_status', status);
    // formData.append('filter_applied', None);

    $.ajax({
        type:'POST',
        url:'/fetchBugs/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            console.log(response.bugs);

            // Set requested_bug_count to response.bug_count
            requested_bug_count.innerHTML = response.bug_count;

            // Empty the table
            $('#view_bugs_table tr:not(:first)').remove();

            const bugs = response.bugs;

            if(bugs.length > 0){

                for(let oneBug = 0; oneBug < bugs.length; oneBug++){
                    
                    let bugBody = `
                        <tr>
                            <!--Bug id-->
                            <td>${bugs[oneBug].bug_id}</td>
                            <!--Bug titkle-->
                            <td>${bugs[oneBug].bug_title.length > 20 ? `${bugs[oneBug].bug_title.slice(0,20)}...`:`${bugs[oneBug].bug_title}`}</td>
                            <!--The owner of the bug-->
                            <td>
                                <div class="bug_owner_image_name">

                                ${bugs[oneBug].bug_reporter_is_superuser ? 

                                    `
                                        <!--Admin is user-->
                                        <div class="bug_owner_admin">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 19h14v3h-14v-3zm17-12c-1.326 0-2.294 1.272-1.924 2.54.611 2.091-6.357 4.068-7.386-1.604-.262-1.444.021-1.823.728-2.532.359-.36.582-.855.582-1.404 0-1.104-.896-2-2-2s-2 .896-2 2c0 .549.223 1.045.582 1.403.706.71.989 1.089.728 2.532-1.029 5.675-7.996 3.694-7.386 1.604.37-1.267-.598-2.539-1.924-2.539-1.104 0-2 .896-2 2 0 1.22 1.082 2.149 2.273 1.98 1.635-.23 2.727 4.372 2.727 6.02h14c0-1.65 1.092-6.25 2.727-6.019 1.191.168 2.273-.761 2.273-1.981 0-1.104-.896-2-2-2z"/></svg>
                                        </div>
                                        <!--Bug owner is admin-->
                                        <div class="bug_owner_name">
                                            <span>Admin</span>
                                        </div>
                                    ` 

                                : 

                                    `${bugs[oneBug].bug_reporter_prof_pic != "False" ? 
                                    `
                                        <!--The profile image-->
                                        <div class="bug_owner_image">
                                            <img src="${bugs[oneBug].bug_reporter_prof_pic}" alt="bug_owner">
                                        </div>
                                        <!--Bug owner is admin-->
                                        <div class="bug_owner_name">
                                            <span>${bugs[oneBug].bug_reporter}</span>
                                        </div>

                                    ` 
                                    : 
                                        `
                                        <!--User without profile-->
                                        <div class="bug_owner_noimage">
                                            <span>${bugs[oneBug].bug_reporter.charAt(0)}</span>
                                        </div>
                                        <!--Bug owner is admin-->
                                        <div class="bug_owner_name">
                                            <span>${bugs[oneBug].bug_reporter}</span>
                                        </div>
                                        `
                                }`

                                }

                                </div>
                            </td>
                            <!--Date-->
                            <td>${bugs[oneBug].bug_update}</td>
                            <!--Bug  buttons-->
                            <td>
                                <!--View-->
                                <div class="access_edit_bug_details">
                                    <div class="access_edit_btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                                    </div>
                                    ${bugs[oneBug].bug_reporter_is_current_user ? 
                                        `
                                        <!--Edit-->
                                        <div class="access_edit_btn">
                                            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fill-rule="nonzero"/></svg>
                                        </div>` : ''
                                    }
                                    
                                </div>
                                
                            </td>
                            
                        </tr>

                    `

                    // Append the bugBody to the table
                    $("#view_bugs_table").append(bugBody);

                }

            }
            else{

            }


        },
        error: function(error){

        }
    });  
    
    
}

// add event listener to report_bug_now
// Post the bug report to the server
report_bug_now.addEventListener("click", function () {

    // Get the title and body values
    bug_title = bug_title_input.value;
    bug_body = bodyTextContent.innerHTML;

    // First we create form data
    let formData = new FormData();

    // Append the csrf token
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    // Append the screenshot
    formData.append('screenshot', bug_screenshot);
    formData.append('title', bug_title);
    formData.append('body', bug_body);

    $.ajax({
        type:'POST',
        url:'/reportBug/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            
            // Display the success pop up
            success_pop.style.display = "flex";
            success_pop_msg.innerHTML = "Bug Reported Successfully!";

            // Add 1 to the number of bugs reported
            pending_bug_number_on_btn.innerHTML = Number(pending_bug_number_on_btn.innerHTML) + 1;
            
            // Hide the whole report bug section and the pop up after 2 seconds
            setTimeout(function(){
                success_pop.style.display = "none";
                document.getElementById("report_bug_section").style.display = "none";
            }, 2000);
           
        },
        error: function(error){

            // Display the fail pop up
            fail_pop.style.display = "flex";
            fail_pop_msg.innerHTML = "Failed To Report Bug! Please try again, and if the issue persists, contact our support team.";

            // Hide the whole report bug section and the pop up after 2 seconds
            setTimeout(function(){
                fail_pop.style.display = "none";
                document.getElementById("report_bug_section").style.display = "none";
            }, 2000);
            
        }
    });  
    
});