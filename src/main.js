import $ from 'jquery';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { generateGamesSeasonsSelect, generateGamesTeamsSelect } from './views/tools';

import { firebaseLayer } from './views/firebase';

import { nbaGameView, paginationView, gamesSearchEngine } from './views/nba-games';
import { nbaPlayerView, playersSearchEngine, nbaPlayersSelectView, playerStatsSearchEngine } from './views/nba-players';
import { nbaTeamView, nbaAllTeamsView } from './views/nba-teams';

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
  nbaPlayersSelectView();
  nbaGameView();
  gamesSearchEngine();
  paginationView();
  nbaPlayerView(179);
  playersSearchEngine();
  nbaTeamView();
  nbaAllTeamsView();
  generateGamesSeasonsSelect();
  generateGamesTeamsSelect();
  playerStatsSearchEngine();
  firebaseLayer();
  enableRouting();

});
