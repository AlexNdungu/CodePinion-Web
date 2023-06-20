//Collecting The Directory to be connected to Code Pinion

//select the  message
let success_popup = document.getElementById('success_popup');
let not_selected = document.getElementById('not_selected');
let pop_error = document.getElementById('pop_error');


//The collect path button
let collect_path_btn = document.getElementById('select-path-btn-connect');
let paste_path = document.getElementById('selected-path');

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

            //If path is copied
            if(response.path != ''){

                //Paste the path into span(id = selected-path)
                paste_path.innerHTML = response.path

                success_popup.style.visibility = 'visible';

                setTimeout(function(){

                    success_popup.style.visibility = 'hidden';
                    
                },2500);

            }
            else{

                if(paste_path.innerHTML == ''){

                    not_selected.style.visibility = 'visible';

                    setTimeout(function(){

                        not_selected.style.visibility = 'hidden';
                        
                    },2500);

                }

                //If path was already selected
                else {

                    //Remove
                    paste_path.innerHTML = '';

                    not_selected.style.visibility = 'visible';

                    setTimeout(function(){

                        not_selected.style.visibility = 'hidden';
                        
                    },2500);

                }


            }


        },
        error: function(error){

            //When error occurs on path selection

            pop_error.style.visibility = 'visible';

            setTimeout(function(){

                pop_error.style.visibility = 'hidden';
                
            },2500);

        }
    });

});