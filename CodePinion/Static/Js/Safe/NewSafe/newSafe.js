import * as Alert from '../Components/alert.js';
import * as loadResources from './loadResources.js';

let alert_section = document.getElementById('alert_section');
let account_drop_down = document.getElementById('account-drop-down');
let account_select = document.getElementById('account-select');
let account_dot_loader = document.getElementById('account-dot-loader');
let alertTimeout = 5000;

async function getDefaultUserAccount(){
    try{
        let accounts = await loadResources.getAllCurrentUserAccounts();
        let default_account = accounts.accounts[0]
        let default_account_html = loadResources.createDefaultAccountHtmlElement(default_account.account_image,default_account.account_name);
        account_dot_loader.style.display = 'none';
        account_select.innerHTML += default_account_html
    }
    catch(error){
        new Alert.Alert('error', 'An Error Occured While Loading User data. Please Refresh The Page', alertTimeout,alert_section);
    }
}

window.addEventListener('load', function () {
    getDefaultUserAccount();
});