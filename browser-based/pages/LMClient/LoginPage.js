export class LoginPage {
    constructor(page) {
        this.page = page;
        this.userNameLocator = this.page.locator('#userName');
        this.passwordLocator = this.page.locator('#password');
        this.username = 'crisqatest01@outlook.com';
        this.password = 'testqacris';
        this.submitButtonLocator = this.page.locator('input[value="Log In"]');
    }

    async fillCredentials() {
        await this.userNameLocator.fill(this.username);
        await this.passwordLocator.fill(this.password);
        console.log('Credentials entered');
    }

    async submit() {
        await this.submitButtonLocator.waitFor();
        console.log('Submit button found');

        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }),
            this.submitButtonLocator.click()
        ]);
    }
}
