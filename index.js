import keysArr from './assets/modules/keysArr.js';
import createKeyboard from './assets/modules/createKeyboard.js';

createKeyboard();

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
// const arrowLeft = document.querySelector('.ArrowLeft');
// const arrowRight = document.querySelector('.ArrowRight');
const shiftKeyLeft = document.querySelector('.ShiftLeft');
const shiftKeyRight = document.querySelector('.ShiftRight');
const ctrlKeyLeft = document.querySelector('.ControlLeft');
const altKeyLeft = document.querySelector('.AltLeft');

// const arrowLeft = document.querySelector('.ArrowLeft');
// const arrowLeft = document.querySelector('.ArrowLeft');

function moveCursorLeft() {
  textArea.focus();
  textaeraCursorEnd = textaeraCursorStart;
  if (textaeraCursorStart > 0) {
    textaeraCursorStart -= 1;
    textaeraCursorEnd -= 1;
    textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
  }
}

function moveCursorRight() {
  textArea.focus();
  textaeraCursorEnd = textaeraCursorStart;
  if (textaeraCursorStart < textArea.value.length && textaeraCursorStart < textArea.value.length) {
    textaeraCursorStart += 1;
    textaeraCursorEnd += 1;
    textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
  }
}

function addSymbolByMouse(key) {
  if (key.innerHTML === '&amp;') {
    textArea.value = textArea.value.slice(0, textaeraCursorStart) + key.innerHTML.replace('&amp;', '&') + textArea.value.slice(textaeraCursorEnd);
  } else if (key.innerHTML === '&lt;') {
    textArea.value = textArea.value.slice(0, textaeraCursorStart) + key.innerHTML.replace('&lt;', '<') + textArea.value.slice(textaeraCursorEnd);
  } else if (key.innerHTML === '&gt;') {
    textArea.value = textArea.value.slice(0, textaeraCursorStart) + key.innerHTML.replace('&gt;', '>') + textArea.value.slice(textaeraCursorEnd);
  } else {
    textArea.value = textArea.value.slice(0, textaeraCursorStart)
                    + key.innerHTML + textArea.value.slice(textaeraCursorEnd);
  }
  moveCursorRight();
}

function addSymbolByKeyboard(event, activeKey) {
  event.preventDefault();
  addSymbolByMouse(activeKey);
}

function addClickKeyInner(event) {
  event.target.classList.add('animationClick');
  addSymbolByMouse(event.target);
  event.target.classList.remove('animationClick');
}

function del() {
  textArea.focus();
  if (textaeraCursorStart === textaeraCursorEnd) {
    textArea.value = textArea.value.slice(0, textaeraCursorStart)
                  + textArea.value.slice(textaeraCursorEnd + 1);
  } else {
    textArea.value = textArea.value.slice(0, textaeraCursorStart)
                  + textArea.value.slice(textaeraCursorEnd);
    textaeraCursorEnd = textaeraCursorStart;
  }
  textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
}

function backspace() {
  if (textaeraCursorStart === textaeraCursorEnd) {
    textArea.value = textArea.value.slice(0, textaeraCursorStart - 1)
                    + textArea.value.slice(textaeraCursorEnd);
    moveCursorLeft();
  } else {
    del();
  }
}

function enter() {
  textArea.value = `${textArea.value.slice(0, textaeraCursorStart)}\n${textArea.value.slice(textaeraCursorEnd)}`;
  moveCursorRight();
}

function tab() {
  textArea.focus();
  textArea.value = `${textArea.value.slice(0, textaeraCursorStart)}    ${textArea.value.slice(textaeraCursorEnd)}`;
  textaeraCursorStart += 4;
  textaeraCursorEnd += 4;
  textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
}

function capsLock() {
  capsLockKey.classList.toggle('active');
  if (capsLockKey.classList.contains('active')) {
    allKeysInner.forEach((item) => {
      const tempItem = item;
      tempItem.innerHTML = item.innerHTML.toUpperCase();
    });
  } else {
    allKeysInner.forEach((item) => {
      const tempItem = item;
      tempItem.innerHTML = item.innerHTML.toLowerCase();
    });
  }
}

