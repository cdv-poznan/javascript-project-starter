import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselConfig } from '../utilis/carousel';
import homeTemplate from '../templates/homeTemplate.handlebars';
import { apiImagesUrl } from '../apiConfig';

const renderHomePage = async (app) => {
  // Set the page title
  const pageTitle = 'Filmeo - home page';
  if (document.title !== pageTitle) document.title = pageTitle;

  // Create paths to API endpoints
  const queryTrending = 'trending/movie/week';
  const queryNowPlayingMovies = 'movie/now_playing';
  const queryNowPlayingTv = 'tv/on_the_air';

  // Call to The Movie Database API
  const resultsTrending = await apiCall(queryTrending);

  // Limit the results to 4 movies
  const trendingMoviesList = resultsTrending.results.slice(0, 4).map((movie) => {
    return movie;
  });

  // Based on the previous call results get the video key for each movie
  const movies = await Promise.all(
    trendingMoviesList.map(async (item) => {
      const queryVideo = `movie/${item.id}/videos`;
      const videosArray = await apiCall(queryVideo);

      // Get only the first video key
      item.videoKey = videosArray.results[0].key;
      return item;
    }),
  );

  // Call to The Movie Database API
  const responseNowPlayingMovies = await apiCall(queryNowPlayingMovies);
  const responseNowPlayingTv = await apiCall(queryNowPlayingTv);

  // Inject templates to the DOM
  app.innerHTML = homeTemplate({
    movies,
    apiImagesUrl,
    nowPlayingMoviesCarouselContext: {
      type: 'now_playing_movie',
      media: 'movie',
      results: responseNowPlayingMovies.results,
    },
    nowPlayingTvCarouselContext: {
      type: 'now_playing_tv',
      media: 'tv',
      results: responseNowPlayingTv.results,
    },
  });
  // Create instances of Glide carousels if there are results
  if (responseNowPlayingMovies.results) new Glide('#now_playing_movie', carouselConfig).mount();

  if (responseNowPlayingTv.results) new Glide('#now_playing_tv', carouselConfig).mount();

  // Create instances of Bootstrap carousel
  $('#featured-carousel').carousel();
};

export default renderHomePage;
