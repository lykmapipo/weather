import { compact, isNotValue, mergeObjects } from '@lykmapipo/common';
import { get, all } from '@lykmapipo/http-client';

import {
  DEFAULT_REQUEST_HEADERS,
  findCity,
  normalizePresentForecast,
  normalizeWeekForecasts,
} from './utils';

/**
 * @function fetchPresentForecast
 * @name fetchPresentForecast
 * @description Fetch present forecast of a given city
 * @param {object} optns Valid options
 * @param {string} optns.city Valid city name
 * @returns {Promise.<object | Error>} promise resolve with present forecast
 * on success or error on failure.
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const optns = { city : 'Dar Es Salaam' };
 * fetchPresentForecast(optns)
 *   .then(forecast => { ... }) //=> { weather: 'Light Rain', ... }
 *   .catch(error => { ... });
 */
export const fetchPresentForecast = (optns) => {
  // normalize options
  const { city, ...options } = mergeObjects(optns, {
    headers: DEFAULT_REQUEST_HEADERS,
  });

  // find city
  const presentCity = findCity({ name: city });
  if (isNotValue(presentCity)) {
    return Promise.reject(Error('Unknown City'));
  }

  // derive city present forecast url
  const url = 'https://worldweather.wmo.int/en/json/present.json';

  // request city present forecasts
  return get(url, options).then((forecast) => {
    // normalize given city present forecast
    const presentCityForecast = normalizePresentForecast(forecast, presentCity);

    // return given city present forecast
    return presentCityForecast;
  });
};

/**
 * @function fetchWeekForecasts
 * @name fetchWeekForecasts
 * @description Fetch week forecasts of a given city
 * @param {object} optns Valid options
 * @param {string} optns.city Valid city name
 * @returns {Promise.<object[] | Error>} promise resolve with week forecasts on success
 * or error on failure.
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const optns = { city : 'Dar Es Salaam' };
 * fetchWeekForecasts(optns)
 *   .then(forecasts => { ... }) //=> [{ weather: 'Light Rain', ... }, ... ]
 *   .catch(error => { ... });
 */
export const fetchWeekForecasts = (optns) => {
  // normalize options
  const { city, ...options } = mergeObjects(optns, {
    headers: DEFAULT_REQUEST_HEADERS,
  });

  // find city
  const presentCity = findCity({ name: city });
  if (isNotValue(presentCity)) {
    return Promise.reject(Error('Unknown City'));
  }

  // derive city week forecast url
  const { cityId } = presentCity;
  const url = `https://worldweather.wmo.int/en/json/${cityId}_en.json`;

  // request city week forecasts
  return get(url, options).then((forecasts) => {
    // normalize given city week forecasts
    const weekForecasts = normalizeWeekForecasts(forecasts, presentCity);

    // return given city week forecast
    return weekForecasts;
  });
};

/**
 * @function fetchForecasts
 * @name fetchForecasts
 * @description Fetch present and week forecasts of a given city
 * @param {object} optns Valid options
 * @param {string} optns.city Valid city name
 * @returns {Promise.<object[] | Error>} promise resolve with forecasts on success
 * or error on failure.
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const optns = { city : 'Dar Es Salaam' };
 * fetchForecasts(optns)
 *   .then(forecasts => { ... }) //=> [{ weather: 'Light Rain', ... }, ... ]
 *   .catch(error => { ... });
 */
export const fetchForecasts = (optns) => {
  // prepare tasks
  const fetchPresent = fetchPresentForecast(optns);
  const fetchWeek = fetchWeekForecasts(optns);

  // request present & week forecasts
  return all(fetchPresent, fetchWeek).then(
    ([presentForecast, weekForecasts]) => {
      return compact([presentForecast, ...weekForecasts]);
    }
  );
};
