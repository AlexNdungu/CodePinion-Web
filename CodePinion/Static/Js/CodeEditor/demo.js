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
let close_bug_view_btn = document.getElementById('close_bug_view_btn');
// Filters
let filter_select = false;
let filter_apply = 'All';
let select_any_filters = document.getElementsByClassName('select_any_filter');
let filter_bugs_from_status = document.getElementById('filter_bugs_from_status');
let filter_selection_section = document.getElementById('filter_selection_section');

// Display one bug
let bug_id_and_date = document.getElementById('bug_id_and_date');
let edit_bug_id_number = document.getElementById('edit_bug_id_number');
let edit_bug_date = document.getElementById('edit_bug_date');
let is_report_or_update_btn = document.getElementById('is_report_or_update_btn'); // display report or update depending on the activity
//
let one_details_close = document.getElementById('one_details_close');
let one_detail_id_display = document.getElementById('one_detail_id_display');
let one_detail_status_theme = document.getElementById('one_detail_status_theme');
let one_detail_status_display = document.getElementById('one_detail_status_display');
let one_detail_date_display = document.getElementById('one_detail_date_display');
let one_detail_title_display = document.getElementById('one_detail_title_display');
let one_detail_screenshot_display = document.getElementById('one_detail_screenshot_display');
let one_detail_desc_display = document.getElementById('one_detail_desc_display');
let one_detail_userimage_display = document.getElementById('one_detail_userimage_display');
let one_detail_user_image_display = document.getElementById('one_detail_user_image_display');
let one_detail_user_noimage_display = document.getElementById('one_detail_user_noimage_display');
let one_detail_user_noimage_display_first = document.getElementById('one_detail_user_noimage_display_first');
let one_detail_admin_display = document.getElementById('one_detail_admin_display');
let bug_editor_lock = document.getElementById('bug_editor_lock');
let bug_edit_btn = document.getElementById('bug_edit_btn');

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
    // call use_report_bug_section
    use_report_bug_section('post',null);
});

// Add click event to close_bug_view_btn
close_bug_view_btn.addEventListener("click", function () {
    close_display_bugs();
});

// Add click event to close view one bug section
one_details_close.addEventListener("click", function () {
    // Hide the whole report bug section
    document.getElementById("see_one_bug_section").style.display = "none";
})

// add click event to edit a single bug
bug_edit_btn.addEventListener("click", function () {
    // call use_report_bug_section
    use_report_bug_section('edit',one_detail_id_display.innerHTML);
    // Hide the view one bug section
    document.getElementById("see_one_bug_section").style.display = "none";
})

// Add click event to all the discard_bug_report_btns
for (let i = 0; i < discard_bug_report_btns.length; i++) {
    discard_bug_report_btns[i].addEventListener("click", function () {
        discard_report();
    });
}

// Add event listiner to view all bugs button
for (let i = 0; i < bug_min_menu_btns.length; i++) {
    bug_min_menu_btns[i].addEventListener("click", function () {

        // Filter is get all bugs
        filter_apply = 'All';
        // remove the class filter_bugs_theme from any select_any_filters btn and add it to the all filter
        for (let i = 0; i < select_any_filters.length; i++) {
            select_any_filters[i].classList.remove("filter_bugs_theme");
        }
        select_any_filters[2].classList.add("filter_bugs_theme");

        // Call the display bugs function
        display_bugs(bug_min_menu_btns[i].id,filter_apply);

    })
}

// Add click event to filter_bugs_from_status and show filter selection section
filter_bugs_from_status.addEventListener("click", function () {

    if(filter_select == false){
        // Display the filter_selection_section
        filter_selection_section.style.display = "flex";
        // Add filter_bugs_theme class to filter_bugs_from_status
        filter_bugs_from_status.classList.add("filter_bugs_theme");
        filter_select = true;
    }
    else{
        // Hide the filter_selection_section
        filter_selection_section.style.display = "none";
        // Remove filter_bugs_theme class to filter_bugs_from_status
        filter_bugs_from_status.classList.remove("filter_bugs_theme");
        filter_select = false;
    }
    
})

// Add event listener to select_any_filters
for (let i = 0; i < select_any_filters.length; i++) {
    select_any_filters[i].addEventListener("click", function () {

        // remove the class filter_bugs_theme from any select_any_filters btn and add it to the clicked one
        for (let i = 0; i < select_any_filters.length; i++) {
            select_any_filters[i].classList.remove("filter_bugs_theme");
        }
        select_any_filters[i].classList.add("filter_bugs_theme");

        //get the span inside the select_any_filters[i]
        let filter_span = select_any_filters[i].getElementsByTagName('span')[0];
        let status = '';

        if(show_which_status_in_view_bugs.innerHTML == "Pending"){
            status = 'pending-btn';
        }
        else if(show_which_status_in_view_bugs.innerHTML == "Fixed"){
            status = 'fixed-btn';
        }

        // Hide the filter_selection_section
        filter_selection_section.style.display = "none";
        filter_select = false;
        // Remove filter_bugs_theme class to filter_bugs_from_status
        filter_bugs_from_status.classList.remove("filter_bugs_theme");

        // Call the display bugs function
        display_bugs(status,filter_span.innerHTML)

    })
}

// use report_bug_section function
function use_report_bug_section(activity,bug_id){

    // Show the whole report bug section
    document.getElementById("report_bug_section").style.display = "flex";

    if(activity == 'post'){
        // Take the screenshot
        takeScreenShot();
    }
    else if(activity == 'edit'){
        prep_report_bug_section_for_edit(bug_id)
    }

}
        
// The screenshot function
function takeScreenShot(){

    // show retake screenshot button
    retake_shot.style.display = "flex";
    
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
    bug_screenshot = null;
    // Hide edit bug date and id
    bug_id_and_date.style.visibility = "hidden";
    // Change activity to report
    is_report_or_update_btn.innerHTML = "Report";
    // Hide the whole report bug section
    document.getElementById("report_bug_section").style.display = "none";
}

// create table content
function create_table_content(){
    // Empty the table and append the heading
    $('#view_bugs_table').empty();
    let tableHeading = 
    `
    <!--The heading-->
    <thead>
        <tr>
            <th>Bug ID</th>
            <th>Title</th>
            <th>User</th>
            <th>Date</th>
            <th>&nbsp;</th>
        </tr>
    </thead>

    <!--The body-->
    <tbody id="bug_table_body">
    </tbody>
    `
    $("#view_bugs_table").append(tableHeading);
}

// Create the row dummies
function create_row_dummies(){
    // Get the skeleton dummy and the tab;e
    let row_dummy = 
    `
        <tr id="skeleton_loader_dummy">
            <!--Bug id-->
            <td><div class="skele_id skeleton_animation"></div></td>
            <!--Bug titkle-->
            <td><div class="skele_title skeleton_animation"></td>
            <!--The owner of the bug-->
            <td>
                <div class="bug_owner_image_name">

                    <div class="skeleton_user_image skeleton_animation"></div>
                    <div class="skeleton_user_name skeleton_animation"></div>
                    
                </div>
            </td>
            <!--Date-->
            <td><div class="skele_date skeleton_animation"></td>
            <!--Bug  buttons-->
            <td>
                <!--View-->
                <div class="access_edit_bug_details">
                    <div class="skele_access_edit_btn skeleton_animation">
                    </div>
                    <!--Edit-->
                    <div class="skele_access_edit_btn skeleton_animation">
                    </div>
                </div>
                
            </td>
            
        </tr>
    `

    $('#bug_table_body').empty();

    // Create 9 skeleton loaders and append them to the table
    for (let i = 0; i < 10; i++) {
        // append the row dummy
        $('#bug_table_body').append(row_dummy);
    }
}
create_row_dummies();

// Function close the report bug section
function close_display_bugs() {

    // Create table content
    create_table_content();
    // Display none the see_all_bugs_section
    see_all_bugs_section.style.display = "None";

    // Call the dummy function
    create_row_dummies();
}

// Display bugs
function display_bugs(status,filter_apply){

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
    fetch_bugs(firstWord_status,filter_apply);

}

// display one bug
function view_bug_details(bug_id){
   
    //Hide the view_bugs_table
    //close_display_bugs();

    // First we create form data
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('bug_id', bug_id);

    $.ajax({
        type:'POST',
        url:'/fetchABug/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            // Display the whole report bug section
            document.getElementById("see_one_bug_section").style.display = "flex";

            // Set all the data
            one_detail_id_display.innerHTML = response.bug.bug_id;
            one_detail_date_display.innerHTML = response.bug.bug_date;
            one_detail_title_display.innerHTML = response.bug.bug_title;
            one_detail_desc_display.innerHTML = response.bug.bug_desc;
            one_detail_screenshot_display.src = response.bug.bug_screenshot;
            // Set theme
            if(response.bug.bug_status == true){
                one_detail_status_theme.classList.remove('one_detail_status_pending');
                one_detail_status_theme.classList.add('one_detail_status_fixed');
                one_detail_status_display.innerHTML = "Fixed";
            }
            else{
                one_detail_status_theme.classList.remove('one_detail_status_fixed');
                one_detail_status_theme.classList.add('one_detail_status_pending');
                one_detail_status_display.innerHTML = "Pending";
            }

            // Check if reporter is admin
            if(response.bug.bug_reporter_is_superuser == true){
                one_detail_admin_display.style.display = "flex";
                one_detail_userimage_display.style.display = "none";
                one_detail_user_noimage_display.style.display = "none";
            }
            else{
                one_detail_admin_display.style.display = "none";

                // Check if user has profile image
                if(response.bug.bug_reporter_prof_pic != "False"){
                    one_detail_userimage_display.style.display = "flex";
                    one_detail_user_noimage_display.style.display = "none";
                    one_detail_user_image_display.src = response.bug.bug_reporter_prof_pic;
                }
                else{
                    one_detail_userimage_display.style.display = "none";
                    one_detail_user_noimage_display.style.display = "flex";
                    one_detail_user_noimage_display_first.innerHTML = response.bug.bug_reporter[0];
                }
            }

            // Check if current user is the reporter
            if(response.bug.bug_reporter_is_current_user == true){
                bug_editor_lock.style.display = "none";
            }
            else{
                bug_editor_lock.style.display = "flex";
            }
  
        },
        error: function(error){
            // Display the fail pop up
            fail_pop.style.display = "flex";
            fail_pop_msg.innerHTML = "Failed To Ferch Bug! Please try again, and if the issue persists, contact our support team.";

            // Hide the whole report bug section and the pop up after 2 seconds
            setTimeout(function(){
                fail_pop.style.display = "none";
                // document.getElementById("report_bug_section").style.display = "none";
            }, 2000);
            
        }
    }); 

}

