import { apiKey, apiUrl } from '../apiConfig';

const apiCall = async (query, region, searchQuery, page) => {
  const searchQueryParam = searchQuery ? `&query=${searchQuery}` : '';
  const regionParam = region ? `&region=${region}` : '';
  const pageParam = page ? `&page=${page}` : '';
  const response = await fetch(`${apiUrl}/${query}?api_key=${apiKey}&language=en-US${regionParam}${searchQueryParam}${pageParam}`);
  const data = await response.json();
  return data;
};

export default apiCall;
