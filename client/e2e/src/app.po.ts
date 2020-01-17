import { browser, by, element } from 'protractor';
import { BasePage } from './basePage.po'

export class AppPage extends BasePage {
  navigateTo() {
    return this.navigate('')
  } 

  getTitleText() {
    return this.getText('[data-test-id="app-title"]')
  }

  getCurrentURL(){
    return this.getURL()
  }
}
