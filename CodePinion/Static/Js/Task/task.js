let date_reminder_set_addons = document.getElementsByClassName('date_reminder_set_addon');
let date_reminder_set_addon_inputs = document.getElementsByClassName('date_reminder_set_addon_input');
let selected_addon_date_views = document.getElementsByClassName('selected_addon_date_view');

function open_date_selectors(date_input){
    date_input.click()
}

for(let i = 0; i < date_reminder_set_addons.length;i++){
    date_reminder_set_addons[i].addEventListener('click',()=>{
        console.log('heloo');
        console.log(date_reminder_set_addon_inputs[i])
        date_reminder_set_addon_inputs[i].showPicker()
        //open_date_selectors(date_reminder_set_addon_inputs[i])
    });
}
