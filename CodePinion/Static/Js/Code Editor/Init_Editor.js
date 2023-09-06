// Create a class editor
let focusIndexNew = null;
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

        // Call at focus line
        //this.at_focus_line();

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

            // Get the line number
            line_number_elements = document.getElementsByClassName(" line_number");
            
        }
        else {
            // Add a new line
            this.container.innerHTML += single_line;

            // Get the line number
            line_number_elements = document.getElementsByClassName(" line_number");
        }

        // Call the monitor line number
        this.monitor_line_number(line_number_elements,index,line_number,);

        // Call at focus line
        this.at_focus_line();
        

    }

    // Monitore the current line being edited
    at_focus_line() {

        // Get all the lines
        let all_lines = document.querySelectorAll(".editor_code_line");

        // Create a focus event on all_lines
        for (let i = 0; i < all_lines.length; i++) {
            all_lines[i].addEventListener('focus', function(event) {
                // Get the index of the clicked div
                focusIndexNew = i;

                console.log("Focus index: " + focusIndexNew);

                // Add to that line class called is_focused
                //all_lines[focusIndexNew].classList.add("is_focused");
              
            });
        }

        return focusIndexNew;

    }

    // Monitor line number
    monitor_line_number(number_element,line_index,line_number) {

        //console.log("Element: " + number_element);
        //console.log("Line index: " + line_index);

        number_element[line_index].innerHTML = line_number;

    }

}



// Onload function
//window.onload = function () {

    // get the Editor container
    const the_editor = document.getElementById("the_editor");
    
    // Initialise the class
    const editor = new CodePinionEditor(the_editor);

    // define current line indwx and numbering
    let index = 0;
    let line_number = 1;

    // Initialize the editor
    editor.init(index,line_number);

    // Create a new line when enter is pressed
    document.onkeydown = function (e) {
        if (e.keyCode == 13) {
            index = focusIndexNew + 1;
            line_number = index + 1;
            editor.new_line(index,line_number);
        }
    }

//}