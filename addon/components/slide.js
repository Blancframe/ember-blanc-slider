import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/slide';

export default Component.extend({
  classNames: ['blanc-slide'],
  classNameBindings: ['isActive:active'],
  layout,
  index: 0,

  didInsertElement() {
    this._super(...arguments);
    this.get('register')(this);

    let blancItems = this.blancItems;

    this.set('index', blancItems.indexOf(this));
  },

  isActive: computed('blancItems.@each', function() {
    return this === this.get('blancItems.firstObject');
  })
});
