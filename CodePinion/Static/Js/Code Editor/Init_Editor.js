// Create a map with key as category and value as list of recerved word
const reserved_words = new Map();
reserved_words.set('keyword', ['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']);
reserved_words.set('operator',['+','-', '*','/','%','**','//','<','<=','>','>=','==','!='])
reserved_words.set('punctuation', [',', '.', ';', ':', '(', '[', '{', ')', ']', '}'])


// Create a class editor

// Define the focus index
let focusIndex = null;
// Define focus status
let FocusStatus = false

// The Class
class CodePinionEditor {

    // Constructor
    constructor(container) {
        this.container = container;
    }

    // Initialize the editor
    init(index,line_number) {

        // Clear the editor
        this.container.innerHTML = "";

        // Create first line
        this.new_line(index,line_number);

        // Call on enter method
        this.on_enter();

        // Call on backspace method
        this.on_backspace();

    }

    // Create a method on enter
    on_enter() {

        // When enter is pressed
        document.addEventListener('keydown', function(event) {

            if (event.key === 'Enter') {
        
                event.preventDefault();
        
                // Check if any line has a class called is_focused
                if(FocusStatus == true) {
                    
                    // Create a new line
                    index = editor.at_focus_click() + 1;
                    line_number = index + 1;
                    editor.new_line(index,line_number);
        
                }
                else{
                    return;
                }
        
            }
        });
    }

    // Create a new line
    new_line(index,line_number) {

        let line_number_elements = null;

        // This is the single line
        let single_line = `
            <div class="editor_number_code">

                <div class="editor_number">
                    <div class="editor_number_line">
                        <p class="line_number" ></p>
                    </div>
                </div>

                <div class="editor_code">
                    <div class="editor_code_line" contenteditable="True"></div>
                </div>

            </div>
            `
        
        // Check if the editor is empty
        const hasLines = this.container.hasChildNodes();

        // If the editor has lines
        if(!hasLines) {
            // Create the first line
            this.container.innerHTML = single_line;
            
        }
        else {

            // Check whether line is to be added at the end or in between
            const all_lines = document.querySelectorAll(".editor_code_line");

            const lastDivIndex = all_lines.length - 1;

            if(index == lastDivIndex + 1) {
                // Add a new line at the end
                this.container.innerHTML += single_line;
            }
            else {
                // Add the line in between      
                this.container.children[index].insertAdjacentHTML('afterend', single_line);
            }

        }

        // Get the line number
        line_number_elements = document.getElementsByClassName("line_number");

        // Call the monitor line number
        this.monitor_line_number(line_number_elements,index,line_number,);

        // Call at focus line
        this.at_focus_click();

        // call the focus on the new line
        this.at_focus_new_line(index);

        // Call the line theme
        this.line_theme(index);
        
    }

    // Create a method on backspace
    on_backspace() {
        // When backspace is pressed
        document.addEventListener('keydown', function(event) {

            if (event.key === 'Backspace') {
                
                index = editor.at_focus_click();

                // Get all the line inputs
                let all_lines = document.querySelectorAll(".editor_code_line");

                // Get the active span
                let activeSpan = all_lines[index].querySelector("span[id='active']");

                // Get all the spans in all_lines
                let all_spans = all_lines[index].querySelectorAll("span");
                let spanArray = $(all_spans);
                // Find the index of the span with the id of active
                let spanIndex = spanArray.index($("#active"));

                // Prevent delete of last span at line 0
                if(index < 1 && spanIndex < 1 && activeSpan.textContent.length == 0) {
                    // Dont delete the last span at line 0
                    event.preventDefault();
                }
                else{
                    // Delete active span if empty
                    if(activeSpan.textContent.length == 0) {

                        // Move active span to the previous span
                        if(spanIndex > 0) {
                            let previousSpan = all_spans[spanIndex - 1];
                            previousSpan.setAttribute("id", "active");
                        }

                        all_lines[index].removeChild(activeSpan);

                    }
                }
        
                // Check if the line is empty
                let trimmed = all_lines[index].innerHTML.trim();
        
                // Check if any line has a class called is_focused
                if(FocusStatus == true) {        
        
                    if(trimmed.length == 0) {
        
                        if(index <= 0) {
                            return;
                        }
                        else {
                            // Remove the line
                            editor.remove_line(index);
                        }
                        
                    }
                    else {
                        return;
                    }
        
                }
                else{
                    return;
                }
        
            }
        });
    }

