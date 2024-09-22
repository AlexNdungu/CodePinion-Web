let date_reminder_set_addons = document.getElementsByClassName('date_reminder_set_addon');
let date_reminder_set_addon_inputs = document.getElementsByClassName('date_reminder_set_addon_input');
let selected_addon_date_views = document.getElementsByClassName('selected_addon_date_view');

for(let i = 0; i < date_reminder_set_addons.length;i++){
    date_reminder_set_addons[i].addEventListener('click',()=>{
        console.log('heloo');
    });
}