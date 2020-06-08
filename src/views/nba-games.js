import { generateGameRow } from './tools';

const urlStart = `https://www.balldontlie.io/api/v1/games`;

export async function nbaGameView(gameNumber = 1) {
  const statsBoxGame = document.getElementById('nba-game-stats');

  const urlGameID = `/${gameNumber}`;
  const nbaGameURL = `${urlStart}${urlGameID}`;

  await fetch(nbaGameURL)
    .then((response) => response.json())
    .then((body) => {
      // console.log(body);
      const { home_team: homeTeam, home_team_score: homeTeamScore, visitor_team: visitorTeam, visitor_team_score: visitorTeamScore } = body;

      const { abbreviation: homeTeamAbbreviation, full_name: homeTeamFullName } = homeTeam;

      const { abbreviation: visitorTeamAbbreviation, full_name: visitorTeamFullName } = visitorTeam;

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

export async function nbaAllGamesView(gameSeasonToShow, gamePageToShow, gameTeamIDToShow, gamePerPageToShow, gameDateToShow) {
  const statsBoxGames = document.querySelector('#nba-games-stats');
  statsBoxGames.innerHTML = '';

  const urlGameSeason = `?seasons[]=${gameSeasonToShow}`;
  const urlParametersPage = `&page=${gamePageToShow}`;
  const urlTeamIDs = `&team_ids[]=${gameTeamIDToShow}`;
  const urlParametersPerPage = `&per_page=${gamePerPageToShow}`;
  const urlDate = `&date=${gameDateToShow}`;

  const nbaAllGamesURL = `${urlStart}${urlGameSeason}${urlParametersPage}${urlTeamIDs}${urlParametersPerPage}${urlDate}`;

  // console.log(nbaAllGamesURL);

  await fetch(nbaAllGamesURL)
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      // console.log(bodyData);
      bodyData.forEach((bodydata) => {
        const {
          date: gameDate,
          home_team: homeTeam,
          home_team_score: homeTeamScore,
          visitor_team: visitorTeam,
          visitor_team_score: visitorTeamScore,
        } = bodydata;

        // const dateToShow = new Date(gameDate);

        // console.log(dateToShow.getUTCHours()); // Hours
        // console.log(dateToShow.getUTCMinutes());
        // console.log(dateToShow.getUTCSeconds());

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
  // gameSeason
  const gameSeason = document.querySelector('#game-season');
  gameSeason.addEventListener('change', () => {
    gameSeasonToShow = gameSeason.value;
    // console.log(gameSeasonToShow);
    nbaAllGamesView(gameSeasonToShow, pageToShow, teamIDToShow, perPageToShow, dateToShow);
  });
  // page
  // const page = document.querySelector('#page');
  // page.addEventListener('change', () => {
  //   pageToShow = page.value;
  //   // console.log(pageToShow);
  //   nbaAllGamesView(gameSeasonToShow, pageToShow, teamIDToShow, perPageToShow, dateToShow);
  // });
  // const teamID = document.querySelector('#game-teams');
  // // teamID
  // teamID.addEventListener('change', () => {
  //   teamIDToShow = teamID.value;
  //   // console.log(teamIDToShow);
  //   nbaAllGamesView(gameSeasonToShow, pageToShow, teamIDToShow, perPageToShow, dateToShow);
  // });
  // const perPage = document.querySelector('#per-page');
  // // perPage
  // perPage.addEventListener('change', () => {
  //   perPageToShow = perPage.value;
  //   // console.log(perPageToShow);
  //   nbaAllGamesView(gameSeasonToShow, pageToShow, teamIDToShow, perPageToShow, dateToShow);
  // });
  // const date = document.querySelector('#date');
  // // date
  // date.addEventListener('change', () => {
  //   dateToShow = date.value;
  //   // console.log(dateToShow);
  //   nbaAllGamesView(gameSeasonToShow, pageToShow, teamIDToShow, perPageToShow, dateToShow);
  // });
}
// export function paginationView() {
//   const statsBoxGames = document.getElementById('nba-games-stats');

//   const paginationBox = `<div class="paginationBox d-flex flex-row justify-content-center">
//           <div class="col-6"><button id="loadMore"><i class="fas fa-angle-double-right"></i></button></div>
//         </div>`;

//   statsBoxGames.insertAdjacentHTML('afterend', paginationBox);
// }
