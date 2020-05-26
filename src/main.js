import Router from 'vanilla-router';
import renderHomePage from './js/homePage';
import renderMoviePage from './js/moviePage';
import 'normalize.css';
import 'bootstrap';

const Handlebars = require('handlebars');
const homeTemplate = require('./templates/homeTemplate.handlebars');

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

  router.add('/movie/{id}', (id) => {
    renderMoviePage(id);
  });

  // Navigate app to current url
  router.navigateTo(window.location.pathname);

  document.querySelector('a').addEventListener('click', (event) => {
    // Block browser page load
    event.preventDefault();
    console.log('prevent reload');

    // Navigate to clicked url
    const href = event.target.getAttribute('href');
    const path = href.substr(href.lastIndexOf('/'));
    router.navigateTo(path);
  });
});
