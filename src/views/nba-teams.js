import { generateTeamRow } from './tools';

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
          generateTeamRow(teamID, teamAbbreviation, teamCity, teamConference, teamDivision, teamFullName, teamName),
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function nbaTeamView(teamNumber = 0) {
  const statsBoxTeam = document.querySelector('#nba-team-stats');

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

      statsBoxTeam.innerHTML = '';
      statsBoxTeam.insertAdjacentHTML(
        'beforeend',
        generateTeamRow(teamID, teamAbbreviation, teamCity, teamConference, teamDivision, teamFullName, teamName),
      );
    })
    .catch((err) => {
      console.log(err);
    });
}
