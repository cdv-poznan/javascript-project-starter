import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselConfig } from '../utilis/carousel';
import overviewTemplate from '../templates/overviewTemplate.handlebars';

const renderTvShowsPage = async () => {
  const queryPopular = 'tv/popular';
  const queryTopRated = 'tv/top_rated';
  const queryNowPlaying = 'tv/on_the_air';

  // Select the spp root element
  const el = document.querySelector('#app');

  // Set the page title
  const pageTitle = 'Filmeo - TV Shows';
  if (document.title !== pageTitle) document.title = pageTitle;

  // Specify a ISO 3166-1 code to filter release dates.
  const region = 'PL';

  // Calls to The Movie Database API
  const responsePopular = await apiCall(queryPopular, region);
  const responseTopRated = await apiCall(queryTopRated, region);
  const responseNowPlaying = await apiCall(queryNowPlaying);

  // Inject templates to the DOM
  el.innerHTML = overviewTemplate({
    popularCarouselContext: { type: 'popular', media: 'tv-show', data: responsePopular },
    topRatedCarouselContext: { type: 'top_rated', media: 'tv-show', data: responseTopRated },
    nowPlayingCarouselContext: { type: 'now_playing', media: 'tv-show', data: responseNowPlaying },
  });

  // Create instances of Glide carousels
  new Glide('#popular', carouselConfig).mount();
  new Glide('#top_rated', carouselConfig).mount();
  new Glide('#now_playing', carouselConfig).mount();
};

export default renderTvShowsPage;
