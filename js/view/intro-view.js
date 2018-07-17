import AbstractView from "../abstract-view";
import {createElement} from "../utils";

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <h1 class="intro__title">Snake</h1>
      <p class="intro__description">The player controls a snake, which is picking up food, trying to avoid hitting its own tail. Each time the snake eats a piece of food, its tail grows longer. The user controls the direction of the snake's head (up, down, left, or right), and the snake's body follows. The player can not stop the snake from moving while the game is in progress, and can not make the snake to go in reverse. </p>
      <form class="intro__form">
        <input class="intro__input" type="text" placeholder="Player name" pattern="[a-zA-Z0-9-_\.\s]{1,20}" required>
        <button class="intro__button  continue" type="submit" disabled>Go!</button>
      </form>`;
  }

  render() {
    return createElement(this.template, `section`, `intro`);
  }

  bind() {
    this.nameField = this.element.querySelector(`.intro__input`);
    this.buttonSubmit = this.element.querySelector(`.intro__button`);

    this.nameField.addEventListener(`input`, () => this.onInputChange(this.nameField.checkValidity()));

    this.buttonSubmit.onclick = (evt) => {
      evt.preventDefault();
      this.onFormSubmit(this.nameField.value);
    };
  }

  enableButton() {
    this.buttonSubmit.disabled = false;
  }

  disableButton() {
    this.buttonSubmit.disabled = true;
  }

  onInputChange() {}

  onFormSubmit() {}
}
