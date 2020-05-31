import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselConfig } from '../utilis/carousel';
import homeTemplate from '../templates/homeTemplate.handlebars';

const renderHomePage = async () => {
  const el = document.querySelector('#app');
  el.innerHTML = '';
  // Set the page title
  const pageTitle = 'Filmeo - home page';
  if (document.title !== pageTitle) document.title = pageTitle;

  const queryTrending = 'trending/movie/week';
  const queryNowPlayingMovies = 'movie/now_playing';
  const queryNowPlayingTv = 'tv/on_the_air';

  const resultsTrending = await apiCall(queryTrending);
  const trendingMoviesIdList = resultsTrending.results.slice(0, 4).map((movie) => {
    return movie;
  });
  const movies = await Promise.all(
    trendingMoviesIdList.map(async (item) => {
      const queryVideo = `movie/${item.id}/videos`;

      const videosArray = await apiCall(queryVideo);
      item.videoKey = videosArray.results[0].key;
      return item;
    }),
  );
  const responseNowPlayingMovies = await apiCall(queryNowPlayingMovies);
  const responseNowPlayingTv = await apiCall(queryNowPlayingTv);

  const { apiImagesUrl } = resultsTrending;

  el.innerHTML = homeTemplate({
    movies,
    apiImagesUrl,
    nowPlayingMoviesCarouselContext: { type: 'now_playing_movie', media: 'movie', data: responseNowPlayingMovies },
    nowPlayingTvCarouselContext: { type: 'now_playing_tv', media: 'tv', data: responseNowPlayingTv },
  });
  new Glide('#now_playing_movie', carouselConfig).mount();
  new Glide('#now_playing_tv', carouselConfig).mount();
};

export default renderHomePage;
