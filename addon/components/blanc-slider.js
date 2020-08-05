import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import layout from '../templates/components/blanc-slider';
import inlineStyles from 'ember-blanc-slider/utils/inline-styles';

export default Component.extend({
  classNames: ['blanc-slider-container'],
  attributeBindings: ['aria-label', 'tabindex', 'role', 'style'],
  layout,
  autoPlayActive: false,

  style: computed(function () {
    const styles = {
      position: 'relative',
      overflow: 'hidden',
      display: 'block',
    };

    return inlineStyles(styles);
  }),

  init() {
    this._super(...arguments);
    this.blancItems = A();

    if (this.auto) {
      this.autoPlay();
    }
  },

  activeBlancItem: computed('blancItems.{length,@each.isActive}', function () {
    return this.blancItems.findBy('isActive');
  }),

  slide(activeIndex) {
    let items = this.blancItems;
    let activeBlancItem = this.activeBlancItem;
    let newActiveItem = items[activeIndex];

    activeBlancItem.setProperties({
      isActive: false,
    });

    newActiveItem.setProperties({
      isActive: true,
    });
  },

  slideDirection(direction) {
    const activeIndex = this.activeBlancItem.index,
      blancItems = this.blancItems.length;
    let newIndex = null;

    if (direction === 'previous') {
      newIndex = activeIndex - 1;

      if (newIndex === -1) {
        newIndex = blancItems - 1;
      }
    } else if (direction === 'next') {
      newIndex = activeIndex + 1;

      if (activeIndex === blancItems - 1) {
        newIndex = 0;
      }
    }

    this.slide(newIndex);
  },

  autoPlay() {
    this.set('autoPlayActive', true);
    this._intervalId = setInterval(() => {
      this.slideDirection('next');
    }, this.interval || 3000);
  },

  stopPlay() {
    this.set('autoPlayActive', false);
    clearInterval(this._intervalId);
  },

  'aria-label': computed(function () {
    return 'gallery';
  }),

  tabindex: computed(function () {
    return 0;
  }),

  role: computed(function () {
    return 'region';
  }),

  actions: {
    registerItem(item) {
      this.blancItems.pushObject(item);
    },
    play() {
      this.autoPlay();
    },
    stop() {
      this.stopPlay();
    },
    slidePrevious() {
      this.slideDirection('previous');
    },
    slideNext() {
      this.slideDirection('next');
    },
    slideTo(item) {
      this.slide(item);
    },
  },
});
