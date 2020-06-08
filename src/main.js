import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { generateGamesSeasonsSelect } from './views/tools';
import { gamesSearchEngine } from './views/nba-games';
import { playersSearchEngine, nbaTeamPlayers } from './views/nba-players';
import { nbaAllTeamsView, nbaTeamPlayersFull } from './views/nba-teams';

import { enableRouting } from './routing';

document.addEventListener('DOMContentLoaded', () => {
  generateGamesSeasonsSelect();
  gamesSearchEngine();
  playersSearchEngine();
  nbaAllTeamsView();
  nbaTeamPlayers();
  nbaTeamPlayersFull();
  enableRouting();
});
