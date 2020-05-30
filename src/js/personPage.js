import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselConfig } from '../utilis/carousel';
import personTemplate from '../templates/personTemplate.handlebars';

const renderPersonPage = async (personId) => {
  const el = document.querySelector('#app');
  const queryPerson = `person/${personId}`;
  const queryFilmography = queryPerson + '/movie_credits';

  const resultsPerson = await apiCall(queryPerson);

  const pageTitle = resultsPerson.name + ' - Filmeo';
  if (document.title !== pageTitle) {
    document.title = pageTitle;
  }

  const resultsFilmographyRaw = await apiCall(queryFilmography);

  const resultsFilmography = {
    ...resultsFilmographyRaw,
    results: resultsFilmographyRaw.cast.slice(0, 10),
  };

  el.innerHTML = personTemplate({
    resultsPerson,
    filmographyCarouselContext: {
      type: 'filmography',
      data: resultsFilmography,
    },
  });

  new Glide('#filmography', carouselConfig).mount();
};

export default renderPersonPage;
