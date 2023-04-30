const FirstLetterEn = { key: ['`', '~'] };
const keysNumber = [
  { key: ['1', '!'] },
  { key: ['2', '@'] },
  { key: ['3', '#'] },
  { key: ['4', '$'] },
  { key: ['5', '%'] },
  { key: ['6', '^'] },
  { key: ['7', '&'] },
  { key: ['8', '*'] },
  { key: ['9', '('] },
  { key: ['0', ')'] },
  { key: ['-', '_'] },
  { key: ['=', '+'] },
];
const langEn = [
  [
    { key: ['q'] },
    { key: ['w'] },
    { key: ['e'] },
    { key: ['r'] },
    { key: ['t'] },
    { key: ['y'] },
    { key: ['u'] },
    { key: ['i'] },
    { key: ['o'] },
    { key: ['p'] },
    { key: ['[', '{'] },
    { key: [']', '}'] },
    { key: ['\\', '|'] },
  ],
  [
    { key: ['a'] },
    { key: ['s'] },
    { key: ['d'] },
    { key: ['f'] },
    { key: ['g'] },
    { key: ['h'] },
    { key: ['j'] },
    { key: ['k'] },
    { key: ['l'] },
    { key: [';', ':'] },
    { key: ["'", '"'] },
  ],
  [
    { key: ['z'] },
    { key: ['x'] },
    { key: ['c'] },
    { key: ['v'] },
    { key: ['b'] },
    { key: ['n'] },
    { key: ['m'] },
    { key: [',', '<'] },
    { key: ['.', '>'] },
    { key: ['/', '?'] },
  ],
];
const Backspace = { code: 'Backspace' };
const arraowUp = { code: 'ArrowUp' };
const arraowLeft = { code: 'ArrowLeft' };
const arraowDown = { code: 'ArrowDown' };
const arraowRight = { code: 'ArrowRight' };
const shiftRight = { code: 'ShiftRight' };
const shiftLeft = { code: 'ShiftLeft' };
const enter = { code: 'Enter' };
const capsLock = { code: 'CapsLock' };
const del = { code: 'Delete' };
const tab = { code: 'Tab' };
const controlLeft = { code: 'ControlLeft' };
const controlRight = { code: 'ControlRight' };
const win = { code: 'window' };
const altLeft = { code: 'AltLeft' };
const altRight = { code: 'AltRight' };
const space = { code: 'Space' };
const restOfButtons = [
  arraowUp,
  shiftRight,
  'next',
  controlLeft,
  win,
  altLeft,
  space,
  altRight,
  arraowLeft,
  arraowDown,
  arraowRight,
  controlRight,
];
const keys = {
  en: [
    FirstLetterEn,
    ...keysNumber,
    Backspace,
    'next',
    tab,
    ...langEn[0],
    del,
    'next',
    capsLock,
    ...langEn[1],
    enter,
    'next',
    shiftLeft,
    ...langEn[2],
    ...restOfButtons,
  ],
};
class Keyboard {
  constructor() {
    this.caps = false;
    this.lang = 'en';
    this.keys = keys;
    this.value = '';
    this.KeyboardContainer = null;
    this.pos = 0;
    this.textArea = null;
    this.selectors = { keyboard: 'keyboard', display: 'display' };
    this.button = null;
  }

  init() {
    this.createPageLayout();
    this.createKeyboardLayout();
    this.buttons = this.KeyboardContainer.querySelectorAll('.keyboard__btn');
    this.KeyEventHandler();
    this.onClickHandler();
    this.textArea.addEventListener('click', () => {
      this.pos = this.textArea.selectionStart;
    });
  }

  createPageLayout() {
    const pageHtmlStr = `
     <header class="header">
       <h1 class="heading">Виртуалная клавиатура</h1>
     </header>
       <section class="${this.selectors.display}">
         <textArea class="${this.selectors.display}__text" ></textArea>
       </section>
       <section class="${this.selectors.keyboard}" aria-label="Keyboard">
       </section>
    `;
    document.body.insertAdjacentHTML('afterbegin', pageHtmlStr);
    this.KeyboardContainer = document.querySelector(
      `.${this.selectors.keyboard}`
    );
    this.textArea = document.querySelector(
      `.${this.selectors.display} > textarea`
    );
  }

