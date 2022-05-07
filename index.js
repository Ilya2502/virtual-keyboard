import {keysArr} from './assets/modules/keysArr.js';
import {createKeyboard} from './assets/modules/createKeyboard.js';

createKeyboard()

const textArea = document.querySelector('.textarea');
let textaeraCursorStart = 0;
let textaeraCursorEnd = 0;
const allKeysInner = document.querySelectorAll('.keyInner');
const backspaceKey = document.querySelector('.Backspace');
const allKeys = document.querySelectorAll('.key');
const enterKey = document.querySelector('.Enter');
const delKey = document.querySelector('.Delete');
const tabKey = document.querySelector('.Tab');
const capsLockKey = document.querySelector('.CapsLock');
const arrowLeft = document.querySelector('.ArrowLeft');
const arrowRight = document.querySelector('.ArrowRight');
// const arrowLeft = document.querySelector('.ArrowLeft');
// const arrowLeft = document.querySelector('.ArrowLeft');


function addSymbolByMouse(key) {
    textArea.value = textArea.value.slice(0, textaeraCursorStart) + key.innerHTML + textArea.value.slice(textaeraCursorEnd);
    moveCursorRight();
}

function addSymbolByKeyboard(event, activeKey) {
    event.preventDefault();
    addSymbolByMouse(activeKey);
}

function addClickKeyInner(event) {
    event.target.classList.add('animationClick');
    addSymbolByMouse(event.target)
    event.target.classList.remove('animationClick');
}

function backspace() {
    textArea.value = textArea.value.slice(0, textaeraCursorStart - 1) + textArea.value.slice(textaeraCursorStart);
    moveCursorLeft()
}

function addKeyDownInner(event) {
    textArea.focus();
    let activeKey = document.querySelector(`#${event.code}`);

    if (activeKey.classList.contains('keyInner')) {
        addSymbolByKeyboard(event, activeKey);
    }

    if (event.code === 'CapsLock') {
        capsLock();
    } else {
        activeKey.classList.add('active');
    }
    
    if (event.code === 'Backspace') {
        event.preventDefault();
        backspace();
    } else if (activeKey.id === 'Tab') {
        event.preventDefault();
        tab();
    }

    activeKey.classList.add('animationClick');
}

function addKeyUp(event) {
    let activeKey = document.querySelector(`#${event.code}`);
    if (event.code !== 'CapsLock') {
        activeKey.classList.remove('active');
    }
    activeKey.classList.remove('animationClick');
}

function addAnimation(event) {
    event.target.classList.add('animationClick')
}

function removeAnimation(event) {
    event.target.classList.remove('animationClick')
}

function enter() {
    textArea.value = textArea.value + '\n';
    moveCursorRight();
}

function addCursorPosition() {
    textaeraCursorStart = textArea.selectionStart;
    textaeraCursorEnd = textArea.selectionEnd;
    textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
}

function del() {
    textArea.focus();
    textArea.value = textArea.value.slice(0, textaeraCursorStart) + textArea.value.slice(textaeraCursorStart + 1);
    textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
}

function tab() {
    textArea.focus();
    textArea.value = textArea.value.slice(0, textaeraCursorStart) + '    ' + textArea.value.slice(textaeraCursorEnd);
    textaeraCursorStart += 4;
    textaeraCursorEnd += 4;
    textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
}

function capsLock() {
    capsLockKey.classList.toggle('active');
    if (capsLockKey.classList.contains('active')) {
        allKeysInner.forEach(item => item.innerHTML = item.innerHTML.toUpperCase())
    } else (allKeysInner.forEach(item => item.innerHTML = item.innerHTML.toLowerCase()))
}

function moveCursorLeft() {
    textArea.focus();
    if (textaeraCursorStart > 0 && textaeraCursorEnd > 0) {
        textaeraCursorStart -= 1;
        textaeraCursorEnd -= 1;
        textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
    }
}

function moveCursorRight() {
    textArea.focus();
    if (textaeraCursorStart < textArea.value.length && textaeraCursorStart < textArea.value.length) {
        textaeraCursorStart += 1;
        textaeraCursorEnd += 1;
        textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
    }
}


backspaceKey.addEventListener('click', backspace);
enterKey.addEventListener('click', enter);
delKey.addEventListener('click', del);
allKeysInner.forEach((item) => {
    item.addEventListener('click', addClickKeyInner)
});
document.addEventListener('keydown', addKeyDownInner);
document.addEventListener('keyup', addKeyUp);
allKeys.forEach((item) => {
    item.addEventListener('mousedown', addAnimation);
    item.addEventListener('mouseup', removeAnimation);
});
textArea.addEventListener('click', addCursorPosition);
tabKey.addEventListener('click', tab);
capsLockKey.addEventListener('click', capsLock);
arrowLeft.addEventListener('click', moveCursorLeft);
arrowRight.addEventListener('click', moveCursorRight);
