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
                    <div class="editor_code_line" contenteditable="True">
                        <span>print("Hello World")</span>
                    </div>
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

        // Call at focus line
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
document.addEventListener('keydown', function(event) {

    if (event.key === 'Enter') {

        // Check if any line has a class called is_focused
        if(FocusStatus == true) {
            
            // Create a new line
            index = editor.at_focus_click() + 1;
            line_number = index + 1;
            editor.new_line(index,line_number);

        }
        else{
            console.log("No line is focused");
            return;
        }

    }
});


// Remove a line
document.addEventListener('keydown', function(event) {

    if (event.key === 'Backspace') {

        index = editor.at_focus_click();

        // Check if any line has a class called is_focused
        if(FocusStatus == true) {

            if(index <= 0) {
                return;
            }
            else {
                // Remove the line
                editor.remove_line(index);
            }

        }
        else{
            console.log("No line is focused");
            return;
        }

    }
});
