let csrf = document.getElementsByName('csrfmiddlewaretoken');

function getAllCurrentUserAccounts(){
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('csrfmiddlewaretoken', csrf[0].value);
        $.ajax({
            type:'POST',
            url:'/getAllCurrentUserAccounts/',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response){
                resolve(response);
            },
            error: function(error){
                reject(error);
            }
        }); 
    });
}

function createDefaultAccountElement(account_image,account_name){
    let default_account_html = `
            <div class="defaut_account">
                <div class="account-profile">
                    ${account_image != 'None' ? 
                        `<img src="${account_image}" alt="account-profile">` 
                        : `<span>${account_name.charAt(0)}</span>`
                    }
                </div>
                <span class="username-select" >${account_name}</span>
                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg>
            </div>
        `
    return default_account_html;
}

export {getAllCurrentUserAccounts,createDefaultAccountElement};