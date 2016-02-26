import Component from 'brindille-component';
import bindAll from 'lodash.bindall';

export default class InteractiveComponent extends Component {
  constructor($el) {
    super($el);
    bindAll(this, 'onMouseOver', 'onMouseOut', 'handleTouchStart', 'handleTouchMove', 'handleToucheUp', 'onClick');

    this.swipe = {
      distanceX: 0, // distance swiped on X
      distanceY: 0, // distance swiped on Y
      directionX: 0, // 1: right, -1: left
      directionY: 0 // 1: top, -1: bottom
    };

    this.startSwipe = {
      x: 0,
      y: 0
    };

    this.endSwipe = {
      x: 0,
      y: 0
    };

    this.$el.addEventListener('click', this.onClick);
    this.$el.addEventListener('mouseenter', this.onMouseOver);
    this.$el.addEventListener('mouseleave', this.onMouseOut);
    this.$el.addEventListener('touchstart', this.handleTouchStart);
  }

  dispose() {
    this.$el.removeEventListener('click', this.onClick);
    this.$el.removeEventListener('mouseenter', this.onMouseOver);
    this.$el.removeEventListener('mouseleave', this.onMouseOut);
    this.$el.removeEventListener('touchstart', this.handleTouchStart);
    this.$el.removeEventListener('touchmove', this.handleTouchMove);
    this.$el.removeEventListener('touchend', this.handleToucheUp);

    super.dispose();
  }

  /* --------------------------
   * Events to override
   * ------------------------ */
  onClick() {
    console.warn('You probably want to override onClick on', Object.getPrototypeOf(this));
  }

  onMouseOver() {
    console.warn('You probably want to override onMouseOver on', Object.getPrototypeOf(this));
  }

  onMouseOut() {
    console.warn('You probably want to override onMouseOut on', Object.getPrototypeOf(this));
  }

  onTouchStart() {
    console.warn('You probably want to override onTouchStart on', Object.getPrototypeOf(this));
  }

  onTouchUp() {
    console.warn('You probably want to override onTouchUp on', Object.getPrototypeOf(this));
  }

  onTouchMove() {
    console.warn('You probably want to override onTouchMove on', Object.getPrototypeOf(this));
  }

  /* --------------------------
   * Handlers for calculations
   * ------------------------ */
  handleTouchStart(e) {
    this.startSwipe.x = e.touches[0].clientX;
    this.startSwipe.y = e.touches[0].clientY;

    this.$el.addEventListener('touchmove', this.handleTouchMove);
    this.$el.addEventListener('touchend', this.handleToucheUp);

    this.onTouchStart()
  }

  handleTouchMove(e) {
    this.swipe.distanceX = Math.abs(e.touches[0].clientX - this.startSwipe.x);
    this.swipe.distanceY = Math.abs(e.touches[0].clientY - this.startSwipe.y);
    this.swipe.directionX = (this.startSwipe.x < e.touches[0].clientX) ? 1 : -1;
    this.swipe.directionY = (this.startSwipe.y < e.touches[0].clientY) ? -1 : 1;

    this.onTouchMove();
  }

  handleToucheUp() {
    this.$el.removeEventListener('touchmove', this.handleTouchMove);
    this.$el.removeEventListener('touchend', this.handleToucheUp);

    this.endSwipe.x = e.touches[0].clientX;
    this.endSwipe.y = e.touches[0].clientY;
    this.swipe.distanceX = Math.abs(this.endSwipe.x - this.startSwipe.x);
    this.swipe.distanceY = Math.abs(this.endSwipe.y - this.startSwipe.y);
    this.swipe.directionX = (this.startSwipe.x < this.endSwipe.x) ? 1 : -1;
    this.swipe.directionY = (this.startSwipe.y < this.endSwipe.y) ? -1 : 1;

    this.onToucheUp();
  }
}
