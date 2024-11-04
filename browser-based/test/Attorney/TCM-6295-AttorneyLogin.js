import { browser } from 'k6/browser';
import { LoginAttorneyPage } from '../../pages/Attorney/AttorneyLoginPage.js';
import { perVUiterations } from '../../common/scenarios.js';
import http from 'k6/http';

export let options = perVUiterations();

export default async function () {
    const page = await browser.newPage();
    const loginPage = new LoginAttorneyPage(page);
    const url = `https://${__ENV.DOMAIN}`;

    try {
        // Home Page
        await loginPage.visit();
        await loginPage.clickLogInLink();

        // Login Form
        await loginPage.logInForm();
    } catch (error) {
        console.error('Test failed due to error:', error.message || error);
        console.log('Error stack trace:', error.stack || 'No stack trace available');
    } finally {
        if (page) {
            try {
                await page.close();
                console.log('Page closed successfully');
            } catch (closeError) {
                console.warn('Failed to close the page:', closeError);
            }
        }
    }
    let res = http.get(url);
    http.get(res.url);
}
