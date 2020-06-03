import { toLower, toUpper } from 'lodash';

export function generateTeamRow(teamID, teamAbbreviation, teamCity, teamConference, teamDivision, teamFullName, teamName) {
  const teamRow = `<div class="teamBox">
            <div class="row">
                <div class="col" style="background: url('https://www.nba.com/assets/logos/teams/primary/web/${toUpper(
                  teamAbbreviation,
                )}.svg') no-repeat; width: 150px; height: 150px;"></div>
                <div class="col">${teamFullName} (${toLower(teamName)})</div>
            </div>
            <div class="row">
                <div class="col">Miasto: ${teamCity}<br>Konferencja: ${teamConference}<br>Dywizja: ${teamDivision}</div>
                <div class="col">${teamAbbreviation} - ${teamID}</div>       
            </div>
          </div>`;
  return teamRow;
}

export function generateTeamsSelect(teamID, teamFullName) {
  const teamSelectRow = `<option value="${teamID}">${teamFullName}</option>`;
  return teamSelectRow;
}

export function generatePlayerRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition) {
  const playerRow = `
  <div div class="playerBox" >
        <div class="row">
            <div class="col">Imię</div>
            <div class="col">${playerFirstName}</div>
        </div>
        <div class="row">
            <div class="col">Nazwisko</div>
            <div class="col">${playerLastName}</div>
        </div>
        <div class="row">
            <div class="col">Drużyna</div>
            <div class="col">${playerTeamFullName}</div>
        </div>
        <div class="row">
            <div class="col">Pozycja</div>
            <div class="col">${playerPosition}</div>
        </div>
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
) {
  const gameRow = `<div div class="gameBox" >
        <div class="row">
            <div class="col">Gospodarze</div>
            <div class="col">Goście</div>
        </div>
        <div class="row">
            <div class="col" style="background: url('https://www.nba.com/assets/logos/teams/primary/web/${toUpper(
              homeTeamAbbreviation,
            )}.svg') no-repeat center; width: 150px; height: 150px;"></div>
            <div class="col" style="background: url('https://www.nba.com/assets/logos/teams/primary/web/${toUpper(
              visitorTeamAbbreviation,
            )}.svg') no-repeat center; width: 150px; height: 150px;"></div>
        </div>
        <div class="row">
            <div class="col">${homeTeamFullName}</div>
            <div class="col">${visitorTeamFullName}</div>
        </div>
        <div class="row">
            <div class="col">${homeTeamScore}</div>
            <div class="col">${visitorTeamScore}</div>
        </div>
        </div> `;
  return gameRow;
}

export function generatePlayersSelect(playerID, playerFirstName, playerLastName) {
  const playerSelectRow = `<option value="${playerID}">${playerFirstName} ${playerLastName}</option>`;
  return playerSelectRow;
}
