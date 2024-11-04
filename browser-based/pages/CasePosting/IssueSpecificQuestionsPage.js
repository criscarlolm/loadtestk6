import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

export class IssueSpecificQuestionsPage {
    constructor(page) {
        this.page = page;
        this.waitPage = page;
        this.verifyIssueSpecificQuestions = this.page.locator('#title-bar');
        this.nextButton = this.page.locator("//button[@data-aut='ci_submit-btn']");
    }

    async clickNextButton() {
        await this.nextButton.click();
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 })
        ]);
        await this.waitPage.waitForTimeout(10000);
        await check(this.verifyIssueSpecificQuestions, {
            'Issue Specific Questions': async (lo) => (await lo.textContent()) === 'Description'
        });

        console.log('Issue Specific Questions');
    }
}