function shiftOn() {
  allKeysInner.forEach((item) => {
    const tempItem = item;
    tempItem.innerHTML = capsLockKey.classList.contains('active') ? item.innerHTML.toLowerCase() : item.innerHTML.toUpperCase();
    const pos = keysArr[Number(item.classList[0][3])][Number(item.classList[0].slice(4))];
    if (lang === 'en' && pos.shiftValueEn) {
      tempItem.innerHTML = pos.shiftValueEn;
    } else if (lang === 'ru' && pos.shiftValueRu) {
      tempItem.innerHTML = pos.shiftValueRu;
    }
  });
}

function shiftOff() {
  allKeysInner.forEach((item) => {
    const tempItem = item;
    tempItem.innerHTML = capsLockKey.classList.contains('active') ? item.innerHTML.toUpperCase() : item.innerHTML.toLowerCase();
    const pos = keysArr[Number(item.classList[0][3])][Number(item.classList[0].slice(4))];
    if (lang === 'en' && pos.shiftValueEn) {
      tempItem.innerHTML = pos.key;
    } else if (lang === 'ru' && pos.shiftValueRu) {
      tempItem.innerHTML = pos.key;
    }
  });
}

function translateRu() {
  lang = 'ru';
  if (capsLockKey.classList.contains('active')) {
    allKeysInner.forEach((item) => {
      const pos = keysArr[Number(item.classList[0][3])][Number(item.classList[0].slice(4))];
      const tempItem = item;
      tempItem.innerHTML = pos.keyRu.toUpperCase();
    });
  } else {
    allKeysInner.forEach((item) => {
      const pos = keysArr[Number(item.classList[0][3])][Number(item.classList[0].slice(4))];
      const tempItem = item;
      tempItem.innerHTML = pos.keyRu;
    });
  }
}

function translateEn() {
  lang = 'en';
  if (capsLockKey.classList.contains('active')) {
    allKeysInner.forEach((item) => {
      const pos = keysArr[Number(item.classList[0][3])][Number(item.classList[0].slice(4))];
      const tempItem = item;
      tempItem.innerHTML = pos.key.toUpperCase();
    });
  } else {
    allKeysInner.forEach((item) => {
      const pos = keysArr[Number(item.classList[0][3])][Number(item.classList[0].slice(4))];
      const tempItem = item;
      tempItem.innerHTML = pos.key;
    });
  }
}

function addKeyDownInner(event) {
  textArea.focus();
  const activeKey = document.querySelector(`#${event.code}`);

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
  } else if (event.key === 'Shift') {
    event.preventDefault();
    shiftOn();
  }

  if (altKeyLeft.classList.contains('active') && ctrlKeyLeft.classList.contains('active')) {
    if (lang === 'en') {
      translateRu();
    } else {
      translateEn();
    }
  }

  activeKey.classList.add('animationClick');
}

function addKeyUp(event) {
  const activeKey = document.querySelector(`#${event.code}`);
  if (event.code !== 'CapsLock') {
    activeKey.classList.remove('active');
    if (event.key === 'Shift') {
      shiftOff();
    }
  }
  activeKey.classList.remove('animationClick');
}

function addAnimation(event) {
  event.target.classList.add('animationClick');
}

function removeAnimation(event) {
  event.target.classList.remove('animationClick');
}

function addCursorPosition() {
  textaeraCursorStart = textArea.selectionStart;
  textaeraCursorEnd = textArea.selectionEnd;
  textArea.setSelectionRange(textaeraCursorStart, textaeraCursorEnd);
}

backspaceKey.addEventListener('click', backspace);
enterKey.addEventListener('click', enter);
delKey.addEventListener('click', del);
allKeysInner.forEach((item) => {
  item.addEventListener('click', addClickKeyInner);
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
shiftKeyLeft.addEventListener('mousedown', shiftOn);
shiftKeyLeft.addEventListener('mouseup', shiftOff);
shiftKeyRight.addEventListener('mousedown', shiftOn);
shiftKeyRight.addEventListener('mouseup', shiftOff);
// arrowLeft.addEventListener('click', moveCursorLeft);
// arrowRight.addEventListener('click', moveCursorRight);

// -------------------------------------------------------------- //

function setLocalStorage() {
  localStorage.setItem('langStorage', lang);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('langStorage')) {
    lang = localStorage.getItem('langStorage');
    if (lang === 'ru') {
      translateRu();
    } else {
      translateEn();
    }
  }
}
window.addEventListener('load', getLocalStorage);
