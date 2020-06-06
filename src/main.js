import $ from 'jquery';
import { camelCaseView } from './views/camelcase';
import { todoView } from './views/todo';
import { chartsView } from './views/charts';

function enabelRouting() {
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
  camelCaseView();
  todoView();
  chartsView();
  enabelRouting();
});
