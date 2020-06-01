import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselConfig } from '../utilis/carousel';
import { apiImagesUrl } from '../apiConfig';
import overviewTemplate from '../templates/overviewTemplate.handlebars';

const renderMoviesPage = async (app) => {
  // Select the app root element
  const el = document.querySelector('#app');

  // Clear previous page content (for better UX)
  el.innerHTML = '';

  // Create paths to API endpoints
  const pathPopular = 'movie/popular';
  const pathTopRated = 'movie/top_rated';
  const pathNowPlaying = 'movie/now_playing';

  // Set the page title
  const pageTitle = 'Filmeo - movies';
  if (document.title !== pageTitle) document.title = pageTitle;

  // Specify a ISO 3166-1 code to filter release dates
  const region = 'PL';

  // Calls to The Movie Database API
  const responsePopular = await apiCall(pathPopular, region);
  const responseTopRated = await apiCall(pathTopRated, region);
  const responseNowPlaying = await apiCall(pathNowPlaying);

  // Inject templates to the DOM
  app.innerHTML = overviewTemplate({
    apiImagesUrl,
    popularCarouselContext: {
      type: 'popular',
      media: 'movie',
      results: responsePopular.results,
    },
    topRatedCarouselContext: {
      type: 'top_rated',
      media: 'movie',
      results: responseTopRated.results,
    },
    nowPlayingCarouselContext: {
      type: 'now_playing',
      media: 'movie',
      results: responseNowPlaying.results,
    },
  });

  // Create instances of Glide carousels
  new Glide('#popular', carouselConfig).mount();
  new Glide('#top_rated', carouselConfig).mount();
  new Glide('#now_playing', carouselConfig).mount();
};

export default renderMoviesPage;
