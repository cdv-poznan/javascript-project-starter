// zrodla
// loga zespolow:
// https://www.nba.com/assets/logos/teams/primary/web/BOS.svg
// strony zespołów
// https://www.nba.com/teams/celtics

// zdjęcia zawodników
//

// strony zawodników
// https://www.nba.com/players/jaylen/brown/1627759

export async function nbaGameView(gameNumber = 1) {
  const statsBoxGame = document.getElementById('nba-game-stats');

  await fetch(`https://free-nba.p.rapidapi.com/games/${gameNumber}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'free-nba.p.rapidapi.com',
      'x-rapidapi-key': 'ebdbe9243dmsh265cfefe983de1ep18677ajsne6a7199e5ab5',
    },
  })
    .then((response) => response.json())
    .then((body) => {
      //   console.log(body);

      const homeTeam = body.home_team;
      // home team data
      const homeTeamID = homeTeam.id;
      const homeTeamAbbreviation = homeTeam.abbreviation;
      const homeTeamCity = homeTeam.city;
      const homeTeamConference = homeTeam.conference;
      const homeTeamDivision = homeTeam.division;
      const homeTeamName = homeTeam.name;
      const homeTeamFullName = homeTeam.full_name;
      const homeTeamScore = body.home_team_score;
      const visitorTeam = body.visitor_team;
      // visitor team data
      const visitorTeamID = visitorTeam.id;
      const visitorTeamAbbreviation = visitorTeam.abbreviation;
      const visitorTeamCity = visitorTeam.city;
      const visitorTeamConference = visitorTeam.conference;
      const visitorTeamDivision = visitorTeam.division;
      const visitorTeamName = visitorTeam.name;
      const visitorTeamFullName = visitorTeam.full_name;
      const visitorTeamScore = body.visitor_team_score;

      statsBoxGame.innerText = `
      Wynik meczu: ${homeTeamScore} : ${visitorTeamScore}
      Drużyna gospodarzy
        ID drużyny:  ${homeTeamID}
        Skrót: ${homeTeamAbbreviation}
        Miasto drużyny: ${homeTeamCity}
        Konferencja drużyny: ${homeTeamConference}
        Dywizja drużyny: ${homeTeamDivision}
        Nazwa drużyny: ${homeTeamName}
        Pełna nazwa drużyny: ${homeTeamFullName}
        Punkty drużyny: ${homeTeamScore}

        ------------------------
        Drużyna gości
        ID drużyny:  ${visitorTeamID}
        Skrót: ${visitorTeamAbbreviation}
        Miasto drużyny: ${visitorTeamCity}
        Konferencja drużyny: ${visitorTeamConference}
        Dywizja drużyny: ${visitorTeamDivision}
        Nazwa drużyny: ${visitorTeamName}
        Pełna nazwa drużyny: ${visitorTeamFullName}
        Punkty drużyny: ${visitorTeamScore}

        `;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function nbaAllGamesView() {
  const statsBoxGames = document.getElementById('nba-games-stats');

  await fetch(`https://free-nba.p.rapidapi.com/games?Seasons=2018&page=0&per_page=25`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'free-nba.p.rapidapi.com',
      'x-rapidapi-key': 'ebdbe9243dmsh265cfefe983de1ep18677ajsne6a7199e5ab5',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      console.log(bodyData);
      console.log(bodyData.length);

      bodyData.forEach((bodydata) => {
        const homeTeam = bodydata.home_team;
        const homeTeamID = homeTeam.id;
        const homeTeamAbbreviation = homeTeam.abbreviation;
        const homeTeamCity = homeTeam.city;
        const homeTeamConference = homeTeam.conference;
        const homeTeamDivision = homeTeam.division;
        const homeTeamName = homeTeam.name;
        const homeTeamFullName = homeTeam.full_name;
        const homeTeamScore = bodydata.home_team_score;

        const visitorTeam = bodydata.visitor_team;

        const visitorTeamID = visitorTeam.id;
        const visitorTeamAbbreviation = visitorTeam.abbreviation;
        const visitorTeamCity = visitorTeam.city;
        const visitorTeamConference = visitorTeam.conference;
        const visitorTeamDivision = visitorTeam.division;
        const visitorTeamName = visitorTeam.name;
        const visitorTeamFullName = visitorTeam.full_name;
        const visitorTeamScore = bodydata.visitor_team_score;

        const node = document.createElement('div');

        const textnode = document.createTextNode(`
            Wynik meczu: ${homeTeamScore} : ${visitorTeamScore}
      Drużyna gospodarzy
        ID drużyny:  ${homeTeamID}
        Skrót: ${homeTeamAbbreviation}
        Miasto drużyny: ${homeTeamCity}
        Konferencja drużyny: ${homeTeamConference}
        Dywizja drużyny: ${homeTeamDivision}
        Nazwa drużyny: ${homeTeamName}
        Pełna nazwa drużyny: ${homeTeamFullName}
        Punkty drużyny: ${homeTeamScore}

        ------------------------
        Drużyna gości
        ID drużyny:  ${visitorTeamID}
        Skrót: ${visitorTeamAbbreviation}
        Miasto drużyny: ${visitorTeamCity}
        Konferencja drużyny: ${visitorTeamConference}
        Dywizja drużyny: ${visitorTeamDivision}
        Nazwa drużyny: ${visitorTeamName}
        Pełna nazwa drużyny: ${visitorTeamFullName}
        Punkty drużyny: ${visitorTeamScore}
       `);

        node.appendChild(textnode);
        statsBoxGames.appendChild(node);
      });
    })

    .catch((err) => {
      console.log(err);
    });
}

