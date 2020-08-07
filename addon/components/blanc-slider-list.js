import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/blanc-slider-list';
import inlineStyles from 'ember-blanc-slider/utils/inline-styles';

export default Component.extend({
  tagName: 'ul',
  layout,
  attributeBindings: ['style'],

  style: computed(function () {
    const styles = {
      margin: 'inherit',
      padding: 'inherit',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
    };

    return inlineStyles(styles);
  }),
});
