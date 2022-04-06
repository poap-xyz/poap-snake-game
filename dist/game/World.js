function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import UI from './UI';
import Board from './Board';
import Snake from './Snake';
import Food from './Food';

let World = /*#__PURE__*/function () {
  function World(rows, cols, ratio, targetScore, onComplete, loader, input, camera) {
    _classCallCheck(this, World);

    _defineProperty(this, "input", null);

    _defineProperty(this, "camera", null);

    _defineProperty(this, "board", null);

    _defineProperty(this, "snake", null);

    _defineProperty(this, "food", null);

    _defineProperty(this, "targetScore", 5);

    _defineProperty(this, "onComplete", null);

    _defineProperty(this, "score", 0);

    _defineProperty(this, "started", false);

    this.targetScore = targetScore;
    this.onComplete = onComplete;
    this.input = input;
    this.camera = camera;
    this.UI = new UI(rows, cols, ratio, loader, input, this.reset.bind(this));
    this.board = new Board(rows, cols, loader);
    this.snake = new Snake(rows, cols, ratio, loader, input);
    this.food = new Food(loader);
  }

  _createClass(World, [{
    key: "initialize",
    value: function initialize() {
      this.snake.spawn(this.board.rows / 2 - 1, 2);
      this.board.initialize(this.snake.segments);
      this.UI.draw(this.score);
      this.feed();
    }
  }, {
    key: "feed",
    value: function feed() {
      const available = this.board.getRandomFreeTile();

      if (available) {
        const [row, col] = available;
        this.food.spawn(row, col);
        this.board.setFood(row, col);
        this.snake.setTarget(row, col);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.score = 0;
      this.started = false;
      this.UI.gameover = false;
      this.UI.indicator = true;
      this.initialize();
    }
  }, {
    key: "update",
    value: function update(delta) {
      this.UI.update(delta);
      const {
        keys,
        swipe
      } = this.input;

      if (!this.started) {
        if (keys.KeyW || keys.ArrowUp || swipe.up || keys.KeyA || keys.ArrowLeft || swipe.left || keys.KeyS || keys.ArrowDown || swipe.down || keys.KeyD || keys.ArrowRight || swipe.right) {
          this.started = true;
          this.UI.indicator = false;
          this.UI.draw(this.score);
        }

        return;
      }

      if (!this.snake.live) {
        if (keys.Space) {
          this.reset();
        }

        return;
      }

      const segments = this.snake.segments;
      const prevLength = segments.length;
      const prevRow = segments[0].row;
      const prevCol = segments[0].col;
      const lastRow = segments[segments.length - 1].row;
      const lastCol = segments[segments.length - 1].col;
      this.snake.update(delta);
      const nextLength = segments.length;
      const nextRow = segments[0].row;
      const nextCol = segments[0].col;

      if (prevRow !== nextRow || prevCol !== nextCol) {
        if (prevLength === nextLength) {
          this.board.setFree(lastRow, lastCol);
        }

        this.checkMove(nextRow, nextCol);

        if (this.snake.live) {
          this.board.setSnake(nextRow, nextCol);
        }
      }
    }
  }, {
    key: "checkMove",
    value: function checkMove(row, col) {
      if (!this.board.isGoodMove(row, col)) {
        this.snake.die();
        this.camera.shake();
        this.UI.gameover = true;
        this.UI.draw(this.score);
      } else if (this.board.isFood(row, col)) {
        this.snake.eat();
        this.score++;

        if (this.score === this.targetScore) {
          this.UI.success = true;
          this.onComplete && this.onComplete(this.score);
        }

        this.UI.draw(this.score);
        this.feed();
      }
    }
  }, {
    key: "render",
    value: function render(context) {
      this.board.render(context);
      this.food.render(context);
      this.snake.render(context);
      this.UI.render(context);
    }
  }]);

  return World;
}();

export default World;