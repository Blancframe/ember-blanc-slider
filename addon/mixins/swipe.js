import Mixin from '@ember/object/mixin';

export default Mixin.create({
  xDown: null,
  yDown: null,

  handleTouchStart(evt) {
    const firstTouch = this.getTouches(evt)[0];
    this.set('xDown', firstTouch.clientX);
    this.set('yDown', firstTouch.clientY);
  },

  handleTouchMove(evt) {
    const { xDown, yDown } = this;
    if (!xDown || !yDown) return;

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        this.next();
      } else {
        this.previous();
      }
    }

    this.set('xDown', null);
    this.set('yDown', null);
  },

  getTouches(evt) {
    return evt.touches;
  },

  touchStart(e) {
    this.handleTouchStart(e);
  },

  touchMove(e) {
    this.handleTouchMove(e);
  },
});
