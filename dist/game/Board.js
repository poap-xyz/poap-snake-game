function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { TileSize, TileType } from '../constant';
import { getRandomInt } from '../lib';
import Drawing from './Drawing';

let Board = /*#__PURE__*/function () {
  function Board(rows, cols, loader) {
    _classCallCheck(this, Board);

    _defineProperty(this, "rows", 0);

    _defineProperty(this, "cols", 0);

    _defineProperty(this, "loader", null);

    _defineProperty(this, "matrix", new Map());

    this.rows = rows;
    this.cols = cols;
    this.loader = loader;
    this.drawing = new Drawing(cols * TileSize, rows * TileSize, 2);
  }

  _createClass(Board, [{
    key: "initialize",
    value: function initialize(segments) {
      for (let row = 0; row < this.rows; row++) {
        this.matrix.set(row, new Map());

        for (let col = 0; col < this.cols; col++) {
          if (segments.find(segment => segment.row === row && segment.col === col)) {
            this.setSnake(row, col);
          } else {
            this.setFree(row, col);
          }
        }
      }

      this.draw();
    }
  }, {
    key: "get",
    value: function get(row, col) {
      return this.matrix.get(row).get(col);
    }
  }, {
    key: "set",
    value: function set(row, col, type) {
      return this.matrix.get(row).set(col, type);
    }
  }, {
    key: "setFree",
    value: function setFree(row, col) {
      this.set(row, col, TileType.FREE);
    }
  }, {
    key: "setFood",
    value: function setFood(row, col) {
      this.set(row, col, TileType.FOOD);
    }
  }, {
    key: "setSnake",
    value: function setSnake(row, col) {
      this.set(row, col, TileType.SNAKE);
    }
  }, {
    key: "isFree",
    value: function isFree(row, col) {
      return this.get(row, col) === TileType.FREE;
    }
  }, {
    key: "isFood",
    value: function isFood(row, col) {
      return this.get(row, col) === TileType.FOOD;
    }
  }, {
    key: "isSnake",
    value: function isSnake(row, col) {
      return this.get(row, col) === TileType.SNAKE;
    }
  }, {
    key: "isInside",
    value: function isInside(row, col) {
      return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }
  }, {
    key: "isGoodMove",
    value: function isGoodMove(row, col) {
      return this.isInside(row, col) && !this.isSnake(row, col);
    }
  }, {
    key: "getRandomFreeTile",
    value: function getRandomFreeTile() {
      let tmpFree = [];

      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          if (this.isFree(row, col)) {
            tmpFree.push([row, col]);
          }
        }
      }

      if (tmpFree.length === 0) {
        return false;
      }

      const rand = getRandomInt(0, tmpFree.length - 1);
      const tile = tmpFree[rand];
      tmpFree = null;
      return tile;
    }
  }, {
    key: "draw",
    value: function draw() {
      const pattern = this.loader.getImage('board.background');
      this.drawing.draw(({
        context
      }) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.fillStyle = context.createPattern(pattern, 'repeat');
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      });
    }
  }, {
    key: "render",
    value: function render(context) {
      const {
        canvas,
        width,
        height,
        widthRatio,
        heightRatio
      } = this.drawing;
      context.drawImage(canvas, 0, 0, widthRatio, heightRatio, 0, 0, width, height);
      /*
      for (let [row, cols] of this.matrix) {
        for (let [col, tileType] of cols) {
           if( tileType === TileType.FREE ){
            continue
          }
           context.fillStyle = 'rgba(0,0,100,.3)'
          context.fillRect(col * TileSize, row * TileSize, TileSize, TileSize)
        }
      }
      */
    }
  }]);

  return Board;
}();

export default Board;