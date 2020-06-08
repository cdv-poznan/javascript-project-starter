import $ from 'jquery';

import crossroads from 'crossroads';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { generateGamesSeasonsSelect, generateGamesTeamsSelect } from './views/tools';

import { firebaseLayer } from './views/firebase';

import { nbaGameView, gamesSearchEngine } from './views/nba-games';
import { nbaPlayerView, playersSearchEngine, nbaPlayersSelectView, generatePlayerStatisticsTable } from './views/nba-players';
import { nbaTeamView, nbaAllTeamsView, nbaTeamPlayers, nbaTeamPlayersFull } from './views/nba-teams';

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
  // paginationView();
  nbaPlayerView(179);
  playersSearchEngine();
  nbaTeamView();
  nbaAllTeamsView();
  nbaTeamPlayers();
  nbaTeamPlayersFull();
  generateGamesSeasonsSelect();
  generateGamesTeamsSelect();

  firebaseLayer();
  enableRouting();
  generatePlayerStatisticsTable(237);

  crossroads.addRoute('foo');
  crossroads.addRoute('lorem/ipsum');
  crossroads.routed.add(console.log, console); // log all routes
});
