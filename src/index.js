import Component from 'brindille-component';
import bindAll from 'lodash.bindall';

// http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
function mobilecheck() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);

  return check;
}

export default class InteractiveComponent extends Component {
  constructor($el) {
    super($el);
    bindAll(this, 'onMouseOver', 'onMouseOut', 'handleTouchStart', 'handleTouchMove', 'handleToucheUp', 'onClick');

    this.isMobile = mobilecheck();

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

    if (this.isMobile) {
      this.$el.addEventListener('touchstart', this.handleTouchStart);
    } else {
      this.$el.addEventListener('click', this.onClick);
      this.$el.addEventListener('mouseenter', this.onMouseOver);
      this.$el.addEventListener('mouseleave', this.onMouseOut);
    }
  }

  dispose() {
    if (this.isMobile) {
      this.$el.removeEventListener('touchstart', this.handleTouchStart);
      this.$el.removeEventListener('touchmove', this.handleTouchMove);
      this.$el.removeEventListener('touchend', this.handleToucheUp);
    } else {
      this.$el.removeEventListener('click', this.onClick);
      this.$el.removeEventListener('mouseenter', this.onMouseOver);
      this.$el.removeEventListener('mouseleave', this.onMouseOut);
    }

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
    if (e.touches[0]) {
      this.startSwipe.x = e.touches[0].clientX;
      this.startSwipe.y = e.touches[0].clientY;
    }

    this.$el.addEventListener('touchmove', this.handleTouchMove);
    this.$el.addEventListener('touchend', this.handleToucheUp);

    this.onTouchStart();
  }

  handleTouchMove(e) {
    if (e.touches[0]) {
      this.swipe.distanceX = Math.abs(e.touches[0].clientX - this.startSwipe.x);
      this.swipe.distanceY = Math.abs(e.touches[0].clientY - this.startSwipe.y);
      this.swipe.directionX = (this.startSwipe.x < e.touches[0].clientX) ? 1 : -1;
      this.swipe.directionY = (this.startSwipe.y < e.touches[0].clientY) ? -1 : 1;
    }

    this.onTouchMove();
  }

  handleToucheUp() {
    this.$el.removeEventListener('touchmove', this.handleTouchMove);
    this.$el.removeEventListener('touchend', this.handleToucheUp);

    this.onTouchUp();
  }
}
