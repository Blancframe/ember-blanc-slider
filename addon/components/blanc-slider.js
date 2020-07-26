import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import layout from '../templates/components/blanc-slider';

export default Component.extend({
  layout,
  
  init() {
    this._super(...arguments);
    this.blancItems = A();
  },

  activeBlancItem: computed('blancItems.{length,@each.isActive}', function() {
    return this.blancItems.findBy('isActive');
  }),

  slide(activeIndex) {
    let items = this.blancItems;
    let activeBlancItem = this.activeBlancItem;
    let newActiveItem = items[activeIndex];

    activeBlancItem.setProperties({
      isActive: false,
    })

    newActiveItem.setProperties({
      isActive: true,
    })
    
  },

  actions: {
    registerItem(item) {
      this.blancItems.pushObject(item);
    },
    slidePrevious() {
      const activeIndex = this.activeBlancItem.index,
        blancItems = this.blancItems.length;
      let newIndex = activeIndex - 1;

      if (newIndex === -1) {
        newIndex = blancItems - 1
      }

      this.slide(newIndex);
    },
    slideNext() {
      const activeIndex = this.activeBlancItem.index,
      blancItems = this.blancItems.length;
      let newIndex = activeIndex + 1;

      if (activeIndex === (blancItems -1)) {
        newIndex = 0;
      }

      this.slide(newIndex);
    }
  }
});

