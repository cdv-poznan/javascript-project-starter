import { camelCase } from 'lodash';
import $ from 'jquery';

export function camelCaseView() {
  console.log('Hello');

  console.log(camelCase('Hello my little friend! What are we doing?'));

  $('#convert').click(() => {
    const input = $('#myinput').val();
    $('#myoutput').val(camelCase(input));
  });
}
