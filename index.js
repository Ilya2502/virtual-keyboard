import {keysArr} from './assets/modules/keysArr.js';
import {createKeyboard} from './assets/modules/createKeyboard.js';

createKeyboard()

const textArea = document.querySelector('.textarea');
let textaeraCursorStart = 0;
let textaeraCursorEnd = 0;
const allKeysInner = document.querySelectorAll('.keyInner');
const backspaceKey = document.querySelector('.Backspace');


function addClickKeyInner(event) {
    textArea.focus();
    textArea.innerHTML = textArea.innerHTML + event.target.innerHTML;
    textaeraCursorStart += 1;
    textaeraCursorEnd += 1;
    textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
    // textArea.selectionStart -= 1;
    // textArea.selectionEnd -= 1;
}

function backspace() {
    textArea.focus();
    textArea.innerHTML = textArea.innerHTML.slice(0, -1);
    if (textaeraCursorStart > 0 && textaeraCursorEnd > 0) {
        textaeraCursorStart -= 1;
        textaeraCursorEnd -= 1;
    }
    textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
}

function addKeyDownInner(event) {
    let activeKey = document.querySelector(`#${event.code}`);
    activeKey.classList.add('active');
    if (activeKey.classList.contains('keyInner')) {
        textArea.focus();
        textArea.innerHTML = textArea.innerHTML + activeKey.innerHTML;
        textaeraCursorStart += 1;
        textaeraCursorEnd += 1;
        textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
    }
    
    // if (event.code.slice(0, -1) === 'Digit' || event.code.slice(0, -1) === 'Key') {
    //     let activeKey = document.querySelector('#key'+ event.code.slice(-1).toLowerCase());
    //     activeKey.classList.add('active');
    //     textArea.focus();
    //     textArea.innerHTML = textArea.innerHTML + activeKey.innerHTML;
    //     textaeraCursorStart += 1;
    //     textaeraCursorEnd += 1;
    //     textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
    // } else {
    //     let activeKey = document.querySelector('.'+ event.code);
    //     activeKey.classList.add('active');




        // textArea.focus();
        // textArea.innerHTML = textArea.innerHTML + activeKey.innerHTML;
        // textaeraCursorStart += 1;
        // textaeraCursorEnd += 1;
        // textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
   // }
}

function addKeyUp(event) {
    let activeKey = document.querySelector(`#${event.code}`);
    activeKey.classList.remove('active');
}


backspaceKey.addEventListener('click', backspace)
allKeysInner.forEach((item) => {
    item.addEventListener('click', addClickKeyInner)
})
document.addEventListener('keydown', addKeyDownInner);
document.addEventListener('keyup', addKeyUp);
