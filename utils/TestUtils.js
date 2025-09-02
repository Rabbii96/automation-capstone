class TestUtils {
    static generateRandomEmail() {
        const timestamp = Date.now();
        return `testuser${timestamp}@example.com`;
    }

    static generateRandomString(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    static generateRandomNumber(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static async waitForElementToBeVisible(page, selector, timeout = 30000) {
        try {
            await page.waitForSelector(selector, { 
                state: 'visible', 
                timeout 
            });
            return true;
        } catch {
            return false;
        }
    }

    static async waitForElementToBeHidden(page, selector, timeout = 30000) {
        try {
            await page.waitForSelector(selector, { 
                state: 'hidden', 
                timeout 
            });
            return true;
        } catch {
            return false;
        }
    }

    static async scrollToElement(page, selector) {
        await page.locator(selector).scrollIntoViewIfNeeded();
    }

    static async highlightElement(page, selector) {
        await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.border = '3px solid red';
                element.style.backgroundColor = 'yellow';
            }
        }, selector);
    }

    static async removeHighlight(page, selector) {
        await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.border = '';
                element.style.backgroundColor = '';
            }
        }, selector);
    }

    static formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    static async takeFullPageScreenshot(page, filename) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await page.screenshot({
            path: `screenshots/${filename}-${timestamp}.png`,
            fullPage: true
        });
    }

    static async getPageLoadTime(page) {
        return await page.evaluate(() => {
            return performance.timing.loadEventEnd - performance.timing.navigationStart;
        });
    }

    static async waitForNetworkIdle(page, timeout = 30000) {
        await page.waitForLoadState('networkidle', { timeout });
    }

    static generateTestUser() {
        return {
            firstName: this.generateRandomString(8),
            lastName: this.generateRandomString(8),
            email: this.generateRandomEmail(),
            password: 'TestPass123!',
            confirmPassword: 'TestPass123!'
        };
    }
}

module.exports = TestUtils;
