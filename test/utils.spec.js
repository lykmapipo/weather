import { mergeObjects } from '@lykmapipo/common';
import { expect } from '@lykmapipo/test-helpers';

import {
  DEFAULT_REQUEST_HEADERS,
  findCity,
  normalizePresentForecast,
} from '../src/utils';

import presentCity from './fixtures/city.json';
import presentForecast from './fixtures/present.json';

describe('utils', () => {
  it('should provide default request headers', () => {
    expect(DEFAULT_REQUEST_HEADERS).to.be.eql({
      accept: 'application/json',
      'content-type': 'application/json',
      'user-agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
    });
  });

  it('should lookup cities information', () => {
    expect(findCity()).to.be.undefined;
    expect(findCity({})).to.be.undefined;
    expect(findCity({ name: '' })).to.be.undefined;
    expect(findCity({ name: null })).to.be.undefined;
    expect(findCity({ name: undefined })).to.be.undefined;
    expect(findCity({ name: 'Unknown' })).to.be.undefined;
    expect(findCity({ name: 'Dar Es Salaam' })).to.be.exist.and.be.an('object');
    expect(findCity({ name: '252' })).to.be.exist.and.be.an('object');
    expect(findCity({ name: 252 })).to.be.exist.and.be.an('object');
    expect(findCity({ name: 'Dar Es Salaam' })).to.be.eql(
      findCity({ name: '252' })
    );
    expect(findCity({ name: 'Dar Es Salaam' })).to.be.eql(
      findCity({ name: 252 })
    );
  });

  it('should normalize present city forecats', () => {
    const city = mergeObjects(presentCity);
    const forecast = mergeObjects(presentForecast);

    const normalizedForecast = normalizePresentForecast(forecast, city);
    expect(normalizedForecast).to.exist.and.be.an('object');
    expect(normalizedForecast.country).to.exist.and.be.a('string');
    expect(normalizedForecast.city).to.exist.and.be.a('string');
    expect(normalizedForecast.cityId).to.exist.and.be.a('number');
    expect(normalizedForecast.date).to.exist.and.be.a('date');
    expect(normalizedForecast.weather).to.exist.and.be.a('string');
    expect(normalizedForecast.temperature).to.exist.and.be.a('number');
    expect(normalizedForecast.relativeHumidity).to.exist.and.be.a('number');
    // expect(normalizedForecast.pressure).to.exist.and.be.a('number');
    expect(normalizedForecast.windDirection).to.exist.and.be.a('string');
    expect(normalizedForecast.windSpeed).to.exist.and.be.a('number');
    expect(normalizedForecast.sunRiseAt).to.exist.and.be.a('string');
    expect(normalizedForecast.sunSetAt).to.exist.and.be.a('string');
    // expect(normalizedForecast.moonRiseAt).to.exist.and.be.a('string');
    // expect(normalizedForecast.moonSetAt).to.exist.and.be.a('string');
    expect(normalizedForecast.present).to.be.true;
  });
});
