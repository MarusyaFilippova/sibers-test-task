import AbstractView from "../abstract-view";
import {Table, createElement, isCommandEvent} from "../utils";

export default class GameView extends AbstractView {
  constructor(model) {
    super();
    this.gameState = model.gameState;
  }

  get template() {
    return `
      ${this._getHeaderTemplate()}
      <div class="game__table">
        ${this._getCellsTemplate()}
      </div>`;
  }

  _getHeaderTemplate() {
    return `
      <header class="game__header">
        <button class="back">
          <img src="img/arrow_left.svg" width="40" height="40" alt="Back">
        </button>
        <span class="game__score">Score: ${this.gameState.score}</span>
        <span class="game__level">Level: ${this.gameState.level}</span>
      </header>`;
  }

  _getCellsTemplate() {
    const snakeCoords = this.gameState.snakeCoords;
    const foodPoint = this.gameState.foodPoint;

    let cells = ``;
    for (let i = 1; i <= Table.ROW; i++) {
      for (let j = 1; j <= Table.COLUMN; j++) {
        let isSnake = false;
        for (let k = 0; k < snakeCoords.length; k++) {
          if (i === snakeCoords[k].Y && j === snakeCoords[k].X) {
            isSnake = true;
            break;
          }
        }
        if (isSnake) {
          cells += `<div class="game__cell game__cell--snake">${i}, ${j}</div>`;
        } else if (foodPoint.X === j && foodPoint.Y === i) {
          cells += `<div class="game__cell game__cell--food">${i}, ${j}</div>`;
        } else {
          cells += `<div class="game__cell">${i}, ${j}</div>`;
        }
      }
    }
    return cells;
  }

  render() {
    return createElement(this.template, `div`, `game__content`);
  }

  bind() {
    document.addEventListener(`keydown`, (evt) => {
      if (isCommandEvent(evt)) {
        this.onCommandPress(evt);
      }
    });
    this.buttonBack = this.element.querySelector(`.back`);
    this.buttonBack.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onBackBtnClick();
    });
  }

  onCommandPress() {}

  onBackBtnClick() {}
}
