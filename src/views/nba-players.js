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
  const playerPageToShow = 0;
  const playerPerPageToShow = 100;

  nbaAllPlayersView(playerSearchToShow, playerPageToShow, playerPerPageToShow);
  // gameSeason
  const playerSearch = document.querySelector('#player-search');
  playerSearch.addEventListener('keyup', () => {
    playerSearchToShow = playerSearch.value;
    // console.log(playerSearchToShow);
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
  // const statisticsSeasonToShow = 2019;
  // const statisticsPlayerToShow = 179;
  // const statisticsSeason = document.querySelector('#statistics-season');
  // const statisticsPlayer = document.querySelector('#statistics-player-id');
  // statisticsSeason.addEventListener('change', () => {
  //   statisticsSeasonToShow = statisticsSeason.value;
  //   statisticsPlayerToShow = statisticsPlayer.value;
  //   // nbaPlayerView(statisticsSeasonToShow);
  //   nbaPlayersStatisticsView(statisticsSeasonToShow, statisticsPlayerToShow);
  // });
  // // perPage
  // statisticsPlayer.addEventListener('change', () => {
  //   statisticsSeasonToShow = statisticsSeason.value;
  //   statisticsPlayerToShow = statisticsPlayer.value;
  //   // console.log(playerPerPageToShow);
  //   // nbaPlayerView(statisticsPlayerToShow);
  //   nbaPlayersStatisticsView(statisticsSeasonToShow, statisticsPlayerToShow);
  // });
}

export async function playerStatisticsInSeason(season, playerID) {
  const playerStatsShow = document.querySelector('#player-stats-show');
  const urlStartStatistics = `https://www.balldontlie.io/api/v1/season_averages`;
  const urlParametersSeason = `?season=${season}`;
  const urlParametersPlayerID = `&player_ids[]=${playerID}`;
  const nbaPlayersStatisticsURL = `${urlStartStatistics}${urlParametersSeason}${urlParametersPlayerID}`;

  await fetch(nbaPlayersStatisticsURL)
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      bodyData.forEach((bodydata) => {
        const {
          games_played: gamesPlayed,
          // player_id: playerIDNumber,
          season: seasonNumber,
          min,
          fgm,
          fga,
          fg3m,
          fg3a,
          ftm,
          fta,
          oreb,
          dreb,
          reb,
          ast,
          stl,
          blk,
          turnover,
          pf,
          pts,
          fg_pct: fgPct,
          fg3_pct: fg3Pct,
          ft_pct: ftPct,
        } = bodydata;

        const playerStatsTableRow = `<tr>
        <td>${seasonNumber}</td>
      <td>${gamesPlayed}</td>
        <td>${min}</td>
        <td>${fgm}</td>
        <td>${fga}</td>
        <td>${fg3m}</td>
        <td>${fg3a}</td>
        <td>${ftm}</td>
        <td>${fta}</td>
        <td>${oreb}</td>
        <td>${dreb}</td>
        <td>${reb}</td>
        <td>${ast}</td>
        <td>${stl}</td>
        <td>${blk}</td>
        <td>${turnover}</td>
        <td>${pf}</td>
        <td>${pts}</td>
        <td>${fgPct}</td>
        <td>${fg3Pct}</td>
        <td>${ftPct}</td>
        </tr>`;
        // return playerStatsTableRow;
        playerStatsShow.insertAdjacentHTML('beforeend', playerStatsTableRow);
      });
    })

    .catch((err) => {
      console.log(err);
    });
}

export function generatePlayerStatisticsTable(playerID) {
  const playerStatsShow = document.querySelector('#player-stats-show');
  const tableStart = `
  <tr>
  <th>Sezon</th>
  <th>Gier</th>
  <th>Minut</th>
  <th>fgm</th>
  <th>fga</th>
  <th>fg3m</th>
  <th>fg3a</th>
  <th>ftm</th>
  <th>fta</th>
  <th>oreb</th>
  <th>dreb</th>
  <th>reb</th>
  <th>ast</th>
  <th>stl</th>
  <th>blk</th>
  <th>turnover</th>
  <th>pf</th>
  <th>pts</th>
  <th>fgPct</th>
  <th>fg3Pct</th>
  <th>ftPct</th>
  </tr>`;
  playerStatsShow.insertAdjacentHTML('beforeend', tableStart);
  for (let i = 2019; i >= 2010; i--) {
    setTimeout(playerStatisticsInSeason(i, playerID), 100); // aby roczniki wykonały się po sobie
  }
}
