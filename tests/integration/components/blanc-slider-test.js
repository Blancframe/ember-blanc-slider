import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | blanc-slider', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(4);

    await render(hbs`
      {{#blanc-slider as |content|}}
          {{#content.list}}
              {{#content.slide}}
                  Slide one and some content
              {{/content.slide}}
              {{#content.slide}}
                  And an other slide
              {{/content.slide}}
              {{#content.slide}}
                  Yet an other one
              {{/content.slide}}
              {{#content.slide}}
                  An Other one (Dj Khaled)
              {{/content.slide}}
              {{#content.slide}}
                  The final slide
              {{/content.slide}}
              {{#content.slide}}
                  The final final slide
              {{/content.slide}}
          {{/content.list}}
          <button onclick={{action content.previous}} type="button">
              Previous
          </button>
          <button onclick={{action content.next}} type="button">
              Next
          </button>
      {{/blanc-slider}}
    `);

    const list = this.element.querySelectorAll('ul li');

    assert.equal(list.length, 6);
    assert.equal(list[0].getAttribute('aria-atomic'), 'true');
    assert.equal(
      list[0].style.cssText,
      'white-space: nowrap; position: relative; visibility: visible; list-style-type: none; height: 100%;'
    );
    assert.equal(
      list[1].style.cssText,
      'white-space: nowrap; position: absolute; visibility: hidden; list-style-type: none; height: 100%;'
    );
  });
});
