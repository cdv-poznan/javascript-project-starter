import { generateTeamIntro, generatePlayerRowFull } from './tools';

export async function nbaTeamView(teamNumber = 14) {
  const statsBoxTeam = document.querySelector('#nba-team-details');

  const urlStartTeams = `https://www.balldontlie.io/api/v1/teams`;

  const urlTeamNumber = `/${teamNumber}`;
  const nbaTeamsURL = `${urlStartTeams}${urlTeamNumber}`;

  await fetch(nbaTeamsURL)
    .then((response) => response.json())
    .then((body) => {
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
