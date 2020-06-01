import shave from 'shave';
import apiCall from './apiCall';
import searchTemplate from '../templates/searchTemplate.handlebars';

const renderSearchPage = async (app, mediaType = 'multi', query, page) => {
  // Create paths to API endpoints
  const pathSearch = `search/${mediaType}`;

  // Calls to The Movie Database API
  const resultsSearch = await apiCall(pathSearch, null, query, page);

  // Set the page title
  const pageTitle = query + ' - Filmeo';
  if (document.title !== pageTitle) {
    document.title = pageTitle;
  }

  // Type conversion from string to the number
  const pageNumber = parseInt(page, 10);

  // Used in the template to handle pagination
  const pagination = {
    isNext: page < resultsSearch.total_pages,
    isPrev: pageNumber !== 1,
    prevPage: pageNumber - 1,
    nextPage: pageNumber + 1,
  };

  // Used in the template to filter search result by current media type
  const type = {
    movie: mediaType === 'movie',
    tv: mediaType === 'tv',
    person: mediaType === 'person',
    multi: mediaType === 'multi',
  };

  const { apiImagesUrl } = resultsSearch;

  // Inject templates to the DOM
  app.innerHTML = searchTemplate({
    allResults: resultsSearch.results,
    allResultsLength: resultsSearch.total_results,
    totalPages: resultsSearch.total_pages,
    query,
    mediaType,
    apiImagesUrl,
    pagination,
    type,
    page,
  });

  // Set max height of text box depening on the viewport width
  const mq = window.matchMedia('(max-width: 576px)');
  const maxHeight = mq.matches ? 50 : 150;

  // Truncate overview paragraph to fullfill the parent element
  shave('.search__overview', maxHeight);
};

export default renderSearchPage;
