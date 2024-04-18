let csrf = document.getElementsByName('csrfmiddlewaretoken');

function getAllCurrentUserAccounts(){
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('csrfmiddlewaretoken', csrf[0].value);
        $.ajax({
            type:'POST',
            url:'/getAllCurrentUserAccounts/',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response){
                resolve(response);
            },
            error: function(error){
                reject(error);
            }
        }); 
    });
}

export {getAllCurrentUserAccounts};