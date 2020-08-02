import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { fullTrim } from 'dummy/tests/helpers/string-helpers';

module('Integration | Component | blanc-slider', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(hbs`
      {{#blanc-slider}}
        template block text
      {{/blanc-slider}}
    `);

    assert.equal(fullTrim(this.element.textContent), 'template block text');
  });
});
