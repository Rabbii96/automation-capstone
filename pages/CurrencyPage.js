const { BasePage } = require('./BasePage');

class CurrencyPage extends BasePage {
    constructor(page) {
        super(page);
        this.currencySelector = '#customerCurrency';
        this.productPrices = '.price';
        this.currencySymbol = '.currency-selector';
    }

    async changeCurrency(currencyValue) {
        await this.page.selectOption(this.currencySelector, currencyValue);
        await this.waitForNavigation();
    }

    async getCurrentCurrency() {
        try {
            return await this.page.locator(this.currencySelector).inputValue();
        } catch {
            return null;
        }
    }

    async getDisplayedPrices() {
        try {
            return await this.page.locator(this.productPrices).allTextContents();
        } catch {
            return [];
        }
    }

    async navigateToProductPage() {
        await this.page.goto(this.baseURL + 'apple-macbook-pro-13-inch');
        await this.waitForNavigation();
    }
}

module.exports = { CurrencyPage };
