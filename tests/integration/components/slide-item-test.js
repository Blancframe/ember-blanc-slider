import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | slide-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('items', [
      EmberObject.create({ index: 1, isActive: false }),
      EmberObject.create({ index: 2, isActive: true }),
      EmberObject.create({ index: 3, isActive: false }),
    ]);
    this.set('register', () => {
      this.items.push(EmberObject.create({ index: 4, isActive: true }));
    });
    this.set('previous', (index) => {
      assert.equal(index, 1);
    });
    this.set('next', (index) => {
      assert.equal(index, 1);
    });

    await render(hbs`
      {{#slide-item
        blancItems=items
        previous=previous
        next=next
        isActive=true
      }}
          Item content
      {{/slide-item}}
    `);

    assert.equal(this.element.textContent.trim(), 'Item content');
  });
});
