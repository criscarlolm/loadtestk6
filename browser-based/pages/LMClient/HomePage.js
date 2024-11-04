import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import http from 'k6/http';

const url = `https://${__ENV.DOMAIN}`;

export class HomePage {
    constructor(page) {
        this.page = page;
        this.waitPage = page;
        this.subHeaderLocator = this.page.locator('.case-intake-form__sub-header');
        this.loginLinkLocator = this.page.locator(
            '.header__nav-item.top-menu__item.header__nav-item'
        );
    }

    async visit() {
        let res = http.get(url);
        await this.page.goto(res.url);
        console.log('Page loaded successfully');
    }

    async verifySubHeader() {
        const subHeaderCheck = await check(this.subHeaderLocator, {
            Homepage: async (lo) => (await lo.textContent()) === ' for Your Legal Issue'
        });

        if (!subHeaderCheck) {
            throw new Error('SubHeader verification failed on HomePage.');
        }
    }

    async clickLogin() {
        await this.loginLinkLocator.waitFor();
        console.log('Login text field found');
        await this.loginLinkLocator.click();
        await this.waitPage.waitForTimeout(5000);
    }
}
