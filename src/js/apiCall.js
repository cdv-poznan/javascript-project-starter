import { config } from '../apiConfig';

const { apiKey, apiUrl, apiImagesUrl } = config;

const apiCall = async (query, region) => {
  const regionQuery = region ? `&region=${region}` : '';
  const response = await fetch(`${apiUrl}/${query}?api_key=${apiKey}&language=en-US${regionQuery}`);
  const responseJson = await response.json();
  const data = { ...responseJson, apiImagesUrl };
  return data;
};

export default apiCall;