// Fetch bugs 
function fetch_bugs(status,filter_apply){
    
    // First we create form data
    let formData = new FormData();

    //Append the csrf token
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('bug_status', status);
    formData.append('filter_applied', filter_apply);

    $.ajax({
        type:'POST',
        url:'/fetchBugs/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            // Create table content since previous request might have been empty
            create_table_content();

            // Set requested_bug_count to response.bug_count
            requested_bug_count.innerHTML = response.bug_count;

            const bugs = response.bugs;

            if(bugs.length > 0){

                // Empty the table
                $('#bug_table_body').empty();

                for(let oneBug = 0; oneBug < bugs.length; oneBug++){
                    
                    let bugBody = `
                        <tr>
                            <!--Bug id-->
                            <td class="view_bug_id" >${bugs[oneBug].bug_id}</td>
                            <!--Bug titkle-->
                            <td>${bugs[oneBug].bug_title.length > 25 ? `${bugs[oneBug].bug_title.slice(0,25)}...`:`${bugs[oneBug].bug_title}`}</td>
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
                                    <div class="access_edit_btn access_edit_btn_View">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                                    </div>
                                    ${bugs[oneBug].bug_reporter_is_current_user ? 
                                        `
                                        <!--Edit-->
                                        <div class="access_edit_btn access_edit_btn_Edit">
                                            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fill-rule="nonzero"/></svg>
                                        </div>` : ''
                                    }
                                    
                                </div>
                                
                            </td>
                            
                        </tr>

                    `;
                    // Append the bugBody to the table
                    $("#bug_table_body").append(bugBody);

                }

                // call click edit on list function
                click_edit_on_list();

            }
            else{

                $('#view_bugs_table').empty();

                let bugQueryEmpty =
                 `
                 <!--The table is empty-->
                 <div class="when_bug_table_is_empty">
                     <svg class="animated" id="freepik_stories-empty" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" version="1.1" xmlns:svgjs="http://svgjs.com/svgjs"><style>svg#freepik_stories-empty:not(.animated) .animable {opacity: 0;}svg#freepik_stories-empty.animated #freepik--background-simple--inject-63 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) zoomIn;animation-delay: 0s;}svg#freepik_stories-empty.animated #freepik--Plants--inject-63 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) fadeIn;animation-delay: 0s;}svg#freepik_stories-empty.animated #freepik--Shelf--inject-63 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) fadeIn;animation-delay: 0s;}svg#freepik_stories-empty.animated #freepik--Boxes--inject-63 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) lightSpeedRight;animation-delay: 0s;}svg#freepik_stories-empty.animated #freepik--hand-truck--inject-63 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) lightSpeedRight;animation-delay: 0s;}svg#freepik_stories-empty.animated #freepik--Floor--inject-63 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) zoomOut;animation-delay: 0s;}svg#freepik_stories-empty.animated #freepik--Character--inject-63 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) zoomOut;animation-delay: 0s;}            @keyframes zoomIn {                0% {                    opacity: 0;                    transform: scale(0.5);                }                100% {                    opacity: 1;                    transform: scale(1);                }            }                    @keyframes fadeIn {                0% {                    opacity: 0;                }                100% {                    opacity: 1;                }            }                    @keyframes lightSpeedRight {              from {                transform: translate3d(50%, 0, 0) skewX(-20deg);                opacity: 0;              }              60% {                transform: skewX(10deg);                opacity: 1;              }              80% {                transform: skewX(-2deg);              }              to {                opacity: 1;                transform: translate3d(0, 0, 0);              }            }                    @keyframes zoomOut {                0% {                    opacity: 0;                    transform: scale(1.5);                }                100% {                    opacity: 1;                    transform: scale(1);                }            }        </style><g id="freepik--background-simple--inject-63" class="animable" style="transform-origin: 254.593px 237.305px;"><path d="M101.17,344.29s40.41,51.17,109.47,53.25,130.82-41,181.77-74.52,67.67-89.68,42.23-136-71.6-30.45-127-63S242.31,74.4,178,77.32,60.54,148.92,62.88,225.86,101.17,344.29,101.17,344.29Z" style="fill: rgb(64, 108, 238); transform-origin: 254.593px 237.305px;" id="el8xwl6kp0bw8" class="animable"></path><g id="el0xppx2gx803g"><path d="M101.17,344.29s40.41,51.17,109.47,53.25,130.82-41,181.77-74.52,67.67-89.68,42.23-136-71.6-30.45-127-63S242.31,74.4,178,77.32,60.54,148.92,62.88,225.86,101.17,344.29,101.17,344.29Z" style="fill: rgb(255, 255, 255); opacity: 0.7; transform-origin: 254.593px 237.305px;" class="animable"></path></g></g><g id="freepik--Plants--inject-63" class="animable" style="transform-origin: 113.579px 157.342px;"><path d="M113.73,91.08c-.06,0,.7-3.73.77-4,.86-2.67,4.1-7.31,7.23-7.3A3.71,3.71,0,0,1,125.3,84c-.23,2.2-2.21,4.08-4,5.16C119.2,90.47,113.73,91.08,113.73,91.08Z" style="fill: rgb(64, 108, 238); transform-origin: 119.531px 85.43px;" id="elrncxxyoywdd" class="animable"></path><path d="M107.66,66c3,1.06,4.42,6.52,4.32,9.32,0,.24-.56,4-.61,4l-.06,0c.23.86.48,1.79.73,2.81.44,1.88.92,4,1.29,6.36a65.63,65.63,0,0,1,.84,7.64,48.28,48.28,0,0,1-.29,8.6.36.36,0,0,0,0,.1c.39-.83,1.55-3.13,1.65-3.29,1.54-2.34,5.88-6,8.91-5.13a3.7,3.7,0,0,1,2.32,5c-.8,2.06-3.2,3.35-5.21,3.92-2.27.65-7.33-.11-7.73-.18a65.43,65.43,0,0,1-1.86,8.57q-.7,2.46-1.52,4.91c.35-.71.68-1.34.73-1.42,1.54-2.35,5.89-6,8.91-5.13a3.7,3.7,0,0,1,2.32,5c-.8,2.06-3.2,3.35-5.21,3.92s-6.37,0-7.51-.15l-.63,1.88c-1,3-2.09,6-3,8.94-.33,1-.62,2.08-.91,3.12.32-.63.59-1.16.64-1.24,1.53-2.34,5.88-6,8.9-5.13a3.72,3.72,0,0,1,2.33,5c-.8,2.07-3.21,3.35-5.22,3.93s-5.94.07-7.3-.12c-.27,1.07-.53,2.14-.74,3.19-.13.73-.3,1.41-.39,2.14l-.3,2.15c-.14,1.37-.3,2.78-.4,4.12-.08.93-.14,1.82-.2,2.72.32-1,1-3.07,1-3.23a14.42,14.42,0,0,1,4.8-5.46,3.63,3.63,0,0,1,.41-.72,3.7,3.7,0,0,1,5.45-.85c2.38,2.05,1.78,7.67.69,10.25-.06.15-.95,1.72-1.52,2.71.43-.53.83-1.05,1.28-1.58.87-1.07,1.77-2.11,2.73-3.23l1.47-1.59c.48-.54,1.06-1,1.59-1.59,1.25-1.21,2.58-2.38,3.95-3.53-.93-.76-4.21-3.52-5.15-5.4s-1.61-4.51-.63-6.5a3.72,3.72,0,0,1,5.27-1.67c2.65,1.67,2.92,7.32,2.23,10,0,.17-.76,2.06-1.17,3.09.83-.68,1.65-1.36,2.51-2,2.48-1.91,5.05-3.78,7.6-5.65l2.33-1.72c-.33-.27-4.29-3.47-5.35-5.58-.93-1.87-1.61-4.51-.63-6.49a3.71,3.71,0,0,1,5.27-1.67c2.66,1.66,2.92,7.31,2.23,10-.05.2-1.08,2.92-1.37,3.6,1.7-1.27,3.39-2.55,5-3.89a64.65,64.65,0,0,0,6.2-5.77c-.15-.13-4.3-3.45-5.38-5.6-.94-1.87-1.61-4.52-.63-6.5a3.71,3.71,0,0,1,5.26-1.67c2.66,1.67,2.93,7.32,2.24,10,0,.18-.83,2.25-1.22,3.23l.15.1a48.44,48.44,0,0,0,5.09-6.84c.84-1.33,1.56-2.64,2.24-3.93-.84-.54-4.63-3.05-5.82-4.88s-2.09-4.31-1.34-6.39a3.71,3.71,0,0,1,5.05-2.24c2.83,1.37,3.71,7,3.32,9.73,0,.15-.4,1.66-.69,2.75.29-.59.61-1.19.88-1.76,1-2.13,1.85-4.15,2.55-6,.4-1,.73-1.95,1-2.83-.55-1-2.69-4.84-2.9-7s.13-4.78,1.76-6.28a3.71,3.71,0,0,1,5.51.34c1.88,2.51.09,7.88-1.53,10.16-.14.2-2.69,3-2.72,3l0-.06c-.28.85-.58,1.76-.94,2.74-.66,1.82-1.43,3.86-2.42,6a67.81,67.81,0,0,1-3.53,6.83,48.53,48.53,0,0,1-5,7l-.07.08c.78-.48,3-1.76,3.19-1.84,2.58-1.1,8.2-1.72,10.26.64a3.71,3.71,0,0,1-.82,5.46c-1.81,1.28-4.52,1-6.52.4-2.25-.72-6-4.14-6.34-4.42a65,65,0,0,1-6.28,6.12c-1.29,1.11-2.63,2.19-4,3.26.69-.4,1.31-.75,1.4-.79,2.57-1.1,8.19-1.72,10.25.64a3.7,3.7,0,0,1-.82,5.46c-1.8,1.28-4.52,1-6.51.4s-5.32-3.5-6.18-4.27c-.53.4-1,.81-1.57,1.22-2.51,1.92-5,3.83-7.45,5.79-.85.68-1.66,1.39-2.48,2.1l1.22-.68c2.57-1.1,8.19-1.73,10.25.63a3.72,3.72,0,0,1-.82,5.47c-1.8,1.28-4.52,1-6.51.39s-5-3.22-6-4.13c-.81.75-1.63,1.5-2.38,2.26-.51.53-1,1-1.5,1.57l-1.44,1.62c-.87,1.07-1.78,2.16-2.61,3.22-.58.73-1.12,1.44-1.66,2.16.83-.7,2.51-2,2.66-2.12,2.37-1.48,7.84-3,10.23-.92a3.71,3.71,0,0,1,0,5.52c-1.6,1.54-4.32,1.7-6.38,1.38-2.28-.36-6.4-3-6.91-3.38-.9,1.19-1.76,2.34-2.56,3.45-2.77,3.83-4.93,7.13-6.41,9.45l-.15.24-1.92-.93.3-.46c1.55-2.32,3.81-5.6,6.69-9.4.91-1.21,1.9-2.48,2.93-3.77a40.65,40.65,0,0,1-3-3.69c-2.21.87-6.79.9-7.39.9-.09,1.48-.17,2.93-.23,4.29-.2,4.72-.18,8.66-.13,11.42v.32l-2.11-1c0-2.74.11-6.44.39-10.82.09-1.5.22-3.11.37-4.76-.59-.15-5.36-1.37-7.16-2.81-1.63-1.31-3.35-3.42-3.29-5.64a3.71,3.71,0,0,1,4.08-3.72c3.11.4,5.72,5.42,6.23,8.17,0,.17.16,2,.22,3.1.07-.67.12-1.33.2-2,.13-1.37.31-2.73.5-4.2.11-.71.23-1.42.34-2.14s.3-1.46.45-2.2c.38-1.7.84-3.41,1.35-5.12-1.2-.12-5.45-.62-7.27-1.67s-3.84-2.87-4.11-5.07a3.71,3.71,0,0,1,3.47-4.3c3.13-.07,6.47,4.49,7.39,7.14.06.16.51,2.13.74,3.22.31-1,.61-2.05,1-3.08,1-3,2.13-5.93,3.23-8.9.34-.91.66-1.82,1-2.73-.43,0-5.5-.53-7.54-1.7-1.81-1-3.83-2.87-4.11-5.07a3.72,3.72,0,0,1,3.47-4.3c3.14-.07,6.48,4.49,7.4,7.14.07.2.71,3,.84,3.76.72-2,1.43-4,2-6a64.85,64.85,0,0,0,2-8.24c-.2,0-5.49-.5-7.58-1.7-1.82-1-3.84-2.87-4.11-5.07a3.7,3.7,0,0,1,3.47-4.29c3.13-.08,6.47,4.48,7.39,7.13.06.17.56,2.33.77,3.37h.17a47.81,47.81,0,0,0,.48-8.51c0-1.57-.15-3.06-.3-4.51-1,0-5.54,0-7.54-.87s-4.13-2.43-4.65-4.58a3.71,3.71,0,0,1,3-4.65c3.11-.43,6.93,3.75,8.14,6.27.06.14.58,1.61.93,2.69-.07-.66-.14-1.34-.23-2-.31-2.35-.75-4.48-1.15-6.37-.24-1.07-.47-2-.7-2.93-1-.5-4.92-2.56-6.26-4.22s-2.54-4.07-2-6.21A3.71,3.71,0,0,1,107.66,66Z" style="fill: rgb(64, 108, 238); transform-origin: 128.322px 117.577px;" id="eljo1v8jimks" class="animable"></path><path d="M164.34,114.29c-2.45-.1-7.35-2.61-7.35-2.61s2.63-2.73,2.82-2.88c2.19-1.74,7.45-3.83,10.06-2.09a3.7,3.7,0,0,1,.65,5.48C169.12,113.9,166.43,114.38,164.34,114.29Z" style="fill: rgb(64, 108, 238); transform-origin: 164.219px 110.178px;" id="elxp0p8axzvdo" class="animable"></path><g id="eljl053zvq5ea"><g style="opacity: 0.5; transform-origin: 130.783px 117.577px;" class="animable"><path d="M113.73,91.08c-.06,0,.7-3.73.77-4,.86-2.67,4.1-7.31,7.23-7.3A3.71,3.71,0,0,1,125.3,84c-.23,2.2-2.21,4.08-4,5.16C119.2,90.47,113.73,91.08,113.73,91.08Z" style="fill: rgb(255, 255, 255); transform-origin: 119.531px 85.43px;" id="elybol59933ib" class="animable"></path><path d="M107.66,66c3,1.06,4.42,6.52,4.32,9.32,0,.24-.56,4-.61,4l-.06,0c.23.86.48,1.79.73,2.81.44,1.88.92,4,1.29,6.36a65.63,65.63,0,0,1,.84,7.64,48.28,48.28,0,0,1-.29,8.6.36.36,0,0,0,0,.1c.39-.83,1.55-3.13,1.65-3.29,1.54-2.34,5.88-6,8.91-5.13a3.7,3.7,0,0,1,2.32,5c-.8,2.06-3.2,3.35-5.21,3.92-2.27.65-7.33-.11-7.73-.18a65.43,65.43,0,0,1-1.86,8.57q-.7,2.46-1.52,4.91c.35-.71.68-1.34.73-1.42,1.54-2.35,5.89-6,8.91-5.13a3.7,3.7,0,0,1,2.32,5c-.8,2.06-3.2,3.35-5.21,3.92s-6.37,0-7.51-.15l-.63,1.88c-1,3-2.09,6-3,8.94-.33,1-.62,2.08-.91,3.12.32-.63.59-1.16.64-1.24,1.53-2.34,5.88-6,8.9-5.13a3.72,3.72,0,0,1,2.33,5c-.8,2.07-3.21,3.35-5.22,3.93s-5.94.07-7.3-.12c-.27,1.07-.53,2.14-.74,3.19-.13.73-.3,1.41-.39,2.14l-.3,2.15c-.14,1.37-.3,2.78-.4,4.12-.08.93-.14,1.82-.2,2.72.32-1,1-3.07,1-3.23a14.42,14.42,0,0,1,4.8-5.46,3.63,3.63,0,0,1,.41-.72,3.7,3.7,0,0,1,5.45-.85c2.38,2.05,1.78,7.67.69,10.25-.06.15-.95,1.72-1.52,2.71.43-.53.83-1.05,1.28-1.58.87-1.07,1.77-2.11,2.73-3.23l1.47-1.59c.48-.54,1.06-1,1.59-1.59,1.25-1.21,2.58-2.38,3.95-3.53-.93-.76-4.21-3.52-5.15-5.4s-1.61-4.51-.63-6.5a3.72,3.72,0,0,1,5.27-1.67c2.65,1.67,2.92,7.32,2.23,10,0,.17-.76,2.06-1.17,3.09.83-.68,1.65-1.36,2.51-2,2.48-1.91,5.05-3.78,7.6-5.65l2.33-1.72c-.33-.27-4.29-3.47-5.35-5.58-.93-1.87-1.61-4.51-.63-6.49a3.71,3.71,0,0,1,5.27-1.67c2.66,1.66,2.92,7.31,2.23,10-.05.2-1.08,2.92-1.37,3.6,1.7-1.27,3.39-2.55,5-3.89a64.65,64.65,0,0,0,6.2-5.77c-.15-.13-4.3-3.45-5.38-5.6-.94-1.87-1.61-4.52-.63-6.5a3.71,3.71,0,0,1,5.26-1.67c2.66,1.67,2.93,7.32,2.24,10,0,.18-.83,2.25-1.22,3.23l.15.1a48.44,48.44,0,0,0,5.09-6.84c.84-1.33,1.56-2.64,2.24-3.93-.84-.54-4.63-3.05-5.82-4.88s-2.09-4.31-1.34-6.39a3.71,3.71,0,0,1,5.05-2.24c2.83,1.37,3.71,7,3.32,9.73,0,.15-.4,1.66-.69,2.75.29-.59.61-1.19.88-1.76,1-2.13,1.85-4.15,2.55-6,.4-1,.73-1.95,1-2.83-.55-1-2.69-4.84-2.9-7s.13-4.78,1.76-6.28a3.71,3.71,0,0,1,5.51.34c1.88,2.51.09,7.88-1.53,10.16-.14.2-2.69,3-2.72,3l0-.06c-.28.85-.58,1.76-.94,2.74-.66,1.82-1.43,3.86-2.42,6a67.81,67.81,0,0,1-3.53,6.83,48.53,48.53,0,0,1-5,7l-.07.08c.78-.48,3-1.76,3.19-1.84,2.58-1.1,8.2-1.72,10.26.64a3.71,3.71,0,0,1-.82,5.46c-1.81,1.28-4.52,1-6.52.4-2.25-.72-6-4.14-6.34-4.42a65,65,0,0,1-6.28,6.12c-1.29,1.11-2.63,2.19-4,3.26.69-.4,1.31-.75,1.4-.79,2.57-1.1,8.19-1.72,10.25.64a3.7,3.7,0,0,1-.82,5.46c-1.8,1.28-4.52,1-6.51.4s-5.32-3.5-6.18-4.27c-.53.4-1,.81-1.57,1.22-2.51,1.92-5,3.83-7.45,5.79-.85.68-1.66,1.39-2.48,2.1l1.22-.68c2.57-1.1,8.19-1.73,10.25.63a3.72,3.72,0,0,1-.82,5.47c-1.8,1.28-4.52,1-6.51.39s-5-3.22-6-4.13c-.81.75-1.63,1.5-2.38,2.26-.51.53-1,1-1.5,1.57l-1.44,1.62c-.87,1.07-1.78,2.16-2.61,3.22-.58.73-1.12,1.44-1.66,2.16.83-.7,2.51-2,2.66-2.12,2.37-1.48,7.84-3,10.23-.92a3.71,3.71,0,0,1,0,5.52c-1.6,1.54-4.32,1.7-6.38,1.38-2.28-.36-6.4-3-6.91-3.38-.9,1.19-1.76,2.34-2.56,3.45-2.77,3.83-4.93,7.13-6.41,9.45l-.15.24-1.92-.93.3-.46c1.55-2.32,3.81-5.6,6.69-9.4.91-1.21,1.9-2.48,2.93-3.77a40.65,40.65,0,0,1-3-3.69c-2.21.87-6.79.9-7.39.9-.09,1.48-.17,2.93-.23,4.29-.2,4.72-.18,8.66-.13,11.42v.32l-2.11-1c0-2.74.11-6.44.39-10.82.09-1.5.22-3.11.37-4.76-.59-.15-5.36-1.37-7.16-2.81-1.63-1.31-3.35-3.42-3.29-5.64a3.71,3.71,0,0,1,4.08-3.72c3.11.4,5.72,5.42,6.23,8.17,0,.17.16,2,.22,3.1.07-.67.12-1.33.2-2,.13-1.37.31-2.73.5-4.2.11-.71.23-1.42.34-2.14s.3-1.46.45-2.2c.38-1.7.84-3.41,1.35-5.12-1.2-.12-5.45-.62-7.27-1.67s-3.84-2.87-4.11-5.07a3.71,3.71,0,0,1,3.47-4.3c3.13-.07,6.47,4.49,7.39,7.14.06.16.51,2.13.74,3.22.31-1,.61-2.05,1-3.08,1-3,2.13-5.93,3.23-8.9.34-.91.66-1.82,1-2.73-.43,0-5.5-.53-7.54-1.7-1.81-1-3.83-2.87-4.11-5.07a3.72,3.72,0,0,1,3.47-4.3c3.14-.07,6.48,4.49,7.4,7.14.07.2.71,3,.84,3.76.72-2,1.43-4,2-6a64.85,64.85,0,0,0,2-8.24c-.2,0-5.49-.5-7.58-1.7-1.82-1-3.84-2.87-4.11-5.07a3.7,3.7,0,0,1,3.47-4.29c3.13-.08,6.47,4.48,7.39,7.13.06.17.56,2.33.77,3.37h.17a47.81,47.81,0,0,0,.48-8.51c0-1.57-.15-3.06-.3-4.51-1,0-5.54,0-7.54-.87s-4.13-2.43-4.65-4.58a3.71,3.71,0,0,1,3-4.65c3.11-.43,6.93,3.75,8.14,6.27.06.14.58,1.61.93,2.69-.07-.66-.14-1.34-.23-2-.31-2.35-.75-4.48-1.15-6.37-.24-1.07-.47-2-.7-2.93-1-.5-4.92-2.56-6.26-4.22s-2.54-4.07-2-6.21A3.71,3.71,0,0,1,107.66,66Z" style="fill: rgb(255, 255, 255); transform-origin: 128.322px 117.577px;" id="elax93va2l017" class="animable"></path><path d="M164.34,114.29c-2.45-.1-7.35-2.61-7.35-2.61s2.63-2.73,2.82-2.88c2.19-1.74,7.45-3.83,10.06-2.09a3.7,3.7,0,0,1,.65,5.48C169.12,113.9,166.43,114.38,164.34,114.29Z" style="fill: rgb(255, 255, 255); transform-origin: 164.219px 110.178px;" id="elr4q3suznbyj" class="animable"></path></g></g><path d="M135.73,175.65s-14.87-35.84-23.19-34.28,14.27,57.14,14.27,57.14-26.16-49.35-44-49.35S89.35,203.7,112,221.88c0,0-35.68-38.44-56.49-30.13S97.08,239,97.08,239,60.81,227.59,65,236.43s15.46,10.38,15.46,10.38L90,248.89h52l8-3.11s33.3-16.63,24.38-23.38-28.54,7.79-28.54,7.79,33.89-37.4,27.35-51.42-35.68,25.45-35.68,25.45,23.79-50.39,19-59.22S135.73,175.65,135.73,175.65Z" style="fill: rgb(64, 108, 238); transform-origin: 113.579px 195.105px;" id="elw0m02jyhnte" class="animable"></path><g id="elew2yctpx6hi"><path d="M135.73,175.65s-14.87-35.84-23.19-34.28,14.27,57.14,14.27,57.14-26.16-49.35-44-49.35S89.35,203.7,112,221.88c0,0-35.68-38.44-56.49-30.13S97.08,239,97.08,239,60.81,227.59,65,236.43s15.46,10.38,15.46,10.38L96,248.89h42l12-3.11s33.3-16.63,24.38-23.38-28.54,7.79-28.54,7.79,33.89-37.4,27.35-51.42-35.68,25.45-35.68,25.45,23.79-50.39,19-59.22S135.73,175.65,135.73,175.65Z" style="fill: rgb(255, 255, 255); opacity: 0.4; transform-origin: 113.579px 195.105px;" class="animable"></path></g><path d="M140.49,177.54c-13.08,38.65-13.08,66-13.08,66s15.46.6,31.51-11.3" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 143.165px 210.543px;" id="elgu10g38iq7" class="animable"></path><path d="M134,198.35a232.21,232.21,0,0,0-10.71-33.89" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 128.645px 181.405px;" id="elhvowz90v6" class="animable"></path><path d="M95.3,175.75l33.29,49.36s22.6-19,30.33-29.73" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 127.11px 200.43px;" id="elvv1f8r15b6d" class="animable"></path><path d="M128,237s-35.08-16.65-49.35-26.16" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 103.325px 223.92px;" id="el145im3em65u" class="animable"></path></g><g id="freepik--Shelf--inject-63" class="animable" style="transform-origin: 196.31px 246.275px;"><rect x="226.38" y="95.63" width="7.23" height="301.29" style="fill: rgb(194, 194, 194); stroke: rgb(171, 171, 171); stroke-linecap: round; stroke-linejoin: round; transform-origin: 229.995px 246.275px;" id="elhe2j9omt9wk" class="animable"></rect><rect x="96.32" y="95.63" width="7.23" height="301.29" style="fill: rgb(194, 194, 194); stroke: rgb(171, 171, 171); stroke-linecap: round; stroke-linejoin: round; transform-origin: 99.935px 246.275px;" id="el27omd7g2toy" class="animable"></rect><rect x="161.35" y="95.63" width="7.23" height="301.29" style="fill: rgb(194, 194, 194); stroke: rgb(171, 171, 171); stroke-linecap: round; stroke-linejoin: round; transform-origin: 164.965px 246.275px;" id="el7z5lsxf78bf" class="animable"></rect><rect x="291.4" y="95.63" width="7.23" height="301.29" style="fill: rgb(194, 194, 194); stroke: rgb(171, 171, 171); stroke-linecap: round; stroke-linejoin: round; transform-origin: 295.015px 246.275px;" id="eli15a7wdi2v" class="animable"></rect><rect x="93.99" y="105.02" width="202.47" height="13.73" style="fill: rgb(194, 194, 194); stroke: rgb(171, 171, 171); stroke-linecap: round; stroke-linejoin: round; transform-origin: 195.225px 111.885px;" id="elqkno6ddq2e" class="animable"></rect><rect x="166.16" y="105.02" width="130.3" height="13.73" style="fill: rgb(166, 166, 166); stroke: rgb(171, 171, 171); stroke-linecap: round; stroke-linejoin: round; transform-origin: 231.31px 111.885px;" id="elmyt0ov0ehwf" class="animable"></rect><rect x="93.99" y="243.27" width="202.47" height="13.73" style="fill: rgb(194, 194, 194); stroke: rgb(171, 171, 171); stroke-linecap: round; stroke-linejoin: round; transform-origin: 195.225px 250.135px;" id="elbkdui2fizm" class="animable"></rect><rect x="166.16" y="243.27" width="130.3" height="13.73" style="fill: rgb(166, 166, 166); stroke: rgb(171, 171, 171); stroke-linecap: round; stroke-linejoin: round; transform-origin: 231.31px 250.135px;" id="elj9wven0v559" class="animable"></rect><rect x="93.99" y="381.51" width="202.47" height="13.73" style="fill: rgb(194, 194, 194); stroke: rgb(171, 171, 171); stroke-linecap: round; stroke-linejoin: round; transform-origin: 195.225px 388.375px;" id="ellxy4jm8app" class="animable"></rect><rect x="166.16" y="381.51" width="130.3" height="13.73" style="fill: rgb(166, 166, 166); stroke: rgb(171, 171, 171); stroke-linecap: round; stroke-linejoin: round; transform-origin: 231.31px 388.375px;" id="eljcbrk9nljv" class="animable"></rect></g><g id="freepik--Boxes--inject-63" class="animable" style="transform-origin: 253.755px 270.96px;"><rect x="60.23" y="307.8" width="105.96" height="89.01" style="fill: rgb(64, 108, 238); transform-origin: 113.21px 352.305px;" id="elt6cx3z6om" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path--inject-63&quot;); transform-origin: 113.21px 352.305px;" id="elr2eg7r132nf" class="animable"><g id="el92o2k9lhin8"><rect x="60.23" y="307.8" width="105.96" height="89.01" style="fill: rgb(255, 255, 255); stroke: rgb(105, 105, 105); stroke-linecap: round; stroke-linejoin: round; opacity: 0.6; transform-origin: 113.21px 352.305px;" class="animable"></rect></g></g><rect x="60.23" y="307.8" width="105.96" height="89.01" style="fill: none; stroke: rgb(105, 105, 105); stroke-linecap: round; stroke-linejoin: round; transform-origin: 113.21px 352.305px;" id="el9fsx1wv44pw" class="animable"></rect><rect x="130.98" y="307.8" width="35.21" height="89.01" style="fill: rgb(64, 108, 238); transform-origin: 148.585px 352.305px;" id="el76jyrvsxv6n" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path-2--inject-63&quot;); transform-origin: 148.585px 352.305px;" id="elghm4woml10v" class="animable"><g id="elear6gka6ovn"><rect x="130.98" y="307.8" width="35.21" height="89.01" style="fill: rgb(255, 255, 255); stroke: rgb(105, 105, 105); stroke-linecap: round; stroke-linejoin: round; opacity: 0.39; transform-origin: 148.585px 352.305px;" class="animable"></rect></g></g><rect x="130.98" y="307.8" width="35.21" height="89.01" style="fill: none; stroke: rgb(105, 105, 105); stroke-linecap: round; stroke-linejoin: round; transform-origin: 148.585px 352.305px;" id="ela0gp62wjf6" class="animable"></rect><line x1="148.95" y1="308.04" x2="148.95" y2="396.92" style="fill: none; stroke: rgb(105, 105, 105); stroke-linecap: round; stroke-linejoin: round; transform-origin: 148.95px 352.48px;" id="elpmvk406kq4" class="animable"></line><rect x="65.58" y="218.93" width="105.96" height="89.01" style="fill: rgb(64, 108, 238); transform-origin: 118.56px 263.435px;" id="elgp0l88h8kco" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path-3--inject-63&quot;); transform-origin: 118.56px 263.435px;" id="eluhevxtigcsr" class="animable"><g id="el07g0thyplsrn"><rect x="65.58" y="218.93" width="105.96" height="89.01" style="fill: rgb(255, 255, 255); stroke: rgb(105, 105, 105); stroke-linecap: round; stroke-linejoin: round; opacity: 0.6; transform-origin: 118.56px 263.435px;" class="animable"></rect></g></g><rect x="65.58" y="218.93" width="105.96" height="89.01" style="fill: none; stroke: rgb(105, 105, 105); stroke-linecap: round; stroke-linejoin: round; transform-origin: 118.56px 263.435px;" id="el4q71ruzlo1a" class="animable"></rect><rect x="136.33" y="218.93" width="35.21" height="89.01" style="fill: rgb(64, 108, 238); transform-origin: 153.935px 263.435px;" id="ele9plcyvcvx6" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path-4--inject-63&quot;); transform-origin: 153.935px 263.435px;" id="elhsffs14kd8v" class="animable"><g id="elrhl7a248fq"><rect x="136.33" y="218.93" width="35.21" height="89.01" style="fill: rgb(255, 255, 255); stroke: rgb(105, 105, 105); stroke-linecap: round; stroke-linejoin: round; opacity: 0.39; transform-origin: 153.935px 263.435px;" class="animable"></rect></g></g><rect x="136.33" y="218.93" width="35.21" height="89.01" style="fill: none; stroke: rgb(105, 105, 105); stroke-linecap: round; stroke-linejoin: round; transform-origin: 153.935px 263.435px;" id="el0qap6m4rmda" class="animable"></rect><line x1="154.3" y1="219.17" x2="154.3" y2="308.05" style="fill: none; stroke: rgb(105, 105, 105); stroke-linecap: round; stroke-linejoin: round; transform-origin: 154.3px 263.61px;" id="eldbn07z3ypvh" class="animable"></line><rect x="341.32" y="307.8" width="105.96" height="89.01" style="fill: rgb(64, 108, 238); transform-origin: 394.3px 352.305px;" id="elpu8ucn07h7b" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path-5--inject-63&quot;); transform-origin: 394.3px 352.305px;" id="elzgu70agq8yn" class="animable"><g id="ele99rarv7wjt"><rect x="341.32" y="307.8" width="105.96" height="89.01" style="fill: rgb(255, 255, 255); stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; opacity: 0.6; transform-origin: 394.3px 352.305px;" class="animable"></rect></g></g><rect x="341.32" y="307.8" width="105.96" height="89.01" style="fill: none; stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; transform-origin: 394.3px 352.305px;" id="eluutvdskc93c" class="animable"></rect><rect x="412.07" y="307.8" width="35.21" height="89.01" style="fill: rgb(64, 108, 238); transform-origin: 429.675px 352.305px;" id="el3c7zgplrkr6" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path-6--inject-63&quot;); transform-origin: 429.675px 352.305px;" id="eltcoj7brpyij" class="animable"><g id="el7eizzc2gdde"><rect x="412.07" y="307.8" width="35.21" height="89.01" style="fill: rgb(255, 255, 255); stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; opacity: 0.39; transform-origin: 429.675px 352.305px;" class="animable"></rect></g></g><rect x="412.07" y="307.8" width="35.21" height="89.01" style="fill: none; stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; transform-origin: 429.675px 352.305px;" id="el053p8kc6pz02" class="animable"></rect><line x1="430.04" y1="308.04" x2="430.04" y2="396.92" style="fill: none; stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; transform-origin: 430.04px 352.48px;" id="elm4zsx65guh" class="animable"></line><rect x="341.32" y="218.7" width="105.96" height="89.01" style="fill: rgb(64, 108, 238); transform-origin: 394.3px 263.205px;" id="el6o6bm0gj8wo" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path-7--inject-63&quot;); transform-origin: 394.3px 263.205px;" id="elmmbeq3dgpn" class="animable"><g id="elobvsj3a8z8"><rect x="341.32" y="218.7" width="105.96" height="89.01" style="fill: rgb(255, 255, 255); stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; opacity: 0.6; transform-origin: 394.3px 263.205px;" class="animable"></rect></g></g><rect x="341.32" y="218.7" width="105.96" height="89.01" style="fill: none; stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; transform-origin: 394.3px 263.205px;" id="eldtfjzx620dq" class="animable"></rect><rect x="412.07" y="218.7" width="35.21" height="89.01" style="fill: rgb(64, 108, 238); transform-origin: 429.675px 263.205px;" id="eltk26sgyyw4" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path-8--inject-63&quot;); transform-origin: 429.675px 263.205px;" id="eloe21pblxmk" class="animable"><g id="el5xccil3wnyh"><rect x="412.07" y="218.7" width="35.21" height="89.01" style="fill: rgb(255, 255, 255); stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; opacity: 0.39; transform-origin: 429.675px 263.205px;" class="animable"></rect></g></g><rect x="412.07" y="218.7" width="35.21" height="89.01" style="fill: none; stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; transform-origin: 429.675px 263.205px;" id="el2sd5tmzcc2h" class="animable"></rect><line x1="430.04" y1="218.94" x2="430.04" y2="307.82" style="fill: none; stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; transform-origin: 430.04px 263.38px;" id="elzqopxxmc0q8" class="animable"></line><rect x="350.32" y="145" width="87.65" height="73.63" style="fill: rgb(64, 108, 238); transform-origin: 394.145px 181.815px;" id="ell6asrsfnsc" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path-9--inject-63&quot;); transform-origin: 394.145px 181.815px;" id="ele26siou338t" class="animable"><g id="elkkcj2gr5aw"><rect x="350.32" y="145" width="87.65" height="73.63" style="fill: rgb(255, 255, 255); stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; opacity: 0.6; transform-origin: 394.145px 181.815px;" class="animable"></rect></g></g><rect x="350.32" y="145" width="87.65" height="73.63" style="fill: none; stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; transform-origin: 394.145px 181.815px;" id="el7zgo5eekrqp" class="animable"></rect><rect x="408.85" y="145" width="29.12" height="73.63" style="fill: rgb(64, 108, 238); transform-origin: 423.41px 181.815px;" id="elb0129l7eu1p" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path-10--inject-63&quot;); transform-origin: 423.41px 181.815px;" id="elwfxj404nqnd" class="animable"><g id="elvllnbjiakir"><rect x="408.85" y="145" width="29.12" height="73.63" style="fill: rgb(255, 255, 255); stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; opacity: 0.39; transform-origin: 423.41px 181.815px;" class="animable"></rect></g></g><rect x="408.85" y="145" width="29.12" height="73.63" style="fill: none; stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; transform-origin: 423.41px 181.815px;" id="elrwpbjxosp3" class="animable"></rect><line x1="423.71" y1="145.2" x2="423.71" y2="218.72" style="fill: none; stroke: rgb(145, 145, 145); stroke-linecap: round; stroke-linejoin: round; transform-origin: 423.71px 181.96px;" id="el9dwdsnf85m" class="animable"></line></g><g id="freepik--hand-truck--inject-63" class="animable" style="transform-origin: 353.257px 323.56px;"><rect x="413.03" y="363.35" width="13.73" height="8.59" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 419.895px 367.645px;" id="elkohjuuv6we" class="animable"></rect><circle cx="297.56" cy="388.62" r="8.3" style="fill: rgb(38, 50, 56); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 297.56px 388.62px;" id="elqgqhiy9lbp" class="animable"></circle><rect x="429.24" y="251.24" width="4.9" height="137.57" style="fill: rgb(38, 50, 56); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 431.69px 320.025px;" id="elgri181bygv" class="animable"></rect><path d="M431.53,299.36l-11.59-9.22a32.91,32.91,0,0,1-11.43-33.67,8.28,8.28,0,0,1,8-6.27h30a8.26,8.26,0,0,1,8,6.27h0a32.9,32.9,0,0,1-11.42,33.67Zm-15-44.47a3.57,3.57,0,0,0-3.48,2.72,28.18,28.18,0,0,0,9.79,28.86l8.67,6.9,8.68-6.9A28.2,28.2,0,0,0,450,257.61h0a3.58,3.58,0,0,0-3.48-2.72Z" style="fill: rgb(38, 50, 56); transform-origin: 431.511px 274.78px;" id="elfn72ue08dqi" class="animable"></path><rect x="251.03" y="367.65" width="151.73" height="17.66" style="fill: rgb(255, 255, 255); transform-origin: 326.895px 376.48px;" id="elm9n93bxu5ib" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path-11--inject-63&quot;); transform-origin: 326.895px 376.48px;" id="eli01dce5f50o" class="animable"><g id="ell5n7tof0dpn"><rect x="251.03" y="367.65" width="151.73" height="17.66" style="stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; opacity: 0.28; transform-origin: 326.895px 376.48px;" class="animable"></rect></g></g><rect x="251.03" y="367.65" width="151.73" height="17.66" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 326.895px 376.48px;" id="eldw5zsr8vbd9" class="animable"></rect><rect x="251.03" y="367.65" width="17" height="17.66" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 259.53px 376.48px;" id="elvnpnd7lli4p" class="animable"></rect><rect x="385.75" y="367.65" width="17" height="17.66" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 394.25px 376.48px;" id="elmy6lhbm2zhs" class="animable"></rect><rect x="318.39" y="367.65" width="17" height="17.66" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 326.89px 376.48px;" id="elaqt3f43q86g" class="animable"></rect><polygon points="402.76 385.31 413.22 385.31 426.3 335.6 415.84 335.6 402.76 385.31" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 414.53px 360.455px;" id="el8flrycf5dkc" class="animable"></polygon><rect x="424.83" y="356.53" width="13.73" height="22.24" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 431.695px 367.65px;" id="el8ez0bmooa2c" class="animable"></rect><path d="M428.33,396.92h0a3,3,0,0,1-2.95-2.95V382.9a3,3,0,0,1,2.95-2.95h0a3,3,0,0,1,2.95,2.95V394A3,3,0,0,1,428.33,396.92Z" style="fill: rgb(38, 50, 56); transform-origin: 428.33px 388.435px;" id="elsja8ywnwdfi" class="animable"></path><path d="M435.34,396.92h0a3,3,0,0,1-2.95-2.95V382.9a3,3,0,0,1,2.95-2.95h0a3,3,0,0,1,3,2.95V394A3,3,0,0,1,435.34,396.92Z" style="fill: rgb(38, 50, 56); transform-origin: 435.365px 388.435px;" id="eltpb2nwerifa" class="animable"></path></g><g id="freepik--Floor--inject-63" class="animable" style="transform-origin: 253.725px 396.92px;"><line x1="46.82" y1="396.92" x2="460.63" y2="396.92" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 253.725px 396.92px;" id="elxlk61i0kmgc" class="animable"></line></g><g id="freepik--Character--inject-63" class="animable" style="transform-origin: 243.975px 275.394px;"><ellipse cx="189.59" cy="417.03" rx="72.24" ry="8.78" style="fill: rgb(64, 108, 238); transform-origin: 189.59px 417.03px;" id="elr9icp4bhl0c" class="animable"></ellipse><g id="elzfrisaqwxbc"><ellipse cx="189.59" cy="417.03" rx="72.24" ry="8.78" style="fill: rgb(255, 255, 255); opacity: 0.5; transform-origin: 189.59px 417.03px;" class="animable"></ellipse></g><path d="M339.08,417c0,2.42-16.13,4.38-36,4.38s-36-2-36-4.38,16.12-4.37,36-4.37S339.08,414.62,339.08,417Z" style="fill: rgb(64, 108, 238); transform-origin: 303.08px 417.005px;" id="elnl064utpnzd" class="animable"></path><g id="el6e80m65wpr8"><path d="M339.08,417c0,2.42-16.13,4.38-36,4.38s-36-2-36-4.38,16.12-4.37,36-4.37S339.08,414.62,339.08,417Z" style="fill: rgb(255, 255, 255); opacity: 0.5; transform-origin: 303.08px 417.005px;" class="animable"></path></g><path d="M204,127.79s-5.59-4.39-12-2.2-11.27,12.87-13,21.55-8.38,15.26-6.78,25.44,13.17,11.77,27.14,13.27,21.55-.2,28.13-9.38,3.79-20.35-.1-30.23-10.37-19.05-15.76-20.75S204,127.79,204,127.79Z" style="fill: rgb(38, 50, 56); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 201.706px 155.655px;" id="elct64gwbnmc" class="animable"></path><path d="M180.9,180a16.55,16.55,0,0,0,2.93,1" style="fill: none; stroke: rgb(255, 255, 255); stroke-linecap: round; stroke-linejoin: round; transform-origin: 182.365px 180.5px;" id="elfudzyiq82l6" class="animable"></path><path d="M202.6,134.9A68.93,68.93,0,0,1,194,149.18c-5.72,7.35-18.37,14.29-19.18,22a7.35,7.35,0,0,0,1.77,5.77" style="fill: none; stroke: rgb(255, 255, 255); stroke-linecap: round; stroke-linejoin: round; transform-origin: 188.681px 155.925px;" id="el7ttxds36xp" class="animable"></path><path d="M225.81,171.77a12.86,12.86,0,0,1-1.58,2.72" style="fill: none; stroke: rgb(255, 255, 255); stroke-linecap: round; stroke-linejoin: round; transform-origin: 225.02px 173.13px;" id="ele4biuq94a8h" class="animable"></path><path d="M221,152.45s6.43,7.42,5.81,15.34" style="fill: none; stroke: rgb(255, 255, 255); stroke-linecap: round; stroke-linejoin: round; transform-origin: 223.926px 160.12px;" id="elfb1pqbq4pj8" class="animable"></path><path d="M201.38,130.81a15.77,15.77,0,0,0-13.47,5.31c-.23.26-.44.52-.64.78" style="fill: none; stroke: rgb(255, 255, 255); stroke-linecap: round; stroke-linejoin: round; transform-origin: 194.325px 133.814px;" id="elgd4u92sx7ha" class="animable"></path><path d="M164.49,319.3l-1.25,19.24s-5.32,25.81-7,36.45-4.76,26.82-5.32,26.82-9.74,5.55-12.68,10.08.79,6.45,4.87,5,9.62-5.55,11.43-10.42,2.71-6.68,2.83-7.47,19.47-52.74,21.39-58.29,6-21.85,6-21.85l9.51-32.26s10.18,33.17,10.3,34.64,10.52,86.25,11,89.42.34,5.43,2.26,6.11,6.45.68,8.83.68,10.64,1.25,14.71.23,4.53-1.7,1.7-3.74-18.55-3.34-20-9.28c-.12-.45-.23-87.72-.23-87.72s-1.36-28.86-3.62-37h-52.3Z" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 191.029px 349.01px;" id="elcegb8rwt1bb" class="animable"></path><path d="M143.1,416.87c4.07-1.48,9.62-5.55,11.43-10.42l.38-1c-2.31,2.46-6,5.88-6,5.88a7.3,7.3,0,0,0-1.47-3.17,2.65,2.65,0,0,0-2.61-.79l4-4.4c-3,1.86-8.4,5.66-10.52,8.93C135.28,416.41,139,418.34,143.1,416.87Z" style="fill: rgb(38, 50, 56); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 146.057px 410.163px;" id="ele4xxsjqsik" class="animable"></path><path d="M243,413.92c-1.94-1.39-9.91-2.44-15.23-4.87a1.8,1.8,0,0,0-.5.69,20,20,0,0,0-.79,2.94l-11-2.35,0,.31c.45,3.17.34,5.43,2.26,6.11s6.45.68,8.83.68,10.64,1.25,14.71.23S245.87,416,243,413.92Z" style="fill: rgb(38, 50, 56); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 230.145px 413.555px;" id="ela0jl43sih5k" class="animable"></path><path d="M179.73,233s-5.19,2.39-11.47,13.67c-6.87,12.31-5.69,19.15-5.79,34s-.4,39.5-.4,39.5,19,5.09,32.63,4.29,30.92-3.89,30.92-3.89-3.69-50.28-7.18-64.74-5.59-21-5.59-21a82.83,82.83,0,0,1-20.35.3C180.93,234,179.73,233,179.73,233Z" style="fill: rgb(38, 50, 56); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 193.845px 278.773px;" id="elko0nagqstad" class="animable"></path><path d="M201.59,277.47c.52,1.71,1,3.44,1.42,5.17" style="fill: none; stroke: rgb(255, 255, 255); stroke-linecap: round; stroke-linejoin: round; transform-origin: 202.3px 280.055px;" id="elpnjpgbjtfj" class="animable"></path><path d="M189.54,249.17a166.59,166.59,0,0,1,10.34,23.12" style="fill: none; stroke: rgb(255, 255, 255); stroke-linecap: round; stroke-linejoin: round; transform-origin: 194.71px 260.73px;" id="ele2bey5ax0rp" class="animable"></path><path d="M307.12,223.44c-.6-.4-10.43-1.94-10.43-1.94l-1.92-.79s11.9.95,12,.45.5-1.1-.3-1.2-16.11-3.21-16.11-3.21,3.89-3.68,4.39-4.48,1.19-2.4.39-2.4-1,.5-2.09,1.2-5.39,2.4-6.59,3.39-4.78,3.59-4.78,3.59l-41.58-5.72s-14.6-18-17.77-21.84a41.47,41.47,0,0,0-7.47-6.8c-3.06-1.35-3,.91-3,.91L218.25,213s16.53,9.85,17.55,9.85,45.68,1.48,45.68,1.48,3,1.4,4.88,2.59,13.87,5,13.87,5,.8-.4-.1-1.1-6.68-3.49-6.68-3.49l12,2.6s.7-.5.4-1-11-4.59-11-4.59l12,.6S307.71,223.84,307.12,223.44Z" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 259.593px 207.59px;" id="ela0mb8tbp51f" class="animable"></path><path d="M237.59,209.24c-4.31-5.31-12.92-15.91-15.26-18.75a41.47,41.47,0,0,0-7.47-6.8c-3.06-1.35-3,.91-3,.91L218.25,213s7.46,4.44,12.66,7.36Z" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 224.725px 201.81px;" id="elvmrzc3hge9i" class="animable"></path><path d="M193.4,181.26s-8.68.4-14,6.29-4.69,18.85-2.49,26.63,5,12.07,4.39,14.77-2.79,3.59-1.6,6.08,8.08,5.19,20.25,4.79,14.47-3,14.57-5.28-.8-4.19-.5-5.59,9.08-9.18,9.08-17.76-3.79-11.57-4.69-17.76-.6-7.08-4.29-9.78S198.29,179.56,193.4,181.26Z" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 199.195px 210.188px;" id="elu4l628ioa" class="animable"></path><path d="M189.46,211a41.42,41.42,0,0,1-9.57,6" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 184.675px 214px;" id="elnugxdhpg85a" class="animable"></path><path d="M190.42,212s-2.15,6.94-7.42,10.77" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 186.71px 217.385px;" id="eloz3j754ioo" class="animable"></path><polygon points="211.96 187.54 212.96 197.12 208.76 192.23 211.96 187.54" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 210.86px 192.33px;" id="eldijuhzkmxcd" class="animable"></polygon><polygon points="206.37 197.92 211.96 187.54 206.87 182.06 206.37 197.92" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 209.165px 189.99px;" id="elazg1rbqqak" class="animable"></polygon><path d="M195.6,164.3a42.56,42.56,0,0,1,1.29,10.58,39,39,0,0,1-.7,6.88l10.18,16.16,2.89-15,1.9-10.38S199.59,171.88,195.6,164.3Z" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 203.38px 181.11px;" id="el1ju28t0f1di" class="animable"></path><polygon points="205.77 189.24 206.37 197.92 203.38 193.23 205.77 189.24" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 204.875px 193.58px;" id="elktuemrou8ri" class="animable"></polygon><polygon points="192.8 181.36 202.08 198.02 205.77 189.24 195.9 175.67 192.8 181.36" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 199.285px 186.845px;" id="elxt7dicyix29" class="animable"></polygon><rect x="271.17" y="189.13" width="84.21" height="69.1" style="fill: rgb(64, 108, 238); transform-origin: 313.275px 223.68px;" id="elcz8b7iaq5c" class="animable"></rect><g style="clip-path: url(&quot;#freepik--clip-path-12--inject-63&quot;); transform-origin: 313.275px 223.68px;" id="elgz7pzufgr28" class="animable"><g id="elcp6lz6lbqyh"><rect x="271.17" y="189.13" width="84.21" height="69.1" style="opacity: 0.2; transform-origin: 313.275px 223.68px;" class="animable"></rect></g></g><rect x="271.17" y="189.13" width="84.21" height="69.1" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 313.275px 223.68px;" id="el3ohxx5pxmx" class="animable"></rect><rect x="253.34" y="189.13" width="84.21" height="69.1" style="fill: rgb(64, 108, 238); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 295.445px 223.68px;" id="elcocgvhxr4lg" class="animable"></rect><path d="M369.25,281.49c-2.7-4.28-13.87-23.26-13.87-23.26H337.56l9.17,23.26Z" style="fill: rgb(64, 108, 238); transform-origin: 353.405px 269.86px;" id="elcpk8g9xw57o" class="animable"></path><g style="clip-path: url(&quot;#freepik--clip-path-13--inject-63&quot;); transform-origin: 353.405px 269.86px;" id="eloniruodv6mj" class="animable"><g id="el7d7ft77jgze"><path d="M369.25,281.49c-2.7-4.28-13.87-23.26-13.87-23.26H337.56l9.17,23.26Z" style="opacity: 0.2; transform-origin: 353.405px 269.86px;" class="animable"></path></g></g><path d="M369.25,281.49c-2.7-4.28-13.87-23.26-13.87-23.26H337.56l9.17,23.26Z" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 353.405px 269.86px;" id="elnif8hk3qnc" class="animable"></path><path d="M239.42,281.49c2.7-4.28,13.86-23.26,13.86-23.26h17.83l-9.17,23.26Z" style="fill: rgb(64, 108, 238); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 255.265px 269.86px;" id="els48h2uu0o1h" class="animable"></path><polygon points="253.28 258.23 245.53 281.49 333.48 281.49 337.56 258.23 253.28 258.23" style="fill: rgb(64, 108, 238); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 291.545px 269.86px;" id="el3tfadh58umn" class="animable"></polygon><line x1="366.22" y1="214.13" x2="366.22" y2="237.27" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 366.22px 225.7px;" id="eljm1wixoqtib" class="animable"></line><line x1="370.6" y1="224.14" x2="370.6" y2="242.9" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 370.6px 233.52px;" id="ele8i3j4v1yqa" class="animable"></line><line x1="244.29" y1="237.27" x2="244.29" y2="251.65" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 244.29px 244.46px;" id="elli9lgkds1go" class="animable"></line><line x1="240.54" y1="245.4" x2="240.54" y2="256.65" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 240.54px 251.025px;" id="elvom439c4gzt" class="animable"></line><path d="M178.93,206.1a46.15,46.15,0,0,0,10.28,8.68c6,3.59,28,16.06,29.73,16.76s54.27-7.88,54.27-7.88,3,1.4,4.89,2.59,13.87,5,13.87,5,.8-.4-.1-1.09-6.68-3.5-6.68-3.5l12,2.6s.7-.5.4-1-11-4.59-11-4.59l12,.6s.9-1.1.3-1.5S286,219.57,286,219.57s13.07-1.1,13.17-1.6.5-1.09-.3-1.19-17.16-1.7-17.16-1.7,4.29-2.69,4.79-3.49,1.2-2.4.4-2.4-1,.5-2.09,1.2-5.39,2.4-6.59,3.39-4.79,3.6-4.79,3.6l-48.08.1L195.5,193.93" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 239.144px 212.755px;" id="el5cwa8jpsa7" class="animable"></path><path d="M298.85,216.78c-.79-.1-17.16-1.7-17.16-1.7s4.29-2.69,4.79-3.49,1.2-2.4.4-2.4-1,.5-2.09,1.2-5.39,2.4-6.59,3.39-4.79,3.6-4.79,3.6l-48.08.1L220,213.25c-2,3.51-5.74,10.09-8.17,14.43,3.74,2.08,6.57,3.63,7.14,3.86,1.7.7,54.27-7.88,54.27-7.88s3,1.4,4.89,2.59,13.87,5,13.87,5,.8-.4-.1-1.09-6.68-3.5-6.68-3.5l12,2.6s.7-.5.4-1-11-4.59-11-4.59l12,.6s.9-1.1.3-1.5S286,219.57,286,219.57s13.07-1.1,13.17-1.6S299.65,216.88,298.85,216.78Z" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 255.589px 220.385px;" id="elh501fqdycp" class="animable"></path><path d="M218.34,155.92a1.43,1.43,0,0,1,2.5.6,8.08,8.08,0,0,1-1.6,6.18c-1.1,1.1-2.1,1.4-2.1,0A63.83,63.83,0,0,1,218.34,155.92Z" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 219.037px 159.52px;" id="el85xm4ppsyhk" class="animable"></path><path d="M206.06,138.44a20.41,20.41,0,0,1-5.87,12.91,48.85,48.85,0,0,1-10.76,8s.58,3.13,1.76,4.11,3.52.79,3.52.79a25.37,25.37,0,0,0,6.46,9.78c4.69,4.3,10.17,3.91,13.3-2.54s4.7-12.92,4.31-16.64l-.39-3.72S208.21,145.48,206.06,138.44Z" style="fill: rgb(255, 255, 255); stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 204.134px 157.653px;" id="el1v8vra8hmih" class="animable"></path><ellipse cx="205.47" cy="156.18" rx="0.9" ry="1.6" style="fill: rgb(38, 50, 56); transform-origin: 205.47px 156.18px;" id="elgrwg6u100d" class="animable"></ellipse><ellipse cx="210.36" cy="168.95" rx="0.9" ry="1.6" style="fill: rgb(38, 50, 56); transform-origin: 210.36px 168.95px;" id="elhdtq6scrpad" class="animable"></ellipse><ellipse cx="214.15" cy="156.18" rx="0.9" ry="1.6" style="fill: rgb(38, 50, 56); transform-origin: 214.15px 156.18px;" id="elmcrkgoa10a" class="animable"></ellipse><path d="M212.35,154.48a9.4,9.4,0,0,0-.3,3.69c.3,1.7,1.7,4.59.5,5.09a3.29,3.29,0,0,1-3.39-.4" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 211.094px 159.018px;" id="elroznyeqk8dr" class="animable"></path><path d="M202.87,153.29s.48-3.06,4.49-2.71" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 205.115px 151.921px;" id="elifx81lulbee" class="animable"></path><path d="M213.61,151.52s3.74-3,4.95,2.49" style="fill: none; stroke: rgb(38, 50, 56); stroke-linecap: round; stroke-linejoin: round; transform-origin: 216.085px 152.356px;" id="el7j7g4bp1crv" class="animable"></path></g><defs>     <filter id="active" height="200%">         <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="2"></feMorphology>                <feFlood flood-color="#32DFEC" flood-opacity="1" result="PINK"></feFlood>        <feComposite in="PINK" in2="DILATED" operator="in" result="OUTLINE"></feComposite>        <feMerge>            <feMergeNode in="OUTLINE"></feMergeNode>            <feMergeNode in="SourceGraphic"></feMergeNode>        </feMerge>    </filter>    <filter id="hover" height="200%">        <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="2"></feMorphology>                <feFlood flood-color="#ff0000" flood-opacity="0.5" result="PINK"></feFlood>        <feComposite in="PINK" in2="DILATED" operator="in" result="OUTLINE"></feComposite>        <feMerge>            <feMergeNode in="OUTLINE"></feMergeNode>            <feMergeNode in="SourceGraphic"></feMergeNode>        </feMerge>            <feColorMatrix type="matrix" values="0   0   0   0   0                0   1   0   0   0                0   0   0   0   0                0   0   0   1   0 "></feColorMatrix>    </filter></defs><defs><clipPath id="freepik--clip-path--inject-63"><rect x="60.23" y="307.8" width="105.96" height="89.01" style="fill:#406CEE;stroke:#696969;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-2--inject-63"><rect x="130.98" y="307.8" width="35.21" height="89.01" style="fill:#406CEE;stroke:#696969;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-3--inject-63"><rect x="65.58" y="218.93" width="105.96" height="89.01" style="fill:#406CEE;stroke:#696969;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-4--inject-63"><rect x="136.33" y="218.93" width="35.21" height="89.01" style="fill:#406CEE;stroke:#696969;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-5--inject-63"><rect x="341.32" y="307.8" width="105.96" height="89.01" style="fill:#406CEE;stroke:#919191;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-6--inject-63"><rect x="412.07" y="307.8" width="35.21" height="89.01" style="fill:#406CEE;stroke:#919191;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-7--inject-63"><rect x="341.32" y="218.7" width="105.96" height="89.01" style="fill:#406CEE;stroke:#919191;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-8--inject-63"><rect x="412.07" y="218.7" width="35.21" height="89.01" style="fill:#406CEE;stroke:#919191;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-9--inject-63"><rect x="350.32" y="145" width="87.65" height="73.63" style="fill:#406CEE;stroke:#919191;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-10--inject-63"><rect x="408.85" y="145" width="29.12" height="73.63" style="fill:#406CEE;stroke:#919191;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-11--inject-63"><rect x="251.03" y="367.65" width="151.73" height="17.66" style="fill:#fff;stroke:#263238;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-12--inject-63"><rect x="271.17" y="189.13" width="84.21" height="69.1" style="fill:#406CEE;stroke:#263238;stroke-linecap:round;stroke-linejoin:round"></rect></clipPath><clipPath id="freepik--clip-path-13--inject-63"><path d="M369.25,281.49c-2.7-4.28-13.87-23.26-13.87-23.26H337.56l9.17,23.26Z" style="fill:#406CEE;stroke:#263238;stroke-linecap:round;stroke-linejoin:round"></path></clipPath></defs></svg>
                 </div>
                `

                $("#view_bugs_table").append(bugQueryEmpty);

            }


        },
        error: function(error){

            // call the close_display_bugs function
            close_display_bugs();

            // Display the fail pop up
            fail_pop.style.display = "flex";
            fail_pop_msg.innerHTML = "Failed To Fetch Bugs! Please refresh the page try again, and if the issue persists, contact our support team.";

            // Hide the whole report bug section and the pop up after 2 seconds
            setTimeout(function(){
                fail_pop.style.display = "none";
            }, 2000);

        }
    });  
    
    
}

