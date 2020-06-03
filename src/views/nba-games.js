import { generateGameRow } from './tools';

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
      // console.log(body);
      const { home_team: homeTeam, home_team_score: homeTeamScore, visitor_team: visitorTeam, visitor_team_score: visitorTeamScore } = body;

      const {
        // id: homeTeamID,
        abbreviation: homeTeamAbbreviation,
        // city: homeTeamCity,
        // conference: homeTeamConference,
        // division: homeTeamDivision,
        // name: homeTeamName,
        full_name: homeTeamFullName,
      } = homeTeam;

      const {
        // id: visitorTeamID,
        abbreviation: visitorTeamAbbreviation,
        // city: visitorTeamCity,
        // conference: visitorTeamConference,
        // division: visitorTeamDivision,
        // name: visitorTeamName,
        full_name: visitorTeamFullName,
      } = visitorTeam;

      statsBoxGame.insertAdjacentHTML(
        'beforeend',
        generateGameRow(
          homeTeamFullName,
          visitorTeamFullName,
          homeTeamScore,
          visitorTeamScore,
          homeTeamAbbreviation,
          visitorTeamAbbreviation,
        ),
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function nbaAllGamesView(gameSeason, page = 0, perPage = 25, teamID = '', date = '') {
  const statsBoxGames = document.getElementById('nba-games-stats');
  const nbaAllGamesURL = `https://free-nba.p.rapidapi.com/games?Seasons=${gameSeason}&page=${page}&team_ids=${teamID}&per_page=${perPage}&date=${date}`;
  await fetch(nbaAllGamesURL, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'free-nba.p.rapidapi.com',
      'x-rapidapi-key': 'ebdbe9243dmsh265cfefe983de1ep18677ajsne6a7199e5ab5',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      // console.log(bodyData);
      // console.log(bodyData.length);

      bodyData.forEach((bodydata) => {
        const {
          home_team: homeTeam,
          home_team_score: homeTeamScore,
          visitor_team: visitorTeam,
          visitor_team_score: visitorTeamScore,
        } = bodydata;

        const {
          //   id: homeTeamID,
          abbreviation: homeTeamAbbreviation,
          //   city: homeTeamCity,
          //   conference: homeTeamConference,
          //   division: homeTeamDivision,
          //   name: homeTeamName,
          full_name: homeTeamFullName,
        } = homeTeam;

        const {
          //   id: visitorTeamID,
          abbreviation: visitorTeamAbbreviation,
          //   city: visitorTeamCity,
          //   conference: visitorTeamConference,
          //   division: visitorTeamDivision,
          //   name: visitorTeamName,
          full_name: visitorTeamFullName,
        } = visitorTeam;

        statsBoxGames.insertAdjacentHTML(
          'beforeend',
          generateGameRow(
            homeTeamFullName,
            visitorTeamFullName,
            homeTeamScore,
            visitorTeamScore,
            homeTeamAbbreviation,
            visitorTeamAbbreviation,
          ),
        );
      });
    })

    .catch((err) => {
      console.log(err);
    });
}
