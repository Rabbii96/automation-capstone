const { BasePage } = require('./BasePage');

class RegistrationPage extends BasePage {
    constructor(page) {
        super(page);
        this.registerLink = '.ico-register';
        this.firstNameInput = '#FirstName';
        this.lastNameInput = '#LastName';
        this.emailInput = '#Email';
        this.passwordInput = '#Password';
        this.confirmPasswordInput = '#ConfirmPassword';
        this.registerButton = '#register-button';
        this.genderMaleRadio = '#gender-male';
        this.genderFemaleRadio = '#gender-female';
        this.dayDropdown = 'select[name="DateOfBirthDay"]';
        this.monthDropdown = 'select[name="DateOfBirthMonth"]';
        this.yearDropdown = 'select[name="DateOfBirthYear"]';
        this.companyInput = '#Company';
        this.newsletterCheckbox = '#Newsletter';
        this.successMessage = '.result';
        this.errorMessages = '.field-validation-error';
        this.continueButton = '.register-continue-button';
    }

    async navigateToRegister() {
        await this.page.click(this.registerLink);
        await this.waitForNavigation();
    }

    async register(userData) {
        if (userData.gender === 'male') {
            await this.page.check(this.genderMaleRadio);
        } else if (userData.gender === 'female') {
            await this.page.check(this.genderFemaleRadio);
        }

        await this.page.fill(this.firstNameInput, userData.firstName);
        await this.page.fill(this.lastNameInput, userData.lastName);
        
        if (userData.day) {
            await this.page.selectOption(this.dayDropdown, userData.day);
        }
        if (userData.month) {
            await this.page.selectOption(this.monthDropdown, userData.month);
        }
        if (userData.year) {
            await this.page.selectOption(this.yearDropdown, userData.year);
        }

        await this.page.fill(this.emailInput, userData.email);
        
        if (userData.company) {
            await this.page.fill(this.companyInput, userData.company);
        }

        if (userData.newsletter) {
            await this.page.check(this.newsletterCheckbox);
        }

        await this.page.fill(this.passwordInput, userData.password);
        await this.page.fill(this.confirmPasswordInput, userData.confirmPassword);
        
        await this.page.click(this.registerButton);
        await this.waitForNavigation();
    }

    async getSuccessMessage() {
        try {
            await this.page.waitForSelector(this.successMessage, { timeout: 10000 });
            return await this.page.textContent(this.successMessage);
        } catch {
            return null;
        }
    }

    async getErrorMessages() {
        try {
            const errors = await this.page.locator(this.errorMessages).allTextContents();
            return errors;
        } catch {
            return [];
        }
    }

    async clickContinue() {
        await this.page.click(this.continueButton);
        await this.waitForNavigation();
    }
}

module.exports = { RegistrationPage };
