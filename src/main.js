import Router from 'vanilla-router';
import { config } from './apiConfig';
import renderHomePage from './js/homePage';
import 'normalize.css';
import 'bootstrap';

const Handlebars = require('handlebars');
const homeTemplate = require('./templates/homeTemplate.handlebars');
const movieTemplate = require('./templates/movieTemplate.handlebars');

const { apiKey, apiUrl, apiImageUrl } = config;

window.addEventListener('load', () => {
  const el = document.querySelector('#app');
  el.innerHTML = homeTemplate({ doesWhat: 'rocks' });
  // Register Handlebars Partial
  Handlebars.registerPartial('Carousel', '{{prefix}}');
  // Router Declaration
  const router = new Router({
    mode: 'history',
    page404: () => {
      el.innerHTML = homeTemplate({ where: '404 Not Found' });
    },
  });

  router.add('/', () => {
    renderHomePage();
  });

  router.add('/popular', () => {
    fetch(`${apiUrl}movie/808?api_key=${apiKey}&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        el.innerHTML = movieTemplate({ ...data, apiImageUrl });
      });
  });

  // Navigate app to current url
  router.navigateTo(window.location.pathname);

  // Highlight Active Menu on Refresh/Page Reload
  const link = document.querySelector(`a[href='${window.location.pathname}']`);
  link.classList.add('active');

  document.querySelector('a').addEventListener('click', (event) => {
    // Block browser page load
    event.preventDefault();

    // Highlight Active Menu on Click
    const { target } = event;
    document.querySelector('.item').classList.remove('active');
    target.classList.add('active');

    // Navigate to clicked url
    const href = target.getAttribute('href');
    console.log(href);
    const path = href.substr(href.lastIndexOf('/'));
    router.navigateTo(path);
  });
});
