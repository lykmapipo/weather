import { get as getValue, find, map, toNumber, trim, values } from 'lodash';
import {
  compact,
  isNotValue,
  mergeObjects,
  parseDate,
} from '@lykmapipo/common';

import knownCities from './cities.json';

/**
 * @constant CITIES
 * @name CITIES
 * @description Well known cities for weather forecasts
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @private
 * @ignore
 */
export const CITIES = map(knownCities, (knownCity) => {
  // obtain and normalize city data
  const country = getValue(knownCity, 'Country');
  const city = getValue(knownCity, 'City');
  const cityId = toNumber(getValue(knownCity, 'CityId'));

  // compact and return city data
  return mergeObjects({ country, city, cityId });
});

/**
 * @constant DEFAULT_REQUEST_HEADERS
 * @name DEFAULT_REQUEST_HEADERS
 * @description Default http request headers
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @private
 * @ignore
 */
export const DEFAULT_REQUEST_HEADERS = {
  accept: 'application/json',
  'content-type': 'application/json',
  'user-agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
};

/**
 * @function findCity
 * @name findCity
 * @description Find cities details
 * @param {object} optns Valid lookup options
 * @param {object} optns.name Valid city name
 * @returns {object|undefined} found city or undefined
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * findCity({ name : 'Dar Es Salaam' });
 * // => { Country: 'United Republic of Tanzania', CityId: '252', ... }
 */
export const findCity = (optns) => {
  // ensure options
  const { name } = mergeObjects(optns);

  // ignore
  if (isNotValue(name)) {
    return undefined;
  }

  // lookup given city from well known cities
  const cityName = trim(name);
  const foundCity = find(CITIES, ({ city, cityId }) => {
    return (
      String(city) === String(cityName) || String(cityId) === String(cityName)
    );
  });

  // return found city
  return foundCity;
};

/**
 * @function normalizePresentForecast
 * @name normalizePresentForecast
 * @description Normalize present city forecast
 * @param {object} forecast Valid present forecast
 * @param {object} city Valid city details
 * @returns {object} normalize present city forecast
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const forecast = { present: { '193': { cityId: 252, ... } } };
 * const city = { cityId: 252, ... };
 * normalizePresentForecast(forecast, city);
 * // =>
 */
export const normalizePresentForecast = (forecast, city) => {
  // collect found present forecast
  const { present } = mergeObjects(forecast);
  const presentForecasts = compact([].concat(values(present)));

  // ensure present city
  const presentCity = mergeObjects(city);

  // find city present forecast
  let presentForecast = find(presentForecasts, (cityForecast) => {
    return String(cityForecast.cityId) === String(presentCity.cityId);
  });

  // normalize & convert
  presentForecast = mergeObjects(city, {
    date: parseDate(getValue(presentForecast, 'issue'), 'YYYYMMDDHH'),
    weather: getValue(presentForecast, 'wxdesc'),
    temperature: toNumber(getValue(presentForecast, 'temp')), //= > °C
    relativeHumidity: toNumber(getValue(presentForecast, 'rh')),
    windDirection: getValue(presentForecast, 'wd'),
    windSpeed: (toNumber(getValue(presentForecast, 'ws')) * 18) / 5, //= > km/h
    sunRiseAt: getValue(presentForecast, 'sunrise'),
    sunSetAt: getValue(presentForecast, 'sunset'),
    moonRiseAt: getValue(presentForecast, 'moonrise'),
    moonSetAt: getValue(presentForecast, 'moonset'),
    present: true,
  });

  // return given city present forecast
  return presentForecast;
};
