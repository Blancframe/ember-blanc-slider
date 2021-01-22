# ember-blanc-slider [![Build Status](https://travis-ci.com/Blancframe/ember-blanc-slider.svg?branch=master)](https://travis-ci.com/Blancframe/ember-blanc-slider)

[![Coverage Status](https://coveralls.io/repos/github/onepercentclub/reef/badge.svg?branch=master&t=Z5eKvl)](https://coveralls.io/github/onepercentclub/reef?branch=master)

Accessible simple content slider

## Compatibility

- Ember.js v3.4 or above
- Ember CLI v2.13 or above

## Installation

```
ember install ember-blanc-slider
```

## Usage

```handlebars
{{#blanc-slider as |content|}}
    {{#content.list}}
        {{#content.slide}}
            Slide one and some content
        {{/content.slide}}
        {{#content.slide}}
            Another one (Dj Khaled)
        {{/content.slide}}
    {{/content.list}}
    <button onclick={{action content.previous}} type="button">
        Previous
    </button>
    <button onclick={{action content.next}} type="button">
        Next
    </button>
{{/blanc-slider}}
```

## License

This project is licensed under the [MIT License](LICENSE.md).
