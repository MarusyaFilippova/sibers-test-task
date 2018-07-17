import AbstractView from "../abstract-view";
import {createElement} from "../utils";

export default class StatsView extends AbstractView {
  constructor() {
    super();
    this.myStorage = window.localStorage;
    this.data = [];
    this._templateAllGames = ``;
  }

  get template() {
    this._getData();
    this._getTemplates();
    return `
    <header class="result__header">
      <button class="result__back back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
      </button>
      <h1 class="result__title">Results</h1>
    </header>
    <table class="result__table">
      <tr>
        <th class="result__number">#</th>
        <th>Player</th>
        <th class="result__total  result__total--final">Score</th>
      </tr>
      ${this._templateAllGames}
    </table>`;
  }

  _getTemplates() {
    this.data.forEach((gameState, index) => {
      this._templateAllGames += this._templateOneGame(gameState, index);
    });
  }

  _getData() {
    for (let i = 0; i < this.myStorage.length; i++) {
      const key = this.myStorage.key(i);
      const data = this.myStorage.getItem(key).split(`,`);
      this.data.push({playerName: data[0], score: data[1]});
    }
    this.data.sort((a, b) => {
      return b.score - a.score;
    });
  }

  _templateOneGame(gameState, index) {
    return `
      <tr>
        <td class="result__number">${index + 1}.</td>
        <td>${gameState.playerName}</td>
        <td class="result__total  result__total--final">${gameState.score}</td>
      </tr>`;
  }

  render() {
    return createElement(this.template, `section`, `result`);
  }

  bind() {
    this.buttonBack = this.element.querySelector(`.back`);
    this.buttonBack.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onBackBtnClick();
    });
  }
}
