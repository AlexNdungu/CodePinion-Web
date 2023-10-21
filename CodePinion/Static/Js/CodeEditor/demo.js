//Get all the elements required for the demo
let report_bug_btn = document.getElementById("report_bug_btn");
let csrf = document.getElementsByName('csrfmiddlewaretoken');
//Here we will give the rich text its fuctionality
const richButtons = document.querySelectorAll('.btnOption');

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

//Add event listeners
report_bug_btn.addEventListener("click", function () {
    html2canvas(document.getElementById('the_editor')).then(function (canvas) {
        const screenShotImage = canvas.toDataURL();

        //call the function to report the bug
        //report_bug(screenShotImage);

    });
});

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