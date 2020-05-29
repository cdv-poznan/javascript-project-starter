import Router from 'vanilla-router';
import renderHomePage from './js/homePage';
import renderMoviePage from './js/moviePage';
import renderPersonPage from './js/personPage';

import 'normalize.css';
import 'bootstrap';

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
      router.navigateTo(href);
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
    renderHomePage().then(() => {
      attachLinks();
    });
  });

  router.add('/movie/{id}', (id) => {
    renderMoviePage(id).then(() => {
      attachLinks();
    });
  });

  router.add('/person/{id}', (id) => {
    renderPersonPage(id).then(() => {
      attachLinks();
    });
  });

  router.addUriListener();
  // Navigate app to current url
  router.navigateTo(window.location.pathname);
});
