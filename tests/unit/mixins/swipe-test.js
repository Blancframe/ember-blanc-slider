import EmberObject from '@ember/object';
import SwipeMixin from 'ember-blanc-slider/mixins/swipe';
import { module, test } from 'qunit';

module('Unit | Mixin | swipe', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let SwipeObject = EmberObject.extend(SwipeMixin);
    let subject = SwipeObject.create();
    assert.ok(subject);
  });
});
