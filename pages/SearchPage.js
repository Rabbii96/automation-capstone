const { BasePage } = require('./BasePage');

class SearchPage extends BasePage {
    constructor(page) {
        super(page);
        this.searchBox = '#small-searchterms';
        this.searchButton = '.search-box-button';
        this.searchResults = '.product-item';
        this.noResultsMessage = '.no-result';
        this.productTitles = '.product-title a';
        this.advancedSearchLink = '.advanced-search';
        this.categoryDropdown = '#cid';
        this.manufacturerDropdown = '#mid';
        this.priceFromInput = '#pf';
        this.priceToInput = '#pt';
        this.searchInDescriptionsCheckbox = '#sid';
        this.advancedSearchButton = 'input[value="Search"]';
    }

    async search(searchTerm) {
        await this.page.fill(this.searchBox, searchTerm);
        await this.page.click(this.searchButton);
        await this.waitForNavigation();
    }

    async getSearchResults() {
        try {
            await this.page.waitForSelector(this.searchResults, { timeout: 10000 });
            return await this.page.locator(this.searchResults).count();
        } catch {
            return 0;
        }
    }

    async getProductTitles() {
        try {
            return await this.page.locator(this.productTitles).allTextContents();
        } catch {
            return [];
        }
    }

    async hasNoResultsMessage() {
        try {
            await this.page.waitForSelector(this.noResultsMessage, { timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async getNoResultsMessage() {
        try {
            return await this.page.textContent(this.noResultsMessage);
        } catch {
            return null;
        }
    }

    async navigateToAdvancedSearch() {
        await this.page.click(this.advancedSearchLink);
        await this.waitForNavigation();
    }

    async advancedSearch(searchData) {
        if (searchData.searchTerm) {
            await this.page.fill(this.searchBox, searchData.searchTerm);
        }
        
        if (searchData.category) {
            await this.page.selectOption(this.categoryDropdown, searchData.category);
        }
        
        if (searchData.manufacturer) {
            await this.page.selectOption(this.manufacturerDropdown, searchData.manufacturer);
        }
        
        if (searchData.priceFrom) {
            await this.page.fill(this.priceFromInput, searchData.priceFrom);
        }
        
        if (searchData.priceTo) {
            await this.page.fill(this.priceToInput, searchData.priceTo);
        }
        
        if (searchData.searchInDescriptions) {
            await this.page.check(this.searchInDescriptionsCheckbox);
        }
        
        await this.page.click(this.advancedSearchButton);
        await this.waitForNavigation();
    }
}

module.exports = { SearchPage };
