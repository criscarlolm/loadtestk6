import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

export class DescriptionPage {
    constructor(page) {
        this.page = page;
        this.waitPage = page;
        this.summaryField = this.page.locator(
            "input[placeholder='State why you need an attorney.']"
        );
        const textInput = randomString(8);
        this.summaryFieldText = `Load Browser Test Summary ${textInput}`;
        this.descriptionField = this.page.locator('#fieldDescription');
        this.descriptionFieldText = `Load Browser Test Description ${textInput}`;
        this.verifyDescription = this.page.locator('#title-bar');
        this.nextButton = this.page.locator("//button[@data-aut='ci_submit-btn']");
    }

    async fillDescription() {
        await this.summaryField.type(this.summaryFieldText);
        await this.descriptionField.type(this.descriptionFieldText);
        await this.nextButton.click();
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 })
        ]);
        await this.waitPage.waitForTimeout(5000);
        await check(this.verifyDescription, {
            'Description': async (lo) =>
                (await lo.textContent()) === 'Save Your Case'
        });

        console.log('Fill in Description');
        
    }
}
