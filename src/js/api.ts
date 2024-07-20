import { dynamicKeysObject } from './types';

const api = async (
  url = '',
  { body = null, headers = {}, ...customConfig } = {},
) => {
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const config: dynamicKeysObject = {
    method: body ? 'POST' : 'GET',
    body,
    ...customConfig,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };

  if (body) config.body = JSON.stringify(body);

  try {
    const response = await fetch(url, config);
    if (response.ok) {
      const data = await response.json();
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }
    const errorMessage = await response.json();
    throw new Error(`${errorMessage.error} ${errorMessage.statusCode}`);
  } catch (err) {
    return Promise.reject(err);
  }
};

const D_KEY = process.env.D_API;
const D_KEY_2 = process.env.D_API_2;
const UNFL_KEY = process.env.UNFL_API;

const UNFL_SEARCH = process.env.UNFL_API_SEARCH;
const D_URL = process.env.D_API_URL;
const D_PREMIERES = process.env.D_API_PREMIERES;
const PLAYER_URL = process.env.API_PLAYER_URL;

api.getFilms = function films(params = '', key = D_KEY) {
  const parsedParams = new URLSearchParams(params).toString();
  return api(
    `${D_URL}?&notNullFields=name&notNullFields=poster.url&${parsedParams}`,
    {
      headers: { 'X-API-KEY': key },
    },
  );
};

api.getPremiereFilms = function premieres() {
  return api(D_PREMIERES, {
    headers: { 'X-API-KEY': D_KEY_2 },
  });
};

api.getFilm = function film(id: number) {
  return api(`${D_URL}/${id}`, {
    headers: { 'X-API-KEY': D_KEY },
  });
};

api.searchFilm = function searchFilm(params = '') {
  const parsedParams = new URLSearchParams(params).toString();
  return api(`${UNFL_SEARCH}&${parsedParams}`, {
    headers: { 'X-API-KEY': UNFL_KEY },
  });
};

api.getPlayer = function player(params = '') {
  const parsedParams = new URLSearchParams(params).toString();
  return api(`${PLAYER_URL}${parsedParams}`);
};

export default api;
