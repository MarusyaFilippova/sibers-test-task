export const TICK_TIME = 500;
export const SPEED_COEF = 0.9;
export const LEVEL_LIMIT = 5;

export const Table = {
  ROW: 15,
  COLUMN: 30
};

export const Command = {
  LEFT: `ArrowLeft`,
  UP: `ArrowUp`,
  RIGHT: `ArrowRight`,
  DOWN: `ArrowDown`,
};

const KeyCode = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

const isLeftEvent = function (evt) {
  return evt.keyCode === KeyCode.LEFT;
};

const isUpEvent = function (evt) {
  return evt.keyCode === KeyCode.UP;
};

const isRightEvent = function (evt) {
  return evt.keyCode === KeyCode.RIGHT;
};

const isDownEvent = function (evt) {
  return evt.keyCode === KeyCode.DOWN;
};

export const isCommandEvent = function (evt) {
  return isLeftEvent(evt) || isUpEvent(evt) || isRightEvent(evt) || isDownEvent(evt);
};

export const getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createKey = function () {
  return `key_` + Math.random().toString(36).substr(2, 9);
};

export const createElement = function (template = ``, tagName = `div`, className = ``) {
  const outer = document.createElement(tagName);
  if (className) {
    outer.classList.add(className);
  }
  outer.innerHTML = template.trim();
  return outer;
};


