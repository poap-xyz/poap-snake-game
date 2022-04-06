function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let Drawing = /*#__PURE__*/function () {
  function Drawing(width, height, ratio) {
    _classCallCheck(this, Drawing);

    _defineProperty(this, "canvas", null);

    _defineProperty(this, "context", null);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);

    _defineProperty(this, "ratio", 1);

    _defineProperty(this, "widthRatio", 0);

    _defineProperty(this, "heightRatio", 0);

    this.width = width;
    this.height = height;
    this.ratio = ratio;
    this.widthRatio = width * ratio;
    this.heightRatio = height * ratio;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.widthRatio;
    this.canvas.height = this.heightRatio;
    this.context = this.canvas.getContext('2d');
  }

  _createClass(Drawing, [{
    key: "clear",
    value: function clear() {
      this.context.clearRect(0, 0, this.widthRatio, this.heightRatio);
    }
  }, {
    key: "draw",
    value: function draw(render) {
      this.context.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
      render(this);
    }
  }]);

  return Drawing;
}();

export default Drawing;