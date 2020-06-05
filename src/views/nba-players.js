import { generatePlayerRow, generatePlayersSelect, generatePlayerSeasonStats } from './tools';

export async function nbaPlayerView(playerID = 1) {
  const urlStart = `https://www.balldontlie.io/api/v1/players`;
  const statsBoxPlayer = document.getElementById('nba-player-info');
  statsBoxPlayer.innerHTML = '';

  const urlPlayerID = `/${playerID}`;
  const nbaPlayerURL = `${urlStart}${urlPlayerID}`;

  await fetch(nbaPlayerURL)
    .then((response) => response.json())
    .then((body) => {
      const { first_name: playerFirstName, last_name: playerLastName, position: playerPosition, team: playerTeam } = body;

      const { full_name: playerTeamFullName } = playerTeam;

      statsBoxPlayer.insertAdjacentHTML(
        'beforeend',
        generatePlayerRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID),
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function nbaAllPlayersView(playerSearchToShow, playerPageToShow, playerPerPageToShow) {
  const urlStart = `https://www.balldontlie.io/api/v1/players`;
  const statsBoxPlayers = document.querySelector('#nba-players-stats');
  statsBoxPlayers.innerHTML = '';

  const urlParametersSearch = `?search=${playerSearchToShow}`;
  const urlParametersPage = `&page=${playerPageToShow}`;
  const urlParametersPerPage = `&per_page=${playerPerPageToShow}`;
  const nbaAllPlayersURL = `${urlStart}${urlParametersSearch}${urlParametersPage}${urlParametersPerPage}`;

  await fetch(nbaAllPlayersURL)
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      // console.log(bodyData);
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
          generatePlayerRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID),
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function nbaPlayersSelectView() {
  const urlStart = `https://www.balldontlie.io/api/v1/players`;
  const selectBoxPlayers = document.querySelector('#statistics-player-id');

  const urlParametersSearch = `?search=`;
  const urlParametersPage = `&page=0`;
  const urlParametersPerPage = `&per_page=100`;

  const nbaAllPlayersURL = `${urlStart}${urlParametersSearch}${urlParametersPage}${urlParametersPerPage}`;

  await fetch(nbaAllPlayersURL)
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      bodyData.forEach((bodydata) => {
        // console.log(bodydata);
        const { id: playerID, first_name: playerFirstName, last_name: playerLastName } = bodydata;

        selectBoxPlayers.insertAdjacentHTML('beforeend', generatePlayersSelect(playerID, playerFirstName, playerLastName));
      });

      selectBoxPlayers.addEventListener('change', () => {
        const selectValue = selectBoxPlayers.value;
        // console.log(selectValue);
        nbaPlayerView(selectValue);
      });
    })

    .catch((err) => {
      console.log(err);
    });
}

export function playersSearchEngine() {
  let playerSearchToShow = '';
  let playerPageToShow = 0;
  let playerPerPageToShow = 3;

  nbaAllPlayersView(playerSearchToShow, playerPageToShow, playerPerPageToShow);
  // gameSeason
  const playerSearch = document.querySelector('#player-search');
  playerSearch.addEventListener('keyup', () => {
    playerSearchToShow = playerSearch.value;
    // console.log(playerSearchToShow);
    nbaAllPlayersView(playerSearchToShow, playerPageToShow, playerPerPageToShow);
  });
  // page
  const playerPage = document.querySelector('#player-page');
  playerPage.addEventListener('change', () => {
    playerPageToShow = playerPage.value;
    // console.log(playerPageToShow);
    nbaAllPlayersView(playerSearchToShow, playerPageToShow, playerPerPageToShow);
  });

  const playerPerPage = document.querySelector('#player-per-page');
  // perPage
  playerPerPage.addEventListener('change', () => {
    playerPerPageToShow = playerPerPage.value;
    // console.log(playerPerPageToShow);
    nbaAllPlayersView(playerSearchToShow, playerPageToShow, playerPerPageToShow);
  });
}

export async function nbaPlayersStatisticsView(season = 2018, playerID = 179) {
  // dane zawodnika
  const urlStartPlayer = `https://www.balldontlie.io/api/v1/players`;
  const statsBoxPlayer = document.getElementById('nba-player-info');
  statsBoxPlayer.innerHTML = '';

  const urlPlayerID = `/${playerID}`;
  const nbaPlayerURL = `${urlStartPlayer}${urlPlayerID}`;

  await fetch(nbaPlayerURL)
    .then((response) => response.json())
    .then((body) => {
      const { first_name: playerFirstName, last_name: playerLastName, position: playerPosition, team: playerTeam } = body;

      const { full_name: playerTeamFullName } = playerTeam;

      statsBoxPlayer.insertAdjacentHTML(
        'beforeend',
        generatePlayerRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID),
      );
    })
    .catch((err) => {
      console.log(err);
    });

  // statystyki

  const playerStatistics = document.querySelector('#nba-player-stats');
  playerStatistics.innerHTML = '';

  const urlStartStatistics = `https://www.balldontlie.io/api/v1/season_averages`;

  const urlParametersSeason = `?season=${season}`;
  const urlParametersPlayerID = `&player_ids[]=${playerID}`;

  const nbaPlayersStatisticsURL = `${urlStartStatistics}${urlParametersSeason}${urlParametersPlayerID}`;

  console.log(nbaPlayersStatisticsURL);

  await fetch(nbaPlayersStatisticsURL)
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;

      //   console.log(bodyData);
      bodyData.forEach((bodydata) => {
        console.log(bodydata);
        const {
          games_played: gamesPlayed,
          // player_id: playerIDNumber,
          season: seasonNumber,
          min,
          // fgm,
          // fga,
          // fg3m,
          // fg3a,
          // ftm,
          // fta,
          oreb,
          dreb,
          reb,
          ast,
          stl,
          blk,
          // turnover,
          // pf,
          pts,
          // fg_pct: fgPct,
          // fg3_pct: fg3Pct,
          // ft_pct: ftPct,
        } = bodydata;
        playerStatistics.insertAdjacentHTML(
          'beforeend',
          generatePlayerSeasonStats(
            gamesPlayed,
            // playerIDNumber,
            seasonNumber,
            min,
            // fgm,
            // fga,
            // fg3m,
            // fg3a,
            // ftm,
            // fta,
            oreb,
            dreb,
            reb,
            ast,
            stl,
            blk,
            // turnover,
            // pf,
            pts,
            // fgPct,
            // fg3Pct,
            // ftPct,
          ),
        );
      });

      // selectBoxPlayers.addEventListener('change', () => {
      //     const selectValue = selectBoxPlayers.value;
      //     // console.log(selectValue);
      //     nbaPlayerView(selectValue);
      // });
    })

    .catch((err) => {
      console.log(err);
    });
}

export function playerStatsSearchEngine() {
  let statisticsSeasonToShow = 2019;
  let statisticsPlayerToShow = 179;
  const statisticsSeason = document.querySelector('#statistics-season');
  const statisticsPlayer = document.querySelector('#statistics-player-id');

  statisticsSeason.addEventListener('change', () => {
    statisticsSeasonToShow = statisticsSeason.value;
    statisticsPlayerToShow = statisticsPlayer.value;
    // nbaPlayerView(statisticsSeasonToShow);
    nbaPlayersStatisticsView(statisticsSeasonToShow, statisticsPlayerToShow);
  });

  // perPage
  statisticsPlayer.addEventListener('change', () => {
    statisticsSeasonToShow = statisticsSeason.value;
    statisticsPlayerToShow = statisticsPlayer.value;
    // console.log(playerPerPageToShow);
    // nbaPlayerView(statisticsPlayerToShow);
    nbaPlayersStatisticsView(statisticsSeasonToShow, statisticsPlayerToShow);
  });
}
