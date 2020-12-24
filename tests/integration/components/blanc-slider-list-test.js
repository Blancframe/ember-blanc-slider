import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | blanc-slider-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      {{#blanc-slider-list}}
          <div>Item</div>
          <div>Item</div>
          <div>Item</div>
      {{/blanc-slider-list}}
    `);

    const list = this.element.querySelector('ul');

    assert.equal(list.querySelectorAll('div').length, 3);
    assert.equal(
      list.style.cssText,
      'margin: inherit; padding: inherit; position: relative; overflow: hidden; display: flex;'
    );
  });
});
