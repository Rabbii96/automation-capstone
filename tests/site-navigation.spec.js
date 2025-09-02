const { test, expect } = require('@playwright/test');

test.describe('NopCommerce Site Accessibility & Basic Navigation Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.nopcommerce.com/');
    });

    test.describe('Pass Cases - Basic Site Functionality', () => {
        test('Site loads and displays correctly', async ({ page }) => {
            // Verify page title
            await expect(page).toHaveTitle(/nopCommerce demo store/);
            
            // Verify main logo is visible
            await expect(page.locator('.header-logo')).toBeVisible();
            
            // Verify main navigation elements (use more specific selector)
            await expect(page.locator('.top-menu.notmobile')).toBeVisible();
            
            // Take screenshot for verification
            await page.screenshot({ 
                path: 'screenshots/site-loaded-successfully.png',
                fullPage: true 
            });
        });

        test('Main navigation links are functional', async ({ page }) => {
            // Test Computers navigation
            await page.click('text=Computers');
            await page.waitForLoadState('networkidle');
            await expect(page.locator('h1')).toContainText('Computers');
            
            // Test Electronics navigation
            await page.click('text=Electronics');
            await page.waitForLoadState('networkidle');
            await expect(page.locator('h1')).toContainText('Electronics');
            
            // Take screenshot
            await page.screenshot({ 
                path: 'screenshots/navigation-functional.png',
                fullPage: true 
            });
        });

        test('Header elements are accessible', async ({ page }) => {
            // Verify search box is accessible
            await expect(page.locator('#small-searchterms')).toBeVisible();
            
            // Verify user account links
            await expect(page.locator('.ico-register')).toBeVisible();
            await expect(page.locator('.ico-login')).toBeVisible();
            
            // Verify shopping cart link
            await expect(page.locator('.ico-cart')).toBeVisible();
            
            // Verify wishlist link
            await expect(page.locator('.ico-wishlist')).toBeVisible();
        });
    });

    test.describe('Fail Cases - Error Handling', () => {
        test('Invalid URL returns appropriate error', async ({ page }) => {
            const response = await page.goto('https://demo.nopcommerce.com/invalid-page-that-does-not-exist');
            
            // Should return 404 or redirect gracefully
            expect(response.status()).toBeGreaterThanOrEqual(400);
            
            await page.screenshot({ 
                path: 'screenshots/invalid-url-error.png',
                fullPage: true 
            });
        });
    });

    test.describe('Edge Cases - Performance & Compatibility', () => {
        test('Page loads within acceptable time', async ({ page }) => {
            const startTime = Date.now();
            
            await page.goto('https://demo.nopcommerce.com/');
            await page.waitForLoadState('networkidle');
            
            const loadTime = Date.now() - startTime;
            
            // Page should load within 10 seconds
            expect(loadTime).toBeLessThan(10000);
            
            console.log(`Page load time: ${loadTime}ms`);
        });

        test('Mobile viewport compatibility', async ({ page }) => {
            // Set mobile viewport
            await page.setViewportSize({ width: 375, height: 667 });
            
            await page.goto('https://demo.nopcommerce.com/');
            
            // Verify mobile elements are visible
            await expect(page.locator('.header-logo')).toBeVisible();
            await expect(page.locator('.search-box')).toBeVisible();
            
            await page.screenshot({ 
                path: 'screenshots/mobile-compatibility.png',
                fullPage: true 
            });
        });

        test('Keyboard navigation accessibility', async ({ page }) => {
            await page.goto('https://demo.nopcommerce.com/');
            
            // Test Tab navigation
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            
            // Verify focus is visible and functional
            const focusedElement = await page.evaluate(() => document.activeElement.tagName);
            expect(['A', 'INPUT', 'BUTTON']).toContain(focusedElement);
            
            await page.screenshot({ 
                path: 'screenshots/keyboard-navigation.png',
                fullPage: true 
            });
        });
    });
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    }
});
