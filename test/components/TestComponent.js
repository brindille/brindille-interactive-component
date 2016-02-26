import InteractiveComponent from '../../src';

export default class TestComponent extends InteractiveComponent {
  constructor($el) {
    super($el);

    this.clickOK = false;
    this.mouseoverOK = false;
    this.mouseoutOK = false;
    this.touchstartOK = false;
    this.touchupOK = false;
    this.touchmoveOK = false;
  }

  onClick() {
    this.clickOK = true;
  }

  onMouseOver() {
    this.mouseoverOK = true;
  }

  onMouseOut() {
    this.mouseoutOK = true;
  }

  onTouchStart() {
    this.touchstartOK = true;
  }

  onTouchUp() {
    this.touchupOK = true;
  }

  onTouchMove() {
    this.touchmoveOK = true;
  }
}