    // Remove a line
    remove_line(index) {

        // Get all the line containers
        let all_line_containers = document.querySelectorAll(".editor_number_code");

        // Check if removing a line at the end or in between
        const all_lines = document.querySelectorAll(".editor_code_line");
        const lastDivIndex = all_lines.length - 1;

        // Define index of previous line
        let previous_line_index = index - 1;

        // Call at focus new line
        this.at_focus_new_line(previous_line_index);

        // Call the line theme
        this.line_theme(previous_line_index);

        if(index == lastDivIndex){
            // Simply remove the line at the end

            all_line_containers[index].remove();

        }
        else {

            // Remove the line in between

            all_line_containers[index].remove();

            // Update the line number
            let line_number_elements = document.getElementsByClassName("line_number");
            
            // Define the new line number
            let new_line_number = index + 1;
            
            // Call the monitor line number
            this.monitor_line_number(line_number_elements,previous_line_index,new_line_number);

        }

        // Call at focus line to renew the focus
        this.at_focus_click();

    }

    // Monitore the current line being edited
    at_focus_click() {

        // Get all the new line containers
        let all_line_containers = document.querySelectorAll(".editor_number_code");

        // Get all the lines
        let all_lines = document.querySelectorAll(".editor_code_line");

        // Create a focus event on all_lines
        for (let i = 0; i < all_lines.length; i++) {
            all_lines[i].addEventListener('click', function(event) {

                // Remove the class is_focused from all lines
                for (let i = 0; i < all_lines.length; i++) {
                    // Check if any line has a class called is_focused
                    if(all_lines[i].classList.contains("is_focused")) {
                        // Remove the class
                        all_lines[i].classList.remove("is_focused");

                        // Remove the focusing color
                        all_line_containers[i].classList.remove("show_focused");

                        // Change the focus status to false
                        FocusStatus = false;

                    }
                }

                // Get the index of the clicked div
                focusIndex = i;
                // Change the focus status to true
                FocusStatus = true;

                // Remove the focusing color
                all_line_containers[focusIndex].classList.add("show_focused");

                // Add to that line class called is_focused
                all_lines[focusIndex].classList.add("is_focused");

              
            });
        }

        return focusIndex;

    }

    // Focus on the new line
    at_focus_new_line(index) {

        // Get all the lines
        let all_lines = document.querySelectorAll(".editor_code_line");

        // click the new line after 1 second
        setTimeout(function() {
            all_lines[index].click();
            all_lines[index].focus();

        }, 1);

        // Add Typing cursor at the end of the line
        let range = document.createRange(); // create a range object
        range.selectNodeContents(all_lines[index]); // select the entire content of the div
        range.collapse(false); // collapse the range to the end point
        let sel = window.getSelection(); // get the selection object
        sel.removeAllRanges(); // remove any existing selections
        sel.addRange(range);

    }

    // Monitor line number
    monitor_line_number(number_element,line_index,line_number) {

        // Get the last line index
        const all_lines = document.querySelectorAll(".editor_code_line");

        const lastDivIndex = all_lines.length - 1;

        // Check if numbering is at the middle or end
        if(line_index == lastDivIndex + 1){
            // Set the line number at the end
            number_element[line_index].innerHTML = line_number;
        }
        else {

            // Set the line number at the end
            number_element[line_index].innerHTML = line_number;

            // Update the line number
            for (let i = line_index; i < number_element.length; i++) {
                number_element[i].innerHTML = i + 1;
            }

        }

    }

