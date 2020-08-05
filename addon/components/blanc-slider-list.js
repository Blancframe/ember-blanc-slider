import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/blanc-slider-list';
import inlineStyles from 'ember-blanc-slider/utils/inline-styles';

export default Component.extend({
  layout,
  attributeBindings: ['style'],

  style: computed(function () {
    const styles = { position: 'relative', overflow: 'hidden' };

    return inlineStyles(styles);
  }),
});
