function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import background from '../asset/img/bg.png';
import snakeHead from '../asset/img/head.png';
import snakeEye from '../asset/img/eye.png';
import food from '../asset/img/food.png';
import check from '../asset/img/check.png';
import keys from '../asset/img/keys.png';
import swipe from '../asset/img/swipe.png';

let Loader = /*#__PURE__*/function () {
  function Loader() {
    _classCallCheck(this, Loader);

    _defineProperty(this, "images", new Map());

    _defineProperty(this, "promises", []);
  }

  _createClass(Loader, [{
    key: "loadResources",
    value: function loadResources(onReady) {
      this.loadImage('board.background', background);
      this.loadImage('board.food', food);
      this.loadImage('snake.head', snakeHead);
      this.loadImage('snake.eye', snakeEye);
      this.loadImage('ui.check', check);
      this.loadImage('ui.keys', keys);
      this.loadImage('ui.swipe', swipe);
      this.waitForReady(onReady);
    }
  }, {
    key: "loadImage",
    value: function loadImage(name, source) {
      const image = new Image();
      image.src = source;
      this.images.set(name, image);
      this.promises.push(new Promise(resolve => {
        image.addEventListener('load', resolve);
      }));
    }
  }, {
    key: "getImage",
    value: function getImage(name) {
      return this.images.get(name);
    }
  }, {
    key: "waitForReady",
    value: function waitForReady(onReady) {
      Promise.all(this.promises).then(onReady);
    }
  }]);

  return Loader;
}();

export default Loader;