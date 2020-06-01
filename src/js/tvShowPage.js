import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselPeopleConfig, carouselConfig } from '../utilis/carousel';
import { apiImagesUrl } from '../apiConfig';
import tvShowTemplate from '../templates/tvShowTemplate.handlebars';

const renderTvShowPage = async (app, tvShowId) => {
  // Create paths to API endpoints
  const pathTvShow = `tv/${tvShowId}`;
  const pathCrew = pathTvShow + '/credits';
  const pathSimilar = pathTvShow + '/similar';

  // Call to The Movie Database API
  const resultsTvShow = await apiCall(pathTvShow);

  // Set the page title
  const pageTitle = resultsTvShow.name + ' - Filmeo';
  if (document.title !== pageTitle) {
    document.title = pageTitle;
  }
  // Calls to The Movie Database API
  const resultsCrewRaw = await apiCall(pathCrew);
  // Limit the results to 7 movies
  const resultsCrew = resultsCrewRaw.cast.slice(0, 10);

  // Calls to The Movie Database API
  const resultsSimilarRaw = await apiCall(pathSimilar);

  // Limit the results to 7 movies
  const resultsSimilar = resultsSimilarRaw.results.slice(0, 7);

  // Inject templates to the DOM
  app.innerHTML = tvShowTemplate({
    apiImagesUrl,
    resultsTvShow,
    castCarouselContext: {
      type: 'cast',
      results: resultsCrew,
    },
    similarCarouselContext: {
      type: 'similar',
      media: 'tv',
      results: resultsSimilar,
    },
  });

  // Create instances of Glide carousels
  new Glide('#cast', carouselPeopleConfig).mount();
  new Glide('#similar', carouselConfig).mount();
};

export default renderTvShowPage;
