'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Component = _interopDefault(require('brindille-component'));

class InteractiveComponent extends Component {
  constructor (...args) {
    super(...args);

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleToucheEnd = this.handleToucheEnd.bind(this);
    this.onClick = this.onClick.bind(this);

    this._isMobile = window.isMobile === true;
    this.swipe = {
      distanceX: 0, // distance swiped on X
      distanceY: 0, // distance swiped on Y
      directionX: 0, // 1: right, -1: left
      directionY: 0 // 1: top, -1: bottom
    };
    this.touchStartPos = {x: 0, y: 0};

    this.addListeners();
  }

  get isMobile () {
    return this._isMobile
  }

  set isMobile (value) {
    this._isMobile = value;
    this.removeListeners();
    this.addListeners();
  }

  removeListeners () {
    this.$el.removeEventListener('touchstart', this.handleTouchStart);
    this.$el.removeEventListener('touchmove', this.handleTouchMove);
    this.$el.removeEventListener('touchend', this.handleToucheEnd);
    this.$el.removeEventListener('click', this.onClick);
    this.$el.removeEventListener('mouseenter', this.onMouseOver);
    this.$el.removeEventListener('mouseleave', this.onMouseOut);
  }

  addListeners () {
    if (this.isMobile) {
      this.$el.addEventListener('touchstart', this.handleTouchStart);
    } else {
      this.$el.addEventListener('click', this.onClick);
      this.$el.addEventListener('mouseenter', this.onMouseOver);
      this.$el.addEventListener('mouseleave', this.onMouseOut);
    }
  }

  dispose () {
    this.removeListeners();
    super.dispose();
  }

  /* --------------------------
   * Events to override
   * ------------------------ */
  onClick (e) {
    console.warn('You probably want to override onClick on', Object.getPrototypeOf(this));
  }

  onMouseOver (e) {
    console.warn('You probably want to override onMouseOver on', Object.getPrototypeOf(this));
  }

  onMouseOut (e) {
    console.warn('You probably want to override onMouseOut on', Object.getPrototypeOf(this));
  }

  onTouchStart (e) {
    console.warn('You probably want to override onTouchStart on', Object.getPrototypeOf(this));
  }

  onTouchEnd (e) {
    console.warn('onTouchEnd is deprecated, please use onTouchEnd instead on', Object.getPrototypeOf(this));
  }

  onTouchMove (e) {
    console.warn('You probably want to override onTouchMove on', Object.getPrototypeOf(this));
  }

  /* --------------------------
   * Handlers for calculations
   * ------------------------ */
  handleTouchStart (e) {
    if (e.touches[0]) {
      this.touchStartPos.x = e.touches[0].clientX;
      this.touchStartPos.y = e.touches[0].clientY;
    }

    this.$el.addEventListener('touchmove', this.handleTouchMove);
    this.$el.addEventListener('touchend', this.handleToucheEnd);

    this.onTouchStart(e);
  }

  handleTouchMove (e) {
    if (e.touches[0]) {
      this.swipe.distanceX = Math.abs(e.touches[0].clientX - this.touchStartPos.x);
      this.swipe.distanceY = Math.abs(e.touches[0].clientY - this.touchStartPos.y);
      this.swipe.directionX = (this.touchStartPos.x < e.touches[0].clientX) ? 1 : -1;
      this.swipe.directionY = (this.touchStartPos.y < e.touches[0].clientY) ? -1 : 1;
    }

    this.onTouchMove(e);
  }

  handleToucheEnd (e) {
    this.$el.removeEventListener('touchmove', this.handleTouchMove);
    this.$el.removeEventListener('touchend', this.handleToucheEnd);

    this.onTouchEnd(e);
  }
}

module.exports = InteractiveComponent;
