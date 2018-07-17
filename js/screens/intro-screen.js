import IntroView from "../view/intro-view";
import App from "../application";

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
  }

  init() {
    this.content.onInputChange = (isValidity) => {
      this.content.disableButton();
      if (isValidity) {
        this.content.enableButton();
      }
    };

    this.content.onFormSubmit = (playerName) => {
      App.showGame(playerName);
    };
  }
}

