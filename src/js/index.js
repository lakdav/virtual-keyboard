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
const del = { code: 'Del' };
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
    this.textArea = null;
    this.selectors = { keyboard: 'keyboard', display: 'display' };
  }

  init() {
    this.createPageLayout();
    this.createKeyboardLayout();
  }

  createPageLayout() {
    const pageHtmlStr = `
     <header class="header">
       <h1 class="heading">Виртуалная клавиатура</h1>
     </header>
       <section class="${this.selectors.display}">
         <textArea class="${this.selectors.display}__text"></textArea>
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

  static createButton(item) {
    const button = document.createElement('div');
    button.className = 'keyboard__btn';
    const key = item?.key;
    let val = '';
    if (key) {
      val = Keyboard.setKey(key);
      button.textContent = val;
    } else {
      val = item?.code;
      button.classList.add(`keyboard__btn--${val.toLowerCase()}`);
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
