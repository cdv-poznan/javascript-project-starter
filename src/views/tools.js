import { toLower, toUpper, replace } from 'lodash';

// ------------------------------- TEAM TOOLS  ----------------------------------

export function generateTeamIntro(teamID, teamAbbreviation, teamCity, teamConference, teamDivision, teamFullName, teamName) {
  const teamRow = `<div class="teamBox">
            <div class="row d-flex align-items-center">
                <div class="col-12 col-md-4" style="background: url('https://www.nba.com/assets/logos/teams/primary/web/${toUpper(
                  teamAbbreviation,
                )}.svg') no-repeat; background-size: contain; width: 300px; height: 300px;"></div>
                <div class="col-12 col-md-6">
                  <h2>${teamFullName}</h2>
                  <div class="row d-flex">
                  <div class="col-6">Miasto:</div>
                  <div class="col-6"><h3>${teamCity}</h3></div>
                  </div>
                  <div class="row">
                  <div class="col-6">Konferencja:</div>
                  <div class="col-6"><h3>${teamConference}</h3></div>
                  </div>
                  <div class="row">
                  <div class="col-6">Dywizja:</div>
                  <div class="col-6"><h3>${teamDivision}</h3></div>
                  </div>
                </div>
                <div class="col-12 col-md-2 gameDetailsBox d-flex align-items-center justify-content-center"><a href="https://www.nba.com/teams/${toLower(
                  teamName,
                )}" target="blank" title="NBA - Team Page"><i class="fas fa-info-circle fa-3x"></i></a></div>
            </div>
            <!-- ${teamAbbreviation} - ${teamID} - ${toLower(teamName)} -->

          </div>`;
  return teamRow;
}
// ------------------------------- TEAM TOOLS  ----------------------------------

// ------------------------------- GAME TOOLS  ----------------------------------

export function generateGameRow(
  homeTeamFullName,
  visitorTeamFullName,
  homeTeamScore,
  visitorTeamScore,
  homeTeamAbbreviation,
  visitorTeamAbbreviation,
  gameDate,
  gameId,
) {
  const gameRow = `<div class="gameBox">
    <div class="row d-flex align-items-center">
      <div class="col d-none d-md-block">${visitorTeamFullName}</div>
        <div class="col-2 col-lg-1" style="background: url('https://www.nba.com/assets/logos/teams/primary/web/${toUpper(
          visitorTeamAbbreviation,
        )}.svg') no-repeat center;  background-size: contain; width: 150px; height: 150px;"></div>
      <div class="col"><span>${replace(
        gameDate,
        'T00:00:00.000Z',
        '',
      )}</span><br><strong>${visitorTeamScore} : ${homeTeamScore}</strong><br><a href="/#games/${gameId}">Szczegóły</a></div>
      <div class="col-2 col-lg-1" style="background: url('https://www.nba.com/assets/logos/teams/primary/web/${toUpper(
        homeTeamAbbreviation,
      )}.svg') no-repeat center; background-size: contain; width: 150px; height: 150px;"></div>
      <div class="col d-none d-md-block">${homeTeamFullName}</div>
        
      </div>`;
  return gameRow;
}

export function generateGameIntroInfo(
  homeTeamFullName,
  visitorTeamFullName,
  homeTeamScore,
  visitorTeamScore,
  homeTeamAbbreviation,
  visitorTeamAbbreviation,
  gameDate,
  gameId,
) {
  const gameDateToShow = replace(gameDate, ' 00:00:00 UTC', '');
  const gameDateToUrl = replace(replace(gameDateToShow, '-', ''), '-', '');
  const gameRow = `
   <h1>${visitorTeamFullName} : ${homeTeamFullName}</h1>
   <h2>${gameDateToShow}</h2>
  <div class="gameDetailBox">
    <div class="row">
      
      <div class="col-6" style="background: url('https://www.nba.com/assets/logos/teams/primary/web/${toUpper(
        visitorTeamAbbreviation,
      )}.svg') no-repeat center;  background-size: contain; width: 350px; height: 350px;"></div>
      <div class="col-6" style="background: url('https://www.nba.com/assets/logos/teams/primary/web/${toUpper(
        homeTeamAbbreviation,
      )}.svg') no-repeat center; background-size: contain; width: 350px; height: 350px;"></div>
    </div>
    <div class="row">
      <div class="col-6"><strong>${visitorTeamScore}</strong><!-- ${visitorTeamAbbreviation} --></div>
      <div class="col-6"><strong>${homeTeamScore}</strong><!-- ${homeTeamAbbreviation} --></div>
    </div>
    </div>
    <div class="gameLinkBox">
      <div class="row">
      <div class="col-12"><a href="https://watch.nba.com/game/${gameDateToUrl}/${visitorTeamAbbreviation}${homeTeamAbbreviation}" target="_blank"><h2>Zobacz więcej na NBA.com</h2></a></div>
    </div>
    
    <!-- ${gameId} -->
    `;
  return gameRow;
}

