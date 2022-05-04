let divTitle = document.createElement('h1');
divTitle.className = "title";
divTitle.id = "title";
divTitle.innerHTML = "RSS Виртуальная клавиатура";
document.body.append(divTitle);

let textArea = document.createElement('textarea');
textArea.className = "textarea";
textArea.rows = "14";
textArea.cols = "100";
document.body.append(textArea);

function createKeyboard() {
    let keyboardContainer = document.createElement('div');
    keyboardContainer.className = "keyboard-container";
    document.body.append(keyboardContainer);
    let keysArr = [["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
                   ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"],
                   ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "Enter"],
                   ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&#9650"],
                   ["Ctrl", "Win", "Alt", "space", "Alt", "&#9664;", "&#9660", "&#9654;", "Ctrl"]];
    for (let i = 0; i < keysArr.length; i++) {
        let keyboardRow = document.createElement('div');
        keyboardRow.className = "keyboard-row";
        keyboardContainer.append(keyboardRow);
        for (let j = 0; j < keysArr[i].length; j++) {
            let key = document.createElement('div');
            key.className = `key ${keysArr[i][j]}`;
            key.id = keysArr[i][j];
            key.innerHTML = keysArr[i][j];
            keyboardRow.append(key);
        }
    }
}

createKeyboard()