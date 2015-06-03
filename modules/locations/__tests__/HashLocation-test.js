var expect = require('expect');
var HashLocation = require('../HashLocation');

describe('HashLocation.getCurrentPath', function () {
  afterEach(function () {
    window.location.hash = '';
  });

  //this test is needed because Firefox will pre-decode the value retrieved from
  //window.location.hash
  it('returns a properly decoded equivalent of window.location.hash', function () {
    window.location.hash = '';
    expect(HashLocation.getCurrentPath()).toBe('');

    window.location.hash = 'asdf';
    expect(HashLocation.getCurrentPath()).toBe('asdf');

    // + is only special in the query component, not the hash
    window.location.hash = 'test+spaces';
    expect(HashLocation.getCurrentPath()).toBe('test+spaces');

    window.location.hash = 'first%2Fsecond';
    expect(HashLocation.getCurrentPath()).toBe('first%2Fsecond');

    window.location.hash = 'first/second';
    expect(HashLocation.getCurrentPath()).toBe('first/second');

    window.location.hash = 'first%252Fsecond';
    expect(HashLocation.getCurrentPath()).toBe('first%2Fsecond');

    // decodeURI doesn't handle lone percents
    window.location.hash = '%';
    expect(function () {
      HashLocation.getCurrentPath();
    }).toThrow(URIError);

    window.location.hash = '%25';
    expect(HashLocation.getCurrentPath()).toBe('%');

    window.location.hash =
        'complicated+string/full%2Fof%3Fspecial%25chars%2520and%23escapes%E1%88%B4';
    expect(HashLocation.getCurrentPath())
        .toBe('complicated+string/full%2Fof%3Fspecial%chars%20and%23escapesሴ');
  });

});

describe('HashLocation.ensureSlash', function () {
  it('re-encodes the path before replacing it', function() {
      var changeListener = function() {};

      HashLocation.push('no leading slash');

      HashLocation.addChangeListener(changeListener);
      HashLocation.removeChangeListener(changeListener);

      expect(HashLocation.getCurrentPath())
          .toBe('/no leading slash');

      expect(window.location.href.split('#')[1])
          .toBe('/no%20leading%20slash');

  });
});
