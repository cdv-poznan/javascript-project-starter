import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselConfig } from '../utilis/carousel';
import tvShowTemplate from '../templates/tvShowTemplate.handlebars';

const renderTvShowPage = async (tvShowId) => {
  const el = document.querySelector('#app');
  const queryTvShow = `tv/${tvShowId}`;
  const queryCrew = queryTvShow + '/credits';

  const resultsTvShow = await apiCall(queryTvShow);

  const pageTitle = resultsTvShow.title + ' - Filmeo';
  if (document.title !== pageTitle) {
    document.title = pageTitle;
  }
  const resultsCrewRaw = await apiCall(queryCrew);
  const resultsCrew = { ...resultsCrewRaw, results: resultsCrewRaw.cast.slice(0, 10) };

  el.innerHTML = tvShowTemplate({
    resultsTvShow,
    castCarouselContext: {
      type: 'cast',
      data: resultsCrew,
    },
  });
  new Glide('#cast', carouselConfig).mount();
};

export default renderTvShowPage;
