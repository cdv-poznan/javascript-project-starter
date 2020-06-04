import { generatePlayerRow, generatePlayersSelect } from './tools';

const fetchMethod = 'GET';
const fetchHeaders = {
  'x-rapidapi-host': 'free-nba.p.rapidapi.com',
  'x-rapidapi-key': 'ebdbe9243dmsh265cfefe983de1ep18677ajsne6a7199e5ab5',
};

export async function nbaPlayerView(playerID = 1) {
  const statsBoxPlayer = document.getElementById('nba-player-stats');

  const nbaPlayerURL = `https://free-nba.p.rapidapi.com/players/${playerID}`;

  await fetch(nbaPlayerURL, {
    method: fetchMethod,
    headers: fetchHeaders,
  })
    .then((response) => response.json())
    .then((body) => {
      // console.log(body);
      const {
        first_name: playerFirstName,
        last_name: playerLastName,
        position: playerPosition,
        // id: playerID,
        // height_feet: playerHightFeet,
        // height_inches: playerHightInches,
        team: playerTeam,
      } = body;

      const {
        full_name: playerTeamFullName,
        // id: playerTeamID,
        // abbreviation: playerTeamAbbreviation,
        // city: playerTeamCity,
        // conference: playerTeamConference,
        // division: playerTeamDivision,
        // name: playerTeamName,
      } = playerTeam;

      statsBoxPlayer.innerHTML = '';
      statsBoxPlayer.insertAdjacentHTML(
        'beforeend',
        generatePlayerRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition),
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function nbaPlayersSelectView() {
  const selectBoxPlayers = document.querySelector('#nba-player-select');

  await fetch(`https://free-nba.p.rapidapi.com/players?page=0&per_page=100`, {
    method: fetchMethod,
    headers: fetchHeaders,
  })
    .then((response) => response.json())
    .then((data) => {
      const bodyData = data.data;
      bodyData.forEach((bodydata) => {
        // console.log(bodydata);
        const { id: playerID, first_name: playerFirstName, last_name: playerLastName } = bodydata;

        selectBoxPlayers.insertAdjacentHTML('beforeend', generatePlayersSelect(playerID, playerFirstName, playerLastName));
      });

      selectBoxPlayers.addEventListener('change', () => {
        const selectValue = selectBoxPlayers.value;
        // console.log(selectValue);
        nbaPlayerView(selectValue);
      });
    })

    .catch((err) => {
      console.log(err);
    });
}

// export async function nbaAllPlayersView(page = 0, perPage = 25, searchString = '') {
//   const statsBoxGames = document.getElementById('nba-players-stats');
//   const nbaAllPlayersURL = `https://free-nba.p.rapidapi.com/players?page=${page}&per_page=${perPage}&search=${searchString}`;
//   await fetch(nbaAllPlayersURL, {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-host': 'free-nba.p.rapidapi.com',
//       'x-rapidapi-key': 'ebdbe9243dmsh265cfefe983de1ep18677ajsne6a7199e5ab5',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const bodyData = data.data;
//       console.log(bodyData);
//       console.log(bodyData.length);

//       //   bodyData.forEach((bodydata) => {
//       // const {
//       //   home_team: homeTeam,
//       //   home_team_score: homeTeamScore,
//       //   visitor_team: visitorTeam,
//       //   visitor_team_score: visitorTeamScore,
//       // } = bodydata;
//       // const {
//       //   //   id: homeTeamID,
//       //   abbreviation: homeTeamAbbreviation,
//       //   //   city: homeTeamCity,
//       //   //   conference: homeTeamConference,
//       //   //   division: homeTeamDivision,
//       //   //   name: homeTeamName,
//       //   full_name: homeTeamFullName,
//       // } = homeTeam;
//       // const {
//       //   //   id: visitorTeamID,
//       //   abbreviation: visitorTeamAbbreviation,
//       //   //   city: visitorTeamCity,
//       //   //   conference: visitorTeamConference,
//       //   //   division: visitorTeamDivision,
//       //   //   name: visitorTeamName,
//       //   full_name: visitorTeamFullName,
//       // } = visitorTeam;
//       // statsBoxGames.insertAdjacentHTML(
//       //   'beforeend',
//       //   generateGameRow(
//       //     homeTeamFullName,
//       //     visitorTeamFullName,
//       //     homeTeamScore,
//       //     visitorTeamScore,
//       //     homeTeamAbbreviation,
//       //     visitorTeamAbbreviation,
//       //   ),
//       // );
//       //   });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
