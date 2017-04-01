import { NgTherosPage } from './app.po';

describe('ng-theros App', () => {
  let page: NgTherosPage;

  beforeEach(() => {
    page = new NgTherosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
