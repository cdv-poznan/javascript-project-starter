import $ from 'jquery';
import { todoView } from './views/todo';
import { chartsView } from './views/charts';
import { trendingYoutubeView } from './views/trending-videos';

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
  todoView();
  chartsView();
  trendingYoutubeView();
  enabelRouting();
});
