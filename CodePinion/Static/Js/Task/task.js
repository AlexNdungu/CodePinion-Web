let date_reminder_set_addons = document.getElementsByClassName('date_reminder_set_addon');
let date_reminder_set_addon_inputs = document.getElementsByClassName('date_reminder_set_addon_input');
let date_reminder_set_addon_due_date = document.getElementById('date_reminder_set_addon_due_date');
let date_reminder_set_addon_rem_date = document.getElementById('date_reminder_set_addon_rem_date');
let selected_addon_date_views = document.getElementsByClassName('selected_addon_date_view');
let selected_addon_date_view_spans = document.getElementsByClassName('selected_addon_date_view_span');
let close_selected_addon_date_views = document.getElementsByClassName('close_selected_addon_date_view');

function open_date_picker(date_input_index){
    date_reminder_set_addon_inputs[date_input_index].showPicker();
}

function show_selected_date_in_popup(popup_index,date_value){
    let long_date = new Date(date_value);
    const formattedDate = long_date.toDateString();
    selected_addon_date_views[popup_index].style.display = 'flex';
    selected_addon_date_view_spans[popup_index].innerHTML = formattedDate;
}

function when_date_display_closes(value){
    selected_addon_date_views[value].style.display = 'none';
    date_reminder_set_addon_inputs[value].value = '';
    selected_addon_date_view_spans[value].innerHTML = '';
}

function close_display_selected_dates(display_index){
    if(display_index == 0){
        for(let i = 0;i < selected_addon_date_views.length;i++){
            when_date_display_closes(i)
        }
    }
    else if(display_index == 1){
        when_date_display_closes(1)
    }
}

function max_min_dates(date_input,min_date,max_date){
    date_input.setAttribute('min',min_date);
    if(max_date != 0){
        date_input.setAttribute('max',max_date);
    };
}

for(let i = 0; i < date_reminder_set_addons.length;i++){
    date_reminder_set_addons[i].addEventListener('click',()=>{
        if(i == 0){
            open_date_picker(i);
        }
        else if(i == 1){
            if(selected_addon_date_views[0].style.display == 'flex'){
                open_date_picker(i);
            }
        }
    });
}

for(let i = 0; i < date_reminder_set_addon_inputs.length;i++){
    date_reminder_set_addon_inputs[i].addEventListener('change',()=> {
        show_selected_date_in_popup(i,date_reminder_set_addon_inputs[i].value);
        if(i == 0){
            let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
            let max_date_from_input = new Date(date_reminder_set_addon_inputs[i].value).toISOString().split('T')[0];
            max_min_dates(date_reminder_set_addon_rem_date,tomorrow,max_date_from_input);
        }
    });
}

for(let i = 0; i < close_selected_addon_date_views.length;i++){
    close_selected_addon_date_views[i].addEventListener('click',()=>{
        close_display_selected_dates(i)
    })
}

window.onload = function () {
    let today_dates = new Date().toISOString().split('T')[0];
    max_min_dates(date_reminder_set_addon_due_date,today_dates,0)
}