export async function nbaAllTeamsView() {
  const statsBoxTeams = document.getElementById('nba-teams-stats');

  await fetch(`https://free-nba.p.rapidapi.com/teams?page=0`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'free-nba.p.rapidapi.com',
      'x-rapidapi-key': 'ebdbe9243dmsh265cfefe983de1ep18677ajsne6a7199e5ab5',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      console.log(bodyData);
      console.log(bodyData.length);

      bodyData.forEach((bodydata) => {
        const teamID = bodydata.id;
        const teamAbbreviation = bodydata.abbreviation;
        const teamCity = bodydata.city;
        const teamConference = bodydata.conference;
        const teamDivision = bodydata.division;
        const teamName = bodydata.name;
        const teamFullName = bodydata.full_name;

        const node = document.createElement('div');

        const textnode = document.createTextNode(`
          ID drużyny:  ${teamID}
          Skrót: ${teamAbbreviation}
          Miasto drużyny: ${teamCity}
          Konferencja drużyny: ${teamConference}
          Dywizja drużyny: ${teamDivision}
          Nazwa drużyny: ${teamName}
          Pełna nazwa drużyny: ${teamFullName}
     `);

        node.appendChild(textnode);

        statsBoxTeams.appendChild(node);
      });

      //   statsBox.innerText = bodyData;
    })

    .catch((err) => {
      console.log(err);
    });
}

export async function nbaTeamView(teamNumber = 1) {
  const statsBoxTeam = document.getElementById('nba-team-stats');

  await fetch(`https://free-nba.p.rapidapi.com/teams/${teamNumber}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'free-nba.p.rapidapi.com',
      'x-rapidapi-key': 'ebdbe9243dmsh265cfefe983de1ep18677ajsne6a7199e5ab5',
    },
  })
    .then((response) => response.json())
    .then((body) => {
      console.log(body);

      const teamID = body.id;
      const teamAbbreviation = body.abbreviation;
      const teamCity = body.city;
      const teamConference = body.conference;
      const teamDivision = body.division;
      const teamName = body.name;
      const teamFullName = body.full_name;

      statsBoxTeam.innerText = `
          ID drużyny:  ${teamID}
          Skrót: ${teamAbbreviation}
          Miasto drużyny: ${teamCity}
          Konferencja drużyny: ${teamConference}
          Dywizja drużyny: ${teamDivision}
          Nazwa drużyny: ${teamName}
          Pełna nazwa drużyny: ${teamFullName}
     `;
    })
    .catch((err) => {
      console.log(err);
    });
}
