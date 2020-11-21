/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const dbPromised = idb.open('database_laliga1', 1, (upgradeDb) => {
  if (!upgradeDb.objectStoreNames.contains('saved_team')) {
    const indexSavTeam = upgradeDb.createObjectStore('saved_team', {
      keyPath: 'id',
    });
    indexSavTeam.createIndex('name', 'name', {
      unique: false,
    });
  }
});

function getAllTeams() {
  dbPromised
    .then((db) => {
      const tx = db.transaction('saved_team', 'readonly');
      const store = tx.objectStore('saved_team');
      return store.getAll();
    })
    .then((teams) => {
      getAllSavedTeams(teams);
    });
}

function getAllSavedTeams(teams) {
  let listTeamHtml = '';
  teams.forEach((team) => {
    listTeamHtml += `
		<li class="collection-item"><div>${team.name}<a href="./team.html?id=${team.id}" class="secondary-content"><i class="material-icons">preview</i></a></div></li>
		`;
  });
  let savHtml = '';
  savHtml += `
	<ul class="collection with-header">
		<li class="collection-header"><h4>Team Saved</h4></li>
		${listTeamHtml}
	</ul>
	`;
  document.getElementById('body-content').innerHTML = savHtml;
}

function saveTeam(team) {
  dbPromised
    .then((db) => {
      const tx = db.transaction('saved_team', 'readwrite');
      const store = tx.objectStore('saved_team');

      store.put(team);
      return tx.complete;
    })
    .then(() => {
      M.toast({
        html: 'Success to add your Team',
      });
      console.log('Data Save Success');
    });
}

function getDbById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction('saved_team', 'readonly');
        const store = tx.objectStore('saved_team');
        return store.get(id);
      })
      .then((team) => {
        resolve(team);
      });
  });
}

function deleteTeam(id) {
  dbPromised
    .then((db) => {
      const tx = db.transaction('saved_team', 'readwrite');
      const store = tx.objectStore('saved_team');
      store.delete(id);
      return tx.complete;
    })
    .then(() => {
      M.toast({
        html: 'Success to remove your Team',
      });
      console.log('Team Delete Success');
    });
}
