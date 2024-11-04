import { sleep } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import { browser } from 'k6/browser';
import { SearchAttorneyPage } from '../../pages/CasePosting/SearchAttorneyPage.js';
import { SubCategoryPage } from '../../pages/CasePosting/SubCategoryPage.js';
import { IssueSpecificQuestionsPage } from '../../pages/CasePosting/IssueSpecificQuestionsPage.js';
import { DescriptionPage } from '../../pages/CasePosting/DescriptionPage.js';
import { SaveCasePage } from '../../pages/CasePosting/SaveYourCasePage.js';
import { CostEstimatePage } from '../../pages/CasePosting/CostEstimatePage.js';

import { perVUiterations } from '../../common/scenarios.js';

export let options = perVUiterations();

export default async function () {
    const page = await browser.newPage();

    page.setViewportSize({ width: 1366, height: 768 });

    // Instantiate page objects
    const searchAttorney = new SearchAttorneyPage(page);
    const subCategory = new SubCategoryPage(page);
    const issueQuestions = new IssueSpecificQuestionsPage(page);
    const description = new DescriptionPage(page);
    const saveCase = new SaveCasePage(page);
    const costEstimate = new CostEstimatePage(page);

    try {
        // Navigate to Home page
        await searchAttorney.visit();
        await searchAttorney.homePageCheckVerification();

        // Select Category
        await searchAttorney.searchForAttorney();

        // Select Sub Category
        await subCategory.selectSubCategory();

        // Issue-Specific Questions
        await issueQuestions.clickNextButton();

        // Description
        await description.fillDescription();

        // Save Your Case
        await saveCase.fillCaseDetails();

        // Cost Estimate

        await costEstimate.completeCostEstimate();

        sleep(10);
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
