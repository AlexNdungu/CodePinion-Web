export function enterSshDir(all_dir_nav_btns,all_dir_names,csrf,login_user){
    
    // Get the host name from login_user
    let host_name = login_user.split('@')[1];

    // Click event to the navigation buttons ssh
    for(let nav = 0; nav < all_dir_nav_btns.length; nav++ ){

        all_dir_nav_btns[nav].addEventListener('click', ()=> {

            console.log(all_dir_names[nav].innerHTML)

            //Build The Intented path

            //The current ssh dir
            let current_dir_path = document.getElementById('current_directory_ssh_dispayer').innerHTML;

            let intended_dir_path = current_dir_path + "\\" + all_dir_names[nav].innerHTML;

            console.log(intended_dir_path)

            //First we create form data
            let formData = new FormData();

            formData.append('csrfmiddlewaretoken', csrf[0].value);
            formData.append('intended_path',intended_dir_path);
            formData.append('host_name',host_name);

            $.ajax({
                type:'POST',
                url:'/cdDir/',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response){

                    //On success

                    console.log(response)


                },
                error: function(error){

                    
                }
            });    

            });

    };

}
