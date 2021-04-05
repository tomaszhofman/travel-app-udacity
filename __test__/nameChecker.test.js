import { checkForName } from '../src/client/js/nameChecker';

describe('testing a valid url', () => {
  test('testing checkForUrl', () => {
    expect(
      checkForName('https://en.wikipedia.org/wiki/Hansel_and_Gretel')
    ).toBe(true);
  });
  test('testing checkForUrl', () => {
    expect(
      checkForName('https://www.shortkidstories.com/story/pandora-boxed/')
    ).toBe(true);
  });
  test('testing checkForUrl', () => {
    expect(
      checkForName(
        'www.nytimes.com/2021/02/20/opinion/sunday/picture-books-reading.html'
      )
    ).toBe(false);
  });
  test('testing checkForUrl', () => {
    expect(
      checkForName(
        'nytimes.com/2021/02/20/opinion/sunday/picture-books-reading.html'
      )
    ).toBe(false);
  });
  test('testing checkForUrl', () => {
    expect(checkForName('bad url')).toBe(false);
  });
});
