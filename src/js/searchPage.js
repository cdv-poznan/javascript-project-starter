import shave from 'shave';
import apiCall from './apiCall';
import searchTemplate from '../templates/searchTemplate.handlebars';

const renderSearchPage = async (query) => {
  const el = document.querySelector('#app');

  const querySearch = `search/multi`;
  const resultsSearch = await apiCall(querySearch, null, query);

  const pageTitle = query + ' - Filmeo';
  if (document.title !== pageTitle) {
    document.title = pageTitle;
  }

  // Filter search result by media type
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

  el.innerHTML = searchTemplate({ movies, tv, people, query, apiImagesUrl });

  // Set max height depening on viewport width
  const mq = window.matchMedia('(max-width: 576px)');
  const maxHeight = mq.matches ? 50 : 150;

  // Truncate overview paragraph to fullfill paren element
  shave('.search__overview', maxHeight);
};

export default renderSearchPage;
