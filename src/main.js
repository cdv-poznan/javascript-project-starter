import Router from 'vanilla-router';
import renderHomePage from './js/homePage';

import renderMoviesPage from './js/moviesPage';
import renderMoviePage from './js/moviePage';
import renderPersonPage from './js/personPage';
import renderSearchPage from './js/searchPage';
import renderTvShowPage from './js/tvShowPage';
import renderTvShowsPage from './js/tvShowsPage';
import errorTemplate from './templates/errorTemplate.handlebars';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import 'normalize.css';
import 'bootstrap';

require('./favicon.ico');

window.addEventListener('load', () => {
  // Select the app root element
  const app = document.querySelector('#app');

  // Router Declaration
  const router = new Router({
    mode: 'history',
    page404: () => {
      app.innerHTML = errorTemplate();
    },
  });

  // Attach routing function to all links
  const attachLinks = () => {
    const binLinks = (e) => {
      // Block browser page load
      e.preventDefault();

      // Collapse navigation when mobile
      if (e.target.classList.contains('nav-link')) {
        $('.navbar-collapse').collapse('hide');
      }

      // Clear previous page content (for better UX)
      app.innerHTML = '';

      // Navigate to clicked url
      const href = e.target.parentElement.getAttribute('href');
      router.navigateTo(href);

      // Scroll to the op of the page
      window.scrollTo(0, 0);
    };

    // Function attaching event listner to array of elements
    const addEventListenerList = (list, e, fn) => {
      for (let i = 0, len = list.length; i < len; i += 1) {
        list[i].addEventListener(e, fn, false);
      }
    };

    // Get all links
    const links = document.querySelectorAll('.link');

    // Attach event listners to all links
    addEventListenerList(links, 'click', binLinks);
  };

  // Define router paths
  router.add('/', () => {
    renderHomePage(app).then(() => {
      attachLinks();
    });
  });

  router.add('/movie/{id}', (id) => {
    renderMoviePage(app, id).then(() => {
      attachLinks();
    });
  });
  router.add('/movies', () => {
    renderMoviesPage(app).then(() => {
      attachLinks();
    });
  });

  router.add('/person/{id}', (id) => {
    renderPersonPage(app, id).then(() => {
      attachLinks();
    });
  });
  router.add('/tv-shows', () => {
    renderTvShowsPage(app).then(() => {
      attachLinks();
    });
  });
  router.add('/tv/{id}', (id) => {
    renderTvShowPage(app, id).then(() => {
      attachLinks();
    });
  });

  router.add(/^search\/(?<mediaType>.+)&query=(?<query>.+)&page=(?<page>.+)/i, (mediaType, query, page) => {
    renderSearchPage(app, mediaType, query, page).then(() => {
      attachLinks();
    });
  });

  // Handle search form
  const form = document.querySelector('#nav-search');
  form.addEventListener('submit', (event) => {
    // Prevent page reload
    event.preventDefault();

    // Collapse the navigation when mobile
    $('.navbar-collapse').collapse('hide');

    // Navigate to search query path
    router.navigateTo(`/search/multi&query=${event.target.searchQuery.value}&page=1`);

    // Clear serach form
    event.target.reset();
  });

  // Lister for URI hange
  router.addUriListener();

  // Navigate app to current url
  router.navigateTo(window.location.pathname);
});
