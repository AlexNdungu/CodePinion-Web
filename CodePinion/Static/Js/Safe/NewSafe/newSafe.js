import * as Alert from '../Components/alert.js';
import * as loadResources from './loadResources.js';

let alert_section = document.getElementById('alert_section');

async function someFunc(){
    try{
        let accounts = await loadResources.getAllCurrentUserAccounts();
        console.log(accounts);
    }
    catch(error){
        console.log(error);
    }
}

window.addEventListener('load', function () {
    someFunc();
});

new Alert.Alert('success', 'This is a success message', 5000,alert_section);
new Alert.Alert('error', 'This is an error message', 8000,alert_section);