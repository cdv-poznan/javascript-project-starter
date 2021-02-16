import util from 'handlebars-utils';

// Handlebars helper function - logical NOR
export default function (a, b, options) {
  return util.value(!a && !b, this, options);
}
