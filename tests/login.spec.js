const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const loginData = require('../test-data/loginData.json');

test.describe('Login Functionality Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.navigateToLogin();
    });

    test.describe('Pass Cases - Valid Login Scenarios', () => {
        test('Valid login with correct credentials', async ({ page }) => {
            const validUser = loginData.validUsers[0];
            
            await loginPage.login(validUser.email, validUser.password);
            
            expect(await loginPage.isLoggedIn()).toBeTruthy();
            await loginPage.takeScreenshot('valid-login-success');
        });

        test('Valid login with Remember Me option', async ({ page }) => {
            const validUser = loginData.validUsers[0];
            
            await loginPage.login(validUser.email, validUser.password, true);
            
            expect(await loginPage.isLoggedIn()).toBeTruthy();
            await loginPage.takeScreenshot('login-remember-me-success');
        });

        test('Logout functionality after valid login', async ({ page }) => {
            const validUser = loginData.validUsers[0];
            
            await loginPage.login(validUser.email, validUser.password);
            expect(await loginPage.isLoggedIn()).toBeTruthy();
            
            await loginPage.logout();
            expect(await loginPage.isLoggedIn()).toBeFalsy();
            await loginPage.takeScreenshot('logout-success');
        });
    });

    test.describe('Fail Cases - Invalid Login Scenarios', () => {
        test('Login with invalid credentials', async ({ page }) => {
            const invalidUser = loginData.invalidUsers[0];
            
            await loginPage.login(invalidUser.email, invalidUser.password);
            
            expect(await loginPage.isLoggedIn()).toBeFalsy();
            
            const errorMessage = await loginPage.getErrorMessage();
            expect(errorMessage).toContain('unsuccessful');
            await loginPage.takeScreenshot('invalid-login-error');
        });

        test('Login with invalid email format', async ({ page }) => {
            const invalidUser = loginData.invalidUsers[1];
            
            await loginPage.login(invalidUser.email, invalidUser.password);
            
            expect(await loginPage.isLoggedIn()).toBeFalsy();
            await loginPage.takeScreenshot('invalid-email-format');
        });

        test('Login with empty credentials', async ({ page }) => {
            const emptyUser = loginData.invalidUsers[2];
            
            await loginPage.login(emptyUser.email, emptyUser.password);
            
            expect(await loginPage.isLoggedIn()).toBeFalsy();
            
            const validationErrors = await loginPage.getValidationErrors();
            expect(validationErrors).toBeTruthy();
            await loginPage.takeScreenshot('empty-credentials-error');
        });
    });

    test.describe('Edge Cases - Boundary Testing', () => {
        test('Login with very long email', async ({ page }) => {
            const edgeCase = loginData.edgeCases[0];
            
            await loginPage.login(edgeCase.email, edgeCase.password);
            
            expect(await loginPage.isLoggedIn()).toBeFalsy();
            await loginPage.takeScreenshot('long-email-test');
        });

        test('Login with very long password', async ({ page }) => {
            const edgeCase = loginData.edgeCases[1];
            
            await loginPage.login(edgeCase.email, edgeCase.password);
            
            expect(await loginPage.isLoggedIn()).toBeFalsy();
            await loginPage.takeScreenshot('long-password-test');
        });

        test('Multiple failed login attempts', async ({ page }) => {
            const invalidUser = loginData.invalidUsers[0];
            
            // Attempt multiple failed logins
            for (let i = 0; i < 3; i++) {
                await loginPage.login(invalidUser.email, invalidUser.password);
                expect(await loginPage.isLoggedIn()).toBeFalsy();
                await page.waitForTimeout(1000);
            }
            
            await loginPage.takeScreenshot('multiple-failed-attempts');
        });
    });
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    }
});
