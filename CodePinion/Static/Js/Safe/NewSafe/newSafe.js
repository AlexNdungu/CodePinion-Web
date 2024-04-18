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
        let default_account_html = `
            <div class="defaut_account">
                <div class="account-profile">
                    ${default_account.account_image != 'None' ? 
                        `<img src="${default_account.account_image}" alt="account-profile">` 
                        : `<span>${default_account.account_name.charAt(0)}</span>`
                    }
                </div>
                <span class="username-select" >${default_account.account_name}</span>
                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg>
            </div>
        `
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