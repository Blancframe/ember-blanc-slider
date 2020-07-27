'use strict';

module.exports = {
  extends: ['recommend', 'ember-template-lint-plugin-prettier:recommended'],
  plugins: ['ember-template-lint-plugin-prettier'],
  rules: {
    'bare-strings': false,
    'block-indentation': 4,
    'nested-interactive': true,
    'self-closing-void-elements': 'require',
    'img-alt-attributes': true,
    'link-rel-noopener': false,
  },
};
