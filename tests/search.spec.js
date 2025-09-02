const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pages/SearchPage');
const searchData = require('../test-data/searchData.json');

test.describe('Search Functionality Tests', () => {
    let searchPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        await searchPage.navigate();
    });

    test.describe('Pass Cases - Valid Search Scenarios', () => {
        test('Search for existing product', async ({ page }) => {
            const validSearch = searchData.validSearches[0];
            
            await searchPage.search(validSearch.searchTerm);
            
            const resultCount = await searchPage.getSearchResults();
            expect(resultCount).toBeGreaterThan(0);
            
            const productTitles = await searchPage.getProductTitles();
            expect(productTitles.length).toBeGreaterThan(0);
            
            await searchPage.takeScreenshot('valid-search-results');
        });

        test('Search with different valid terms', async ({ page }) => {
            const searches = searchData.validSearches;
            
            for (const searchItem of searches) {
                await searchPage.search(searchItem.searchTerm);
                
                if (searchItem.expectedResults) {
                    const resultCount = await searchPage.getSearchResults();
                    expect(resultCount).toBeGreaterThan(0);
                }
                
                await page.waitForTimeout(1000);
            }
            
            await searchPage.takeScreenshot('multiple-valid-searches');
        });

        test('Advanced search with filters', async ({ page }) => {
            const advancedSearch = searchData.advancedSearches[0];
            
            await searchPage.navigateToAdvancedSearch();
            await searchPage.advancedSearch(advancedSearch);
            
            const resultCount = await searchPage.getSearchResults();
            expect(resultCount).toBeGreaterThan(0);
            
            await searchPage.takeScreenshot('advanced-search-results');
        });
    });

    test.describe('Fail Cases - Invalid Search Scenarios', () => {
        test('Search for non-existent product', async ({ page }) => {
            const invalidSearch = searchData.invalidSearches[0];
            
            await searchPage.search(invalidSearch.searchTerm);
            
            const hasNoResults = await searchPage.hasNoResultsMessage();
            expect(hasNoResults).toBeTruthy();
            
            const noResultsMessage = await searchPage.getNoResultsMessage();
            expect(noResultsMessage).toContain('No products were found');
            
            await searchPage.takeScreenshot('no-search-results');
        });

        test('Search with special characters only', async ({ page }) => {
            const invalidSearch = searchData.invalidSearches[1];
            
            await searchPage.search(invalidSearch.searchTerm);
            
            const resultCount = await searchPage.getSearchResults();
            expect(resultCount).toBe(0);
            
            await searchPage.takeScreenshot('special-chars-search');
        });

        test('Search with SQL injection attempt', async ({ page }) => {
            const sqlInjection = "'; DROP TABLE products; --";
            
            await searchPage.search(sqlInjection);
            
            // Should not break the application
            const resultCount = await searchPage.getSearchResults();
            expect(resultCount).toBe(0);
            
            await searchPage.takeScreenshot('sql-injection-search');
        });
    });

    test.describe('Edge Cases - Boundary Testing', () => {
        test('Empty search', async ({ page }) => {
            const emptySearch = searchData.edgeCases[0];
            
            await searchPage.search(emptySearch.searchTerm);
            
            // Should handle empty search gracefully
            await page.waitForTimeout(2000);
            await searchPage.takeScreenshot('empty-search');
        });

        test('Single character search', async ({ page }) => {
            const singleCharSearch = searchData.edgeCases[1];
            
            await searchPage.search(singleCharSearch.searchTerm);
            
            // Should handle single character search
            await page.waitForTimeout(2000);
            await searchPage.takeScreenshot('single-char-search');
        });

        test('Very long search term', async ({ page }) => {
            const longSearch = searchData.edgeCases[2];
            
            await searchPage.search(longSearch.searchTerm);
            
            // Should handle very long search terms
            const resultCount = await searchPage.getSearchResults();
            expect(resultCount).toBe(0);
            
            await searchPage.takeScreenshot('long-search-term');
        });

        test('Search with leading and trailing spaces', async ({ page }) => {
            const spacedSearch = searchData.edgeCases[3];
            
            await searchPage.search(spacedSearch.searchTerm);
            
            // Should handle spaces and still find results
            const resultCount = await searchPage.getSearchResults();
            expect(resultCount).toBeGreaterThan(0);
            
            await searchPage.takeScreenshot('spaced-search-term');
        });

        test('Case sensitivity test', async ({ page }) => {
            const upperCaseSearch = 'LAPTOP';
            const lowerCaseSearch = 'laptop';
            
            // Search with uppercase
            await searchPage.search(upperCaseSearch);
            const upperResults = await searchPage.getSearchResults();
            
            await page.waitForTimeout(1000);
            
            // Search with lowercase
            await searchPage.search(lowerCaseSearch);
            const lowerResults = await searchPage.getSearchResults();
            
            // Results should be the same (case insensitive)
            expect(upperResults).toBe(lowerResults);
            
            await searchPage.takeScreenshot('case-sensitivity-test');
        });
    });
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    }
});
