import { createReadStream } from 'fs';
import { expect, nock } from '@lykmapipo/test-helpers';

import {
  fetchPresentForecast,
  fetchWeekForecasts,
  fetchForecasts,
} from '../src';

const BASE_URL = 'https://worldweather.wmo.int/en/json';

describe('weather', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should fetch present forecast', (done) => {
    nock(BASE_URL)
      .get('/present.json')
      .query(true)
      .reply(200, function onReply() {
        expect(this.req.headers).to.exist;
        return createReadStream(`${__dirname}/fixtures/present.json`);
      });

    fetchPresentForecast({ city: 'Dar Es Salaam' })
      .then((forecast) => {
        expect(forecast).to.exist.and.be.an('object');
        // expect(forecast.country).to.exist.and.be.a('string');
        expect(forecast.city).to.exist.and.be.a('string');
        expect(forecast.cityId).to.exist.and.be.a('number');
        expect(forecast.date).to.exist.and.be.a('date');
        expect(forecast.issuedAt).to.exist.and.be.a('date');
        expect(forecast.weather).to.exist.and.be.a('string');
        expect(forecast.temperature).to.exist.and.be.a('number');
        expect(forecast.relativeHumidity).to.exist.and.be.a('number');
        // expect(forecast.pressure).to.exist.and.be.a('number');
        expect(forecast.windDirection).to.exist.and.be.a('string');
        expect(forecast.windSpeed).to.exist.and.be.a('number');
        expect(forecast.sunRiseAt).to.exist.and.be.a('string');
        expect(forecast.sunSetAt).to.exist.and.be.a('string');
        // expect(forecast.moonRiseAt).to.exist.and.be.a('string');
        // expect(forecast.moonSetAt).to.exist.and.be.a('string');
        expect(forecast.present).to.be.true;
        done(null, forecast);
      })
      .catch((error) => {
        expect(error).to.not.exist;
        done(error);
      });
  });

  it('should handle error when fetch present forecast', (done) => {
    nock(BASE_URL)
      .get('/present.json')
      .query(true)
      .reply(200, function onReply() {
        expect(this.req.headers).to.exist;
        return createReadStream(`${__dirname}/fixtures/present.json`);
      });

    fetchPresentForecast({ city: 'Dar' }).catch((error) => {
      expect(error).to.exist;
      expect(error.message).to.be.equal('Unknown City');
      done();
    });
  });

  it('should fetch week forecasts', (done) => {
    nock(BASE_URL)
      .get('/252_en.json')
      .query(true)
      .reply(200, function onReply() {
        expect(this.req.headers).to.exist;
        return createReadStream(`${__dirname}/fixtures/252_en.json`);
      });

    fetchWeekForecasts({ city: 'Dar Es Salaam' })
      .then((forecasts) => {
        expect(forecasts).to.exist.and.be.an('array');
        expect(forecasts[0]).to.exist.and.be.an('object');
        // expect(forecasts[0].country).to.exist.and.be.a('string');
        expect(forecasts[0].city).to.exist.and.be.a('string');
        expect(forecasts[0].cityId).to.exist.and.be.a('number');
        expect(forecasts[0].date).to.exist.and.be.a('date');
        expect(forecasts[0].issuedAt).to.exist.and.be.a('date');
        expect(forecasts[0].weather).to.exist.and.be.a('string');
        // expect(forecasts[0].temperature).to.exist.and.be.a('number');
        // expect(forecasts[0].relativeHumidity).to.exist.and.be.a('number');
        // expect(forecasts[0].pressure).to.exist.and.be.a('number');
        // expect(forecasts[0].windDirection).to.exist.and.be.a('string');
        // expect(forecasts[0].windSpeed).to.exist.and.be.a('number');
        // expect(forecasts[0].sunRiseAt).to.exist.and.be.a('string');
        // expect(forecasts[0].sunSetAt).to.exist.and.be.a('string');
        // expect(forecasts[0].moonRiseAt).to.exist.and.be.a('string');
        // expect(forecasts[0].moonSetAt).to.exist.and.be.a('string');
        expect(forecasts[0].present).to.be.false;
        done(null, forecasts);
      })
      .catch((error) => {
        expect(error).to.not.exist;
        done(error);
      });
  });

  it('should handle error when fetch week forecasts', (done) => {
    nock(BASE_URL)
      .get('/252_en.json')
      .query(true)
      .reply(200, function onReply() {
        expect(this.req.headers).to.exist;
        return createReadStream(`${__dirname}/fixtures/252_en.json`);
      });

    fetchWeekForecasts({ city: 'Dar' }).catch((error) => {
      expect(error).to.exist;
      expect(error.message).to.be.equal('Unknown City');
      done();
    });
  });

  it('should handle error when fetch forecasts', (done) => {
    nock(BASE_URL)
      .get('/present.json')
      .query(true)
      .reply(200, function onReply() {
        expect(this.req.headers).to.exist;
        return createReadStream(`${__dirname}/fixtures/present.json`);
      });

    nock(BASE_URL)
      .get('/252_en.json')
      .query(true)
      .reply(200, function onReply() {
        expect(this.req.headers).to.exist;
        return createReadStream(`${__dirname}/fixtures/252_en.json`);
      });

    fetchForecasts({ city: 'Dar Es Salaam' })
      .then((forecasts) => {
        expect(forecasts).to.exist.and.be.an('array');
        expect(forecasts[0]).to.exist.and.be.an('object');
        // expect(forecasts[0].country).to.exist.and.be.a('string');
        expect(forecasts[0].city).to.exist.and.be.a('string');
        expect(forecasts[0].cityId).to.exist.and.be.a('number');
        expect(forecasts[0].date).to.exist.and.be.a('date');
        expect(forecasts[0].issuedAt).to.exist.and.be.a('date');
        expect(forecasts[0].weather).to.exist.and.be.a('string');
        // expect(forecasts[0].temperature).to.exist.and.be.a('number');
        // expect(forecasts[0].relativeHumidity).to.exist.and.be.a('number');
        // expect(forecasts[0].pressure).to.exist.and.be.a('number');
        // expect(forecasts[0].windDirection).to.exist.and.be.a('string');
        // expect(forecasts[0].windSpeed).to.exist.and.be.a('number');
        // expect(forecasts[0].sunRiseAt).to.exist.and.be.a('string');
        // expect(forecasts[0].sunSetAt).to.exist.and.be.a('string');
        // expect(forecasts[0].moonRiseAt).to.exist.and.be.a('string');
        // expect(forecasts[0].moonSetAt).to.exist.and.be.a('string');
        expect(forecasts[0].present).to.be.true;
        done(null, forecasts);
      })
      .catch((error) => {
        expect(error).to.not.exist;
        done(error);
      });
  });

  it('should fetch forecasts', (done) => {
    nock(BASE_URL)
      .get('/present.json')
      .query(true)
      .reply(200, function onReply() {
        expect(this.req.headers).to.exist;
        return createReadStream(`${__dirname}/fixtures/present.json`);
      });

    nock(BASE_URL)
      .get('/252_en.json')
      .query(true)
      .reply(200, function onReply() {
        expect(this.req.headers).to.exist;
        return createReadStream(`${__dirname}/fixtures/252_en.json`);
      });

    fetchForecasts({ city: 'Dar' }).catch((error) => {
      expect(error).to.exist;
      expect(error.message).to.be.equal('Unknown City');
      done();
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });
});
