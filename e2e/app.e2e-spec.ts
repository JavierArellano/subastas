import { SubastasPage } from './app.po';

describe('subastas App', () => {
  let page: SubastasPage;

  beforeEach(() => {
    page = new SubastasPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
