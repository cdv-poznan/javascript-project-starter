import util from 'handlebars-utils';

export default function (a, b, options) {
  return util.value(!a && !b, this, options);
}