  createKeyboardLayout() {
    const fragment = document.createDocumentFragment();
    let div = document.createElement('div');
    div.className = 'keyboard__row';
    const lang = this.keys[this.lang];

    for (let i = 0; i < lang.length; i += 1) {
      if (typeof lang[i] === 'string' && lang[i] === 'next') {
        fragment.append(div);
        div = document.createElement('div');
        div.className = 'keyboard__row';
      } else {
        const btn = Keyboard.createButton(lang[i]);
        div.append(btn);
      }
      fragment.append(div);
      this.KeyboardContainer.append(fragment);
    }
  }

  KeyEventHandler = () => {
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
    });
    document.addEventListener('keydown', ({ key, code }) => {
      let codeC = code;
      if (code === 'NumpadEnter') {
        codeC = 'Enter';
      }
      if (code === 'Numpad6') {
        codeC = 'ArrowRight';
      }
      if (code === 'Numpad8') {
        codeC = 'ArrowUp';
      }
      if (code === 'Numpad4') {
        codeC = 'ArrowLeft';
      }
      if (code === 'Numpad2') {
        codeC = 'ArrowDown';
      }
      if (code === ' NumpadDecimal') {
        codeC = 'Delete';
      }
      this.highligth(key, codeC);
    });
  };

  arrowUpHandler() {
    const event = new KeyboardEvent('keydown', {
      view: 'window',
      code: 'ArrowLeft',
    });
    const button = this.KeyboardContainer.querySelector(
      '.keyboard__btn--arrowup'
    );
    button.dispatchEvent(event);
  }

  onClickHandler() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const { code, key } = button.dataset;
        const val = this.textArea.value;
        if (code === 'Space') {
          this.insert(' ');
        }
        if (code === 'Delete') {
          if (this.pos < val.length) {
            this.delete(this.pos, this.pos + 1);
            this.setPos(0);
          }
        }
        if (code === 'Backspace') {
          if (val.length > 0 && this.pos > 0) {
            this.delete(this.pos - 1, this.pos);
            this.setPos(-1);
          }
        }
        if (code === 'ArrowLeft') {
          if (val.length > 0 && this.pos > 0) {
            this.setPos(-1);
          }
        }

        if (code === 'ArrowRight') {
          if (this.pos < val.length) {
            this.setPos(1);
          }
        }
        if (code === 'ArrowUp') {
          this.insert('⬆️');
          this.setPos(1);
        }
        if (code === 'ArrowDown') {
          this.insert('⬇️');
          this.setPos(1);
        }
        if (key) {
          this.insert(key);
          this.setPos(1);
        }
        this.textArea.focus();
      });
    });
  }

  setPos(n) {
    this.pos += n;
    this.textArea.selectionStart = this.pos;
    this.textArea.selectionEnd = this.pos;
  }

  delete(pos1, pos2) {
    const val = this.textArea.value;
    this.textArea.value = `${val.slice(0, pos1)}${val.slice(pos2)}`;
  }

  insert(value) {
    const val = this.textArea.value;
    if (this.pos === val.length) {
      this.textArea.value += value;
    } else {
      this.textArea.value = `${val.slice(0, this.pos)}${value}${val.slice(
        this.pos
      )}`;
    }
  }

  highligth(key, code) {
    const button = [...this.buttons].find(
      (btn) => btn.dataset.key === key || btn.dataset.code === code
    );
    if (button) {
      button.click();
      button.classList.add('active');
      setTimeout(() => {
        button.classList.remove('active');
      }, 500);
    }
  }

  static createButton(item) {
    const button = document.createElement('div');
    button.className = 'keyboard__btn';
    const key = item?.key;
    let val = '';
    if (key) {
      val = Keyboard.setKey(key);
      button.textContent = val;
      button.setAttribute('data-key', val);
    } else {
      val = item?.code;
      button.classList.add(`keyboard__btn--${val.toLowerCase()}`);
      button.setAttribute('data-code', val);
    }
    return button;
  }

  static setKey(keysArr, caps) {
    let key = '';
    if (caps) {
      if (keysArr[1]) {
        [, key] = keysArr[(0, 1)];
      }
      key = keysArr[0].toUppercase();
    } else {
      [key] = keysArr.at(0);
    }
    return key;
  }
}

const keyboard = new Keyboard();

keyboard.init();
