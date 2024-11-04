import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

export class SubCategoryPage {
    constructor(page) {
        this.page = page;
        this.waitPage = page;
        const subCategory = 'Adoptions';
        this.subCategorySelect = this.page.locator(`//label[normalize-space()="${subCategory}"]`);
        this.nextButton = this.page.locator("//button[@data-aut='ci_submit-btn']");
        this.verifySubCategory = this.page.locator('#title-bar');
    }

    async selectSubCategory() {
        await this.subCategorySelect.click();
        await this.nextButton.click();
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 })
        ]);
        await check(this.verifySubCategory, {
            SubCategory: async (lo) => (await lo.textContent()) === 'Issue-Specific Questions'
        });
        console.log('Subcategory selected');
        await this.waitPage.waitForTimeout(5000);
    }
}
