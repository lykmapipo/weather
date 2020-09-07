import { expect } from '@lykmapipo/test-helpers';

import { DEFAULT_REQUEST_HEADERS, findCity } from '../src/utils';

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
  });
});
