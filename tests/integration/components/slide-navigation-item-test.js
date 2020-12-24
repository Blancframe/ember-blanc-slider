import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | slide-navigation-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('slideAction', (index) => {
      assert.equal(index, 1);
    });

    await render(hbs`
      {{slide-navigation-item
        index=1
        isActive=false
        slideAction=slideAction
      }}
    `);

    const item = this.element.querySelector('.blanc-slider-navigation-item');
    assert.ok(item);

    await click(item);
  });

  test('it renders active item', async function (assert) {
    this.set('slideAction', (index) => {
      assert.equal(index, 2);
    });

    await render(hbs`
      {{slide-navigation-item
        index=2
        isActive=true
        slideAction=slideAction
      }}
    `);

    const item = this.element.querySelector('.blanc-slider-navigation-item');
    assert.ok(item.classList.contains('active'));

    await click(item);
  });
});
