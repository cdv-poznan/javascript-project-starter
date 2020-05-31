import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselPeopleConfig, carouselConfig } from '../utilis/carousel';
import tvShowTemplate from '../templates/tvShowTemplate.handlebars';

const renderTvShowPage = async (tvShowId) => {
  const el = document.querySelector('#app');
  el.innerHTML = '';
  const queryTvShow = `tv/${tvShowId}`;
  const queryCrew = queryTvShow + '/credits';
  const querySimilar = queryTvShow + '/similar';

  const resultsTvShow = await apiCall(queryTvShow);

  const pageTitle = resultsTvShow.name + ' - Filmeo';
  if (document.title !== pageTitle) {
    document.title = pageTitle;
  }
  const resultsCrewRaw = await apiCall(queryCrew);
  const resultsCrew = { ...resultsCrewRaw, results: resultsCrewRaw.cast.slice(0, 10) };

  const resultsSimilarRaw = await apiCall(querySimilar);
  const resultsSimilar = { ...resultsSimilarRaw, results: resultsSimilarRaw.results.slice(0, 7) };

  el.innerHTML = tvShowTemplate({
    resultsTvShow,
    castCarouselContext: {
      type: 'cast',
      data: resultsCrew,
    },
    similarCarouselContext: {
      type: 'similar',
      media: 'tv',
      data: resultsSimilar,
    },
  });
  new Glide('#cast', carouselPeopleConfig).mount();
  new Glide('#similar', carouselConfig).mount();
};

export default renderTvShowPage;
