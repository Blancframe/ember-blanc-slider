import { htmlSafe } from '@ember/string';

export default function inlineStyles(styleObject) {
  const newArray = [];

  for (var prop in styleObject) {
    newArray.push(`${prop}:${styleObject[prop]};`);
  }

  return htmlSafe(newArray.join(''));
}
