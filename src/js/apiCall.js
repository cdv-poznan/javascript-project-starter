import { config } from '../apiConfig';

const { apiKey, apiUrl, apiImagesUrl } = config;

const apiCall = async (query) => {
  const response = await fetch(`${apiUrl}/${query}?api_key=${apiKey}&language=en-US`);
  const data = await response.json();
  const { results } = await data;
  await results.forEach((el) => {
    el.poster_path = apiImagesUrl + el.poster_path;
  });
  return results;
};

export default apiCall;
