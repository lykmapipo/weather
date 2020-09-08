import { createReadStream } from 'fs';
import { expect, nock } from '@lykmapipo/test-helpers';

import { fetchPresentForecast } from '../src';

const BASE_URL = 'https://worldweather.wmo.int/en/json';

describe('weather', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should fetch present city forecast', (done) => {
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
        done(null, forecast);
      })
      .catch((error) => {
        expect(error).to.not.exist;
        done(error);
      });
  });

  afterEach(() => {
    nock.cleanAll();
  });
});
