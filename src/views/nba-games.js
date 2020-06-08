import { generateGameRow, generateGameIntroInfo } from './tools';

const urlStart = `https://www.balldontlie.io/api/v1/games`;

export async function nbaGameView(gameNumber = 1) {
  const infoBoxGame = document.getElementById('nba-game-info');
  const urlGameID = `/${gameNumber}`;
  const nbaGameURL = `${urlStart}${urlGameID}`;

  await fetch(nbaGameURL)
    .then((response) => response.json())
    .then((body) => {
      const {
        id: gameId,
        date: gameDate,
        home_team: homeTeam,
        home_team_score: homeTeamScore,
        visitor_team: visitorTeam,
        visitor_team_score: visitorTeamScore,
      } = body;

      const { abbreviation: homeTeamAbbreviation, full_name: homeTeamFullName } = homeTeam;
      const { abbreviation: visitorTeamAbbreviation, full_name: visitorTeamFullName } = visitorTeam;

      // game intro
      infoBoxGame.innerHTML = '';
      infoBoxGame.insertAdjacentHTML(
        'beforeend',
        generateGameIntroInfo(
          homeTeamFullName,
          visitorTeamFullName,
          homeTeamScore,
          visitorTeamScore,
          homeTeamAbbreviation,
          visitorTeamAbbreviation,
          gameDate,
          gameId,
        ),
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function nbaAllGamesView(gameSeasonToShow, gamePageToShow, gameTeamIDToShow, gamePerPageToShow, gameDateToShow) {
  const statsBoxGames = document.querySelector('#nba-games-stats');
  const urlGameSeason = `?seasons[]=${gameSeasonToShow}`;
  const urlParametersPage = `&page=${gamePageToShow}`;
  const urlTeamIDs = `&team_ids[]=${gameTeamIDToShow}`;
  const urlParametersPerPage = `&per_page=${gamePerPageToShow}`;
  const urlDate = `&date=${gameDateToShow}`;
  const nbaAllGamesURL = `${urlStart}${urlGameSeason}${urlParametersPage}${urlTeamIDs}${urlParametersPerPage}${urlDate}`;

  statsBoxGames.innerHTML = '';

  await fetch(nbaAllGamesURL)
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      bodyData.forEach((bodydata) => {
        const {
          id: gameId,
          date: gameDate,
          home_team: homeTeam,
          home_team_score: homeTeamScore,
          visitor_team: visitorTeam,
          visitor_team_score: visitorTeamScore,
        } = bodydata;

        const { abbreviation: homeTeamAbbreviation, full_name: homeTeamFullName } = homeTeam;
        const { abbreviation: visitorTeamAbbreviation, full_name: visitorTeamFullName } = visitorTeam;

        statsBoxGames.insertAdjacentHTML(
          'beforeend',
          generateGameRow(
            homeTeamFullName,
            visitorTeamFullName,
            homeTeamScore,
            visitorTeamScore,
            homeTeamAbbreviation,
            visitorTeamAbbreviation,
            gameDate,
            gameId,
          ),
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function gamesSearchEngine() {
  let gameSeasonToShow = '2019';
  const pageToShow = 0;
  const teamIDToShow = '14';
  const perPageToShow = 100;
  const dateToShow = '';

  nbaAllGamesView(gameSeasonToShow, pageToShow, teamIDToShow, perPageToShow, dateToShow);
  const gameSeason = document.querySelector('#game-season');
  gameSeason.addEventListener('change', () => {
    gameSeasonToShow = gameSeason.value;
    nbaAllGamesView(gameSeasonToShow, pageToShow, teamIDToShow, perPageToShow, dateToShow);
  });
}
