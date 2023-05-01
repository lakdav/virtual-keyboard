const FirstLetterEn = { code: 'Backquote', key: ['`', '~'] };
const keysNumber = [
  { code: 'Digit1', key: ['1', '!'] },
  { code: 'Digit2', key: ['2', '@'] },
  { code: 'Digit3', key: ['3', '#'] },
  { code: 'Digit4', key: ['4', '$'] },
  { code: 'Digit5', key: ['5', '%'] },
  { code: 'Digit6', key: ['6', '^'] },
  { code: 'Digit7', key: ['7', '&'] },
  { code: 'Digit8', key: ['8', '*'] },
  { code: 'Digit9', key: ['9', '('] },
  { code: 'Digit0', key: ['0', ')'] },
  { code: 'Minus', key: ['-', '_'] },
  { code: 'Equal', key: ['=', '+'] },
];
const langEn = [
  [
    { code: 'KeyQ', key: ['q'] },
    { code: 'KeyE', key: ['w'] },
    { code: 'KeyE', key: ['e'] },
    { code: 'KeyR', key: ['r'] },
    { code: 'KeyT', key: ['t'] },
    { code: 'KeyY', key: ['y'] },
    { code: 'KeyU', key: ['u'] },
    { code: 'KeyI', key: ['i'] },
    { code: 'KeyO', key: ['o'] },
    { code: 'KeyP', key: ['p'] },
    { code: 'BracketLeft', key: ['[', '{'] },
    { code: 'BracketRight', key: [']', '}'] },
    { code: 'Backslash', key: ['\\', '|'] },
  ],
  [
    { code: 'KeyA', key: ['a'] },
    { code: 'KeyS', key: ['s'] },
    { code: 'KeyD', key: ['d'] },
    { code: 'KeyF', key: ['f'] },
    { code: 'KeyG', key: ['g'] },
    { code: 'KeyH', key: ['h'] },
    { code: 'KeyJ', key: ['j'] },
    { code: 'KeyK', key: ['k'] },
    { code: 'KeyL', key: ['l'] },
    { code: 'Semicolon', key: [';', ':'] },
    { code: 'Quote', key: ["'", '"'] },
  ],
  [
    { code: 'KeyZ', key: ['z'] },
    { code: 'KeyX', key: ['x'] },
    { code: 'KeyC', key: ['c'] },
    { code: 'KeyV', key: ['v'] },
    { code: 'KeyB', key: ['b'] },
    { code: 'KeyN', key: ['n'] },
    { code: 'KeyM', key: ['m'] },
    { code: 'Comma', key: [',', '<'] },
    { code: 'Period', key: ['.', '>'] },
    { code: 'Slash', key: ['/', '?'] },
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
    this.selectors = {
      keyboard: 'keyboard',
      display: 'display',
      button: 'keyboard__btn',
    };
    this.button = null;
    this.KeyEventHandler = this.KeyEventHandler.bind(this);
  }

  init() {
    this.createPageLayout();
    this.setKeyboardFunctionality();
    this.textArea.addEventListener('click', () => {
      this.pos = this.textArea.selectionStart;
    });
  }

  setKeyboardFunctionality() {
    this.createKeyboardLayout();
    this.onClickHandler();
    this.KeyEventHandler();
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

  createKeyboardLayout = () => {
    const fragment = document.createDocumentFragment();
    let div = Keyboard.createRow();
    const lang = this.keys[this.lang];
    for (let i = 0; i < lang.length; i += 1) {
      if (typeof lang[i] === 'string' && lang[i] === 'next') {
        fragment.append(div);
        div = Keyboard.createRow();
      } else {
        const btn = this.createButton(lang[i]);
        div.append(btn);
      }
      fragment.append(div);
      this.KeyboardContainer.append(fragment);
    }
    this.buttons = this.KeyboardContainer.querySelectorAll('.keyboard__btn');
  };

  static createRow() {
    const div = document.createElement('div');
    div.className = 'keyboard__row';
    return div;
  }

  createButton(item) {
    const { code, key } = item;
    const button = this.createButtonEl();
    let val = '';
    if (key) {
      val = this.buttonKey(key);
      button.textContent = val;
      button.setAttribute('data-key', key.join(''));
    }
    button.classList.add(`keyboard__btn--${code.toLowerCase()}`);
    button.setAttribute('data-code', code);
    return button;
  }

  createButtonEl() {
    const button = document.createElement('div');
    button.className = this.selectors.button;
    return button;
  }

  buttonKey(item) {
    let val = '';
    if (this.caps) {
      if (item.length === 2) {
        val = item.at(1);
      } else {
        val = item.at(0).toUpperCase();
      }
    } else {
      val = item.at(0);
    }
    return val;
  }

  KeyEventHandler() {
    if (window.onkeydown) {
      window.onkeydown = null;
    }
    if (document.onkeydown) {
      document.onkeydown = null;
    }
    window.onkeydown = (e) => {
      e.preventDefault();
    };
    document.onkeydown = ({ code }) => {
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
      if (code === 'NumpadDecimal') {
        codeC = 'Delete';
      }
      if (code === 'ShiftLeft' || code === 'ShiftRight') {
        this.caps = true;
        this.caseHandler();
      }
      const button = this.search(codeC);
      if (button) {
        Keyboard.highligth(button);
        button.click();
      }
      console.log(code);
    };
    document.onkeyup = ({ code }) => {
      if (code === 'ShiftLeft' || code === 'ShiftRight') {
        this.caps = false;
        this.caseHandler();
      }
    };
  }

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
      if (
        button.dataset.code === 'ShiftLeft' ||
        button.dataset.code === 'ShiftRight'
      ) {
        button.addEventListener('mousedown', () => {
          this.caps = true;
          this.caseHandler();
        });
        button.addEventListener('mouseup', () => {
          this.caps = false;
          this.caseHandler();
        });
      }

      button.addEventListener('click', () => {
        const { code, key } = button.dataset;
        const [value] = [this.textArea.value];
        if (code === 'Space') {
          this.insert(' ');
          this.setPos(1);
        }
        if (code === 'Delete') {
          if (this.pos < value.length) {
            this.delete(this.pos, this.pos + 1);
            this.setPos(0);
          }
        }
        if (code === 'Backspace') {
          if (value.length > 0 && this.pos > 0) {
            this.delete(this.pos - 1, this.pos);
            this.setPos(-1);
          }
        }
        if (code === 'ArrowLeft') {
          if (value.length > 0 && this.pos > 0) {
            this.setPos(-1);
          }
        }
        if (code === 'Tab') {
          this.insert('\t');
          this.setPos(1);
        }
        if (code === 'Enter') {
          this.insert('\n');
          this.setPos(1);
        }
        if (code === 'CapsLock') {
          this.caps = !this.caps;
          this.caseHandler();
        }
        if (code === 'ArrowRight') {
          if (this.pos < value.length) {
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
          const val = this.getVal(key);
          if (val) {
            this.insert(val);
            this.setPos(1);
          }
        }
        this.textArea.focus();
      });
    });
  }

  caseHandler() {
    this.buttons.forEach((button) => {
      const k = button.dataset.key;
      if (k) {
        let text = '';
        if (this.caps) {
          if (k.length === 2) {
            [text] = [k[1]];
            // eslint-disable-next-line no-param-reassign
            button.textContent = text;
          } else {
            [text] = [k[0]];
            // eslint-disable-next-line no-param-reassign
            button.textContent = text.toUpperCase();
          }
        } else {
          [text] = [k[0]];
          // eslint-disable-next-line no-param-reassign
          button.textContent = text;
        }
      }
    });
  }

  getVal(key) {
    if (key) {
      let val = '';
      if (this.caps) {
        if (key.length === 2) {
          [val] = [key[1]];
        } else {
          val = key[0].toUpperCase();
        }
      } else {
        [val] = [key[0]];
      }
      return val;
    }
    return undefined;
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

  search(code) {
    return [...this.buttons].find((btn) => btn.dataset.code === code);
  }

  static highligth(button) {
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 500);
  }
}

const keyboard = new Keyboard();

keyboard.init();
