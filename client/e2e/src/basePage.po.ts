import { browser, by, element, protractor } from 'protractor';

export class BasePage {
    navigate(url: string) {
        return browser.get(browser.baseUrl + url) as Promise<any>;
    }

    getText(dataTestId: string) {
        // const el =  element(by.css(dataTestId))
        // let text
        // browser.wait(protractor.ExpectedConditions.presenceOf(el), 10000)
        //     .then(() => {
        //         text = el.getText()
        //         // elementToClick.click();
        //     })
        // return text
        return element(by.css(dataTestId)).getText() as Promise<string>;
    }

    wait(seconds: number) {
        // r browser.wait(() => element(by.css('[data-test-id="does not exist"]')), seconds * 1000, 'Server should start within 5 seconds');
        const el = element(by.css('[data-test-id="does not exist"]'))
        return browser.wait(protractor.ExpectedConditions.elementToBeClickable(el), seconds * 1000)

    }

    getURL() {
        return browser.getCurrentUrl();
    }

    clickButton(dataTestId: string) {
        const elementToClick = element(by.css(dataTestId))

        browser.wait(protractor.ExpectedConditions.elementToBeClickable(elementToClick), 10000)
            .then(() => {
                elementToClick.click();
            })
    }

    getElement(dataTestId){
        return element(by.css(dataTestId))
    }
}