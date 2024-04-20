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

function togglePrivatePublicCheckBox(visibility,private_check_box,public_check_box){
    if(visibility == 'private'){
        private_check_box.children[0].style.visibility = 'visible';
        createNewSafeMap.set('safe_visibility','private');
    }
    else if(visibility == 'public'){
        public_check_box.children[0].style.visibility = 'visible';
        createNewSafeMap.set('safe_visibility','public');
    }
}

async function getDefaultUserAccount(){
    try{
        let accounts = await loadResources.getAllCurrentUserAccounts();
        let default_account = accounts.accounts[0]
        let default_account_html = loadResources.createDefaultAccountHtmlElement(default_account.account_image,default_account.account_name);
        account_dot_loader.style.display = 'none';
        account_select.innerHTML += default_account_html
        createNewSafeMap.set('account_id',default_account.account_id);

        if(default_account.is_org == false){
            togglePrivatePublicCheckBox('public',private_check_box,public_check_box);
            createNewSafeMap.set('account_is_org',false);
        }
        else{
            togglePrivatePublicCheckBox('private',private_check_box,public_check_box);
            createNewSafeMap.set('account_is_org',true);
        }
    }
    catch(error){
        new Alert.Alert('error', 'An Error Occured While Loading User data. Please Refresh The Page', alertTimeout,alert_section);
    }
}

window.addEventListener('load', function () {
    getDefaultUserAccount();
});