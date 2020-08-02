import Component from '@ember/component';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import layout from '../templates/components/slide';

export default Component.extend({
  classNames: ['blanc-slide'],
  classNameBindings: ['isActive:active'],
  layout,
  index: 0,

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
