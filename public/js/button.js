/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable radix */
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get('id');
  idParam = parseInt(idParam);

  const buttonSave = document.getElementById('save-button');
  let isDataDbExist = false;

  const dataTeam = getTeamById(idParam);

  function loadButton() {
    getDbById(idParam)
      .then((data) => {
        if (data) {
          showTeamById(data);
          isDataDbExist = true;
          buttonSave.innerHTML = '<i class="material-icons left">delete</i>Hapus';
          buttonSave.classList.add('orange');
        } else {
          getTeamById(idParam);
          isDataDbExist = false;
          buttonSave.innerHTML = '<i class="material-icons left">save</i>Simpan';
          buttonSave.classList.remove('orange');
        }
      });
  }

  buttonSave.onclick = (event) => {
    if (isDataDbExist === true) {
      event.preventDefault();
      deleteTeam(idParam);
      loadButton();
    } else {
      event.preventDefault();
      dataTeam.then((data) => {
        saveTeam(data);
        loadButton();
      });
    }
  };
  loadButton();
});
