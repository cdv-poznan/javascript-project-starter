import Glide from '@glidejs/glide';
import apiCall from './apiCall';

const personTemplate = require('../templates/personTemplate.handlebars');

const el = document.querySelector('#app');
const renderPersonPage = async (personId) => {
  const queryPerson = `person/${personId}`;
  const queryFilmography = queryPerson + '/movie_credits';

  const resultsPerson = await apiCall(queryPerson);

  const resultsFilmographyRaw = await apiCall(queryFilmography);
  const resultsFilmography = {
    ...resultsFilmographyRaw,
    results: resultsFilmographyRaw.cast.slice(0, 10),
    total_results: resultsFilmographyRaw.cast.length,
  };

  el.innerHTML = personTemplate({
    resultsPerson,
    filmographyCarouselContext: {
      type: 'filmography',
      data: resultsFilmography,
    },
  });
  new Glide('#filmography', {
    type: 'carousel',
    perView: 5,
    gap: 30,
    autoheight: true,
    breakpoints: {
      992: {
        perView: 4,
      },
      768: {
        perView: 3,
      },
      576: {
        perView: 2,
      },
    },
  }).mount();
};

export default renderPersonPage;