    // Monitor the theme
    line_theme(index) {

        // Get all the line inputs
        let line_inputs = document.querySelectorAll('.editor_code_line');

        // Function to check if words and punctuations are in the reserved words
        function getKeyByValueArray(map, member) { 
            for (let [key, value] of map.entries()) { 
                if (Array.isArray(value) && value.includes(member)) return key; 
            }
            return null;
        }

        // Function move cursor to the end of the line
        function moveCursorToEnd(createSpanStatus) {

            let activeSpan = document.querySelector("#active");

            if(createSpanStatus == true) {
                console.log('create span');
                let range = document.createRange(); // create a range object
                range.selectNodeContents(activeSpan); // select the entire content of the div
                range.collapse(false); // collapse the range to the end point
                let sel = window.getSelection(); // get the selection object
                sel.removeAllRanges(); // remove any existing selections
                sel.addRange(range);
            }

        }

        // Function that changes active status when span is clicked
        function activate_clicked_span(all_spans){

            // click event for all spans in all_spans
            for (let i = 0; i < all_spans.length; i++) {

                all_spans[i].addEventListener("click", function(event) {

                    // Remove the id from the active span
                    let activeSpan = line_inputs[index].querySelector("span[id='active']");
                    activeSpan.removeAttribute("id");

                    // Add the id to the clicked span
                    all_spans[i].setAttribute("id", "active");

                });

            }

        };

        // Create a span
        let newSpan = document.createElement('span');
        newSpan.classList.add('regular');
        newSpan.setAttribute("id", "active");
        line_inputs[index].appendChild(newSpan);

        // Add event listener to the line inputs
        line_inputs[index].addEventListener('keyup', (event) => {

            let activeSpan = event.target.querySelector("span[id='active']")

            const text = activeSpan.textContent;

            let spanCreate = false

            // Get the length of the sentence.
            // Get the last character in the sentence. (help in getting panctuations)
            let length = text.length;
            let lastLetter = text[length - 1];

            // When space is created in a special span
            if(lastLetter == "\u00A0" && !activeSpan.classList.contains('regular')) {

                // Remove the space from text
                activeSpan.textContent = text.slice(0, -1);
                // Remove active id
                activeSpan.removeAttribute("id");

                // Create a new span
                let newSpan = document.createElement('span');
                newSpan.classList.add('regular');
                newSpan.textContent = '\u00A0';
                newSpan.setAttribute("id", "active");
                activeSpan.insertAdjacentElement('afterend', newSpan);

                // Change create span to true
                spanCreate = true;
                // Call move cursor to end function
                moveCursorToEnd(spanCreate);

            }

            // When user continues typing after a punctuation
            else if(activeSpan.classList.contains('punctuation') && lastLetter != "\u00A0") {
                    
                // Remove active id
                activeSpan.removeAttribute("id");

                // Split the first and last letter in text
                let firstLetter = text.slice(0, -1);
                activeSpan.textContent = firstLetter;
                
                // Create a new span
                let newSpan = document.createElement('span');
                newSpan.classList.add('regular');
                newSpan.textContent = lastLetter;
                newSpan.setAttribute("id", "active");
                activeSpan.insertAdjacentElement('afterend', newSpan);

                // Change create span to true
                spanCreate = true;

                // Call move cursor to end function
                moveCursorToEnd(spanCreate);
            }

            // When user continues typing after an operator
            else if(activeSpan.classList.contains('operator') && lastLetter != "\u00A0" && getKeyByValueArray(reserved_words,lastLetter) != 'operator') {
                        
                    // Remove active id
                    activeSpan.removeAttribute("id");
    
                    // Split the first and last letter in text
                    let firstLetter = text.slice(0, -1);
                    activeSpan.textContent = firstLetter;
                    
                    // Create a new span
                    let newSpan = document.createElement('span');
                    newSpan.classList.add('regular');
                    newSpan.textContent = lastLetter;
                    newSpan.setAttribute("id", "active");
                    activeSpan.insertAdjacentElement('afterend', newSpan);

                    // Change create span to true
                    spanCreate = true;
    
                    // Call move cursor to end function
                    moveCursorToEnd(spanCreate);
            }

            // When a user continues to type after creating a keyword
            else if(activeSpan.classList.contains('keyword') && getKeyByValueArray(reserved_words,text) != 'keyword') {

                // Get the span before the active span
                let previousSpan = activeSpan.previousElementSibling;
                // Get the class after the active span
                let nextSpan = activeSpan.nextElementSibling;

                // when the previous span is a regular span
                if(previousSpan && previousSpan.classList.contains('regular') && (!nextSpan || !nextSpan.classList.contains('regular'))) {

                    // Append text to the previous span text content
                    previousSpan.textContent += text;

                    // Remove active id from the active span
                    activeSpan.removeAttribute("id");
                    // Add active id to the previous span
                    previousSpan.setAttribute("id", "active");

                    // Remove the active span
                    activeSpan.remove();

                }

                else if(nextSpan && nextSpan.classList.contains('regular') && (!previousSpan || !previousSpan.classList.contains('regular'))){
                    
                    // Append text to the previous span text content
                    nextSpan.textContent = text + nextSpan.textContent;

                    // Remove active id from the active span
                    activeSpan.removeAttribute("id");
                    // Add active id to the previous span
                    nextSpan.setAttribute("id", "active");

                    // Remove the active span
                    activeSpan.remove();

                }

                else if (previousSpan && previousSpan.classList.contains('regular') && nextSpan && nextSpan.classList.contains('regular')){

                    // Append text to the previous span text content
                    previousSpan.textContent += text + nextSpan.textContent;

                    // Remove active id from the active span
                    activeSpan.removeAttribute("id");
                    // Add active id to the previous span
                    previousSpan.setAttribute("id", "active");

                    // Remove the active span
                    activeSpan.remove();

                    // Remove the next span
                    nextSpan.remove();

                }
                
                else{
                    // Return the span class to regular
                    activeSpan.setAttribute('class', 'regular');
                }

            }

            else {

                // lets check for punctualtions
                if (getKeyByValueArray(reserved_words,lastLetter) == 'punctuation') {

                    if(text == lastLetter) {
                        // Change class to punctuation
                        activeSpan.setAttribute('class', 'punctuation');
                    }
                    else{

                        // Remove the last character and update text content
                        let secondLastLetter = text[length - 2];
                        if(secondLastLetter == " ") {
                            // Remove the last character and update text content
                            activeSpan.textContent = text.slice(0, -2) + '\u00A0';
                        }   
                        else {
                            activeSpan.textContent = text.slice(0, -1);
                        }
                        // Remove active id 
                        activeSpan.removeAttribute("id");

                        // Create a new punctuation span
                        let spanPunc = document.createElement('span');
                        spanPunc.classList.add('punctuation');
                        spanPunc.textContent = lastLetter;
                        activeSpan.insertAdjacentElement('afterend', spanPunc);

                        // Create a new span
                        let newSpan = document.createElement('span');
                        newSpan.classList.add('regular');
                        newSpan.setAttribute("id", "active");
                        spanPunc.insertAdjacentElement('afterend', newSpan);

                        // Change create span to true
                        spanCreate = true;

                    }
                }
                else{ 

                    // Now lets check for operators
                    if (getKeyByValueArray(reserved_words,lastLetter) == 'operator') {

                        console.log("operator");

                        if(text == lastLetter && activeSpan.classList.contains('regular')) {
                            // Simply change the class to operator
                            activeSpan.setAttribute('class', 'operator');
                        }
                        else{

                            if(!activeSpan.classList.contains('operator')){

                                // Check if the second last charater is a space
                                let secondLastLetter = text[length - 2];
                                if(secondLastLetter == " ") {
                                    // Remove the last character and update text content
                                    activeSpan.textContent = text.slice(0, -2) + '\u00A0';
                                }   
                                else {
                                    activeSpan.textContent = text.slice(0, -1);
                                }
                                
                                // Remove active id 
                                activeSpan.removeAttribute("id");

                                // Create a new operator span
                                let spanOperator = document.createElement('span');
                                spanOperator.classList.add('operator');
                                spanOperator.textContent = lastLetter;
                                spanOperator.setAttribute("id", "active");
                                activeSpan.insertAdjacentElement('afterend', spanOperator);

                                // Change create span to true
                                spanCreate = true;

                            }
                            
                        }
                    }
                    else {

                        let words = text.trim().split(/\s+/);
                        let lastWord = words[words.length - 1];

                        // Now lets check for if last word is a keyword
                        if (getKeyByValueArray(reserved_words,lastWord)){

                            console.log("keyword");

                            // Check if length of text and keyword is same
                            if(text.length == lastWord.length) {

                                // Change the color of the keyword
                                activeSpan.setAttribute('class', 'keyword');

                            }
                            else {

                                let restOfText = text.replace(/\S*$/, "");
                                let newRestOfText = restOfText.replaceAll(" ", "\u00A0");
                                activeSpan.textContent = newRestOfText;
                                // remove id from the active span
                                activeSpan.removeAttribute("id");

                                // Create a new span
                                let newSpan = document.createElement('span');
                                newSpan.classList.add('keyword');
                                newSpan.textContent = lastWord;
                                newSpan.setAttribute("id", "active");
                                activeSpan.insertAdjacentElement('afterend', newSpan);

                                // Change create span to true
                                spanCreate = true;

                            }

                        }

                    }

                }

                // Call move cursor to end function
                moveCursorToEnd(spanCreate);

            }

            // get all the childern of the line input
            let all_spans = line_inputs[index].querySelectorAll("span");

            // call activate_clicked_span function
            activate_clicked_span(all_spans);

        });
            
    }

}



