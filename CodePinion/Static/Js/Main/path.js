//Collecting The Directory to be connected to Code Pinion

//The collect path button
let collect_path_btn = document.getElementById('select-path-btn-connect');

//Get the CSRF token
const csrftoken = Cookies.get('csrftoken');

//The click event that will trigger the windows dialog
collect_path_btn.addEventListener('click', ()=> {

    console.log(csrftoken)

    //Now we perform the ajax call

    //First we create form data
    let formData = new FormData();

    //Append the csrf token
    formData.append('csrfmiddlewaretoken',csrftoken);


    $.ajax({
        type:'POST',
        url:'/getPath/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            console.log(response)

        },
        error: function(error){

        }
    });

});