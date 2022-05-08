import {keysArr} from './keysArr.js';


export function createKeyboard() {
    let divTitle = document.createElement('h1');
    divTitle.className = "title";
    divTitle.id = "title";
    divTitle.innerHTML = "RSS Виртуальная клавиатура";
    document.body.append(divTitle);

    let textArea = document.createElement('textarea');
    textArea.className = "textarea";
    textArea.rows = "8";
    textArea.cols = "50";
    document.body.append(textArea);

    let keyboardContainer = document.createElement('div');
    keyboardContainer.className = "keyboard-container";
    document.body.append(keyboardContainer);
    for (let i = 0; i < keysArr.length; i++) {
        let keyboardRow = document.createElement('div');
        keyboardRow.className = "keyboard-row";
        keyboardContainer.append(keyboardRow);
        for (let j = 0; j < keysArr[i].length; j++) {
            let key = document.createElement('div');
            key.className = `${keysArr[i][j].pos} key keyInner ${keysArr[i][j].code}`;
            key.id = keysArr[i][j].code;
            key.innerHTML = keysArr[i][j].key;
            keyboardRow.append(key);
        }
    }
    const keyNotInner = document.querySelectorAll('.Backspace, .Tab, .Delete, .CapsLock, .Enter, .ShiftLeft, .ShiftRight, .ArrowUp, .ControlLeft, .MetaLeft, .AltLeft, .AltRight, .ArrowLeft, .ArrowDown, .ArrowRight, .ControlRight');
    keyNotInner.forEach(item => item.classList.remove('keyInner'));
  }