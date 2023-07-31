import { API_KEY } from './constants';

const API_BASE_URL = 'http://api.openweathermap.org/data/2.5';

export const getWeatherDataUrl = (cityId) => {
    return `${API_BASE_URL}/weather?id=${cityId}&appid=${API_KEY}`;
  };