import { camelCase } from 'lodash';
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', () => {
  $('#convert').click(() => {
    const input = $('#myinput').val();
    $('#myoutput').val(camelCase(input));
  });
});
