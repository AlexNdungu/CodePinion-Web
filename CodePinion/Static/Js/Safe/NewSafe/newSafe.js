import * as alert from '../Components/alert.js';
import * as loadResources from './loadResources.js';

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


// createAlertPopUp('Hello', 'success');