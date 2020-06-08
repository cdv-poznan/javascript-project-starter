import { generatePlayerRow, generatePlayerShortRow, generatePlayerInfoIntro } from './tools';

export async function nbaPlayerView(playerID = 1, location = 'home') {
  const urlStart = `https://www.balldontlie.io/api/v1/players`;
  const statsBoxPlayer = document.getElementById('nba-player-info');
  const urlPlayerID = `/${playerID}`;
  const nbaPlayerURL = `${urlStart}${urlPlayerID}`;

  await fetch(nbaPlayerURL)
    .then((response) => response.json())
    .then((body) => {
      const {
        first_name: playerFirstName,
        last_name: playerLastName,
        position: playerPosition,
        height_feet: heightFeet,
        height_inches: heightInches,
        team: playerTeam,
      } = body;

      const { full_name: playerTeamFullName } = playerTeam;
      statsBoxPlayer.innerHTML = '';
      if (location === 'home') {
        statsBoxPlayer.insertAdjacentHTML(
          'beforeend',
          generatePlayerRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID),
        );
      }
      if (location === 'player-info') {
        statsBoxPlayer.insertAdjacentHTML(
          'beforeend',
          generatePlayerInfoIntro(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID, heightFeet, heightInches),
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function nbaAllPlayersView(playerSearchToShow, playerPageToShow, playerPerPageToShow) {
  const urlStart = `https://www.balldontlie.io/api/v1/players`;
  const statsBoxPlayers = document.querySelector('#nba-players-stats');

  const urlParametersSearch = `?search=${playerSearchToShow}`;
  const urlParametersPage = `&page=${playerPageToShow}`;
  const urlParametersPerPage = `&per_page=${playerPerPageToShow}`;
  const nbaAllPlayersURL = `${urlStart}${urlParametersSearch}${urlParametersPage}${urlParametersPerPage}`;

  await fetch(nbaAllPlayersURL)
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      statsBoxPlayers.innerHTML = '';
      bodyData.forEach((bodydata) => {
        const {
          id: playerID,
          first_name: playerFirstName,
          last_name: playerLastName,
          position: playerPosition,
          team: playerTeam,
        } = bodydata;

        const { full_name: playerTeamFullName } = playerTeam;

        statsBoxPlayers.insertAdjacentHTML(
          'beforeend',
          generatePlayerShortRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID),
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function playersSearchEngine() {
  let playerSearchToShow = '';
  const playerPageToShow = 0;
  const playerPerPageToShow = 100;

  const playerSearch = document.querySelector('#player-search');
  playerSearch.addEventListener('keyup', () => {
    playerSearchToShow = playerSearch.value;
    nbaAllPlayersView(playerSearchToShow, playerPageToShow, playerPerPageToShow);
  });
}

export async function nbaTeamPlayers() {
  const teamPlayersList = document.querySelector('#nba-team-players');
  const urlTeamsPlayersTemp = './assets/json/lista-zawodnikow-la-lakers.json';

  await fetch(urlTeamsPlayersTemp)
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      bodyData.forEach((bodydata) => {
        const {
          id: playerID,
          first_name: playerFirstName,
          last_name: playerLastName,
          position: playerPosition,
          team: playerTeam,
        } = bodydata;

        const { full_name: playerTeamFullName } = playerTeam;
        // statsBoxTeam.innerHTML = '';
        teamPlayersList.insertAdjacentHTML(
          'beforeend',
          generatePlayerRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID),
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
