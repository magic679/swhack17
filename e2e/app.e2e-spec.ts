import { Swhack17Page } from './app.po';

describe('swhack17 App', function() {
  let page: Swhack17Page;

  beforeEach(() => {
    page = new Swhack17Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
