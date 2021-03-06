import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to todos-tdd!');
  });

  it('user gets redirected to login if not authenticated', () => {
    expect(page.getCurrentURL()).toBe('http://localhost:4200/signup')
  })

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   // expect(logs).not.toContain(jasmine.objectContaining({
  //   //   level: logging.Level.SEVERE,
  //   // } as logging.Entry));
  // });
});
