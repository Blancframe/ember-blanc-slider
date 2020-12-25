import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | slide-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('items', [
      { index: 1, isActive: false },
      { index: 2, isActive: true },
      { index: 3, isActive: false },
    ]);
    this.set('register', (index) => {
      assert.equal(index, 1);
    });
    this.set('previous', (index) => {
      assert.equal(index, 1);
    });
    this.set('next', (index) => {
      assert.equal(index, 1);
    });

    await render(hbs`
      {{slide-item blancItems=items register=register prevous=previous next=next
      }}
    `);

    assert.equal(this.element.textContent.trim(), '');
  });
});
