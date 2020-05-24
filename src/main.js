import Router from 'vanilla-router';

const homeTemplate = require('./templates/homeTemplate.handlebars');

window.addEventListener('load', () => {
  const el = document.querySelector('#app');
  el.innerHTML = homeTemplate({ doesWhat: 'rocks' });

  // Router Declaration
  const router = new Router({
    mode: 'history',
    page404: () => {
      el.innerHTML = homeTemplate({ where: '404 Not Found' });
    },
  });

  router.add('/', () => {
    el.innerHTML = homeTemplate({ where: 'Home' });
  });

  router.add('/popular', () => {
    el.innerHTML = homeTemplate({ where: 'Popular' });
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
