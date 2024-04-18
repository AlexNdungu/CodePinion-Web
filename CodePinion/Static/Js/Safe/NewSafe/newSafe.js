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

let alert1 = new Alert.Alert('success', 'This is a success message');
let alert2 = new Alert.Alert('error', 'This is an error message');
alert_section.appendChild(alert1.render());
alert_section.appendChild(alert2.render());