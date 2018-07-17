import IntroScreen from "./screens/intro-screen";
import GameScreen from "./screens/game-screen";
import GameModel from "./game-model";
import StatsScreen from "./screens/stats-screen";

const screenContainer = document.querySelector(`.central`);

const showScreen = (element) => {
  screenContainer.innerHTML = ``;
  screenContainer.appendChild(element);
};

export default class Application {
  static showIntro() {
    const intro = new IntroScreen();
    showScreen(intro.content.element);
    intro.init();
  }

  static showGame(playerName = `Anonymous Raccoon`) {
    const game = new GameScreen(new GameModel(playerName));
    showScreen(game.root);
    game.init();
  }

  static showStats() {
    const stats = new StatsScreen();
    showScreen(stats.content.element);
    stats.init();
  }
}
