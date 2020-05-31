import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselConfig } from '../utilis/carousel';
import overviewTemplate from '../templates/overviewTemplate.handlebars';

const renderMoviesPage = async () => {
  const queryPopular = 'movie/popular';
  const queryTopRated = 'movie/top_rated';
  const queryNowPlaying = 'movie/now_playing';

  // Select the app root element
  const el = document.querySelector('#app');
  el.innerHTML = '';

  // Set the page title
  const pageTitle = 'Filmeo - home page';
  if (document.title !== pageTitle) document.title = pageTitle;

  // Specify a ISO 3166-1 code to filter release dates.
  const region = 'PL';

  // Calls to The Movie Database API
  const responsePopular = await apiCall(queryPopular, region);
  const responseTopRated = await apiCall(queryTopRated, region);
  const responseNowPlaying = await apiCall(queryNowPlaying);

  // Inject templates to the DOM
  el.innerHTML = overviewTemplate({
    popularCarouselContext: { type: 'popular', media: 'movie', data: responsePopular },
    topRatedCarouselContext: { type: 'top_rated', media: 'movie', data: responseTopRated },
    nowPlayingCarouselContext: { type: 'now_playing', media: 'movie', data: responseNowPlaying },
  });

  // Create instances of Glide carousels
  new Glide('#popular', carouselConfig).mount();
  new Glide('#top_rated', carouselConfig).mount();
  new Glide('#now_playing', carouselConfig).mount();
};

export default renderMoviesPage;
