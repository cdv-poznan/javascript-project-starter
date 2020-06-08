import { toUpper, replace } from 'lodash';

export function generatePlayerRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID) {
  const playerRow = `
  <div class="playerBox align-items-center col-4">
        <img src="./assets/players-img/small/${playerID}-${playerFirstName}-${playerLastName}.png" class="img-responsive" />
            <h3>${playerFirstName} ${playerLastName}</h3>
   </div>
  `;
  return playerRow;
}

export function generatePlayerRowFull(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID) {
  const playerRow = `
  <div class="playerBoxFull align-items-center col-12">
        <div class="row">
            <div class="col-3"><img src="./assets/players-img/small/${playerID}-${playerFirstName}-${playerLastName}.png" class="img-responsive" /></div>
            <div class="col-9">
            <h3>${playerFirstName} ${playerLastName}</h3>
            <p>Pozycja: ${playerPosition}</p>
            </div>
        </div>
         <!-- ${playerID} -->
  </div>
  `;
  return playerRow;
}

export function generateGameRow(
  homeTeamFullName,
  visitorTeamFullName,
  homeTeamScore,
  visitorTeamScore,
  homeTeamAbbreviation,
  visitorTeamAbbreviation,
  gameDate,
) {
  const gameRow = `<div div class="gameBox" >
        <div class="row d-flex align-items-center">
            <div class="col-1" style="background: url('https://www.nba.com/assets/logos/teams/primary/web/${toUpper(
              homeTeamAbbreviation,
            )}.svg') no-repeat center; background-size: contain; width: 150px; height: 150px;"></div>
            <div class="col">${homeTeamFullName}</div>
            <div class="col"><span>${replace(
              gameDate,
              'T00:00:00.000Z',
              '',
            )}</span><br><strong>${homeTeamScore} : ${visitorTeamScore}</strong></div>
            <div class="col">${visitorTeamFullName}</div>
            <div class="col-1 teamIcon" style="background: url('https://www.nba.com/assets/logos/teams/primary/web/${toUpper(
              visitorTeamAbbreviation,
            )}.svg') no-repeat center;  background-size: contain; width: 150px; height: 150px;"></div>
        </div> `;
  return gameRow;
}

export function generatePlayersSelect(playerID, playerFirstName, playerLastName) {
  const playerSelectRow = `<option value="${playerID}">${playerFirstName} ${playerLastName}</option>`;
  return playerSelectRow;
}

export function generateGamesSeasonsSelect() {
  const seasonsSelect = document.querySelector('#game-season');
  const statisticsSeasonsSelect = document.querySelector('#statistics-season');

  let selectOptions = '';

  for (let i = 2019; i >= 2010; i--) {
    selectOptions += `<option value="${i}">${i} / ${i + 1}</option>`;
  }
  seasonsSelect.insertAdjacentHTML('beforeend', selectOptions);
  statisticsSeasonsSelect.insertAdjacentHTML('beforeend', selectOptions);
}

export async function generateGamesTeamsSelect() {
  const teamsSelect = document.querySelector('#game-teams');
  const selectBoxTeams = document.querySelector('#nba-team-select');

  let selectOptions = '';

  const urlStartTeams = `https://www.balldontlie.io/api/v1/teams`;

  const urlParametersPage = `?page=0`;
  const nbaTeamsURL = `${urlStartTeams}${urlParametersPage}`;

  await fetch(nbaTeamsURL)
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      bodyData.forEach((bodydata) => {
        const { id: teamID, full_name: teamFullName } = bodydata;

        selectOptions += `<option value="${teamID}">${teamFullName}</option>`;
      });
    })

    .catch((err) => {
      console.log(err);
    });

  teamsSelect.insertAdjacentHTML('beforeend', selectOptions);
  selectBoxTeams.insertAdjacentHTML('beforeend', selectOptions);
}

export function generatePlayerSeasonStats(
  gamesPlayed,
  // playerID,
  season,
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
) {
  const playerRow = `
  <div div class="statisticsBox" >
  <div class="row">
            <div class="col-2">Sezon</div>
            <div class="col-1">${season}</div>
            <div class="col-2">Rozegranych meczy</div>
            <div class="col-1">${gamesPlayed}</div>
            <div class="col-2">Minut na boisku</div>
            <div class="col-1">${min}</div>
            <div class="col-2">Średnia punktów</div>
            <div class="col-1">${pts}</div>
        </div>
        <div class="row">
            <div class="col-2">Asyst</div>
            <div class="col-1">${ast}</div>
            <div class="col-2">Zbiórek</div>
            <div class="col-1">${reb}</div>
            <div class="col-2">Przechwyty</div>
            <div class="col-1">${stl}</div>
            <div class="col-2">Bloki</div>
            <div class="col-1">${blk}</div>
        </div>
         <div class="row">
            <div class="col-2">Zbiórki</div>
            <div class="col-1">${reb}</div>
            <div class="col-2">w ataku</div>
            <div class="col-1">${oreb}</div>
            <div class="col-2">w obronie</div>
            <div class="col-1">${dreb}</div>
            <div class="col-2">Przechwyty</div>
            <div class="col-1">${stl}</div>
        </div>
        
        </div>
  `;
  return playerRow;
}
