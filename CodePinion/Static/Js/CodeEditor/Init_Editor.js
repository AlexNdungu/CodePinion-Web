const reserved_words = new Map();
reserved_words.set('keyword', ['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']);
reserved_words.set('operator',['+','-', '*','/','%','<','=','>','!'])
reserved_words.set('punctuation', ["'",'"',',', '.', ';', ':', '(', '[', '{', ')', ']', '}'])
let focusIndex = null;
let FocusStatus = false
class CodePinionEditor {

    constructor(container) {
        this.container = container;
    }

    init(index,line_number) {
        this.container.innerHTML = "";
        this.new_line(index,line_number);
        this.line_theme();
        this.on_enter();
        this.on_backspace();
    }

    on_enter() {
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                if(event.target.classList.contains('editor_code_line')){
                    event.preventDefault();
                    if(FocusStatus == true) {
                        index = editor.at_focus_click() + 1;
                        line_number = index + 1;
                        editor.new_line(index,line_number);
                    }
                    else{
                        return;
                    }
                }
            }
        });
    }

    new_span(content, className){
        let newSpan = document.createElement('span');
        newSpan.classList.add(className);
        newSpan.textContent = content;
        newSpan.setAttribute("id", "active");
        return newSpan;
    }

    activate_clicked_span(){
        let editor_container = document.getElementById("the_editor");
        editor_container.addEventListener("mouseup", function(event) {
            if (event.button === 0) {
                let activeSpan = document.querySelector("span[id='active']");
                if(event.target.localName == 'span'){
                    activeSpan.removeAttribute("id");
                    event.target.setAttribute("id", "active");
                }
                else if(event.target.localName == 'div' && event.target.classList.contains('editor_code_line')){
                    activeSpan.removeAttribute("id");
                    event.target.lastChild.setAttribute("id", "active");
                }
            }
        });
    }

    new_line(index,line_number) {
        let line_number_elements = null;
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
        const hasLines = this.container.hasChildNodes();
        if(!hasLines) {
            this.container.innerHTML = single_line;
        }
        else {    
            let activeSpan = document.querySelector("span[id='active']");
            activeSpan.removeAttribute("id");
            this.container.children[index - 1].insertAdjacentHTML('afterend', single_line);
        }
        line_number_elements = document.getElementsByClassName("line_number");
        this.monitor_line_number(line_number_elements,index,line_number,);
        this.at_focus_line(index);
        this.at_focus_click();
        let line_inputs = document.querySelectorAll('.editor_code_line');
        let newSpan = this.new_span('','regular');
        line_inputs[index].appendChild(newSpan);
        this.activate_clicked_span();
    }

    on_backspace() {
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Backspace') {
                index = editor.at_focus_click();
                let all_lines = document.querySelectorAll(".editor_code_line");
                let activeSpan = all_lines[index].querySelector("span[id='active']");
                let all_spans = all_lines[index].querySelectorAll("span");
                let spanIndex = Array.prototype.indexOf.call(all_lines[index].children, activeSpan);
                if(index < 1 && spanIndex < 1 ) {
                    if(activeSpan.textContent.length == 0){
                        if(event.target.classList.contains('editor_code_line')){
                            event.preventDefault();
                        }
                    }
                }
                else if(index >= 1 && spanIndex < 1) {
                    if(activeSpan.textContent.length == 0){
                        if(event.target.classList.contains('editor_code_line')){
                            event.preventDefault();
                        }
                        editor.remove_line(index);
                    }
                }
                else {
                    if(activeSpan.textContent.length == 1){
                        event.preventDefault();
                        if(spanIndex > 0) {
                            let previousSpan = all_spans[spanIndex - 1];
                            previousSpan.setAttribute("id", "active");
                        }
                        all_lines[index].removeChild(activeSpan);
                    }
                }
            }
        });
    }

    remove_line(index) {
        let all_line_containers = document.querySelectorAll(".editor_number_code");
        let all_lines = document.querySelectorAll(".editor_code_line");
        let previous_line_index = index - 1;
        let new_line_number = index + 1;
        let line_number_elements = document.getElementsByClassName("line_number");
        let activeSpan = document.querySelector("span[id='active']");
        activeSpan.removeAttribute("id");
        let all_spans = all_lines[index - 1].querySelectorAll("span");
        all_spans[all_spans.length - 1].setAttribute("id", "active");
        all_line_containers[index].remove();
        this.monitor_line_number(line_number_elements,previous_line_index,new_line_number);
        this.at_focus_line(previous_line_index);
        this.at_focus_click();
    }

    at_focus_click() {
        let all_line_containers = document.querySelectorAll(".editor_number_code");
        let all_lines = document.querySelectorAll(".editor_code_line");
        for (let i = 0; i < all_lines.length; i++) {
            all_lines[i].addEventListener('click', function(event) {
                for (let i = 0; i < all_lines.length; i++) {
                    if(all_lines[i].classList.contains("is_focused")) {
                        all_lines[i].classList.remove("is_focused");
                        all_line_containers[i].classList.remove("show_focused");
                        FocusStatus = false;
                    }
                }
                focusIndex = i;
                FocusStatus = true;
                all_line_containers[focusIndex].classList.add("show_focused");
                all_lines[focusIndex].classList.add("is_focused");
            });
        }
        return focusIndex;
    }

    at_focus_line(index) {
        let all_lines = document.querySelectorAll(".editor_code_line");
        setTimeout(function() {
            all_lines[index].click();
        }, 1);
        let range = document.createRange(); 
        range.selectNodeContents(all_lines[index]); 
        range.collapse(false); 
        let sel = window.getSelection(); 
        sel.removeAllRanges(); 
        sel.addRange(range);
    }

    monitor_line_number(number_element,line_index,line_number) {
        const all_lines = document.querySelectorAll(".editor_code_line");
        const lastDivIndex = all_lines.length - 1;
        if(line_index == lastDivIndex + 1){
            number_element[line_index].innerHTML = line_number;
        }
        else {
            number_element[line_index].innerHTML = line_number;
            for (let i = line_index; i < number_element.length; i++) {
                number_element[i].innerHTML = i + 1;
            }
        }
    }

    moveCursorToPosition(createSpanStatus) {
        let all_lines = document.querySelectorAll(".editor_code_line");
        let lineIndex = this.at_focus_click();
        let activeSpan = all_lines[lineIndex].querySelector("span[id='active']");
        if(createSpanStatus == true) {
            let range = document.createRange(); 
            range.selectNodeContents(activeSpan); 
            range.collapse(false); 
            let sel = window.getSelection(); 
            sel.removeAllRanges(); 
            sel.addRange(range);
        }
    }

    getKeyByValueArray(map, member) { 
        for (let [key, value] of map.entries()) { 
            if (Array.isArray(value) && value.includes(member)) return key; 
        }
        return null;
    }

    line_theme() {

        function punctuation_auto_complete(punctuation){
            let completer = null;
            let newSpan = null;
            let activeSpan = document.querySelector("span[id='active']");
            if(punctuation == '"' || punctuation == "'"){
                if(punctuation == '"'){
                    completer = '"';
                }
                else if(punctuation == "'"){
                    completer = "'";
                }
                activeSpan.textContent += completer;  
            }
            else if(punctuation == '(' || punctuation == '[' || punctuation == '{'){
                if(punctuation == '('){
                    completer = ')';
                }
                else if(punctuation == '['){
                    completer = ']';
                }
                else if(punctuation == '{'){
                    completer = '}';
                }
                newSpan = editor.new_span(completer,'punctuation');
                newSpan.removeAttribute("id");
                activeSpan.insertAdjacentElement('afterend', newSpan);
            }
        }

        let newSpan = null;
        let editor_id = document.getElementById("the_editor");

        editor_id.addEventListener('input', (event) => {

            let activeSpan = event.target.querySelector("span[id='active']")
            const text = activeSpan.textContent;
            let length = text.length;
            let firstLetter = text[0];
            let lastLetter = text[length - 1];

            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const cursorPosition = range.startOffset;

            if(lastLetter == "#" && !activeSpan.classList.contains('comment')){

                if(text == '#'){
                    activeSpan.setAttribute('class', 'comment');
                }
                else {
                    activeSpan.removeAttribute("id");
                    let secondLastLetter = text[length - 2];
                    if(secondLastLetter == " " || secondLastLetter == "\u00A0") {
                        activeSpan.textContent = text.slice(0, -2) + '\u00A0';
                    }
                    else{
                        activeSpan.textContent = text.slice(0, -1);
                    }
                    newSpan = this.new_span(lastLetter,'comment');
                    activeSpan.insertAdjacentElement('afterend', newSpan);
                    this.moveCursorToPosition(true);
                }

            }

            // else if(!activeSpan.classList.contains('comment') && cursorPosition != length && text[cursorPosition-1] == '#'){

            //     // get all the spans after the active span
            //     let nextSpans = activeSpan.nextElementSibling;
            //     let commentSentence = '';
            //     while(nextSpans){
            //         commentSentence += nextSpans.textContent;
            //         nextSpans = nextSpans.nextElementSibling;
            //     }

            //     if(activeSpan.classList.contains('regular')){

            //         let firstPart = text.slice(0, cursorPosition-1);
            //         let secondPart = text.slice(cursorPosition-1) + commentSentence;

            //         activeSpan.textContent = firstPart;
            //         newSpan = this.new_span(secondPart,'comment');
            //         newSpan.removeAttribute("id");
            //         activeSpan.insertAdjacentElement('afterend', newSpan);
            //     }
            // }

            else if(activeSpan.classList.contains('comment')){

                if(text == '') {
                    activeSpan.setAttribute('class', 'regular');
                }

                else if(firstLetter != '#'){

                    let previousSpan = activeSpan.previousElementSibling;
                    let parentDiv = activeSpan.parentElement;
                    activeSpan.textContent = '';
                    activeSpan.removeAttribute("id");
                    let word = '';

                    for (let i = 0; i < text.length; i++) {

                        if(text[i] == ' ' || text[i] == '\u00A0'){

                            if(i == 0){

                                if(!previousSpan || !previousSpan.classList.contains('regular')){
                                    newSpan = this.new_span('\u00A0','regular');
                                    activeSpan.insertAdjacentElement('afterend', newSpan);
                                }
                                else if(previousSpan && previousSpan.classList.contains('regular')){
                                    previousSpan.textContent = previousSpan.textContent + '\u00A0'
                                    previousSpan.setAttribute("id", "active");
                                }
                                activeSpan.remove();
                            }
                            else if(i => 1){

                                let lastSpan = parentDiv.lastElementChild;
                                if(!lastSpan.classList.contains('regular')){
                                    newSpan = this.new_span('\u00A0','regular');
                                    newSpan.removeAttribute("id");
                                    lastSpan.insertAdjacentElement('afterend', newSpan);
                                }
                                else{
                                    lastSpan.textContent = lastSpan.textContent + '\u00A0';
                                }
                            }
                        }

                        else{

                            if(text[i + 1] == ' ' || text[i + 1] == '\u00A0' || i == text.length - 1){

                                let complete_word = word + text[i];
                                let member = this.getKeyByValueArray(reserved_words,complete_word);
                                word = '';
                                
                                if(i == 0){

                                    if(!previousSpan || !previousSpan.classList.contains('regular')){
                                        if(member){
                                            newSpan = this.new_span(complete_word,member);
                                        }
                                        else{
                                            newSpan = this.new_span(complete_word,'regular');
                                        }
                                        activeSpan.insertAdjacentElement('afterend', newSpan);
                                    }
                                    activeSpan.remove();
                                }
                                else if(i >= 1){

                                    let lastSpan = parentDiv.lastElementChild;
                                    if(!lastSpan.classList.contains('regular')){
                                        if(member){
                                            newSpan = this.new_span(complete_word,member);
                                        }
                                        else{
                                            newSpan = this.new_span(complete_word,'regular');
                                        }
                                        newSpan.removeAttribute("id");
                                        lastSpan.insertAdjacentElement('afterend', newSpan);
                                    }
                                    else{
                                        if(member){
                                            newSpan = this.new_span(complete_word,member);
                                            newSpan.removeAttribute("id");
                                            lastSpan.insertAdjacentElement('afterend', newSpan);
                                        }
                                        else{
                                            lastSpan.textContent = lastSpan.textContent + complete_word;
                                        }
                                    }
                                }
                            }
                            else{
                                word = word + text[i];
                            }
                            
                        }
                    }
                }

            }

            else if(lastLetter == "\u00A0" && !activeSpan.classList.contains('regular') && !activeSpan.classList.contains('comment')) {
                activeSpan.textContent = text.slice(0, -1);
                activeSpan.removeAttribute("id");
                newSpan = this.new_span('\u00A0','regular');
                activeSpan.insertAdjacentElement('afterend', newSpan);
                this.moveCursorToPosition(true);
            }

            else if(activeSpan.previousElementSibling && activeSpan.previousElementSibling.classList.contains('keyword') && (activeSpan.previousElementSibling.innerHTML == 'def' || activeSpan.previousElementSibling.innerHTML == 'class') && (firstLetter == "\u00A0" || firstLetter == " ")) {
                
                activeSpan.textContent = '\u00A0';
                activeSpan.removeAttribute("id");
                newSpan = this.new_span(lastLetter,'define');
                activeSpan.insertAdjacentElement('afterend', newSpan);
                this.moveCursorToPosition(true);
            }

            else if(activeSpan.classList.contains('punctuation')) {
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const cursorPosition = range.startOffset;
                const startRegex = /^['"]/;
                const startEndRegex = /^['"].*['"]$/;
                let withoutLast = text.slice(0, -1);
                const startAllRegex = /^['"\(\[\{]/;
                if(text == ''){
                    activeSpan.setAttribute('class', 'regular');
                }
                else if(!startRegex.test(firstLetter)){
                    activeSpan.removeAttribute("id");
                    activeSpan.textContent = withoutLast;
                    if(startAllRegex.test(lastLetter)){
                        newSpan = this.new_span(lastLetter,'punctuation');
                        activeSpan.insertAdjacentElement('afterend', newSpan);
                        punctuation_auto_complete(lastLetter);
                    }
                    else{
                        newSpan = this.new_span(lastLetter,'regular');
                        activeSpan.insertAdjacentElement('afterend', newSpan);
                    }
                    this.moveCursorToPosition(true);
                }
                if(cursorPosition == length && startEndRegex.test(withoutLast)){
                    activeSpan.removeAttribute("id");
                    activeSpan.textContent = withoutLast;
                    newSpan = this.new_span(lastLetter,'regular');
                    activeSpan.insertAdjacentElement('afterend', newSpan);
                    this.moveCursorToPosition(true);
                }
            }

            else if(activeSpan.classList.contains('operator')) {
                const numericRegex = /^-?\d+(\.\d+)?$/;
                if(text == ''){
                    activeSpan.setAttribute('class', 'regular');
                }
                else if(numericRegex.test(lastLetter)){
                    activeSpan.removeAttribute("id");
                    let firstLetter = text.slice(0, -1);
                    activeSpan.textContent = firstLetter;
                    newSpan = this.new_span(lastLetter,'number');
                    activeSpan.insertAdjacentElement('afterend', newSpan);
                    this.moveCursorToPosition(true);
                }
                else if(lastLetter != "\u00A0" && this.getKeyByValueArray(reserved_words,lastLetter) != 'operator'){
                    activeSpan.removeAttribute("id");
                    let firstLetter = text.slice(0, -1);
                    activeSpan.textContent = firstLetter;
                    newSpan = this.new_span(lastLetter,'regular');
                    activeSpan.insertAdjacentElement('afterend', newSpan);
                    this.moveCursorToPosition(true);
                }
            }

            else if(activeSpan.classList.contains('number')) {
                const numericRegex = /^-?\d+(\.\d+)?$/;
                if(this.getKeyByValueArray(reserved_words,lastLetter) == 'operator'){
                    activeSpan.removeAttribute("id");
                    let firstLetter = text.slice(0, -1);
                    activeSpan.textContent = firstLetter;
                    newSpan = this.new_span(lastLetter,'operator');
                    activeSpan.insertAdjacentElement('afterend', newSpan);
                    this.moveCursorToPosition(true);
                }
                else if(text == '' || !numericRegex.test(text)){
                    activeSpan.setAttribute('class', 'regular');
                }
            }

            else if(activeSpan.classList.contains('keyword') && this.getKeyByValueArray(reserved_words,text) != 'keyword' ) {

                let if_keyword_check = text.slice(0, -1);
                let is_member = this.getKeyByValueArray(reserved_words,lastLetter);
                let previousSpan = activeSpan.previousElementSibling;
                let nextSpan = activeSpan.nextElementSibling;

                if(this.getKeyByValueArray(reserved_words,if_keyword_check) == 'keyword' && is_member ){
                    activeSpan.removeAttribute("id");
                    activeSpan.textContent = if_keyword_check;
                    let newSpan = this.new_span(lastLetter, is_member);
                    activeSpan.insertAdjacentElement('afterend', newSpan);
                    this.moveCursorToPosition(true);
                }
                else{

                    if(previousSpan && previousSpan.classList.contains('regular') && (!nextSpan || !nextSpan.classList.contains('regular'))) {
                        previousSpan.textContent += text;
                        activeSpan.removeAttribute("id");
                        previousSpan.setAttribute("id", "active");
                        activeSpan.remove();
                    }

                    else if(nextSpan && nextSpan.classList.contains('regular') && (!previousSpan || !previousSpan.classList.contains('regular'))){
                        nextSpan.textContent = text + nextSpan.textContent;
                        activeSpan.removeAttribute("id");
                        nextSpan.setAttribute("id", "active");
                        activeSpan.remove();
                    }

                    else if (previousSpan && previousSpan.classList.contains('regular') && nextSpan && nextSpan.classList.contains('regular')){
                        previousSpan.textContent += text + nextSpan.textContent;
                        activeSpan.removeAttribute("id");
                        previousSpan.setAttribute("id", "active");
                        activeSpan.remove();
                        nextSpan.remove();
                    }
                    
                    else{
                        activeSpan.setAttribute('class', 'regular');
                    }
                }
            }

            else if(activeSpan.classList.contains('define')){

                if(lastLetter == "("){
                    activeSpan.innerHTML += ')';
                }
            }

            else {

                let spanCreate = false;

                if(cursorPosition != length) {

                    let words = text.trim().split(/\s+/);
                    let wordLen = words.length;

                    for (let i = 0; i < wordLen; i++) {

                        let memberType = this.getKeyByValueArray(reserved_words,words[i]);

                        if (memberType){

                            const newSentences = [[], []];
                            let currentSentenceIndex = 0;

                            for (const word of words) {
                                if (word == words[i]) {
                                    currentSentenceIndex++;
                                } else {
                                    newSentences[currentSentenceIndex].push(word);
                                }
                            }

                            activeSpan.textContent = newSentences[0].join(' ') + '\u00A0';
                            activeSpan.removeAttribute("id");
                            let memberClass = this.new_span(words[i], memberType);
                            activeSpan.insertAdjacentElement('afterend', memberClass);
                            let secondSentence = this.new_span('\u00A0' + newSentences[1].join(' '), 'regular');
                            secondSentence.removeAttribute("id");
                            memberClass.insertAdjacentElement('afterend', secondSentence);
                            spanCreate = true;
                        }
                    }
                }
                else{
                    if (this.getKeyByValueArray(reserved_words,lastLetter) == 'punctuation') {
                        if(text == lastLetter) {
                            activeSpan.setAttribute('class', 'punctuation');
                        }
                        else{
                            let secondLastLetter = text[length - 2];
                            if(secondLastLetter == " ") {
                                activeSpan.textContent = text.slice(0, -2) + '\u00A0';
                            }   
                            else {
                                activeSpan.textContent = text.slice(0, -1);
                            }
                            activeSpan.removeAttribute("id");
                            let spanPunc = document.createElement('span');
                            spanPunc.classList.add('punctuation');
                            spanPunc.textContent = lastLetter;
                            spanPunc.setAttribute("id", "active");
                            activeSpan.insertAdjacentElement('afterend', spanPunc);
                            spanCreate = true;
                        }
                        punctuation_auto_complete(lastLetter);
                    }
                    else{ 
                        if (this.getKeyByValueArray(reserved_words,lastLetter) == 'operator') {
                            if(text == lastLetter && activeSpan.classList.contains('regular')) {
                                activeSpan.setAttribute('class', 'operator');
                            }
                            else{
                                if(!activeSpan.classList.contains('operator')){
                                    let secondLastLetter = text[length - 2];
                                    if(secondLastLetter == " ") {
                                        activeSpan.textContent = text.slice(0, -2) + '\u00A0';
                                    }   
                                    else {
                                        activeSpan.textContent = text.slice(0, -1);
                                    }
                                    activeSpan.removeAttribute("id");
                                    let spanOperator = this.new_span(lastLetter, 'operator')
                                    activeSpan.insertAdjacentElement('afterend', spanOperator);
                                    spanCreate = true;
                                }
                            }
                        }
                        else {
                            let words = text.trim().split(/\s+/);
                            let lastWord = words[words.length - 1];
                            const numericRegex = /^-?\d+(\.\d+)?$/;
                            if(numericRegex.test(lastWord)) {
                                if(text.length == lastWord.length) {
                                    activeSpan.setAttribute('class', 'number');
                                }
                                else {
                                    let restOfText = text.replace(/\S*$/, "");
                                    let newRestOfText = restOfText.replaceAll(" ", "\u00A0");
                                    activeSpan.textContent = newRestOfText;
                                    activeSpan.removeAttribute("id");
                                    newSpan = this.new_span(lastWord, 'number');
                                    activeSpan.insertAdjacentElement('afterend', newSpan);
                                    spanCreate = true;
                                }
                            }
                            else {
                                if (this.getKeyByValueArray(reserved_words,lastWord)){
                                    if(text.length == lastWord.length) {
                                        activeSpan.setAttribute('class', 'keyword');
                                    }
                                    else {
                                        let restOfText = text.replace(/\S*$/, "");
                                        let newRestOfText = restOfText.replaceAll(" ", "\u00A0");
                                        activeSpan.textContent = newRestOfText;
                                        activeSpan.removeAttribute("id");
                                        newSpan = this.new_span(lastWord, 'keyword');
                                        activeSpan.insertAdjacentElement('afterend', newSpan);
                                        spanCreate = true;
                                    }
                                }
                            }
                        }
                    }
                }
                this.moveCursorToPosition(spanCreate);
            }
        });
    }

}

const the_editor = document.getElementById("the_editor");
const editor = new CodePinionEditor(the_editor);
let index = 0;
let line_number = 1;
editor.init(index,line_number);
