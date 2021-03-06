import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Component from '@ember/component';

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

  test('we can navigate thru slider with previous and next buttons', async function (assert) {
    assert.expect(9);

    await render(hbs`
      {{#blanc-slider auto=false use="fade" as |content|}}
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

  test('we can play and pause the slide', async function (assert) {
    assert.expect(3);

    await render(hbs`
      {{#blanc-slider
        auto=false
        use="fadeSlide"
        as |content|
      }}
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
          <button class="button-play" onclick={{action content.play}} type="button">
              Play
          </button>
          <button class="button-pause" onclick={{action content.stop}} type="button">
              Pause
          </button>

          {{#if content.autoPlayActive}}
              <span class="autoplay">Auto play active</span>
          {{/if}}
      {{/blanc-slider}}
    `);

    const play = this.element.querySelector('.button-play');
    const pause = this.element.querySelector('.button-pause');

    assert.notOk(this.element.querySelector('.autoplay'));

    await click(play);

    assert.ok(this.element.querySelector('.autoplay'));

    await click(pause);

    assert.notOk(this.element.querySelector('.autoplay'));
  });

  test('we can autoplay the slider', async function (assert) {
    assert.expect(2);

    await render(hbs`
      {{#blanc-slider
        auto=true
        as |content|
      }}
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
          <button class="button-pause" onclick={{action content.stop}} type="button">
              Pause
          </button>

          {{#if content.autoPlayActive}}
              <span class="autoplay">Auto play active</span>
          {{/if}}
      {{/blanc-slider}}
    `);

    const pause = this.element.querySelector('.button-pause');

    assert.ok(this.element.querySelector('.autoplay'));

    await click(pause);

    assert.notOk(this.element.querySelector('.autoplay'));
  });

  test('we can use the slider with navigation dots', async function (assert) {
    assert.expect(8);

    await render(hbs`
      {{#blanc-slider
        as |content|
      }}
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
          <br />

          {{content.navigation}}
      {{/blanc-slider}}
    `);

    const navigationList = this.element.querySelector(
      '.blanc-slider-navigation'
    );
    const items = navigationList.querySelectorAll(
      '.blanc-slider-navigation-item'
    );

    assert.ok(navigationList);
    assert.equal(items.length, 3);
    assert.equal(items[0].classList.contains('active'), true);
    assert.equal(items[1].classList.contains('active'), false);
    assert.equal(items[2].classList.contains('active'), false);

    await click(items[2]);

    assert.equal(items[0].classList.contains('active'), false);
    assert.equal(items[1].classList.contains('active'), false);
    assert.equal(items[2].classList.contains('active'), true);
  });

  test('we can navigate thru slider with swipe gestures', async function (assert) {
    await render(hbs`
      {{#blanc-slider auto=false use="fade" as |content|}}
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
      {{/blanc-slider}}
    `);

    const list = this.element.querySelectorAll('ul li');

    assert.equal(list[0].getAttribute('aria-atomic'), 'true');
    assert.equal(list[1].getAttribute('aria-atomic'), 'false');
    assert.equal(list[2].getAttribute('aria-atomic'), 'false');

    await triggerEvent(list[0], 'touchstart', {
      changedTouches: [{ touchType: 'direct', clientX: 0, clientY: 0 }],
      touches: [{ touchType: 'direct', clientX: 390, clientY: 10 }],
    });
    await triggerEvent(list[0], 'touchmove', {
      changedTouches: [{ touchType: 'direct', clientX: 50, clientY: 0 }],
      touches: [{ touchType: 'direct', clientX: 375, clientY: 10 }],
    });
    await triggerEvent(list[0], 'touchend', {
      changedTouches: [{ touchType: 'direct', clientX: 80, clientY: 10 }],
      touches: [{ touchType: 'direct', clientX: 375, clientY: 10 }],
    });

    assert.equal(list[0].getAttribute('aria-atomic'), 'false');
    assert.equal(list[1].getAttribute('aria-atomic'), 'true');
    assert.equal(list[2].getAttribute('aria-atomic'), 'false');

    await triggerEvent(list[0], 'touchstart', {
      changedTouches: [{ touchType: 'direct', clientX: 0, clientY: 0 }],
      touches: [{ touchType: 'direct', clientX: 375, clientY: 10 }],
    });
    await triggerEvent(list[0], 'touchmove', {
      changedTouches: [{ touchType: 'direct', clientX: 50, clientY: 0 }],
      touches: [{ touchType: 'direct', clientX: 390, clientY: 10 }],
    });
    await triggerEvent(list[0], 'touchend', {
      changedTouches: [{ touchType: 'direct', clientX: 80, clientY: 10 }],
      touches: [{ touchType: 'direct', clientX: 390, clientY: 10 }],
    });

    assert.equal(list[0].getAttribute('aria-atomic'), 'true');
    assert.equal(list[1].getAttribute('aria-atomic'), 'false');
    assert.equal(list[2].getAttribute('aria-atomic'), 'false');
  });

  test('it renders custom navigation', async function (assert) {
    assert.expect(12);

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

          {{#content.navigation as |nav|}}
              <span
                onclick={{action nav.slideAction nav.index}}
                aria-atomic={{if nav.isActive "true" "false"}}
                role="button"
              >
                  {{nav.index}}
              </span>
          {{/content.navigation}}
      {{/blanc-slider}}
    `);

    const list = this.element.querySelectorAll('ul li');
    assert.equal(list.length, 6);

    const navigationItems = this.element.querySelectorAll(
      '.blanc-slider-navigation span'
    );
    assert.equal(navigationItems.length, 6);

    assert.equal(navigationItems[0].getAttribute('aria-atomic'), 'true');
    assert.equal(navigationItems[1].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[2].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[3].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[4].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[5].getAttribute('aria-atomic'), 'false');

    await click(navigationItems[2]);
    assert.equal(navigationItems[0].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[2].getAttribute('aria-atomic'), 'true');

    await click(navigationItems[4]);
    assert.equal(navigationItems[2].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[4].getAttribute('aria-atomic'), 'true');
  });

  test('it renders custom navigation component', async function (assert) {
    // assert.expect(12);
    await this.owner.register(
      'component:custom-navigate',
      Component.extend({
        layout: hbs`
        <span
          onclick={{action slideAction index}}
          aria-atomic={{if isActive "true" "false"}}
          role="button"
        >
            name-{{index}}
        </span>
      `,
      })
    );

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

          {{content.navigation
            customNavigationComponent="custom-navigate"
          }}
      {{/blanc-slider}}
    `);

    const list = this.element.querySelectorAll('ul li');
    assert.equal(list.length, 6);

    const navigationItems = this.element.querySelectorAll(
      '.blanc-slider-navigation span'
    );
    assert.equal(navigationItems.length, 6);

    assert.equal(navigationItems[0].getAttribute('aria-atomic'), 'true');
    assert.equal(navigationItems[1].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[2].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[3].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[4].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[5].getAttribute('aria-atomic'), 'false');

    await click(navigationItems[2]);
    assert.equal(navigationItems[0].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[2].getAttribute('aria-atomic'), 'true');

    await click(navigationItems[4]);
    assert.equal(navigationItems[2].getAttribute('aria-atomic'), 'false');
    assert.equal(navigationItems[4].getAttribute('aria-atomic'), 'true');

    await this.owner.unregister('component:custom-navigate');
  });
});