// Get the Editor container
const the_editor = document.getElementById("the_editor");

// Initialise the class
const editor = new CodePinionEditor(the_editor);

// define current line indwx and numbering
let index = 0;
let line_number = 1;

// Initialize the editor
editor.init(index,line_number);

// Create a new line when enter is pressed
// document.addEventListener('keydown', function(event) {

//     if (event.key === 'Enter') {

//         event.preventDefault();

//         // Check if any line has a class called is_focused
//         if(FocusStatus == true) {
            
//             // Create a new line
//             index = editor.at_focus_click() + 1;
//             line_number = index + 1;
//             editor.new_line(index,line_number);

//         }
//         else{
//             return;
//         }

//     }
// });


// Remove a line
// document.addEventListener('keydown', function(event) {

//     if (event.key === 'Backspace') {

//         event.preventDefault();

//         index = editor.at_focus_click();

//         Check if the line is empty
//         let all_lines = document.querySelectorAll(".editor_code_line");

//         let trimmed = all_lines[index].innerHTML.trim();

//         Check if any line has a class called is_focused
//         if(FocusStatus == true) {        

//             if(trimmed.length == 0) {

//                 if(index <= 0) {
//                     return;
//                 }
//                 else {
//                     Remove the line
//                     editor.remove_line(index);
//                 }
                
//             }
//             else {
//                 return;
//             }

//         }
//         else{
//             return;
//         }

//     }
// });
