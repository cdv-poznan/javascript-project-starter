import Glide from '@glidejs/glide';
import apiCall from './apiCall';
import { carouselConfig } from '../utilis/carousel';
import personTemplate from '../templates/personTemplate.handlebars';

const renderPersonPage = async (app, personId) => {
  // Create paths to API endpoints
  const pathPerson = `person/${personId}`;
  const pathFilmography = pathPerson + '/movie_credits';

  // Calls to The Movie Database API
  const resultsPerson = await apiCall(pathPerson);
  const resultsFilmographyRaw = await apiCall(pathFilmography);

  // Set the page title
  const pageTitle = resultsPerson.name + ' - Filmeo';
  if (document.title !== pageTitle) document.title = pageTitle;

  // Limit the results to 10 movies
  const resultsFilmography = {
    ...resultsFilmographyRaw,
    results: resultsFilmographyRaw.cast.slice(0, 10),
  };
  // Inject templates to the DOM
  app.innerHTML = personTemplate({
    resultsPerson,
    filmographyCarouselContext: {
      media: 'movie',
      type: 'filmography',
      data: resultsFilmography,
    },
  });

  // Create instances of Glide carousels
  new Glide('#filmography', carouselConfig).mount();
};

export default renderPersonPage;
