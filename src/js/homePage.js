import Glide from '@glidejs/glide';
import apiCall from './apiCall';

const homeTemplate = require('../templates/homeTemplate.handlebars');

const queryPopular = 'movie/popular';
const queryTopRated = 'movie/top_rated';

const el = document.querySelector('#app');
const renderHomePage = async () => {
  const resultsPopular = await apiCall(queryPopular);
  const resultsTopRated = await apiCall(queryTopRated);

  el.innerHTML = homeTemplate({
    popularCarouselContext: { type: 'popular', results: resultsPopular },
    topRatedCarouselContext: { type: 'top_rated', results: resultsTopRated },
  });
  new Glide('#popular', {
    type: 'carousel',
    perView: 5,
    breakpoints: {
      800: {
        perView: 4,
      },
      600: {
        perView: 2,
      },
    },
  }).mount();
  new Glide('#top_rated', {
    type: 'carousel',
    perView: 5,
    breakpoints: {
      800: {
        perView: 4,
      },
      600: {
        perView: 2,
      },
    },
  }).mount();
};

export default renderHomePage;