// Edit button from the list
function click_edit_on_list(){

    let view_bug_ids = document.getElementsByClassName("view_bug_id");
    let access_edit_bug_details = document.getElementsByClassName("access_edit_bug_details");
    let to_act_id = null;

    // add event listener to access_edit_bug_details
    for (let i = 0; i < access_edit_bug_details.length; i++) {
        access_edit_bug_details[i].addEventListener("click", function (event) {

            // The bug id
            to_act_id = view_bug_ids[i].innerHTML;

            if(event.target.classList.contains("access_edit_btn_Edit")){
                // call use_report_bug_section
                use_report_bug_section('edit',to_act_id);
            }
            else if(event.target.classList.contains("access_edit_btn_View")){
                // call the view_bug_details function
                view_bug_details(to_act_id);
            }

        });
    }


}

// Prep the report_bug_section section for edit function
function prep_report_bug_section_for_edit(bug_id){

    //Hide the view_bugs_table
    //close_display_bugs();
    // Hide the retake_shot button
    retake_shot.style.display = "none";
    // First we create form data
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('bug_id', bug_id);

    $.ajax({
        type:'POST',
        url:'/fetchABug/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            // Show the bug_id_and_date
            bug_id_and_date.style.visibility = "visible";
            // Update id and date
            edit_bug_id_number.innerHTML = response.bug.bug_id;
            edit_bug_date.innerHTML = response.bug.bug_date;
            // Append the title, screenshot and body
            bug_title_input.value = response.bug.bug_title;
            bodyTextContent.innerHTML = response.bug.bug_desc;
            // create the image element
            let bug_screenshot_edit = document.createElement("img");
            bug_screenshot_edit.src = response.bug.bug_screenshot;
            bug_shot.appendChild(bug_screenshot_edit);
            // Change activity to Update
            is_report_or_update_btn.innerHTML = "Update";
            
        },
        error: function(error){
            // Display the fail pop up
            fail_pop.style.display = "flex";
            fail_pop_msg.innerHTML = "Failed To Ferch Bug! Please try again, and if the issue persists, contact our support team.";

            // Hide the whole report bug section and the pop up after 2 seconds
            setTimeout(function(){
                fail_pop.style.display = "none";
                document.getElementById("report_bug_section").style.display = "none";
            }, 2000);
            
        }
    }); 
}

