function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Loader from './Loader';
import Input from './Input';
import Camera from './Camera';
import World from './World';

let Game = /*#__PURE__*/function () {
  function Game(rows, cols, ratio, targetScore, onComplete, canvas) {
    _classCallCheck(this, Game);

    _defineProperty(this, "context", null);

    _defineProperty(this, "input", null);

    _defineProperty(this, "camera", null);

    _defineProperty(this, "world", null);

    _defineProperty(this, "frameId", null);

    _defineProperty(this, "targetFrameTime", 1000 / 60);

    _defineProperty(this, "lastTime", 0);

    _defineProperty(this, "accumulator", 0);

    this.context = canvas.getContext('2d');
    this.loader = new Loader();
    this.input = new Input(canvas.getBoundingClientRect());
    this.camera = new Camera(ratio);
    this.world = new World(rows, cols, ratio, targetScore, onComplete, this.loader, this.input, this.camera);
  }

  _createClass(Game, [{
    key: "initialize",
    value: function initialize() {
      this.input.bindEvents();
      this.loader.loadResources(() => {
        this.world.initialize();
        this.loop(0);
      });
    }
  }, {
    key: "shutdown",
    value: function shutdown() {
      this.input.unbindEvents();
      cancelAnimationFrame(this.frameId);
    }
  }, {
    key: "loop",
    value: function loop(now) {
      this.frameId = requestAnimationFrame(this.loop.bind(this));
      const deltaTime = now - this.lastTime;
      const delta = this.targetFrameTime / 1000;
      this.lastTime += deltaTime;
      this.accumulator += deltaTime;

      while (this.accumulator > this.targetFrameTime) {
        this.camera.update(delta);
        this.world.update(delta);
        this.accumulator -= this.targetFrameTime;
      }

      this.camera.transform(this.context);
      this.world.render(this.context);
    }
  }]);

  return Game;
}();

export default Game;