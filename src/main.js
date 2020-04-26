// import { camelCase } from 'lodash';
import $ from 'jquery';
import { camelCaseView } from './views/camelcase';

function enableRouting() {
  function setRoute() {
    $('.view').hide(); // hide - metoda jQuery
    const { hash } = window.location; // destrukturyzacja globalnego obiektu window.location
    // jeśli hash jest pusty
    if (hash === '') {
      $('#home').show(); // pokaż element o #home
    }
    $(hash).show(); // show - metoda jQuery
  }
  setRoute(); // wywołaj niezwłocznie setRoute po wywołanie enableRouting
  window.addEventListener('hashchange', setRoute); // wywołaj setRoute na każdy event `hashchange`
}

document.addEventListener('DOMContentLoaded', () => {
  camelCaseView();
  enableRouting();
});
