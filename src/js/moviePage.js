import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselConfig, carouselPeopleConfig } from '../utilis/carousel';
import movieTemplate from '../templates/movieTemplate.handlebars';

const renderMoviePage = async (app, movieId) => {
  // Create paths to API endpoints
  const queryMovie = `movie/${movieId}`;
  const querySimilar = queryMovie + '/similar';
  const queryCrew = queryMovie + '/credits';

  // Calls to The Movie Database API
  const resultsMovie = await apiCall(queryMovie);
  const resultsSimilarRaw = await apiCall(querySimilar);
  const resultsCrewRaw = await apiCall(queryCrew);

  // Set the page title
  const pageTitle = resultsMovie.title + ' - Filmeo';
  if (document.title !== pageTitle) document.title = pageTitle;

  // Limit the results to 7 movies
  const resultsSimilar = {
    ...resultsSimilarRaw,
    results: resultsSimilarRaw.results.slice(0, 7),
  };

  const resultsCrew = { ...resultsCrewRaw, results: resultsCrewRaw.cast.slice(0, 10) };

  // Inject templates to the DOM
  app.innerHTML = movieTemplate({
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

  // Create instances of Glide carousels
  new Glide('#similar_movies', carouselConfig).mount();
  new Glide('#cast', carouselPeopleConfig).mount();
};

export default renderMoviePage;
