import Glide from '@glidejs/glide';
import apiCall from './apiCall';

const movieTemplate = require('../templates/movieTemplate.handlebars');

const el = document.querySelector('#app');
const renderMoviePage = async (movieId) => {
  const queryMovie = `movie/${movieId}`;
  const querySimilar = queryMovie + '/similar';
  const queryCrew = queryMovie + '/credits';

  const resultsMovie = await apiCall(queryMovie);
  const resultsSimilarRaw = await apiCall(querySimilar);
  const resultsSimilar = { ...resultsSimilarRaw, results: resultsSimilarRaw.results.slice(0, 7) };

  const resultsCrewRaw = await apiCall(queryCrew);
  const resultsCrew = { ...resultsCrewRaw, results: resultsCrewRaw.cast.slice(0, 10) };

  el.innerHTML = movieTemplate({
    resultsMovie,
    similarCarouselContext: {
      type: 'similar_movies',
      data: resultsSimilar,
    },
    castCarouselContext: {
      type: 'cast',
      data: resultsCrew,
    },
  });
  new Glide('#similar_movies', {
    type: 'carousel',
    perView: 4,
    gap: 30,
    autoheight: true,
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
  new Glide('#cast', {
    type: 'carousel',
    perView: 6,
    gap: 30,
    autoheight: true,
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

export default renderMoviePage;
