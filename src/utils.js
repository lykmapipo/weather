import { find, trim } from 'lodash';
import { isNotValue, mergeObjects } from '@lykmapipo/common';

import cities from './cities.json';

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

  // lookup from city list
  const cityName = trim(name);
  const city = find(cities, ({ City, CityId }) => {
    return City === cityName || CityId === cityName;
  });

  // return found city
  return city;
};
