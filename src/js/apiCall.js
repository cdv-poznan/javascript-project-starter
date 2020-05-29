import { config } from '../apiConfig';

const { apiKey, apiUrl, apiImagesUrl } = config;

const apiCall = async (query, region, searchQuery) => {
  const searchQueryParam = searchQuery ? `&query=${searchQuery}` : '';
  const regionParam = region ? `&region=${region}` : '';
  const response = await fetch(`${apiUrl}/${query}?api_key=${apiKey}&language=en-US${regionParam}${searchQueryParam}`);
  const responseJson = await response.json();
  const data = { ...responseJson, apiImagesUrl };
  return data;
};

export default apiCall;
