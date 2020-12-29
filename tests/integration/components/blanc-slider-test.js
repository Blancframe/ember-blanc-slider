import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | blanc-slider', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);

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
  });

  test('we can navigate tru slider with previous and next buttons', async function (assert) {
    await render(hbs`
      {{#blanc-slider auto=false as |content|}}
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
          {{/content.list}}
          <button class="button-previous" onclick={{action content.previous}} type="button">
              Previous
          </button>
          <button class="button-next" onclick={{action content.next}} type="button">
              Next
          </button>
      {{/blanc-slider}}
    `);

    const list = this.element.querySelectorAll('ul li');
    const previous = this.element.querySelector('.button-previous');
    const next = this.element.querySelector('.button-next');

    assert.equal(list[0].getAttribute('aria-atomic'), 'true');
    assert.equal(list[1].getAttribute('aria-atomic'), 'false');
    assert.equal(list[2].getAttribute('aria-atomic'), 'false');

    await click(next);

    assert.equal(list[0].getAttribute('aria-atomic'), 'false');
    assert.equal(list[1].getAttribute('aria-atomic'), 'true');
    assert.equal(list[2].getAttribute('aria-atomic'), 'false');

    await click(next);
    await click(previous);
    await click(previous);

    assert.equal(list[0].getAttribute('aria-atomic'), 'true');
    assert.equal(list[1].getAttribute('aria-atomic'), 'false');
    assert.equal(list[2].getAttribute('aria-atomic'), 'false');
  });
});
