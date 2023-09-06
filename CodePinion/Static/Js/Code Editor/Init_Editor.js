// Create a class editor
class CodePinionEditor {

    // Constructor
    constructor(container) {
        this.container = container;
    }

    // Initialize the editor
    init() {

        // Clear the editor
        this.container.innerHTML = "";

        // Create first line
        this.new_line();
        
    }

    // Create a new line
    new_line() {

        // This is the single line
        let single_line = `
            <div class="editor_number_code">

                <div class="editor_number">
                    <div class="editor_number_line">
                        <p class="line_number" >87</p>
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
        if(hasLines) {
            // Add a new line
            this.container.innerHTML += single_line;
        }
        else {

            // Create the first line
            this.container.innerHTML = single_line;
        }

    }

    // Monitor line number
    monitor_line_number() {

        

        // // Get the editor code
        // const editor_code = document.getElementsByClassName("editor_code_line");

        // // Loop through the editor code
        // for(let i = 0; i < editor_code.length; i++) {

        //     // Get the line number
        //     const line_number = editor_code[i].getElementsByClassName("line_number")[0];

        //     // Set the line number
        //     line_number.innerHTML = i + 1;
        // }

    }

}



// Onload function
window.onload = function () {

    // get the Editor container
    const the_editor = document.getElementById("the_editor");
    
    // Initialise the class
    const editor = new CodePinionEditor(the_editor);

    // Initialize the editor
    editor.init();

}