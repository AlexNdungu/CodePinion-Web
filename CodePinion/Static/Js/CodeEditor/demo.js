//Get all the elements required for the demo
let report_bug_btn = document.getElementById("report_bug_btn");
let csrf = document.getElementsByName('csrfmiddlewaretoken');
//Here we will give the rich text its fuctionality
const richButtons = document.querySelectorAll('.btnOption');

let bodyText = document.getElementById('bodyText');
let bodyTextContent = document.getElementById('richEdit');
let bodyTextReview = document.getElementById('bodyTextReview');
let EditRechTextBtn = document.getElementById('edit_rich_text');
let ReviewRechTextBtn = document.getElementById('review_rich_text');


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
    html2canvas(document.getElementById('the_editor')).then(function (canvas) {
        const screenShotImage = canvas.toDataURL();

        //call the function to report the bug
        //report_bug(screenShotImage);

    });
});

// Review RichText
function review_rich_text(){
    // Get all the inner html of the bodyText
    let bodyTextHtml = bodyTextContent.innerHTML;
    // Set the inner html of the bodyTextReview
    bodyTextReview.innerHTML = bodyTextHtml;
    // Hide the rich text editor
    bodyText.style.display = "none";
    // Show the review rich text
    bodyTextReview.style.display = "block";
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

//Function to report a bug
function report_bug(screenShotImage){

    //First we create form data
    let formData = new FormData();

    //Append the csrf token
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    // Append the screenshot
    formData.append('screenshot', screenShotImage);

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

}