// function to update bug
function update_bug(){
    // Get the title and body values
    bug_title = bug_title_input.value;
    bug_body = bodyTextContent.innerHTML;

    // First we create form data
    let formData = new FormData();

    // Append the csrf token
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('id', edit_bug_id_number.innerHTML);
    formData.append('title', bug_title);
    formData.append('body', bug_body);

    $.ajax({
        type:'POST',
        url:'/updateBug/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            
            // Display the success pop up
            success_pop.style.display = "flex";
            success_pop_msg.innerHTML = "Bug Updated Successfully!";
            // Update the pending and resolved bugs numbers
            pending_bug_number_on_btn.innerHTML = response.pending_bugs_count;
            fixed_bug_number_on_btn.innerHTML = response.resolved_bugs_count;
            // Hide the whole report bug section and the pop up after 2 seconds
            setTimeout(function(){
                success_pop.style.display = "none";
                // Display pending bugs
                document.getElementById("pending-btn").click();
                // Discard the report bug section
                discard_report();
            }, 2000);
           
        },
        error: function(error){

            // Display the fail pop up
            fail_pop.style.display = "flex";
            fail_pop_msg.innerHTML = "Failed To Update Bug! Please try again, and if the issue persists, contact our support team.";

            // Hide the whole report bug section and the pop up after 2 seconds
            setTimeout(function(){
                fail_pop.style.display = "none";
                document.getElementById("report_bug_section").style.display = "none";
            }, 2000);
            
        }
    });  
}

// function report new bug
function report_new_bug(){

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
                // Display pending bugs
                document.getElementById("pending-btn").click();
                // Discard the report bug section
                discard_report();
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

}

// add event listener to report_bug_now
// Post the bug report to the server
report_bug_now.addEventListener("click", function () {

    // Check if title is filled
    if(bug_title_input.value == ""){
        // Display the fail pop up
        fail_pop.style.display = "flex";

        // Check the activity
        if(is_report_or_update_btn.innerHTML == "Report"){
            fail_pop_msg.innerHTML = "Failed To Report Bug! Fill The Title and Try Again.";
        }
        else if(is_report_or_update_btn.innerHTML == "Update"){
            fail_pop_msg.innerHTML = "Failed To Update Bug! Fill The Title and Try Again.";
        }

        // Hide the whole report bug section and the pop up after 2 seconds
        setTimeout(function(){
            fail_pop.style.display = "none";
        }, 4000);
    }
    else{
        // Check the activity
        if(is_report_or_update_btn.innerHTML == "Report"){
            // call report_new_bug function
            report_new_bug();
        }
        else if(is_report_or_update_btn.innerHTML == "Update"){
            // call update_bug function
            update_bug();
        }
    }

});