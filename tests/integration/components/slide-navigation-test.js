import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | slide-navigation', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);

    this.set('items', [
      { index: 1, isActive: false },
      { index: 2, isActive: true },
      { index: 3, isActive: false },
    ]);
    this.set('slideAction', (index) => {
      assert.equal(index, 1);
    });

    await render(hbs`
      {{slide-navigation
        items=items
        slideAction=slideAction
      }}
    `);

    const items = this.element.querySelectorAll(
      '.blanc-slider-navigation .blanc-slider-navigation-item'
    );
    assert.equal(items.length, 3);

    const activeItem = items[1].classList.contains('active');
    assert.ok(activeItem);

    await click(items[0]);
  });
});
