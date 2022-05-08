import keysArr from './keysArr.js';

export default function createKeyboard() {
  const h1 = document.createElement('h1');
  h1.className = 'title';
  h1.id = 'title';
  h1.innerHTML = 'RSS Виртуальная клавиатура';
  document.body.append(h1);

  const textArea = document.createElement('textarea');
  textArea.className = 'textarea';
  textArea.rows = '7';
  textArea.cols = '50';
  document.body.append(textArea);

  const keyboardContainer = document.createElement('div');
  keyboardContainer.className = 'keyboard-container';
  document.body.append(keyboardContainer);
  for (let i = 0; i < keysArr.length; i += 1) {
    const keyboardRow = document.createElement('div');
    keyboardRow.className = 'keyboard-row';
    keyboardContainer.append(keyboardRow);
    for (let j = 0; j < keysArr[i].length; j += 1) {
      const key = document.createElement('div');
      key.className = `${keysArr[i][j].pos} key keyInner ${keysArr[i][j].code}`;
      key.id = keysArr[i][j].code;
      key.innerHTML = keysArr[i][j].key;
      keyboardRow.append(key);
    }
  }

  const h3System = document.createElement('h3');
  h3System.className = 'windows';
  h3System.innerHTML = 'Клавиатура создана в операционной системе Windows';
  document.body.append(h3System);

  const h3Lang = document.createElement('h3');
  h3Lang.className = 'changeLang';
  h3Lang.innerHTML = 'Для переключения языка комбинация: левыe ctrl + alt';
  document.body.append(h3Lang);

  const keyNotInner = document.querySelectorAll('.Backspace, .Tab, .Delete, .CapsLock, .Enter, .ShiftLeft, .ShiftRight, .ControlLeft, .MetaLeft, .AltLeft, .AltRight, .ControlRight');
  keyNotInner.forEach((item) => item.classList.remove('keyInner'));
}
