import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselConfig, carouselPeopleConfig } from '../utilis/carousel';
import { apiImagesUrl } from '../apiConfig';
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
    apiImagesUrl,
    similarCarouselContext: {
      type: 'similar_movies',
      media: 'movie',
      results: resultsSimilar.results,
    },
    castCarouselContext: {
      type: 'cast',
      results: resultsCrew.results,
    },
  });

  // Create instances of Glide carousels
  if (resultsSimilar.results) new Glide('#similar_movies', carouselConfig).mount();
  if (resultsCrew.results) new Glide('#cast', carouselPeopleConfig).mount();
};

export default renderMoviePage;
