/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const KeyApi = '0f3c6b3b0a6540a0be9f3b13e38de6ef';
const BaseUrl = 'https://api.football-data.org/v2/';
const IdLiga = 2014; // Liga Spanyol

const EndpointCompetitions = `${BaseUrl}competitions/${IdLiga}/standings`;
const EndpointTeams = `${BaseUrl}teams/`;

// eslint-disable-next-line prefer-const
let loaderElement = document.getElementById('loader');
const preLoaderHTML = `
<div class="progress">
  <div class="indeterminate"></div>
</div>`;

const fetchAPI = (url) => fetch(url, {
  headers: {
    'X-Auth-Token': KeyApi,
  },
})
  .then((res) => {
    if (res.status !== 200) {
      console.log(`Error: ${res.status}`);
      return Promise.reject(new Error(res.statusText));
    }
    return Promise.resolve(res);
  })
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
  });

function getAllStandings() {
  loaderElement.innerHTML = preLoaderHTML;
  if ('caches' in window) {
    caches.match(EndpointCompetitions).then((response) => {
      if (response) {
        response.json().then((data) => {
          showStanding(data);
          loaderElement.innerHTML = '';
        });
      }
    });
  }
  fetchAPI(EndpointCompetitions)
    .then((data) => {
      console.log(data);
      showStanding(data);
      loaderElement.innerHTML = '';
    })
    .catch((error) => {
      console.log(error);
      loaderElement.innerHTML = '';
    });
}

function showStanding(data) {
  let standings = '';
  const standingElement = document.getElementById('body-content');

  data.standings[0].table.forEach((standing) => {
    standings += `
              <tr>
                  <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="${`logo ${standing.team.name}` || 'logo club'}"/></td>
                  <td><a href="team.html?id=${standing.team.id}">${standing.team.name}</a></td>
                  <td>${standing.won}</td>
                  <td>${standing.draw}</td>
                  <td>${standing.lost}</td>
                  <td>${standing.points}</td>
                  <td>${standing.goalsFor}</td>
                  <td>${standing.goalsAgainst}</td>
                  <td>${standing.goalDifference}</td>
              </tr>
      `;
  });

  standingElement.innerHTML = `
            <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
              <table class="striped responsive-table">
                  <thead>
                      <tr>
                          <th></th>
                          <th>Team Name</th>
                          <th>Win</th>
                          <th>Draw</th>
                          <th>Lose</th>
                          <th>Points</th>
                          <th>Goal For</th>
                          <th>Goal Against</th>
                          <th>Goal Difference</th>
                      </tr>
                   </thead>
                  <tbody id="standings">
                      ${standings}
                  </tbody>
              </table>
              
            </div>
  `;
}

function getTeamById(idTeam) {
  loaderElement.innerHTML = preLoaderHTML;
  return new Promise((resolve) => {
    if ('caches' in window) {
      caches.match(EndpointTeams + idTeam).then((response) => {
        if (response) {
          response.json().then((data) => {
            showTeamById(data);
            loaderElement.innerHTML = '';
            resolve(data);
          });
        }
      });
    }

    fetchAPI(EndpointTeams + idTeam)
      .then((data) => {
        showTeamById(data);
        resolve(data);
        loaderElement.innerHTML = '';
      })
      .catch((error) => {
        console.log(error);
        loaderElement.innerHTML = '';
      });
  });
}

function showTeamById(data) {
  let teamHtml = '';
  let squadHtml = '';
  const teamElement = document.getElementById('body-content');

  teamHtml = `
  
      <div class="col l4 s12">
        <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://') || 'icon.png'}" alt="${`logo ${data.name}` || 'logo club'} width="200">
      </div>
      <div class="col l7 s12">
        <ul class="collection">
          <li class="collection-item">
            <span class="">Team Name : </span>
            <span>${data.name || 'team name'}</span>
          </li>
          <li class="collection-item">
            <span>Short Name : </span>
            <span>${data.shortName || 'shortName team'} </span>
          </li>
          <li class="collection-item">
            <span>Didirikan : </span>
            <span>${data.founded || 'Founded'} </span>
          </li>
          <li class="collection-item">
            <span>Stadion : </span>
            <span>${data.venue || 'Stadion Name'} </span>
          </li>
          <li class="collection-item">
            <span>Alamat : </span>
            <span>${data.address || 'Address'} </span>
          </li>

        </ul>
      </div>
  
  `;

  data.squad.forEach((player) => {
    squadHtml += `
    <tr>
        <td>${player.name || 'Name'}</td>
        <td>${player.position || 'Position'}</td>
        <td>${player.nationality || 'Nationality'}</td>
    </tr>
`;
  });

  teamElement.innerHTML = `
  <div class="row team-container"> ${teamHtml} </div>

  <div class="row squad-container">
    <table class="striped responsive-table">
      <thead>
          <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Nationality</th>
          </tr>
        </thead>
      <tbody id="squad">
          ${squadHtml}
      </tbody>
  </table>
  </div>
  `;
}
