import Component from '@ember/component';
import layout from '../templates/components/slide-navigation-item';

export default Component.extend({
  layout,
  classNames: ['blanc-slider-navigation-item'],
  classNameBindings: ['isActive:active'],

  click() {
    this.slideAction(this.index);
  },
});
