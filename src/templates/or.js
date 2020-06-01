import util from 'handlebars-utils';

// Handlebars helper function - logical OR
export default function (...args) {
  const len = args.length - 1;
  const options = args[len];
  let val = false;

  for (let i = 0; i < len; i += 1) {
    if (args[i]) {
      val = true;
      break;
    }
  }
  return util.value(val, this, options);
}
