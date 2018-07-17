import AbstractView from "../abstract-view";

export default class ModalView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <div class="game__modal">
      <h3 class="game__modal-question">Do you really want to quit?</h3>
      <p class="game__modal-text">Progress in the current game will be lost!</p>
      <button type="button" class="game__modal-button  game__modal-button--reset">Yes</button>
      <button type="button" class="game__modal-button  game__modal-button--continue">No</button>
    </div>`;
  }

  bind() {
    this.element.querySelector(`.game__modal-button--reset`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onResetClick();
    });
    this.element.querySelector(`.game__modal-button--continue`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onContinueClick();
    });
  }

  onResetClick() {}

  onContinueClick() {}
}
