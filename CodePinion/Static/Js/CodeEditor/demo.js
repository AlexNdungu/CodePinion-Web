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

// Display all the bugs
let bug_min_menu_btns = document.getElementsByClassName('bug_min_menu');

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

        console.log(bug_min_menu_btns[i].id);

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

// add event listener to report_bug_now
// Post the bug report to the server
report_bug_now.addEventListener("click", function () {

    // Get the title and body values
    bug_title = bug_title_input.value;
    bug_body = bodyTextContent.innerHTML;

    //First we create form data
    let formData = new FormData();

    //Append the csrf token
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
           console.log(response);
           
        },
        error: function(error){
            
        }
    });  
    
});