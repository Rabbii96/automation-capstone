const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailInput = '#Email';
        this.passwordInput = '#Password';
        this.loginButton = 'button[type="submit"]:has-text("Log in")';
        this.rememberMeCheckbox = '#RememberMe';
        this.loginLink = '.ico-login';
        this.myAccountLink = '.ico-account';
        this.logoutLink = '.ico-logout';
        this.errorMessage = '.message-error';
        this.validationSummary = '.validation-summary-errors';
    }

    async navigateToLogin() {
        await this.page.click(this.loginLink);
        await this.waitForNavigation();
    }

    async login(email, password, rememberMe = false) {
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        
        if (rememberMe) {
            await this.page.check(this.rememberMeCheckbox);
        }
        
        await this.page.click(this.loginButton);
        await this.waitForNavigation();
    }

    async isLoggedIn() {
        try {
            await this.page.waitForSelector(this.myAccountLink, { timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async logout() {
        await this.page.click(this.logoutLink);
        await this.waitForNavigation();
    }

    async getErrorMessage() {
        try {
            const errorElement = await this.page.locator(this.errorMessage).first();
            return await errorElement.textContent();
        } catch {
            return null;
        }
    }

    async getValidationErrors() {
        try {
            const validationElement = await this.page.locator(this.validationSummary);
            return await validationElement.textContent();
        } catch {
            return null;
        }
    }
}

module.exports = { LoginPage };
