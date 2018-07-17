import App from "./../application";
import StatsView from "../view/stats-view";

export default class StatsScreen {
  constructor(data) {
    this.content = new StatsView(data);
  }

  init() {
    this.content.onBackBtnClick = () => App.showIntro();
  }
}
