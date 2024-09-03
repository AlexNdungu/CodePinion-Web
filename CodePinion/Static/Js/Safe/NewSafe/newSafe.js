import * as Alert from '../Components/alert.js';
import * as loadResources from './loadResources.js';

let createNewSafeMap = new Map();
createNewSafeMap.set('account_is_org',null);
createNewSafeMap.set('account_id',null);
createNewSafeMap.set('safe_name',null);
createNewSafeMap.set('safe_description',null);
createNewSafeMap.set('safe_visibility',null);

let alert_section = document.getElementById('alert_section');
let account_drop_down = document.getElementById('account-drop-down');
let account_options = document.getElementById('account-options');
let filter_accounts_inputs = document.getElementById('filter-accounts-inputs');
let close_accounts_list = document.getElementById('close-account-list');
let retreaved_account_list = document.getElementById('retreaved-account-list');
let retreaved_account_list_loader = document.getElementById('retreaved-account-list-loader');
let account_select = document.getElementById('account-select');
let account_dot_loader = document.getElementById('account-dot-loader');
let public_check_box = document.getElementById('check-click-public');
let private_check_box = document.getElementById('check-click-private');
let check_private_and_public  = document.getElementsByClassName('check-click');
let change_on_change_privacy = document.getElementById('change-on-change');
let alertTimeout = 5000;

function sanitizeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return text.replace(reg, (match)=>(map[match]));
}

function togglePrivatePublicCheckBox(visibility){
    createNewSafeMap.set('safe_visibility',visibility);
    if(visibility == 'private'){
        public_check_box.children[0].style.visibility = 'hidden';
        private_check_box.children[0].style.visibility = 'visible';
        change_on_change_privacy.innerHTML = 'You are creating a private safe in your personal account.'
    }
    else if(visibility == 'public'){
        private_check_box.children[0].style.visibility = 'hidden';
        public_check_box.children[0].style.visibility = 'visible';
        change_on_change_privacy.innerHTML = 'You are creating a public safe in your personal account.'
    }
}

async function getDefaultUserAccount(){
    try{
        let accounts = await loadResources.getAllCurrentUserAccounts();
        let select_account_index = 0;
        let default_account = accounts.accounts[select_account_index]
        let default_account_html = loadResources.createDefaultAccountHtmlElement(default_account.account_image,sanitizeHTML(default_account.account_name),select_account_index);
        account_dot_loader.style.display = 'none';
        account_select.appendChild(default_account_html)
        createNewSafeMap.set('account_id',default_account.account_id);
        createNewSafeMap.set('account_is_org',default_account.is_org);

        if(default_account.is_org == false){
            togglePrivatePublicCheckBox('public');
        }
        else{
            togglePrivatePublicCheckBox('private');
        }
    }
    catch(error){
        new Alert.Alert('error', 'An Error Occured While Loading User data. Please Refresh The Page', alertTimeout,alert_section);
    }
}

window.addEventListener('load', function () {
    getDefaultUserAccount();
});

function change_visibility_onclick(visibility_state){
    if(visibility_state == 'check-click-public'){
        togglePrivatePublicCheckBox('public');
    }
    else if(visibility_state == 'check-click-private'){
        togglePrivatePublicCheckBox('private')
    }
}

for(let i = 0; i < check_private_and_public.length;i++){
    check_private_and_public[i].addEventListener('click', ()=>{
        change_visibility_onclick(check_private_and_public[i].id);
    })
}