export function generateGamesSeasonsSelect() {
  const seasonsSelect = document.querySelector('#game-season');
  let selectOptions = '';

  for (let i = 2019; i >= 1979; i--) {
    selectOptions += `<option value="${i}">${i} / ${i + 1}</option>`;
  }

  seasonsSelect.insertAdjacentHTML('beforeend', selectOptions);
}

// ------------------------------- PLAYER TOOLS  ----------------------------------

export function generatePlayerRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID) {
  const playerRow = `
  <div class="playerBox align-items-center col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
  <a href="/#players/${playerID}">
        <img src="./assets/players-img/small/${playerID}-${playerFirstName}-${playerLastName}.png" class="img-responsive" />
            <h3>${playerFirstName} ${playerLastName}</h3>
            </a>
   </div>
  `;
  return playerRow;
}

export function generatePlayerShortRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID) {
  const playerRow = `
  <div class="playerBoxShort align-items-center row">
  <div class="col-12 col-md-6">
    <a href="/#players/${playerID}">
            <h2>${playerFirstName} ${playerLastName}</h2>
            </a>
  </div>          
  <div class="col-10 col-md-4 text-left">Drużyna: ${playerTeamFullName}<br>Pozycja: ${playerPosition}</div>
  <div class="col-2 col-md-2"><a href="/#players/${playerID}"><i class="far fa-address-card fa-3x"></i></a></div>
   </div>
  `;
  return playerRow;
}

export function generatePlayerRowFull(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID) {
  const playerRow = `
  <div class="playerBoxFull align-items-center col-12">
        <div class="row">
            <div class="col-4"><a href="#players/${playerID}"><img src="./assets/players-img/small/${playerID}-${playerFirstName}-${playerLastName}.png" class="img-responsive" /></a></div>
            <div class="col-6">
            <h2><a href="#players/${playerID}">${playerFirstName} ${playerLastName}</a></h2>
            <p>Pozycja: <h3>${playerPosition}</h3></p>
            </div>
            <div class="col-2 playerDetailsBox d-flex align-items-center justify-content-center">
            <p><a href="#players/${playerID}"><i class="far fa-address-card fa-3x"></i></a></p>
            </div>
            
            </div>
        </div>
         <!-- ${playerID} -->
  </div>
  `;
  return playerRow;
}

export function generatePlayerInfoIntro(
  playerFirstName,
  playerLastName,
  playerTeamFullName,
  playerPosition,
  playerID,
  heightFeet,
  heightInches,
) {
  let playerRow = `
  <h1>${playerFirstName} ${playerLastName}</h1>
  <div class="playerIntroBox align-items-center col-12">`;

  // if (playerTeamFullName === 'Los Angeles Lakers') {
  playerRow += `<div class="row playerImage">
            <div class="col-12"><img src="./assets/players-img/${playerID}-${playerFirstName}-${playerLastName}.jpg" class="img-responsive" /></div>
        </div>`;
  // }
  playerRow += `<div class="row playerInfo">
            <div class="col-12 col-md-6">
              <div class="row">
                <div class="col-3 col-sm-6 col-md-6 col-lg-3 col-xl-3">Drużyna</div>
                <div class="col-9 col-sm-6 col-md-6 col-lg-9 col-xl-9"><h3>${playerTeamFullName}</h3></div>
              </div>            
            </div>
            <div class="col-12 col-md-6">
              <div class="row">
                <div class="col-3 col-sm-6 col-md-6 col-lg-3 col-xl-3">Pozycja</div>
                <div class="col-9 col-sm-6 col-md-6 col-lg-9 col-xl-9"><h3>${playerPosition}</h3></div>
              </div>`;
  if (heightFeet !== null) {
    playerRow += `<div class="row">
                <div class="col-3 col-sm-6 col-md-6 col-lg-3 col-xl-3" > Wzrost</div >
                <div class="col-9 col-sm-6 col-md-6 col-lg-9 col-xl-9"><h3>${heightFeet} ft ${heightInches} in</h3></div>
              </div>`;
  }
  playerRow += `</div>
            
        </div>
         <!-- ${playerID} -->
  </div >
    `;
  return playerRow;
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

        const playerStatsTableRow = `
        <tr>
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
        playerStatsShow.insertAdjacentHTML('beforeend', playerStatsTableRow);
      });
    })

    .catch((err) => {
      console.log(err);
    });
}

export function generatePlayerStatisticsTable(playerID) {
  const playerStatsShow = document.querySelector('#player-stats-show');
  playerStatsShow.innerHTML = '';
  const tableStart = `
  <tr>
    <th>Sezon</th>
    <th>Gier</th>
    <th>min</th>
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
  for (let i = 2019; i >= 1979; i--) {
    playerStatisticsInSeason(i, playerID); // aby roczniki wykonały się po sobie
  }
}
