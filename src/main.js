import $ from 'jquery';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import { firebaseLayer } from './views/firebase';
import { nbaGameView, nbaAllGamesView, paginationView } from './views/nba-games';
import { nbaPlayerView, nbaPlayersSelectView } from './views/nba-players';
import { nbaTeamView, nbaAllTeamsView, nbaTeamsSelectView } from './views/nba-teams';

function enableRouting() {
  function setRoute() {
    $('.view').hide(); // hide - metoda jQuery
    const { hash } = window.location; // destrukturyzacja globalnego obiektu window.location
    if (hash === '') {
      $('#home').show();
    }
    $(hash).show(); // show - metoda jQuery
  }
  setRoute();
  window.addEventListener('hashchange', setRoute);
}

document.addEventListener('DOMContentLoaded', () => {
  // camelCaseView();
  // todoView();
  // chartsView();
  nbaGameView();
  nbaAllGamesView(2014, 0, 2, '', '');
  paginationView();
  nbaPlayerView(2);
  // nbaAllPlayersView(0, 100, 'jordan');
  nbaTeamView();
  nbaAllTeamsView();
  nbaTeamsSelectView();
  nbaPlayersSelectView();
  firebaseLayer();
  enableRouting();
});
