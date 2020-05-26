import apiCall from './apiCall';

const movieTemplate = require('../templates/movieTemplate.handlebars');

const el = document.querySelector('#app');
const renderMoviePage = async (movieId) => {
  const query = `movie/${movieId}`;
  const results = await apiCall(query);
  console.log(results);
  el.innerHTML = movieTemplate(results);
};

export default renderMoviePage;
