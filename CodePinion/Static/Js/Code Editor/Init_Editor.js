// Create a class editor
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

        // Call the at_focus_line function
        this.at_focus_line();

    }

    // Create a new line
    new_line(index,line_number) {

        let line_number_elements = '';

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

        console.log(hasLines);

        // If the editor has lines
        if(!hasLines) {
            // Create the first line
            this.container.innerHTML = single_line;

            // Get the line number
            line_number_elements = document.getElementsByClassName(" line_number");

            console.log(line_number_elements)
            
        }
        else {
            // Add a new line
            this.container.innerHTML += single_line;

            // Get the line number
            line_number_elements = document.getElementsByClassName(" line_number");

            // Count the number of lines

        }

        // Call the monitor line number
        this.monitor_line_number(line_number_elements,index,line_number,);

    }

    // Monitore the current line being edited
    at_focus_line() {

        let focusIndex = 0;

        // Get all the lines
        let all_lines = document.querySelectorAll(".editor_code_line");

        // Create a focus event on all_lines

        for (let i = 0; i < all_lines.length; i++) {
            all_lines[i].addEventListener('focus', function(event) {
                // Get the index of the clicked div
                focusIndex = i;
              
            });
        }

        return focusIndex;

    }

    // Monitor line number
    monitor_line_number(number_element,line_index,line_number) {

        number_element[line_index].innerHTML = line_number;

    }

}



// Onload function
window.onload = function () {

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
            // index++;
            // line_number++;
            // editor.new_line(index,line_number);
            //console.log(editor.at_focus_line());
            index = editor.at_focus_line();
            line_number = index + 1;
            editor.new_line(index,line_number);
        }
    }

}