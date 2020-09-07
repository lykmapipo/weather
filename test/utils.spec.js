import { expect } from '@lykmapipo/test-helpers';

import { DEFAULT_REQUEST_HEADERS, findCity, wwisLinkFor } from '../src/utils';

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
    expect(findCity({ name: 'Dar Es Salaam' })).to.be.eql(
      findCity({ name: '252' })
    );
  });

  it('should generate wwis link for a given city', () => {
    expect(wwisLinkFor()).to.be.undefined;
    expect(wwisLinkFor({})).to.be.undefined;
    expect(wwisLinkFor({ name: '' })).to.be.undefined;
    expect(wwisLinkFor({ name: null })).to.be.undefined;
    expect(wwisLinkFor({ name: undefined })).to.be.undefined;
    expect(wwisLinkFor({ name: 'Unknown' })).to.be.undefined;
    expect(wwisLinkFor({ name: 'Dar Es Salaam' })).to.be.exist.and.be.an(
      'string'
    );
    expect(wwisLinkFor({ name: '252' })).to.be.exist.and.be.an('string');
    expect(wwisLinkFor({ name: 'Dar Es Salaam' })).to.be.eql(
      wwisLinkFor({ name: '252' })
    );
  });
});
