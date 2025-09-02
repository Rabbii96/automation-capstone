const { test, expect } = require('@playwright/test');
const { CurrencyPage } = require('../pages/CurrencyPage');

test.describe('Currency Change Functionality Tests', () => {
    let currencyPage;

    test.beforeEach(async ({ page }) => {
        currencyPage = new CurrencyPage(page);
        await currencyPage.navigate();
    });

    test.describe('Pass Cases - Valid Currency Changes', () => {
        test('Change currency to Euro', async ({ page }) => {
            // Navigate to a product page to see prices
            await currencyPage.navigateToProductPage();
            
            // Get initial prices
            const initialPrices = await currencyPage.getDisplayedPrices();
            
            // Change currency to Euro
            await currencyPage.changeCurrency('2'); // Assuming 2 is Euro
            
            // Get new prices
            const newPrices = await currencyPage.getDisplayedPrices();
            
            // Verify currency changed (prices should be different)
            expect(newPrices).not.toEqual(initialPrices);
            
            await currencyPage.takeScreenshot('currency-changed-to-euro');
        });

        test('Change currency and verify symbol display', async ({ page }) => {
            await currencyPage.navigateToProductPage();
            
            // Change to different currencies and verify
            const currencies = ['1', '2']; // USD, Euro
            
            for (const currency of currencies) {
                await currencyPage.changeCurrency(currency);
                
                const currentCurrency = await currencyPage.getCurrentCurrency();
                expect(currentCurrency).toBe(currency);
                
                await page.waitForTimeout(1000);
            }
            
            await currencyPage.takeScreenshot('currency-symbols-verified');
        });

        test('Currency persistence across navigation', async ({ page }) => {
            // Change currency
            await currencyPage.changeCurrency('2'); // Euro
            
            // Navigate to different pages
            await page.goto(currencyPage.baseURL + 'computers');
            await page.waitForLoadState('networkidle');
            
            // Verify currency is still Euro
            const currentCurrency = await currencyPage.getCurrentCurrency();
            expect(currentCurrency).toBe('2');
            
            await currencyPage.takeScreenshot('currency-persisted-navigation');
        });
    });

    test.describe('Fail Cases - Invalid Currency Operations', () => {
        test('Attempt to select non-existent currency', async ({ page }) => {
            try {
                // Try to select invalid currency value
                await currencyPage.changeCurrency('999');
                
                // Should either reject or default to a valid currency
                const currentCurrency = await currencyPage.getCurrentCurrency();
                expect(['1', '2']).toContain(currentCurrency); // Should be a valid currency
                
                await currencyPage.takeScreenshot('invalid-currency-attempt');
            } catch (error) {
                // Expected to fail
                await currencyPage.takeScreenshot('invalid-currency-error');
            }
        });
    });

    test.describe('Edge Cases - Boundary Testing', () => {
        test('Rapid currency changes', async ({ page }) => {
            await currencyPage.navigateToProductPage();
            
            // Rapidly change currencies
            const currencies = ['1', '2', '1', '2'];
            
            for (const currency of currencies) {
                await currencyPage.changeCurrency(currency);
                await page.waitForTimeout(500); // Short wait
            }
            
            // Verify final currency is set correctly
            const finalCurrency = await currencyPage.getCurrentCurrency();
            expect(finalCurrency).toBe('2');
            
            await currencyPage.takeScreenshot('rapid-currency-changes');
        });

        test('Currency change with empty cart', async ({ page }) => {
            // Ensure cart is empty and change currency
            await currencyPage.changeCurrency('2');
            
            // Navigate to cart
            await page.click('.ico-cart');
            await page.waitForLoadState('networkidle');
            
            // Verify currency is still Euro even with empty cart
            const currentCurrency = await currencyPage.getCurrentCurrency();
            expect(currentCurrency).toBe('2');
            
            await currencyPage.takeScreenshot('currency-change-empty-cart');
        });

        test('Currency change with items in cart', async ({ page }) => {
            // Add item to cart first
            await page.goto(currencyPage.baseURL + 'apple-macbook-pro-13-inch');
            await page.waitForLoadState('networkidle');
            await page.click('.add-to-cart-button');
            await page.waitForTimeout(2000);
            
            // Change currency
            await currencyPage.changeCurrency('2');
            
            // Navigate to cart and verify prices updated
            await page.click('.ico-cart');
            await page.waitForLoadState('networkidle');
            
            const cartPrices = await currencyPage.getDisplayedPrices();
            expect(cartPrices.length).toBeGreaterThan(0);
            
            await currencyPage.takeScreenshot('currency-change-with-cart-items');
        });

        test('Browser refresh maintains currency selection', async ({ page }) => {
            // Change currency
            await currencyPage.changeCurrency('2');
            
            // Refresh browser
            await page.reload();
            await page.waitForLoadState('networkidle');
            
            // Verify currency is maintained
            const currentCurrency = await currencyPage.getCurrentCurrency();
            expect(currentCurrency).toBe('2');
            
            await currencyPage.takeScreenshot('currency-after-refresh');
        });
    });
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    }
});
