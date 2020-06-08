export function playerStatsSearchEngine() {
    const statisticsSeasonToShow = 2019;
    const statisticsPlayerToShow = 179;
    const statisticsSeason = document.querySelector('#statistics-season');
    const statisticsPlayer = document.querySelector('#statistics-player-id');
    statisticsSeason.addEventListener('change', () => {
        statisticsSeasonToShow = statisticsSeason.value;
        statisticsPlayerToShow = statisticsPlayer.value;
        // nbaPlayerView(statisticsSeasonToShow);
        nbaPlayersStatisticsView(statisticsSeasonToShow, statisticsPlayerToShow);
    });
    // perPage
    statisticsPlayer.addEventListener('change', () => {
        statisticsSeasonToShow = statisticsSeason.value;
        statisticsPlayerToShow = statisticsPlayer.value;
        // console.log(playerPerPageToShow);
        // nbaPlayerView(statisticsPlayerToShow);
        nbaPlayersStatisticsView(statisticsSeasonToShow, statisticsPlayerToShow);
    });
}

export function generatePlayersSelect(playerID, playerFirstName, playerLastName) {
    const playerSelectRow = `<option value="${playerID}">${playerFirstName} ${playerLastName}</option>`;
    return playerSelectRow;
}

export async function generateGamesTeamsSelect() {
    const teamsSelect = document.querySelector('#game-teams');
    const selectBoxTeams = document.querySelector('#nba-team-select');

    let selectOptions = '';

    const urlStartTeams = `https://www.balldontlie.io/api/v1/teams`;

    const urlParametersPage = `?page=0`;
    const nbaTeamsURL = `${urlStartTeams}${urlParametersPage}`;

    await fetch(nbaTeamsURL)
        .then((response) => response.json())
        .then((data) => {
            const bodyData = data.data;
            bodyData.forEach((bodydata) => {
                const { id: teamID, full_name: teamFullName } = bodydata;

                selectOptions += `<option value="${teamID}">${teamFullName}</option>`;
            });
        })

        .catch((err) => {
            console.log(err);
        });

    teamsSelect.insertAdjacentHTML('beforeend', selectOptions);
    selectBoxTeams.insertAdjacentHTML('beforeend', selectOptions);
}

export function generatePlayerSeasonStats(
    gamesPlayed,
    // playerID,
    season,
    min,
    // fgm,
    // fga,
    // fg3m,
    // fg3a,
    // ftm,
    // fta,
    oreb,
    dreb,
    reb,
    ast,
    stl,
    blk,
    // turnover,
    // pf,
    pts,
    // fgPct,
    // fg3Pct,
    // ftPct,
) {
    const playerRow = `
  <div div class="statisticsBox" >
        <div class="row">
          <div class="col-2">Sezon</div>
          <div class="col-1">${season}</div>
          <div class="col-2">Rozegranych meczy</div>
          <div class="col-1">${gamesPlayed}</div>
          <div class="col-2">Minut na boisku</div>
          <div class="col-1">${min}</div>
          <div class="col-2">Średnia punktów</div>
          <div class="col-1">${pts}</div>
        </div>
        <div class="row">
          <div class="col-2">Asyst</div>
          <div class="col-1">${ast}</div>
          <div class="col-2">Zbiórek</div>
          <div class="col-1">${reb}</div>
          <div class="col-2">Przechwyty</div>
          <div class="col-1">${stl}</div>
          <div class="col-2">Bloki</div>
          <div class="col-1">${blk}</div>
        </div>
        <div class="row">
          <div class="col-2">Zbiórki</div>
          <div class="col-1">${reb}</div>
          <div class="col-2">w ataku</div>
          <div class="col-1">${oreb}</div>
          <div class="col-2">w obronie</div>
          <div class="col-1">${dreb}</div>
          <div class="col-2">Przechwyty</div>
          <div class="col-1">${stl}</div>
        </div>

      </div>
  `;
    return playerRow;
}

export async function nbaPlayersSelectView() {
    const urlStart = `https://www.balldontlie.io/api/v1/players`;
    const selectBoxPlayers = document.querySelector('#statistics-player-id');

    const urlParametersSearch = `?search=`;
    const urlParametersPage = `&page=0`;
    const urlParametersPerPage = `&per_page=100`;

    const nbaAllPlayersURL = `${urlStart}${urlParametersSearch}${urlParametersPage}${urlParametersPerPage}`;

    await fetch(nbaAllPlayersURL)
        .then((response) => response.json())
        .then((data) => {
            const bodyData = data.data;
            bodyData.forEach((bodydata) => {
                const { id: playerID, first_name: playerFirstName, last_name: playerLastName } = bodydata;

                selectBoxPlayers.insertAdjacentHTML('beforeend', generatePlayersSelect(playerID, playerFirstName, playerLastName));
            });

            selectBoxPlayers.addEventListener('change', () => {
                const selectValue = selectBoxPlayers.value;
                nbaPlayerView(selectValue);
            });
        })

        .catch((err) => {
            console.log(err);
        });
}

export async function nbaPlayersStatisticsView(season = 2018, playerID = 179) {
    // player info
    const urlStartPlayer = `https://www.balldontlie.io/api/v1/players`;
    const statsBoxPlayer = document.getElementById('nba-player-info');
    statsBoxPlayer.innerHTML = '';

    const urlPlayerID = `/${playerID}`;
    const nbaPlayerURL = `${urlStartPlayer}${urlPlayerID}`;

    await fetch(nbaPlayerURL)
        .then((response) => response.json())
        .then((body) => {
            const { first_name: playerFirstName, last_name: playerLastName, position: playerPosition, team: playerTeam } = body;
            const { full_name: playerTeamFullName } = playerTeam;

            statsBoxPlayer.insertAdjacentHTML(
                'beforeend',
                generatePlayerRow(playerFirstName, playerLastName, playerTeamFullName, playerPosition, playerID),
            );
        })
        .catch((err) => {
            console.log(err);
        });

    // player stats
    const playerStatistics = document.querySelector('#nba-player-stats');
    const urlStartStatistics = `https://www.balldontlie.io/api/v1/season_averages`;
    const urlParametersSeason = `?season=${season}`;
    const urlParametersPlayerID = `&player_ids[]=${playerID}`;
    const nbaPlayersStatisticsURL = `${urlStartStatistics}${urlParametersSeason}${urlParametersPlayerID}`;

    await fetch(nbaPlayersStatisticsURL)
        .then((response) => response.json())
        .then((data) => {
            const bodyData = data.data;
            bodyData.forEach((bodydata) => {
                playerStatistics.innerHTML = '';
                const { games_played: gamesPlayed, season: seasonNumber, min, oreb, dreb, reb, ast, stl, blk, pts } = bodydata;
                playerStatistics.insertAdjacentHTML(
                    'beforeend',
                    generatePlayerSeasonStats(gamesPlayed, seasonNumber, min, oreb, dreb, reb, ast, stl, blk, pts),
                );
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

