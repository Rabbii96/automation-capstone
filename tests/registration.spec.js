const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/RegistrationPage');
const registrationData = require('../test-data/registrationData.json');
const TestUtils = require('../utils/TestUtils');

test.describe('User Registration Functionality Tests', () => {
    let registrationPage;

    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await registrationPage.navigate();
        await registrationPage.navigateToRegister();
    });

    test.describe('Pass Cases - Valid Registration Scenarios', () => {
        test('Register new user with valid data', async ({ page }) => {
            const userData = TestUtils.generateTestUser();
            userData.gender = 'male';
            userData.day = '15';
            userData.month = '1';
            userData.year = '1990';
            userData.company = 'Test Company';
            userData.newsletter = true;
            
            await registrationPage.register(userData);
            
            const successMessage = await registrationPage.getSuccessMessage();
            expect(successMessage).toContain('Your registration completed');
            
            await registrationPage.takeScreenshot('successful-registration');
        });

        test('Register user with minimal required data', async ({ page }) => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: TestUtils.generateRandomEmail(),
                password: 'TestPass123',
                confirmPassword: 'TestPass123'
            };
            
            await registrationPage.register(userData);
            
            const successMessage = await registrationPage.getSuccessMessage();
            expect(successMessage).toContain('Your registration completed');
            
            await registrationPage.takeScreenshot('minimal-data-registration');
        });

        test('Register female user with newsletter subscription', async ({ page }) => {
            const userData = TestUtils.generateTestUser();
            userData.gender = 'female';
            userData.newsletter = true;
            userData.company = 'Female Test Company';
            
            await registrationPage.register(userData);
            
            const successMessage = await registrationPage.getSuccessMessage();
            expect(successMessage).toContain('Your registration completed');
            
            await registrationPage.takeScreenshot('female-user-registration');
        });
    });

    test.describe('Fail Cases - Invalid Registration Scenarios', () => {
        test('Register with empty required fields', async ({ page }) => {
            const invalidData = registrationData.invalidRegistrations[0];
            
            await registrationPage.register(invalidData);
            
            const errorMessages = await registrationPage.getErrorMessages();
            expect(errorMessages.length).toBeGreaterThan(0);
            
            await registrationPage.takeScreenshot('empty-fields-registration-error');
        });

        test('Register with invalid email format', async ({ page }) => {
            const userData = TestUtils.generateTestUser();
            userData.email = 'invalid-email-format';
            
            await registrationPage.register(userData);
            
            const errorMessages = await registrationPage.getErrorMessages();
            expect(errorMessages.some(msg => msg.includes('email'))).toBeTruthy();
            
            await registrationPage.takeScreenshot('invalid-email-registration');
        });

        test('Register with password mismatch', async ({ page }) => {
            const userData = TestUtils.generateTestUser();
            userData.confirmPassword = 'DifferentPassword123';
            
            await registrationPage.register(userData);
            
            const errorMessages = await registrationPage.getErrorMessages();
            expect(errorMessages.some(msg => msg.includes('password'))).toBeTruthy();
            
            await registrationPage.takeScreenshot('password-mismatch-registration');
        });

        test('Register with existing email', async ({ page }) => {
            // Use the known test email
            const userData = TestUtils.generateTestUser();
            userData.email = 'frabbif96@gmail.com'; // Existing email
            
            await registrationPage.register(userData);
            
            const errorMessages = await registrationPage.getErrorMessages();
            expect(errorMessages.some(msg => msg.includes('already exists'))).toBeTruthy();
            
            await registrationPage.takeScreenshot('existing-email-registration');
        });

        test('Register with weak password', async ({ page }) => {
            const userData = TestUtils.generateTestUser();
            userData.password = '123';
            userData.confirmPassword = '123';
            
            await registrationPage.register(userData);
            
            const errorMessages = await registrationPage.getErrorMessages();
            expect(errorMessages.length).toBeGreaterThan(0);
            
            await registrationPage.takeScreenshot('weak-password-registration');
        });
    });

    test.describe('Edge Cases - Boundary Testing', () => {
        test('Register with very long names', async ({ page }) => {
            const edgeCase = registrationData.edgeCases[0];
            edgeCase.email = TestUtils.generateRandomEmail();
            
            await registrationPage.register(edgeCase);
            
            // Should either accept or show appropriate validation
            await page.waitForTimeout(3000);
            await registrationPage.takeScreenshot('long-names-registration');
        });

        test('Register with very short valid data', async ({ page }) => {
            const edgeCase = registrationData.edgeCases[1];
            edgeCase.email = TestUtils.generateRandomEmail();
            
            await registrationPage.register(edgeCase);
            
            const successMessage = await registrationPage.getSuccessMessage();
            expect(successMessage).toContain('Your registration completed');
            
            await registrationPage.takeScreenshot('short-data-registration');
        });

        test('Register with special characters in name', async ({ page }) => {
            const userData = TestUtils.generateTestUser();
            userData.firstName = "John-O'Connor";
            userData.lastName = "Smith-Jones";
            
            await registrationPage.register(userData);
            
            // Should handle special characters appropriately
            await page.waitForTimeout(3000);
            await registrationPage.takeScreenshot('special-chars-name-registration');
        });

        test('Register with international characters', async ({ page }) => {
            const userData = TestUtils.generateTestUser();
            userData.firstName = "José";
            userData.lastName = "Müller";
            
            await registrationPage.register(userData);
            
            // Should handle international characters
            await page.waitForTimeout(3000);
            await registrationPage.takeScreenshot('international-chars-registration');
        });

        test('Register with birthday edge dates', async ({ page }) => {
            const userData = TestUtils.generateTestUser();
            userData.day = '29';
            userData.month = '2'; // February
            userData.year = '2000'; // Leap year
            
            await registrationPage.register(userData);
            
            const successMessage = await registrationPage.getSuccessMessage();
            expect(successMessage).toContain('Your registration completed');
            
            await registrationPage.takeScreenshot('leap-year-birthday-registration');
        });
    });
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    }
});
