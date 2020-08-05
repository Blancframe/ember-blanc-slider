import Component from '@ember/component';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import layout from '../templates/components/slide';
import inlineStyles from 'ember-blanc-slider/utils/inline-styles';

export default Component.extend({
  classNames: ['blanc-slide'],
  classNameBindings: ['isActive:active'],
  attributeBindings: ['style'],
  layout,
  index: 0,

  style: computed('isActive', function () {
    const styles = {
      display: this.isActive ? 'inline-block' : 'none',
      'white-space': 'nowrap',
      height: '100%',
    };

    return inlineStyles(styles);
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
