import $ from 'jquery';
// import { camelCaseView } from './views/camelcase';
// import { todoView } from './views/todo';
// import { chartsView } from './views/chart';
import { nbaGameView, nbaAllGamesView } from './views/nba-games';
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
  nbaAllGamesView(2014, 0, 200, 2, '');
  nbaPlayerView(2);
  // nbaAllPlayersView(0, 100, 'jordan');
  nbaTeamView();
  nbaAllTeamsView();
  nbaTeamsSelectView();
  nbaPlayersSelectView();
  enableRouting();
});

// console.log('test');
