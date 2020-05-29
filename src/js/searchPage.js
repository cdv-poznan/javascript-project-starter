import shave from 'shave';
import apiCall from './apiCall';

const searchTemplate = require('../templates/searchTemplate.handlebars');

const el = document.querySelector('#app');
const renderSearchPage = async (query) => {
  const querySearch = `search/multi/`;
  const resultsSearch = await apiCall(querySearch, null, query);

  const movies = resultsSearch.results.filter((result) => {
    return result.media_type === 'movie';
  });
  const tv = resultsSearch.results.filter((result) => {
    return result.media_type === 'tv';
  });
  const people = resultsSearch.results.filter((result) => {
    return result.media_type === 'person';
  });

  const { apiImagesUrl } = resultsSearch;

  const pageTitle = query + ' - Filmeo';
  if (document.title !== pageTitle) {
    document.title = pageTitle;
  }
  el.innerHTML = searchTemplate({ movies, tv, people, query, apiImagesUrl });

  const mq = window.matchMedia('(max-width: 576px)');
  const maxHeight = mq.matches ? 50 : 150;

  shave('.search__overview', maxHeight);
};

export default renderSearchPage;
