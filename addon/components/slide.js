import Component from '@ember/component';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import layout from '../templates/components/slide';
import inlineStyles from 'ember-blanc-slider/utils/inline-styles';

export default Component.extend({
  tagName: 'li',
  classNames: ['blanc-slide'],
  classNameBindings: ['isActive:active'],
  attributeBindings: ['style', 'aria-atomic', 'tabindex'],
  layout,
  index: 0,

  style: computed('isActive', function () {
    const styles = {
      'white-space': 'nowrap',
      position: this.isActive ? 'relative' : 'absolute',
      visibility: this.isActive ? 'visible' : 'hidden',
      'list-style-type': 'none',
      height: '100%',
    };

    return inlineStyles(styles);
  }),

  'aria-atomic': computed('isActive', function () {
    return this.isActive ? 'true' : 'false';
  }),

  tabindex: computed(function () {
    return 0;
  }),

  didInsertElement() {
    this._super(...arguments);
    if (typeOf(this.register) === 'function') {
      this.register(this);

      let blancItems = this.blancItems;

      this.set('index', blancItems.indexOf(this));
    }
  },

  isActive: computed('blancItems.@each', function () {
    return this === this.get('blancItems.firstObject');
  }),
});
