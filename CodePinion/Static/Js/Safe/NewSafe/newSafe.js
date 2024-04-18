import {getAllCurrentUserAccounts} from './loadResources.js';
import {alert} from '../Components/alert.js';

console.log(alert);

async function someFunc(){
    try{
        let accounts = await getAllCurrentUserAccounts();
        console.log(accounts);
    }
    catch(error){
        console.log(error);
    }
}

window.addEventListener('load', function () {
    someFunc();
});
