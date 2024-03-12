let join_demo_btn = document.getElementById('join_demo_btn');
let join_demo_icon = document.getElementById('join_demo_icon');
let join_demo_spinner = document.getElementById('join_demo_spinner');
let bug_title_input = document.getElementById("bug_title_input");
let report_bug_btn = document.getElementById("report_bug_btn");
let csrf = document.getElementsByName('csrfmiddlewaretoken');
let bug_title = null;
let bug_body = null;
let bug_screenshot = null;
let report_bug_now = document.getElementById("report_bug_to_admin");
let report_spinner = document.getElementById("report_spinner");
let report_plane = document.getElementById("report_plane");
const richButtons = document.querySelectorAll('.btnOption');
let bodyText = document.getElementById('bodyText');
let bodyTextContent = document.getElementById('richEdit');
let bodyTextReview = document.getElementById('bodyTextReview');
let EditRechTextBtn = document.getElementById('edit_rich_text');
let ReviewRechTextBtn = document.getElementById('review_rich_text');
let bug_shot = document.getElementById('bug_shot');
let retake_shot = document.getElementById('retake_btn');
let discard_bug_report_btns = document.getElementsByClassName('discard_bug_report');
let success_pop = document.getElementById('message_popup_success');
let success_pop_msg = document.getElementById('success_message_popup');
let fail_pop = document.getElementById('message_popup_failed');
let fail_pop_msg = document.getElementById('failed_message_popup');
let see_all_bugs_section = document.getElementById('see_all_bugs_section');
let bug_min_menu_btns = document.getElementsByClassName('bug_min_menu');
let pending_bug_number_on_btn = document.getElementById('pending_bug_number_on_btn');
let fixed_bug_number_on_btn = document.getElementById('fixed_bug_number_on_btn');
let view_status_section = document.getElementById('view_status_section');
let show_which_status_in_view_bugs = document.getElementById('show_which_status_in_view_bugs');
let requested_bug_count = document.getElementById('requested_bug_count');
let close_bug_view_btn = document.getElementById('close_bug_view_btn');
let filter_select = false;
let filter_apply = 'All';
let select_any_filters = document.getElementsByClassName('select_any_filter');
let filter_bugs_from_status = document.getElementById('filter_bugs_from_status');
let filter_selection_section = document.getElementById('filter_selection_section');
let bug_id_and_date = document.getElementById('bug_id_and_date');
let edit_bug_id_number = document.getElementById('edit_bug_id_number');
let edit_bug_date = document.getElementById('edit_bug_date');
let is_report_or_update_btn = document.getElementById('is_report_or_update_btn'); 
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
join_demo_btn.addEventListener("click", function () {
    join_demo();
});
richButtons.forEach(richBtn => {
    richBtn.addEventListener('click', () => {
        let myEvent = richBtn.dataset['command'];
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
retake_shot.addEventListener("click", function () {
    bug_shot.innerHTML = "";
    takeScreenShot();
});
EditRechTextBtn.addEventListener("click", function () {
    edit_rich_text();
});
ReviewRechTextBtn.addEventListener("click", function () {
    review_rich_text();
});
report_bug_btn.addEventListener("click", function () {
    use_report_bug_section('post',null);
});
close_bug_view_btn.addEventListener("click", function () {
    close_display_bugs();
});
one_details_close.addEventListener("click", function () {
    document.getElementById("see_one_bug_section").style.display = "none";
})
bug_edit_btn.addEventListener("click", function () {
    use_report_bug_section('edit',one_detail_id_display.innerHTML);
    document.getElementById("see_one_bug_section").style.display = "none";
})
for (let i = 0; i < discard_bug_report_btns.length; i++) {
    discard_bug_report_btns[i].addEventListener("click", function () {
        discard_report();
    });
}
for (let i = 0; i < bug_min_menu_btns.length; i++) {
    bug_min_menu_btns[i].addEventListener("click", function () {
        filter_apply = 'All';
        for (let i = 0; i < select_any_filters.length; i++) {
            select_any_filters[i].classList.remove("filter_bugs_theme");
        }
        select_any_filters[2].classList.add("filter_bugs_theme");
        display_bugs(bug_min_menu_btns[i].id,filter_apply);
    })
}
filter_bugs_from_status.addEventListener("click", function () {
    if(filter_select == false){
        filter_selection_section.style.display = "flex";
        filter_bugs_from_status.classList.add("filter_bugs_theme");
        filter_select = true;
    }
    else{
        filter_selection_section.style.display = "none";
        filter_bugs_from_status.classList.remove("filter_bugs_theme");
        filter_select = false;
    }
})
for (let i = 0; i < select_any_filters.length; i++) {
    select_any_filters[i].addEventListener("click", function () {
        for (let i = 0; i < select_any_filters.length; i++) {
            select_any_filters[i].classList.remove("filter_bugs_theme");
        }
        select_any_filters[i].classList.add("filter_bugs_theme");
        let filter_span = select_any_filters[i].getElementsByTagName('span')[0];
        let status = '';
        if(show_which_status_in_view_bugs.innerHTML == "Pending"){
            status = 'pending-btn';
        }
        else if(show_which_status_in_view_bugs.innerHTML == "Fixed"){
            status = 'fixed-btn';
        }
        filter_selection_section.style.display = "none";
        filter_select = false;
        filter_bugs_from_status.classList.remove("filter_bugs_theme");
        display_bugs(status,filter_span.innerHTML)
    })
}
function join_demo(){
    join_demo_spinner.style.display = "flex";
    join_demo_icon.style.display = "none";
    join_demo_btn.style.pointerEvents = "none";
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    $.ajax({
        type:'POST',
        url:'/joinDemo/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            join_demo_spinner.style.display = "none";
            join_demo_icon.style.display = "flex";
            success_pop.style.display = "flex";
            success_pop_msg.innerHTML = "You Have Joined The Demo!";
            setTimeout(function(){
                document.querySelector(".demo_intro_body").style.display = "none";
                success_pop.style.display = "none";
                document.querySelector(".demo_navigation").style.display = "flex";
                document.querySelector(".report_bug_btn").style.display = "flex";
                join_demo_btn.style.pointerEvents = "auto";
            }, 4000);
            user_is_in_demo = true;
        },
        error: function(error){
            join_demo_spinner.style.display = "none";
            join_demo_icon.style.display = "flex";
            fail_pop.style.display = "flex";
            fail_pop_msg.innerHTML = "Failed To Join Demo! Please try again, and if the issue persists, contact our support team.";
            setTimeout(function(){
                fail_pop.style.display = "none";
                join_demo_btn.style.pointerEvents = "auto";
            }, 4000);
        }
    }); 
}
function use_report_bug_section(activity,bug_id){
    document.getElementById("report_bug_section").style.display = "flex";
    if(activity == 'post'){
        takeScreenShot();
    }
    else if(activity == 'edit'){
        prep_report_bug_section_for_edit(bug_id)
    }
}
function takeScreenShot(){
    retake_shot.style.display = "flex";
    html2canvas(document.getElementById('the_editor')).then(function (canvas) {
        bug_shot.appendChild(canvas);
        bug_screenshot = canvas.toDataURL();
    });
    return bug_screenshot;
}
function review_rich_text(){
    let bodyTextHtml = bodyTextContent.innerHTML;
    if (bodyTextHtml == ""){
        bodyTextReview.innerHTML = "No Content To Review ...";
    }
    else{
        bodyTextReview.innerHTML = bodyTextHtml;
    }
    bodyText.style.display = "none";
    bodyTextReview.style.display = "flex";
    EditRechTextBtn.classList.remove("wrr_btn_color");
    ReviewRechTextBtn.classList.add("wrr_btn_color");
}
function edit_rich_text(){
    bodyTextReview.style.display = "none";
    bodyText.style.display = "flex";
    ReviewRechTextBtn.classList.remove("wrr_btn_color");
    EditRechTextBtn.classList.add("wrr_btn_color");
}
function discard_report(){
    bug_title_input.value = "";
    bodyTextContent.innerHTML = "";
    bodyTextReview.innerHTML = "No Content To Review ...";
    ReviewRechTextBtn.classList.remove("wrr_btn_color");
    EditRechTextBtn.classList.add("wrr_btn_color");
    bug_shot.innerHTML = "";
    bug_screenshot = null;
    bug_id_and_date.style.visibility = "hidden";
    is_report_or_update_btn.innerHTML = "Report";
    document.getElementById("report_bug_section").style.display = "none";
}
function create_table_content(){
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
function create_row_dummies(){
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
    for (let i = 0; i < 10; i++) {
        $('#bug_table_body').append(row_dummy);
    }
}
create_row_dummies();
function close_display_bugs() {
    create_table_content();
    see_all_bugs_section.style.display = "None";
    create_row_dummies();
}
function display_bugs(status,filter_apply){
    let status_is = status.split("-");
    let firstWord_status = status_is[0];
    see_all_bugs_section.style.display = "flex";
    if(firstWord_status == "pending"){
        show_which_status_in_view_bugs.innerHTML = "Pending";
        view_status_section.classList.remove("view_status_fixed");
        view_status_section.classList.add("view_status_pending");
    }
    else if(firstWord_status == "fixed"){
        show_which_status_in_view_bugs.innerHTML = "Fixed";
        view_status_section.classList.remove("view_status_pending");
        view_status_section.classList.add("view_status_fixed");        
    }
    fetch_bugs(firstWord_status,filter_apply);
}
function view_bug_details(bug_id){
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
            document.getElementById("see_one_bug_section").style.display = "flex";
            one_detail_id_display.innerHTML = response.bug.bug_id;
            one_detail_date_display.innerHTML = response.bug.bug_date;
            one_detail_title_display.innerHTML = response.bug.bug_title;
            one_detail_desc_display.innerHTML = response.bug.bug_desc;
            one_detail_screenshot_display.src = response.bug.bug_screenshot;
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
            if(response.bug.bug_reporter_is_superuser == true){
                one_detail_admin_display.style.display = "flex";
                one_detail_userimage_display.style.display = "none";
                one_detail_user_noimage_display.style.display = "none";
            }
            else{
                one_detail_admin_display.style.display = "none";
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
            if(response.bug.bug_reporter_is_current_user == true){
                bug_editor_lock.style.display = "none";
            }
            else{
                bug_editor_lock.style.display = "flex";
            }
        },
        error: function(error){
            fail_pop.style.display = "flex";
            fail_pop_msg.innerHTML = "Failed To Ferch Bug! Please try again, and if the issue persists, contact our support team.";
            setTimeout(function(){
                fail_pop.style.display = "none";
            }, 4000);
        }
    }); 
}
function fetch_bugs(status,filter_apply){
    let formData = new FormData();
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
            create_table_content();
            requested_bug_count.innerHTML = response.bug_count;
            const bugs = response.bugs;
            if(bugs.length > 0){
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
                                            <svg xmlns="http:
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
                                        <svg xmlns="http:
                                    </div>
                                    ${bugs[oneBug].bug_reporter_is_current_user ? 
                                        `
                                        <!--Edit-->
                                        <div class="access_edit_btn access_edit_btn_Edit">
                                            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http:
                                        </div>` : ''
                                    }
                                </div>
                            </td>
                        </tr>
                    `;
                    $("#bug_table_body").append(bugBody);
                }
                click_edit_on_list();
            }
            else{
                $('#view_bugs_table').empty();
                let bugQueryEmpty =
                 `
                 <!--The table is empty-->
                 <div class="when_bug_table_is_empty">
                     <svg class="animated" id="freepik_stories-empty" xmlns="http:
                 </div>
                `
                $("#view_bugs_table").append(bugQueryEmpty);
            }
        },
        error: function(error){
            close_display_bugs();
            fail_pop.style.display = "flex";
            fail_pop_msg.innerHTML = "Failed To Fetch Bugs! Please refresh the page try again, and if the issue persists, contact our support team.";
            setTimeout(function(){
                fail_pop.style.display = "none";
            }, 4000);
        }
    });  
}
function click_edit_on_list(){
    let view_bug_ids = document.getElementsByClassName("view_bug_id");
    let access_edit_bug_details = document.getElementsByClassName("access_edit_bug_details");
    let to_act_id = null;
    for (let i = 0; i < access_edit_bug_details.length; i++) {
        access_edit_bug_details[i].addEventListener("click", function (event) {
            to_act_id = view_bug_ids[i].innerHTML;
            if(event.target.classList.contains("access_edit_btn_Edit")){
                use_report_bug_section('edit',to_act_id);
            }
            else if(event.target.classList.contains("access_edit_btn_View")){
                view_bug_details(to_act_id);
            }
        });
    }
}
function prep_report_bug_section_for_edit(bug_id){
    retake_shot.style.display = "none";
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
            bug_id_and_date.style.visibility = "visible";
            edit_bug_id_number.innerHTML = response.bug.bug_id;
            edit_bug_date.innerHTML = response.bug.bug_date;
            bug_title_input.value = response.bug.bug_title;
            bodyTextContent.innerHTML = response.bug.bug_desc;
            let bug_screenshot_edit = document.createElement("img");
            bug_screenshot_edit.src = response.bug.bug_screenshot;
            bug_shot.appendChild(bug_screenshot_edit);
            is_report_or_update_btn.innerHTML = "Update";
        },
        error: function(error){
            fail_pop.style.display = "flex";
            fail_pop_msg.innerHTML = "Failed To Fetch Bug! Please try again, and if the issue persists, contact our support team.";
            setTimeout(function(){
                fail_pop.style.display = "none";
                document.getElementById("report_bug_section").style.display = "none";
            }, 4000);
        }
    }); 
}
function update_bug(){
    bug_title = bug_title_input.value;
    bug_body = bodyTextContent.innerHTML;
    report_spinner.style.display = "flex";
    report_plane.style.display = "none";
    let formData = new FormData();
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
            report_spinner.style.display = "none";
            report_plane.style.display = "flex";
            success_pop.style.display = "flex";
            success_pop_msg.innerHTML = "Bug Updated Successfully!";
            pending_bug_number_on_btn.innerHTML = response.pending_bugs_count;
            fixed_bug_number_on_btn.innerHTML = response.resolved_bugs_count;
            setTimeout(function(){
                success_pop.style.display = "none";
                document.getElementById("pending-btn").click();
                discard_report();
            }, 4000);
        },
        error: function(error){
            report_spinner.style.display = "none";
            report_plane.style.display = "flex";
            fail_pop.style.display = "flex";
            fail_pop_msg.innerHTML = "Failed To Update Bug! Please try again, and if the issue persists, contact our support team.";
            setTimeout(function(){
                fail_pop.style.display = "none";
                discard_report();
            }, 4000);
        }
    });  
}
function report_new_bug(){
    bug_title = bug_title_input.value;
    bug_body = bodyTextContent.innerHTML;
    report_bug_now.style.pointerEvents = "none";
    report_spinner.style.display = "flex";
    report_plane.style.display = "none";
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
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
            report_spinner.style.display = "none";
            report_plane.style.display = "flex";
            success_pop.style.display = "flex";
            success_pop_msg.innerHTML = "Bug Reported Successfully!";
            pending_bug_number_on_btn.innerHTML = Number(pending_bug_number_on_btn.innerHTML) + 1;
            setTimeout(function(){
                success_pop.style.display = "none";
                document.getElementById("pending-btn").click();
                report_bug_now.style.pointerEvents = "auto";
                discard_report();
            }, 4000);
        },
        error: function(error){
            report_spinner.style.display = "none";
            report_plane.style.display = "flex";
            fail_pop.style.display = "flex";
            fail_pop_msg.innerHTML = "Failed To Report Bug! Please try again, and if the issue persists, contact our support team.";
            setTimeout(function(){
                fail_pop.style.display = "none";
                report_bug_now.style.pointerEvents = "auto";
                discard_report();
            }, 4000);
        }
    });  
}
report_bug_now.addEventListener("click", function () {
    if(bug_title_input.value == ""){
        fail_pop.style.display = "flex";
        if(is_report_or_update_btn.innerHTML == "Report"){
            fail_pop_msg.innerHTML = "Failed To Report Bug! Fill The Title and Try Again.";
        }
        else if(is_report_or_update_btn.innerHTML == "Update"){
            fail_pop_msg.innerHTML = "Failed To Update Bug! Fill The Title and Try Again.";
        }
        setTimeout(function(){
            fail_pop.style.display = "none";
        }, 4000);
    }
    else{
        if(is_report_or_update_btn.innerHTML == "Report"){
            report_new_bug();
        }
        else if(is_report_or_update_btn.innerHTML == "Update"){
            update_bug();
        }
    }
});