import App from "../application";
import GameView from "../view/game-view";
import ModalView from "../view/modal-view";

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.content = new GameView(this.model);
    this.root = document.createElement(`section`);
    this.root.classList.add(`game`);
    this.root.appendChild(this.content.element);
    this._interval = null;
    this.isModalOpen = false;
  }

  get element() {
    return this.content.element;
  }

  init() {
    this.startGame();
    this.content.onCommandPress = (evt) => {
      this.model.switchCommand(evt.key);
    };
    this.content.onBackBtnClick = () => this.showModal();
  }

  startGame() {
    this._interval = setInterval(() => {
      let isFirstCommand = true;
      this.content.onCommandPress = (evt) => {
        if (isFirstCommand) {
          this.model.switchCommand(evt.key);
          isFirstCommand = false;
        }
      };
      if (this.model.shouldContinue()) {
        this.updateView();
        if (this.model.isNextLevel) {
          this.stopGame();
          this.startGame();
        }
      } else {
        this.model.saveResult();
        this.stopGame();
        App.showStats();
      }
    }, this.model.tick);
  }

  stopGame() {
    clearInterval(this._interval);
  }

  updateView() {
    const view = new GameView(this.model);
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
    this.content.onBackBtnClick = () => {
      if (!this.isModalOpen) {
        this.showModal();
      }
    };
  }

  showModal() {
    this.stopGame();
    this.isModalOpen = true;
    const modal = new ModalView();
    modal.onResetClick = () => {
      App.showIntro();
    };
    modal.onContinueClick = () => {
      this.startGame();
      modal.element.remove();
      this.isModalOpen = false;
    };
    this.root.appendChild(modal.element);
  }

}
