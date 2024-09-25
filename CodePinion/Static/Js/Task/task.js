let date_reminder_set_addons = document.getElementsByClassName('date_reminder_set_addon');
let date_reminder_set_addon_inputs = document.getElementsByClassName('date_reminder_set_addon_input');
let selected_addon_date_views = document.getElementsByClassName('selected_addon_date_view');
let selected_addon_date_view_spans = document.getElementsByClassName('selected_addon_date_view_span');

function open_date_picker(date_input_index){
    date_reminder_set_addon_inputs[date_input_index].showPicker();
}

function show_selected_date_in_popup(popup_index,date_value){
    let long_date = new Date(date_value);
    const formattedDate = long_date.toDateString();
    selected_addon_date_views[popup_index].style.display = 'flex';
    selected_addon_date_view_spans[popup_index].innerHTML = formattedDate;
}

for(let i = 0; i < date_reminder_set_addons.length;i++){
    date_reminder_set_addons[i].addEventListener('click',()=>{
        open_date_picker(i);
    });
}

for(let i = 0; i < date_reminder_set_addon_inputs.length;i++){
    date_reminder_set_addon_inputs[i].addEventListener('change',()=> {
        show_selected_date_in_popup(i,date_reminder_set_addon_inputs[i].value)
    })
}