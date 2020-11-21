/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        document.querySelectorAll('.topnav, .sidenav').forEach((elm) => {
          elm.innerHTML = xhttp.responseText;
        });

        document.querySelectorAll('.sidenav a, .topnav a').forEach((elm) => {
          elm.addEventListener('click', (event) => {
            const sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            page = event.target.getAttribute('href').substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }

  let page = window.location.hash.substr(1);
  if (page === '') page = 'home';

  loadPage(page);

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          if (page === 'home') {
            getAllStandings();
          } else if (page === 'saved') {
            getAllTeams();
          } else if (page === 'about') {
            loadAbout();
          }
        }
      }
    };
    xhttp.open('GET', `pages/${page}.html`, true);
    xhttp.send();
  }
});

function loadAbout() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      const content = document.querySelector('#body-content');
      if (this.status === 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status === 404) {
        content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
      } else {
        content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
      }
    }
  };
  xhttp.open('GET', 'pages/about.html', true);
  xhttp.send();
}
