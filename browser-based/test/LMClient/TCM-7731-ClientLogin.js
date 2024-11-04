import { browser } from 'k6/browser';
import { sleep } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import { HomePage } from '../../pages/LMClient/HomePage.js';
import { LoginPage } from '../../pages/LMClient/LoginPage.js';
import { ClientAccountPage } from '../../pages/LMClient/ClientAccountPage.js';
import { perVUiterations } from '../../common/scenarios.js';

export let options = perVUiterations();
export default async function () {
    const page = await browser.newPage();

    // Instantiate page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const clientAccountPage = new ClientAccountPage(page);

    try {
        await homePage.visit();
        await homePage.verifySubHeader();
        await homePage.clickLogin();

        await loginPage.fillCredentials();
        await loginPage.submit();

        await clientAccountPage.verifyAccountPage();
        await clientAccountPage.verifyMyAccountText();

        sleep(5);
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
}
