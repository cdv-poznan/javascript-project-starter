import Router from 'vanilla-router';
import renderMoviesPage from './js/moviesPage';
import renderMoviePage from './js/moviePage';
import renderPersonPage from './js/personPage';
import renderSearchPage from './js/searchPage';
import renderTvShowPage from './js/tvShowPage';
import renderTvShowsPage from './js/tvShowsPage';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

import 'normalize.css';
import 'bootstrap';

require('./favicon.ico');

window.addEventListener('load', () => {
  // Router Declaration
  const router = new Router({
    mode: 'history',
    page404: () => {},
  });

  // Attach routing function to all links
  const attachLinks = () => {
    const binLinks = (e) => {
      // Block browser page load
      e.preventDefault();
      // Navigate to clicked url
      const href = e.target.parentElement.getAttribute('href');
      if (e.target.classList.contains('nav-link')) {
        $('.navbar-collapse').collapse('hide');
      }
      router.navigateTo(href);
      window.scrollTo(0, 0);
    };
    const addEventListenerList = (list, e, fn) => {
      for (let i = 0, len = list.length; i < len; i += 1) {
        list[i].addEventListener(e, fn, false);
      }
    };
    const links = document.querySelectorAll('.link');
    addEventListenerList(links, 'click', binLinks);
  };

  router.add('/', () => {
    renderMoviesPage().then(() => {
      attachLinks();
    });
  });

  router.add('/movie/{id}', (id) => {
    renderMoviePage(id).then(() => {
      attachLinks();
    });
  });
  router.add('/movies', () => {
    renderMoviesPage().then(() => {
      attachLinks();
    });
  });

  router.add('/person/{id}', (id) => {
    renderPersonPage(id).then(() => {
      attachLinks();
    });
  });
  router.add('/tv-shows', () => {
    renderTvShowsPage().then(() => {
      attachLinks();
    });
  });
  router.add('/tv/{id}', (id) => {
    renderTvShowPage(id).then(() => {
      attachLinks();
    });
  });

  router.add(/^search\/(?<mediaType>.+)&query=(?<query>.+)&page=(?<page>.+)/i, (mediaType, query, page) => {
    renderSearchPage(mediaType, query, page).then(() => {
      attachLinks();
    });
  });

  // Handle search form
  const form = document.querySelector('#nav-search');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    $('.navbar-collapse').collapse('hide');
    router.navigateTo(`/search/multi&query=${event.target.searchQuery.value}&page=1`);
    event.target.reset();
  });

  router.addUriListener();
  // Navigate app to current url
  router.navigateTo(window.location.pathname);
});
