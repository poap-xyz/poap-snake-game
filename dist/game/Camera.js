function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let Camera = /*#__PURE__*/function () {
  function Camera(ratio) {
    _classCallCheck(this, Camera);

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    _defineProperty(this, "ratio", 1);

    _defineProperty(this, "shouldShake", false);

    _defineProperty(this, "shakeTimer", 0);

    _defineProperty(this, "amount", 12);

    this.ratio = ratio;
  }

  _createClass(Camera, [{
    key: "update",
    value: function update(delta) {
      if (this.shouldShake) {
        this.shakeTimer += delta;
        this.x = (Math.random() - 0.5) * this.amount;
        this.y = (Math.random() - 0.5) * this.amount;

        if (this.shakeTimer >= 0.4) {
          this.shouldShake = false;
        }
      } else {
        this.x = 0;
        this.y = 0;
        this.shakeTimer = 0;
      }
    }
  }, {
    key: "shake",
    value: function shake() {
      this.shouldShake = true;
    }
  }, {
    key: "transform",
    value: function transform(context) {
      context.setTransform(this.ratio, 0, 0, this.ratio, this.x, this.y);
    }
  }]);

  return Camera;
}();

export default Camera;