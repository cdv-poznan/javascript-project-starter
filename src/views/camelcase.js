import { camelCase } from 'lodash';
import $ from 'jquery';

export function camelCaseView() {
  $('#convert').click(() => {
    const input = $('#myinput').val();
    $('#myoutput').val(camelCase(input));
  });
}
