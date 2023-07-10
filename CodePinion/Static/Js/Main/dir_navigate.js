//Get All the dir navigation buttons
let all_dir_nav_btns = document.getElementsByClassName('the_clickable_and_inner_dir');
//Get all dir names
let all_dir_names = document.getElementsByClassName('clickable_directory_name');

//Click event to the navigation buttons ssh
for(let nav = 0; nav < all_dir_nav_btns.length; nav++ ){

    all_dir_nav_btns[nav].addEventListener('click', ()=> {

        console.log(all_dir_names[nav].innerHTML)

    });

};