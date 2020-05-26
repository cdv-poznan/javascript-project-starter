import Glide from '@glidejs/glide';
import apiCall from './apiCall';

const homeTemplate = require('../templates/homeTemplate.handlebars');

const queryPopular = 'movie/popular';
const queryTopRated = 'movie/top_rated';
const queryNowPlaying = 'movie/now_playing';

const el = document.querySelector('#app');
const renderHomePage = async () => {
  const responsePopular = await apiCall(queryPopular);
  const responseTopRated = await apiCall(queryTopRated);
  const responseNowPlaying = await apiCall(queryNowPlaying);
  console.log(responseNowPlaying);
  el.innerHTML = homeTemplate({
    popularCarouselContext: { type: 'popular', data: responsePopular },
    topRatedCarouselContext: { type: 'top_rated', data: responseTopRated },
    nowPlayingCarouselContext: { type: 'now_playing', data: responseNowPlaying },
  });
  new Glide('#popular', {
    type: 'carousel',
    perView: 5,
    breakpoints: {
      992: {
        perView: 4,
      },
      768: {
        perView: 3,
      },
      576: {
        perView: 2,
      },
    },
  }).mount();
  new Glide('#top_rated', {
    type: 'carousel',
    perView: 5,
    breakpoints: {
      992: {
        perView: 4,
      },
      768: {
        perView: 3,
      },
      576: {
        perView: 2,
      },
    },
  }).mount();
  new Glide('#now_playing', {
    type: 'carousel',
    perView: 5,
    breakpoints: {
      992: {
        perView: 4,
      },
      768: {
        perView: 3,
      },
      576: {
        perView: 2,
      },
    },
  }).mount();
};

export default renderHomePage;
