import { toLower, toUpper } from 'lodash';
import { generatePlayerRow, generatePlayerRowFull } from './tools';

// generatory

function generateTeamIntro(teamID, teamAbbreviation, teamCity, teamConference, teamDivision, teamFullName, teamName) {
  const teamRow = `<div class="teamBox">
            <div class="row d-flex align-items-center">
                <div class="col-4" style="background: url('https://www.nba.com/assets/logos/teams/primary/web/${toUpper(
                  teamAbbreviation,
                )}.svg') no-repeat; background-size: contain; width: 300px; height: 300px;"></div>
                <div class="col-8">
                  <h1>${teamFullName}</h1>
                  <div class="row d-flex">
                  <div class="col-6">Miasto:</div>
                  <div class="col-6">${teamCity}</div>
                  </div>
                  <div class="row">
                  <div class="col-6">Konferencja:</div>
                  <div class="col-6">${teamConference}</div>
                  </div>
                  <div class="row">
                  <div class="col-6">Dywizja:</div>
                  <div class="col-6">${teamDivision}</div>
                  </div>                 
                </div>
            </div>
            <!-- ${teamAbbreviation} - ${teamID} - ${toLower(teamName)} -->
            
          </div>`;
  return teamRow;
}

// generatory

// tylko dla jednej drużyny tymczasowo
export async function nbaTeamView(teamNumber = 14) {
  const statsBoxTeam = document.querySelector('#nba-team-details');

  const urlStartTeams = `https://www.balldontlie.io/api/v1/teams`;

  const urlTeamNumber = `/${teamNumber}`;
  const nbaTeamsURL = `${urlStartTeams}${urlTeamNumber}`;

  console.log(nbaTeamsURL);

  await fetch(nbaTeamsURL)
    .then((response) => response.json())
    .then((body) => {
      console.log(body);
      const {
        id: teamID,
        abbreviation: teamAbbreviation,
        city: teamCity,
        conference: teamConference,
        division: teamDivision,
        full_name: teamFullName,
        name: teamName,
      } = body;
      // statsBoxTeam.innerHTML = '';
      statsBoxTeam.insertAdjacentHTML(
        'beforeend',
        generateTeamIntro(teamID, teamAbbreviation, teamCity, teamConference, teamDivision, teamFullName, teamName),
      );
    })
    .catch((err) => {
      console.log(err);
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

export async function nbaTeamPlayersFull() {
  const teamPlayersListFull = document.querySelector('#nba-team-players-full');
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
        teamPlayersListFull.insertAdjacentHTML(
          'beforeend',
          generatePlayerRowFull(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID),
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// tylko dla jednej drużyny tymczasowo

export async function nbaAllTeamsView() {
  const statsBoxTeams = document.querySelector('#nba-teams-stats');

  const urlStartTeams = `https://www.balldontlie.io/api/v1/teams`;

  const urlParametersPage = `?page=0`;
  const nbaTeamsURL = `${urlStartTeams}${urlParametersPage}`;

  await fetch(nbaTeamsURL)
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      bodyData.forEach((bodydata) => {
        const {
          id: teamID,
          abbreviation: teamAbbreviation,
          city: teamCity,
          conference: teamConference,
          division: teamDivision,
          full_name: teamFullName,
          name: teamName,
        } = bodydata;

        statsBoxTeams.insertAdjacentHTML(
          'beforeend',
          generateTeamIntro(teamID, teamAbbreviation, teamCity, teamConference, teamDivision, teamFullName, teamName),
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
