function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { ReservedKeys } from '../constant';
import { isTouchDevice } from '../lib';

let Input = /*#__PURE__*/function () {
  function Input(rect) {
    _classCallCheck(this, Input);

    _defineProperty(this, "handleKeyDown", event => {
      if (ReservedKeys[event.code]) {
        event.preventDefault();
      }

      this.keys[event.code] = true;
    });

    _defineProperty(this, "handleKeyUp", ({
      code
    }) => {
      this.keys[code] = false;
    });

    _defineProperty(this, "handleTouchStart", ({
      touches: [touch]
    }) => {
      this.x = touch.pageX - this.rect.x;
      this.y = touch.pageY - this.rect.y;
      this.pressing = true;
    });

    _defineProperty(this, "handleTouchMove", ({
      touches: [touch]
    }) => {
      if (!this.x || !this.y) {
        return;
      }

      const x = touch.pageX - this.rect.x;
      const y = touch.pageY - this.rect.y;
      const xDiff = this.x - x;
      const yDiff = this.y - y;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          this.swipe.left = true;
        } else {
          this.swipe.right = true;
        }
      } else {
        if (yDiff > 0) {
          this.swipe.up = true;
        } else {
          this.swipe.down = true;
        }
      }
    });

    _defineProperty(this, "handleTouchEnd", ({
      pageX,
      pageY
    }) => {
      this.x = pageX - this.rect.x;
      this.y = pageY - this.rect.y;
      this.swipe = {
        up: false,
        right: false,
        down: false,
        left: false
      };
      this.pressing = false;
    });

    _defineProperty(this, "handleMouseMove", ({
      pageX,
      pageY
    }) => {
      this.x = pageX - this.rect.x;
      this.y = pageY - this.rect.y;
    });

    _defineProperty(this, "handleMouseDown", ({
      pageX,
      pageY
    }) => {
      this.x = pageX - this.rect.x;
      this.y = pageY - this.rect.y;
      this.pressing = true;
    });

    _defineProperty(this, "handleMouseUp", ({
      pageX,
      pageY
    }) => {
      this.x = pageX - this.rect.x;
      this.y = pageY - this.rect.y;
      this.pressing = false;
    });

    this.rect = rect;
    this.keys = {};
    this.x = null;
    this.y = null;
    this.pressing = false;
    this.swipe = {
      up: false,
      right: false,
      down: false,
      left: false
    };
  }

  _createClass(Input, [{
    key: "bindEvents",
    value: function bindEvents() {
      if (isTouchDevice()) {
        window.addEventListener('touchstart', this.handleTouchStart);
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleTouchEnd);
      } else {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('mouseup', this.handleMouseUp);
      }
    }
  }, {
    key: "unbindEvents",
    value: function unbindEvents() {
      if (isTouchDevice()) {
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleTouchEnd);
      } else {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mouseup', this.handleMouseUp);
      }
    }
  }]);

  return Input;
}();

export default Input;