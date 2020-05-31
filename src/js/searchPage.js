import shave from 'shave';
import apiCall from './apiCall';
import searchTemplate from '../templates/searchTemplate.handlebars';

const renderSearchPage = async (mediaType = 'multi', query, page) => {
  const el = document.querySelector('#app');
  el.innerHTML = '';
  const querySearch = `search/${mediaType}`;
  const decodedQuery = decodeURI(query);
  console.log(query, decodedQuery);
  const resultsSearch = await apiCall(querySearch, null, decodedQuery, page);

  const pageTitle = query + ' - Filmeo';
  if (document.title !== pageTitle) {
    document.title = pageTitle;
  }
  // const pages = [];
  // for (let i = 1; i <= resultsSearch.total_pages; i += 1) {
  //   const isActivePage = page === i;
  //   pages.push({ isActivePage, page: i, nextPage: i + 1, prevPage: i - 1 });
  // }
  // const movies =[];
  // const tv = [];
  // const people = [];
  // const allResults = resultsSearch.results.map((result) => {
  //   switch (result.media_type) {
  //     case 'movie':
  //       {title: name, ...result} = {...result};
  //   }
  // });
  // Filter search result by media type
  const pageNumber = parseInt(page, 10);
  const pagination = {
    isNext: page < resultsSearch.total_pages,
    isPrev: pageNumber !== 1,
    prevPage: pageNumber - 1,
    nextPage: pageNumber + 1,
  };
  const type = {
    movie: mediaType === 'movie',
    tv: mediaType === 'tv',
    person: mediaType === 'person',
    multi: mediaType === 'multi',
  };
  console.log(type);
  // const movies = resultsSearch.results.filter((result) => {
  //   return result.media_type === 'movie';
  // });
  // const tv = resultsSearch.results.filter((result) => {
  //   return result.media_type === 'tv';
  // });
  // const people = resultsSearch.results.filter((result) => {
  //   return result.media_type === 'person';
  // });

  const { apiImagesUrl } = resultsSearch;

  el.innerHTML = searchTemplate({
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
  console.log({
    allResults: resultsSearch.results,
    allResultsLength: resultsSearch.total_results,
    totalPages: resultsSearch.total_pages,
    query,
    querySearch,
    apiImagesUrl,
    pagination,
    type,
    page,
  });

  // Set max height depening on viewport width
  const mq = window.matchMedia('(max-width: 576px)');
  const maxHeight = mq.matches ? 50 : 150;

  // Truncate overview paragraph to fullfill paren element
  shave('.search__overview', maxHeight);
};

export default renderSearchPage;
