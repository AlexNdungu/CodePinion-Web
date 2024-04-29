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
let account_select = document.getElementById('account-select');
let account_dot_loader = document.getElementById('account-dot-loader');
let public_check_box = document.getElementById('check-click-public');
let private_check_box = document.getElementById('check-click-private');
let alertTimeout = 5000;

function sanitizeHTML(text) {
    var element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}

function togglePrivatePublicCheckBox(visibility){
    createNewSafeMap.set('safe_visibility',visibility);
    if(visibility == 'private'){
        public_check_box.children[0].style.visibility = 'hidden';
        private_check_box.children[0].style.visibility = 'visible';
    }
    else if(visibility == 'public'){
        private_check_box.children[0].style.visibility = 'hidden';
        public_check_box.children[0].style.visibility = 'visible';
    }
}

async function getDefaultUserAccount(){
    try{
        let accounts = await loadResources.getAllCurrentUserAccounts();
        let default_account = accounts.accounts[0]
        let default_account_html = loadResources.createDefaultAccountHtmlElement(default_account.account_image,sanitizeHTML(default_account.account_name));
        account_dot_loader.style.display = 'none';
        account_select.innerHTML += default_account_html
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
