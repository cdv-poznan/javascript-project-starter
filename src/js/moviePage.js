import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselConfig, carouselPeopleConfig } from '../utilis/carousel';
import movieTemplate from '../templates/movieTemplate.handlebars';

const renderMoviePage = async (movieId) => {
  const el = document.querySelector('#app');
  el.innerHTML = '';
  const queryMovie = `movie/${movieId}`;
  const querySimilar = queryMovie + '/similar';
  const queryCrew = queryMovie + '/credits';

  const resultsMovie = await apiCall(queryMovie);

  const pageTitle = resultsMovie.title + ' - Filmeo';
  if (document.title !== pageTitle) {
    document.title = pageTitle;
  }
  const resultsSimilarRaw = await apiCall(querySimilar);
  const resultsSimilar = { ...resultsSimilarRaw, results: resultsSimilarRaw.results.slice(0, 7) };

  const resultsCrewRaw = await apiCall(queryCrew);
  const resultsCrew = { ...resultsCrewRaw, results: resultsCrewRaw.cast.slice(0, 10) };

  el.innerHTML = movieTemplate({
    resultsMovie,
    similarCarouselContext: {
      type: 'similar_movies',
      media: 'movie',
      data: resultsSimilar,
    },
    castCarouselContext: {
      type: 'cast',
      data: resultsCrew,
    },
  });

  new Glide('#similar_movies', carouselConfig).mount();
  new Glide('#cast', carouselPeopleConfig).mount();
};

export default renderMoviePage;
