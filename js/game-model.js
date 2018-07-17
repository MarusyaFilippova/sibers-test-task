import {TICK_TIME, SPEED_COEF, LEVEL_LIMIT, Command, Table, getRandomNum, createKey} from "./utils";

export default class GameModel {
  constructor(playerName) {
    this.myStorage = window.localStorage;
    this.playerName = playerName;
    this.command = Command.RIGHT;
    this.tick = TICK_TIME;
    this.restartGame();
  }

  get gameState() {
    return this._gameState;
  }

  switchCommand(command) {
    const newPoint = this.getNewSnakePoint(command);
    const shakeSecondPoint = this._gameState.snakeCoords[1];
    if (newPoint.X !== shakeSecondPoint.X || newPoint.Y !== shakeSecondPoint.Y) {
      this.command = command;
    }
  }

  shouldContinue() {
    this.isNextLevel = false;
    const newPoint = this.getNewSnakePoint(this.command);
    if (this.isSnake(newPoint)) {
      return false;
    } else if (!this.isFood(newPoint)) {
      this._gameState.snakeCoords.pop();
    } else {
      this._gameState.score += 1;
      if (this._gameState.score % LEVEL_LIMIT === 0) {
        this.isNextLevel = true;
        this.changeLevel();
      }
      this.generateNewFoodPoint();
    }
    this._gameState.snakeCoords.unshift(newPoint);
    return true;
  }

  changeLevel() {
    this._gameState.level += 1;
    this.tick *= SPEED_COEF;
  }

  generateNewFoodPoint() {
    const newFoodPoint = {
      X: getRandomNum(1, Table.COLUMN),
      Y: getRandomNum(1, Table.ROW)
    };
    if (this.isSnake(newFoodPoint)) {
      this.generateNewFoodPoint();
    } else {
      this._gameState.foodPoint = newFoodPoint;
    }
  }

  getNewSnakePoint(command) {
    const oldHead = this._gameState.snakeCoords.slice()[0];
    const newHead = Object.assign({}, oldHead);

    switch (command) {
      case Command.UP:
        if (oldHead.Y === 1) {
          newHead.Y = Table.ROW;
          break;
        }
        newHead.Y -= 1;
        break;
      case Command.RIGHT:
        if (oldHead.X === Table.COLUMN) {
          newHead.X = 1;
          break;
        }
        newHead.X += 1;
        break;
      case Command.DOWN:
        if (oldHead.Y === Table.ROW) {
          newHead.Y = 1;
          break;
        }
        newHead.Y += 1;
        break;
      case Command.LEFT:
        if (oldHead.X === 1) {
          newHead.X = Table.COLUMN;
          break;
        }
        newHead.X -= 1;
    }
    return newHead;
  }

  restartGame() {
    this._gameState = {
      level: 1,
      score: 0,
      snakeCoords: [{
        X: 6,
        Y: 5
      }, {
        X: 5,
        Y: 5
      }, {
        X: 4,
        Y: 5
      }],
      foodPoint: {
        X: 15,
        Y: 7
      }
    };
  }

  saveResult() {
    this.myStorage.setItem(createKey(), [this.playerName, this._gameState.score]);
  }

  isSnake(point) {
    const snakeCoords = this._gameState.snakeCoords;
    for (let i = 0; i < snakeCoords.length; i++) {
      if (snakeCoords[i].X === point.X && snakeCoords[i].Y === point.Y) {
        return true;
      }
    }
    return false;
  }

  isFood(point) {
    const food = this._gameState.foodPoint;
    return (food.X === point.X && food.Y === point.Y);
  }
}
