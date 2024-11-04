import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
export class CostEstimatePage {
    constructor(page) {
        this.page = page;
        this.legalFeeRadioButton = this.page.locator('input[value="1"]');
        this.paymentTypeCashRadioButton = this.page.locator("input[value='estPaymentTypeCash']");
        this.nextButton = this.page.locator("//button[@data-aut='ci_submit-btn']");
        this.verifyCostEstimate = this.page.locator('h1:nth-child(1)');
    }

    async completeCostEstimate() {
        await this.legalFeeRadioButton.click();
        await this.paymentTypeCashRadioButton.click();
        this.nextButton.click();
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 })
        ]);
        await this.page.waitForTimeout(10000);
        await this.page.screenshot({ path: 'screenshot/casePosted.png' });
        await check(this.verifyCostEstimate, {
            'Case should be posted!': async (lo) =>
                (await lo.innerText()) === "Congratulations, You've Been Matched!"
        });
        console.log('Cost estimate completed and Case posted!');
    }
}
