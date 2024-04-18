// This class creates all releant alerts for the editor
let successSvg = `
    <div class="message_pop_icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"/></svg>
    </div>
`;

let errorSvg = `
    <div class="message_pop_icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-1.402 16.945l-3.554-3.521-3.518 3.568-1.418-1.418 3.507-3.566-3.586-3.472 1.418-1.417 3.581 3.458 3.539-3.583 1.431 1.431-3.535 3.568 3.566 3.522-1.431 1.43z"/></svg>
    </div>
`;

let closeAlertButton = `
    <div class="close_pop">
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
    </div>
`;

export class Alert{
    constructor(type,message,period,parentElement){
        this.type = type;
        this.message = message;
        this.period = period;
        this.parentElement = parentElement;
        this.sharedClassName = "message_popup";
        this.successSvg = successSvg;
        this.errorSvg = errorSvg;
        this.successMainClass = "message_popup_success";
        this.errorMainClass = "message_popup_failed";
        this.closeAlertButton = closeAlertButton;
        this.renderAlert = this.renderAlertOnDom();
        this.closeAlert = this.closeAndRemoveAlert();
    };

    createAlertContainer(){
        let alertContainer = document.createElement('div')
        alertContainer.classList.add(this.sharedClassName)
        if(this.type === 'success'){
            alertContainer.classList.add(this.successMainClass);
        }
        else if(this.type === 'error'){
            alertContainer.classList.add(this.errorMainClass);
        };
        return alertContainer;
    };

    selectAlertSvg(){
        if(this.type === 'success'){
            return this.successSvg;
        }
        else if(this.type === 'error'){
            return this.errorSvg;
        };
    };

    appendMessage(){
        return `<span>${this.message}</span>`;
    };

    renderAlertOnDom(){
        let createdAlert = this.createAlertContainer();
        createdAlert.innerHTML = this.selectAlertSvg() + this.appendMessage() + this.closeAlertButton;
        return this.parentElement.appendChild(createdAlert);
    };

    closeAndRemoveAlert(){
        let theAlert = this.renderAlert;
        setTimeout(() => {
            $(this.renderAlert).fadeOut(1000,function(){
                this.parentElement.removeChild(theAlert);
            });
        }, this.period);
    };
    
};