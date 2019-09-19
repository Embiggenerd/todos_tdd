import { BasePage } from './basePage.po'

export class TodosPage extends BasePage {
    navigateTo() {
        return this.navigate('todos')
    }


    // addUserCookie(){
    //     return this.addCookie()
    // }
}