import { find, values } from 'lodash';
import { compact, mergeObjects } from '@lykmapipo/common';
import { get } from '@lykmapipo/http-client';

import { DEFAULT_REQUEST_HEADERS, findCity } from './utils';

/**
 * @function fetchPresentForecast
 * @name fetchPresentForecast
 * @description Fetch present forecast of a given city
 * @param {object} optns Valid options
 * @param {string} optns.city Valid city name
 * @returns {Promise} promise resolve with present forecast on success
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
 * fetchPresentForecast(optns)
 *   .then(forecast => { ... }) //=> [{ weather: 'Light Rain', ... }, ... ]
 *   .catch(error => { ... });
 */
export const fetchPresentForecast = (optns) => {
  // normalize options
  const { city, ...options } = mergeObjects(optns, {
    headers: DEFAULT_REQUEST_HEADERS,
  });

  // find city
  const presentCity = findCity({ name: city });

  // fetch city present forecast
  const url = 'https://worldweather.wmo.int/en/json/present.json';
  return get(url, options).then(({ present = {} }) => {
    // merge found present forecast
    const presentForecasts = compact([].concat(values(present)));
    // find given city present forecast
    const presentCityForecast = find(presentForecasts, (cityForecast) => {
      return String(cityForecast.cityId) === String(presentCity.CityId);
    });

    // TODO: normalize & convert

    // return present forecast
    return presentCityForecast;
  });
};

/**
 * @function fetchWeekForecasts
 * @name fetchWeekForecasts
 * @description Fetch five(5) days forecasts of a given city
 * @param {object} optns Valid options.
 * @param {string} optns.city Valid city name
 * @returns {Promise} promise resolve with forecasts on success
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
  return get(optns);
};
