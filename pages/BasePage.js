class BasePage {
    constructor(page) {
        this.page = page;
        this.baseURL = 'https://demo.nopcommerce.com/';
    }

    async navigate(path = '') {
        await this.page.goto(this.baseURL + path);
    }

    async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await this.page.screenshot({ 
            path: `screenshots/${name}-${timestamp}.png`,
            fullPage: true 
        });
    }

    async waitForElement(selector, timeout = 30000) {
        await this.page.waitForSelector(selector, { timeout });
    }

    async waitForNavigation() {
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { BasePage };
