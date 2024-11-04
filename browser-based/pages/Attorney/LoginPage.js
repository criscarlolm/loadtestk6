import { sleep } from 'k6';
import { data } from '../../data/data.js';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginLink = page.locator('.header__nav-item.top-menu__item.header__nav-item');
        this.userField = page.locator("//input[@id='userName']");
        this.passField = page.locator("//input[@id='password']");
        this.logInButton = page.locator('input[value="Log In"]');
    }

    async clickLogIn() {
        await this.loginLink.click();
    }

    async logInForm() {
        const { username, password } = data;
        sleep(3);
        this.userField.type(username);
        this.passField.type(password);
        sleep(3);
        await this.logInButton.click();
        sleep(10);
    }
}
