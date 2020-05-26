import { config } from '../apiConfig';

const { apiKey, apiUrl, apiImagesUrl } = config;

const apiCall = async (query) => {
  const response = await fetch(`${apiUrl}/${query}?api_key=${apiKey}&language=en-US`);
  const responseJson = await response.json();
  const data = { ...responseJson, apiImagesUrl };
  return data;
};

export default apiCall;
