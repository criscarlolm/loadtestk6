import { chromium } from 'k6/experimental/browser';
import { check } from 'k6';
import exec from 'k6/execution';

export const options = {
    scenarios: {
        browser: {
            executor: 'constant-vus',
            exec: 'browser',
            vus: 3,
            duration: '30s'
        }
    }
};

export async function browser() {
    const browser = chromium.launch({ headless: true });
    const page = browser.newPage();

    try {
        await page.goto('https://qa9.legalmatch.com/');

        check(page, {
            'Find the Right Lawyer for Your Legal Issue!': (page) =>
                page.locator("(//a[@class='case-intake-form__header--link'])[1]").isVisible() ===
                true
        });
        check(page, {
            'Hero Banner': (page) => page.locator("(//div[@class='hero '])[1]").isVisible() === true
        });
        check(page, {
            'Top Rated': (page) =>
                page
                    .locator("(//div[@class='w-top-rated w-top-rated--no-location '])[1]")
                    .isVisible() === true
        });

        // Search Attorney
        const category = page.locator("//button[normalize-space()='Choose a Category']");
        await category.click();
        const categoryItem = page.locator(
            "//div[@class='case-intake-form__dropdown-menu dropdown-menu js-case-intake-categories-dropdown is-single-choice']//div[1]"
        );
        await categoryItem.click();

        const zipLoc = page.locator("(//input[@placeholder='ZIP Code or Location'])[1]");
        await zipLoc.type('00001');
        page.waitForTimeout(5000);

        const searchBtn = page.locator(
            "(//button[@class='case-intake-form__field-item case-intake-form__submit case-intake-form__submit--linear-gradient-576dc6-35499c js-intake-form-submit js-sticky-banner-trigger'])[1]"
        );
        await searchBtn.click();
        /*check(page, {
            'Choose a Subcategory': (page) =>
                page.locator("//h1[normalize-space()='Choose a Subcategory:']").isVisible() === true
        });*/
        page.waitForTimeout(10000);
    } finally {
        page.close();
        browser.close();
    }
}

export default function () {
    console.log(`Execution context

Instance info
-------------
Vus active: ${exec.instance.vusActive}
Iterations completed: ${exec.instance.iterationsCompleted}
Iterations interrupted:  ${exec.instance.iterationsInterrupted}
Iterations completed:  ${exec.instance.iterationsCompleted}
Iterations active:  ${exec.instance.vusActive}
Initialized vus:  ${exec.instance.vusInitialized}
Time passed from start of run(ms):  ${exec.instance.currentTestRunDuration}

Scenario info
-------------
Name of the running scenario: ${exec.scenario.name}
Executor type: ${exec.scenario.executor}
Scenario start timestamp: ${exec.scenario.startTime}
Percenatage complete: ${exec.scenario.progress}
Iteration in instance: ${exec.scenario.iterationInInstance}
Iteration in test: ${exec.scenario.iterationInTest}

Test info
---------
All test options: ${exec.test.options}

VU info
-------
Iteration id: ${exec.vu.iterationInInstance}
Iteration in scenario: ${exec.vu.iterationInScenario}
VU ID in instance: ${exec.vu.idInInstance}
VU ID in test: ${exec.vu.idInTest}
VU tags: ${exec.vu.tags}`);
}
