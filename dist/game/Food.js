function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { TileSize } from '../constant';

let Food = /*#__PURE__*/function () {
  function Food(loader) {
    _classCallCheck(this, Food);

    _defineProperty(this, "loader", null);

    _defineProperty(this, "row", 0);

    _defineProperty(this, "col", 0);

    this.loader = loader;
  }

  _createClass(Food, [{
    key: "spawn",
    value: function spawn(row, col) {
      this.row = row;
      this.col = col;
    }
  }, {
    key: "render",
    value: function render(context) {
      const x = this.col * TileSize + 4;
      const y = this.row * TileSize + 4;
      context.drawImage(this.loader.getImage('board.food'), 0, 0, 48, 48, x, y, 24, 24);
      /*
      context.fillStyle = 'rgba(255,56,0,.9)'
      context.beginPath()
      context.arc(x, y, TileSize / 3, 0, 2 * Math.PI)
      context.fill()
      context.closePath()
      */
    }
  }]);

  return Food;
}();

export default Food;