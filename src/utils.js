import { get as getValue, find, map, toNumber, trim, values } from 'lodash';
import moment from 'moment';
import {
  compact,
  isNotValue,
  mergeObjects,
  parseDate,
} from '@lykmapipo/common';

import KNOWN_CITIES from './cities.json';

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
export const CITIES = map(KNOWN_CITIES, (knownCity) => {
  // obtain and normalize city data
  const [cityId, city] = knownCity.split(':');

  // compact and return city data
  return mergeObjects({ city, cityId: toNumber(cityId) });
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
 * @function parseTime
 * @name parseTime
 * @description Parse and normalize time string to date
 * @param {Date} date Valid base date
 * @param {string} time Valid time string
 * @param {string} [separator=':'] Time string separator
 * @returns {Date | undefined} normalized date time in UTC
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.3.0
 * @version 0.2.0
 * @static
 * @public
 * @example
 *
 * const date = '2020-09-08T00:00:00.000Z';
 * const time = '06:20';
 * parseTime(date, time);
 * // => '2020-09-07T06:20:00.000Z'
 */
export const parseTime = (date, time, separator = ':') => {
  // ensure date & time
  if (isNotValue(date) || isNotValue(time)) {
    return undefined;
  }

  // create base date moment
  let baseMoment = moment.utc(date);
  if (isNotValue(baseMoment.valueOf())) {
    return undefined;
  }

  // obtain hour and minutes from time string
  const [hours, minutes] = time.split(separator);
  if (isNotValue(hours) || isNotValue(minutes)) {
    return undefined;
  }

  // set hours and minutes to base moment
  baseMoment = baseMoment.hours(hours).minutes(minutes);

  // derive date time
  const derivedDate = isNotValue(baseMoment.valueOf())
    ? undefined
    : baseMoment.toDate();

  // return derived date time
  return derivedDate;
};

/**
 * @function normalizePresentForecast
 * @name normalizePresentForecast
 * @description Normalize present city forecast
 * @param {object} forecast Valid present forecast
 * @param {object} city Valid city details
 * @returns {object} normalized present city forecast
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
 * // => { city: 'Dar Es Salaam', weather: 'Light Rain', ... }
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
  const date = parseDate(getValue(presentForecast, 'issue'), 'YYYYMMDD');
  presentForecast = mergeObjects(presentCity, {
    date,
    issuedAt: parseDate(getValue(presentForecast, 'issue'), 'YYYYMMDDHH'),
    weather: getValue(presentForecast, 'wxdesc'),
    temperature: toNumber(getValue(presentForecast, 'temp')), //= > °C
    relativeHumidity: toNumber(getValue(presentForecast, 'rh')),
    windDirection: getValue(presentForecast, 'wd'),
    windSpeed: (toNumber(getValue(presentForecast, 'ws')) * 18) / 5, //= > km/h
    sunRiseAt: parseTime(date, getValue(presentForecast, 'sunrise')),
    sunSetAt: parseTime(date, getValue(presentForecast, 'sunset')),
    moonRiseAt: parseTime(date, getValue(presentForecast, 'moonrise')),
    moonSetAt: parseTime(date, getValue(presentForecast, 'moonset')),
    present: true,
  });

  // return given city present forecast
  return presentForecast;
};

/**
 * @function normalizeWeekForecasts
 * @name normalizeWeekForecasts
 * @description Normalize present city forecast
 * @param {object} forecasts Valid week forecasts
 * @param {object} city Valid city details
 * @returns {object[]} normalized week city forecast
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const forecast = { city: { forecast: { forecastDay: [ ... ] } } };
 * const city = { cityId: 252, ... };
 * normalizeWeekForecasts(forecast, city);
 * // => [{ city: 'Dar Es Salaam', weather: 'Light Rain', ... }, ... ]
 */
export const normalizeWeekForecasts = (forecasts, city) => {
  // collect found week forecasts
  const {
    city: {
      forecast: { issueDate, forecastDay },
    },
  } = mergeObjects({ forecast: { forecastDay: [] } }, forecasts);
  const weekForecasts = compact([].concat(forecastDay));

  // ensure present city
  const presentCity = mergeObjects(city);

  // normalize & convert
  const cityWeekForecasts = map(weekForecasts, (forecast) => {
    const date = parseDate(getValue(forecast, 'forecastDate'), 'YYYY-MM-DD');
    return mergeObjects(presentCity, {
      date,
      issuedAt: parseDate(issueDate, 'YYYY-MM-DD HH:mm:ss'),
      weather: getValue(forecast, 'weather'),
      temperature: toNumber(getValue(forecast, 'temp')), //= > °C
      minimumTemperature: toNumber(getValue(forecast, 'minTemp')), //= > °C
      maximumTemperature: toNumber(getValue(forecast, 'maxTemp')), //= > °C
      relativeHumidity: toNumber(getValue(forecast, 'rh')),
      windDirection: getValue(forecast, 'wd'),
      windSpeed: (toNumber(getValue(forecast, 'ws')) * 18) / 5, //= > km/h
      sunRiseAt: parseTime(date, getValue(forecast, 'sunrise')),
      sunSetAt: parseTime(date, getValue(forecast, 'sunset')),
      moonRiseAt: parseTime(date, getValue(forecast, 'moonrise')),
      moonSetAt: parseTime(date, getValue(forecast, 'moonset')),
      present: false,
    });
  });

  // return given city week forecast
  return cityWeekForecasts;
};
