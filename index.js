import {keysArr} from './assets/modules/keysArr.js';
import {createKeyboard} from './assets/modules/createKeyboard.js';

createKeyboard()

const textArea = document.querySelector('.textarea');
let lang = 'en';
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
const shiftKey = document.querySelector('.ShiftLeft, .ShiftRight');
// const arrowLeft = document.querySelector('.ArrowLeft');
// const arrowLeft = document.querySelector('.ArrowLeft');


function addSymbolByMouse(key) {
    if (key.innerHTML === "&amp;") {
        textArea.value = textArea.value.slice(0, textaeraCursorStart) + key.innerHTML.replace("&amp;", "&") + textArea.value.slice(textaeraCursorEnd);
    } else if (key.innerHTML === "&lt;") {
        textArea.value = textArea.value.slice(0, textaeraCursorStart) + key.innerHTML.replace("&lt;", "<") + textArea.value.slice(textaeraCursorEnd);
    } else if (key.innerHTML === "&gt;") {
        textArea.value = textArea.value.slice(0, textaeraCursorStart) + key.innerHTML.replace("&gt;", ">") + textArea.value.slice(textaeraCursorEnd);
    } else {
        textArea.value = textArea.value.slice(0, textaeraCursorStart) + key.innerHTML + textArea.value.slice(textaeraCursorEnd);
    }
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
    } else if (activeKey.id === 'AltLeft' || activeKey.id === 'AltRight') {
        event.preventDefault();
    } else if (activeKey.id === 'Enter') {
        event.preventDefault();
        enter();
    } else if (activeKey.id === 'ArrowLeft') {
        event.preventDefault();
        moveCursorLeft();
    } else if (activeKey.id === 'ArrowRight') {
        event.preventDefault();
        moveCursorRight();
    } else if (event.key === 'Shift') {
        event.preventDefault();
        shiftOn();
    }

    activeKey.classList.add('animationClick');
}

function addKeyUp(event) {
    let activeKey = document.querySelector(`#${event.code}`);
    if (event.code !== 'CapsLock') {
        activeKey.classList.remove('active');
        if (event.key === 'Shift') {
            shiftOff();
            }
    }
}

function addAnimation(event) {
    event.target.classList.add('animationClick')
}

function removeAnimation(event) {
    event.target.classList.remove('animationClick')
}

function enter() {
    textArea.value = textArea.value.slice(0, textaeraCursorStart) + '\n' + textArea.value.slice(textaeraCursorEnd);
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

function shiftOn() {
    allKeysInner.forEach(item => {
        capsLockKey.classList.contains('active') ? item.innerHTML = item.innerHTML.toLowerCase() : item.innerHTML = item.innerHTML.toUpperCase();
        let pos = keysArr[Number(item.classList[0][3])][Number(item.classList[0].slice(4))];
        if (lang === 'en' && pos.shiftValueEn) {
                item.innerHTML = pos.shiftValueEn;
            } else if (lang === 'ru' && pos.shiftValueRu) {
                item.innerHTML = pos.shiftValueRu;
            }
    })


}

function shiftOff() {
    allKeysInner.forEach(item => {
        capsLockKey.classList.contains('active') ? item.innerHTML = item.innerHTML.toUpperCase() : item.innerHTML = item.innerHTML.toLowerCase();
        let pos = keysArr[Number(item.classList[0][3])][Number(item.classList[0].slice(4))];
        if (lang === 'en' && pos.shiftValueEn) {
            item.innerHTML = pos.key;
        } else if (lang === 'ru' && pos.shiftValueRu) {
            item.innerHTML = pos.key;
        }
    })


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
