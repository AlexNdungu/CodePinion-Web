let csrf = document.getElementsByName('csrfmiddlewaretoken');

window.addEventListener('load', function () {
    getAllCurrentUserAccounts();
});

function getAllCurrentUserAccounts(){
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    $.ajax({
        type:'POST',
        url:'/getAllCurrentUserAccounts/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    }); 
}