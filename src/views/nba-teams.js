import { generateTeamRow, generateTeamsSelect } from './tools';

const fetchMethod = 'GET';
const fetchHeaders = {
  'x-rapidapi-host': 'free-nba.p.rapidapi.com',
  'x-rapidapi-key': 'ebdbe9243dmsh265cfefe983de1ep18677ajsne6a7199e5ab5',
};

export async function nbaAllTeamsView() {
  const statsBoxTeams = document.querySelector('#nba-teams-stats');

  await fetch(`https://free-nba.p.rapidapi.com/teams?page=0`, {
    method: fetchMethod,
    headers: fetchHeaders,
  })
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

export async function nbaTeamView(teamNumber = 1) {
  const statsBoxTeam = document.querySelector('#nba-team-stats');

  await fetch(`https://free-nba.p.rapidapi.com/teams/${teamNumber}`, {
    method: fetchMethod,
    headers: fetchHeaders,
  })
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

export async function nbaTeamsSelectView() {
  const selectBoxTeams = document.querySelector('#nba-team-select');

  await fetch(`https://free-nba.p.rapidapi.com/teams?page=0`, {
    method: fetchMethod,
    headers: fetchHeaders,
  })
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      bodyData.forEach((bodydata) => {
        const { id: teamID, full_name: teamFullName } = bodydata;

        selectBoxTeams.insertAdjacentHTML('beforeend', generateTeamsSelect(teamID, teamFullName));
      });

      selectBoxTeams.addEventListener('change', () => {
        const selectValue = selectBoxTeams.value;
        console.log(selectValue);
        nbaTeamView(selectValue);
      });
    })

    .catch((err) => {
      console.log(err);
    });
}
