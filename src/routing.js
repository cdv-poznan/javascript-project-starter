import $ from 'jquery';
import { nbaPlayerView } from './views/nba-players';
import { nbaGameView } from './views/nba-games';
import { generatePlayerStatisticsTable } from './views/tools';

export function enableRouting() {
  function setRoute() {
    $('.view').hide();
    const { hash } = window.location;
    const segments = hash.split('/');

    $(segments[0] || '#home').show();

    $('.nav-item.nav-link').removeClass('active');
    $(`.nav-item.nav-link[href="${hash}"]`).addClass('active');
  }
  setRoute();
  window.addEventListener('hashchange', setRoute);

  window.addEventListener('hashchange', () => {
    const { hash } = window.location;
    const [route, subaddressId] = hash.split('/');
    if (subaddressId) {
      if (route === '#players') {
        nbaPlayerView(subaddressId, 'player-info');
        generatePlayerStatisticsTable(subaddressId);
      }
      if (route === '#teams') {
        // do dorobienia w momencie skorzystania z lepszego API, pewnie płatnego
      }
      if (route === '#games') {
        nbaGameView(subaddressId);
      }
    }
  });
}
