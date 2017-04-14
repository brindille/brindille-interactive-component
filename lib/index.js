'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _brindilleComponent = require('brindille-component');

var _brindilleComponent2 = _interopRequireDefault(_brindilleComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteractiveComponent = function (_Component) {
  _inherits(InteractiveComponent, _Component);

  function InteractiveComponent() {
    var _ref;

    _classCallCheck(this, InteractiveComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = InteractiveComponent.__proto__ || Object.getPrototypeOf(InteractiveComponent)).call.apply(_ref, [this].concat(args)));

    _this.onMouseOver = _this.onMouseOver.bind(_this);
    _this.onMouseOut = _this.onMouseOut.bind(_this);
    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleToucheEnd = _this.handleToucheEnd.bind(_this);
    _this.onClick = _this.onClick.bind(_this);

    _this._isMobile = window.isMobile === true;
    _this.swipe = {
      distanceX: 0, // distance swiped on X
      distanceY: 0, // distance swiped on Y
      directionX: 0, // 1: right, -1: left
      directionY: 0 // 1: top, -1: bottom
    };
    _this.touchStartPos = { x: 0, y: 0 };

    _this.addListeners();
    return _this;
  }

  _createClass(InteractiveComponent, [{
    key: 'removeListeners',
    value: function removeListeners() {
      this.$el.removeEventListener('touchstart', this.handleTouchStart);
      this.$el.removeEventListener('touchmove', this.handleTouchMove);
      this.$el.removeEventListener('touchend', this.handleToucheEnd);
      this.$el.removeEventListener('click', this.onClick);
      this.$el.removeEventListener('mouseenter', this.onMouseOver);
      this.$el.removeEventListener('mouseleave', this.onMouseOut);
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      if (this.isMobile) {
        this.$el.addEventListener('touchstart', this.handleTouchStart);
      } else {
        this.$el.addEventListener('click', this.onClick);
        this.$el.addEventListener('mouseenter', this.onMouseOver);
        this.$el.addEventListener('mouseleave', this.onMouseOut);
      }
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.removeListeners();
      _get(InteractiveComponent.prototype.__proto__ || Object.getPrototypeOf(InteractiveComponent.prototype), 'dispose', this).call(this);
    }

    /* --------------------------
     * Events to override
     * ------------------------ */

  }, {
    key: 'onClick',
    value: function onClick(e) {
      console.warn('You probably want to override onClick on', Object.getPrototypeOf(this));
    }
  }, {
    key: 'onMouseOver',
    value: function onMouseOver(e) {
      console.warn('You probably want to override onMouseOver on', Object.getPrototypeOf(this));
    }
  }, {
    key: 'onMouseOut',
    value: function onMouseOut(e) {
      console.warn('You probably want to override onMouseOut on', Object.getPrototypeOf(this));
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(e) {
      console.warn('You probably want to override onTouchStart on', Object.getPrototypeOf(this));
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(e) {
      console.warn('onTouchEnd is deprecated, please use onTouchEnd instead on', Object.getPrototypeOf(this));
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove(e) {
      console.warn('You probably want to override onTouchMove on', Object.getPrototypeOf(this));
    }

    /* --------------------------
     * Handlers for calculations
     * ------------------------ */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      if (e.touches[0]) {
        this.touchStartPos.x = e.touches[0].clientX;
        this.touchStartPos.y = e.touches[0].clientY;
      }

      this.$el.addEventListener('touchmove', this.handleTouchMove);
      this.$el.addEventListener('touchend', this.handleToucheEnd);

      this.onTouchStart(e);
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      if (e.touches[0]) {
        this.swipe.distanceX = Math.abs(e.touches[0].clientX - this.touchStartPos.x);
        this.swipe.distanceY = Math.abs(e.touches[0].clientY - this.touchStartPos.y);
        this.swipe.directionX = this.touchStartPos.x < e.touches[0].clientX ? 1 : -1;
        this.swipe.directionY = this.touchStartPos.y < e.touches[0].clientY ? -1 : 1;
      }

      this.onTouchMove(e);
    }
  }, {
    key: 'handleToucheEnd',
    value: function handleToucheEnd(e) {
      this.$el.removeEventListener('touchmove', this.handleTouchMove);
      this.$el.removeEventListener('touchend', this.handleToucheEnd);

      this.onTouchEnd(e);
    }
  }, {
    key: 'isMobile',
    get: function get() {
      return this._isMobile;
    },
    set: function set(value) {
      this._isMobile = value;
      this.removeListeners();
      this.addListeners();
    }
  }]);

  return InteractiveComponent;
}(_brindilleComponent2.default);

exports.default = InteractiveComponent;