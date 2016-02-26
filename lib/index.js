'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _brindilleComponent = require('brindille-component');

var _brindilleComponent2 = _interopRequireDefault(_brindilleComponent);

var _lodash = require('lodash.bindall');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteractiveComponent = function (_Component) {
  _inherits(InteractiveComponent, _Component);

  function InteractiveComponent($el) {
    _classCallCheck(this, InteractiveComponent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InteractiveComponent).call(this, $el));

    (0, _lodash2.default)(_this, 'onMouseOver', 'onMouseOut', 'handleTouchStart', 'handleTouchMove', 'handleToucheUp', 'onClick');

    _this.swipe = {
      distanceX: 0, // distance swiped on X
      distanceY: 0, // distance swiped on Y
      directionX: 0, // 1: right, -1: left
      directionY: 0 // 1: top, -1: bottom
    };

    _this.startSwipe = {
      x: 0,
      y: 0
    };

    _this.endSwipe = {
      x: 0,
      y: 0
    };

    _this.$el.addEventListener('click', _this.onClick);
    _this.$el.addEventListener('mouseenter', _this.onMouseOver);
    _this.$el.addEventListener('mouseleave', _this.onMouseOut);
    _this.$el.addEventListener('touchstart', _this.handleTouchStart);
    return _this;
  }

  _createClass(InteractiveComponent, [{
    key: 'dispose',
    value: function dispose() {
      this.$el.removeEventListener('click', this.onClick);
      this.$el.removeEventListener('mouseenter', this.onMouseOver);
      this.$el.removeEventListener('mouseleave', this.onMouseOut);
      this.$el.removeEventListener('touchstart', this.handleTouchStart);
      this.$el.removeEventListener('touchmove', this.handleTouchMove);
      this.$el.removeEventListener('touchend', this.handleToucheUp);

      _get(Object.getPrototypeOf(InteractiveComponent.prototype), 'dispose', this).call(this);
    }

    /* --------------------------
     * Events to override
     * ------------------------ */

  }, {
    key: 'onClick',
    value: function onClick() {
      console.warn('You probably want to override onClick on', Object.getPrototypeOf(this));
    }
  }, {
    key: 'onMouseOver',
    value: function onMouseOver() {
      console.warn('You probably want to override onMouseOver on', Object.getPrototypeOf(this));
    }
  }, {
    key: 'onMouseOut',
    value: function onMouseOut() {
      console.warn('You probably want to override onMouseOut on', Object.getPrototypeOf(this));
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart() {
      console.warn('You probably want to override onTouchStart on', Object.getPrototypeOf(this));
    }
  }, {
    key: 'onTouchUp',
    value: function onTouchUp() {
      console.warn('You probably want to override onTouchUp on', Object.getPrototypeOf(this));
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove() {
      console.warn('You probably want to override onTouchMove on', Object.getPrototypeOf(this));
    }

    /* --------------------------
     * Handlers for calculations
     * ------------------------ */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      this.startSwipe.x = e.touches[0].clientX;
      this.startSwipe.y = e.touches[0].clientY;

      this.$el.addEventListener('touchmove', this.handleTouchMove);
      this.$el.addEventListener('touchend', this.handleToucheUp);

      this.onTouchStart();
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      this.swipe.distanceX = Math.abs(e.touches[0].clientX - this.startSwipe.x);
      this.swipe.distanceY = Math.abs(e.touches[0].clientY - this.startSwipe.y);
      this.swipe.directionX = this.startSwipe.x < e.touches[0].clientX ? 1 : -1;
      this.swipe.directionY = this.startSwipe.y < e.touches[0].clientY ? -1 : 1;

      this.onTouchMove();
    }
  }, {
    key: 'handleToucheUp',
    value: function handleToucheUp() {
      this.$el.removeEventListener('touchmove', this.handleTouchMove);
      this.$el.removeEventListener('touchend', this.handleToucheUp);

      this.endSwipe.x = e.touches[0].clientX;
      this.endSwipe.y = e.touches[0].clientY;
      this.swipe.distanceX = Math.abs(this.endSwipe.x - this.startSwipe.x);
      this.swipe.distanceY = Math.abs(this.endSwipe.y - this.startSwipe.y);
      this.swipe.directionX = this.startSwipe.x < this.endSwipe.x ? 1 : -1;
      this.swipe.directionY = this.startSwipe.y < this.endSwipe.y ? -1 : 1;

      this.onToucheUp();
    }
  }]);

  return InteractiveComponent;
}(_brindilleComponent2.default);

exports.default = InteractiveComponent;