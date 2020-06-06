import $ from 'jquery';
import { weatherView } from './views/weather';
import { oneCall } from './views/onecall';

function enableRouting() {
  function setRoute() {
    $('.view').hide();
    const { hash } = window.location;
    if (hash === '') {
      $('#home').show();
    }
    $(hash).show();
  }
  setRoute();
  window.addEventListener('hashchange', setRoute);
}

document.addEventListener('DOMContentLoaded', () => {
  weatherView();
  oneCall();

  enableRouting();
});
