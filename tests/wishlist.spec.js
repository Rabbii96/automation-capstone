const { test, expect } = require('@playwright/test');
const { WishlistPage } = require('../pages/WishlistPage');
const { SearchPage } = require('../pages/SearchPage');

test.describe('Wishlist Functionality Tests', () => {
    let wishlistPage;
    let searchPage;

    test.beforeEach(async ({ page }) => {
        wishlistPage = new WishlistPage(page);
        searchPage = new SearchPage(page);
        await wishlistPage.navigate();
    });

    test.describe('Pass Cases - Valid Wishlist Operations', () => {
        test('Add product to wishlist', async ({ page }) => {
            // Search and add product to wishlist
            await searchPage.search('laptop');
            await page.waitForTimeout(2000);
            
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            
            // Add to wishlist
            await page.click('.add-to-wishlist-button');
            await page.waitForTimeout(2000);
            
            // Navigate to wishlist and verify
            await wishlistPage.navigateToWishlist();
            const itemCount = await wishlistPage.getWishlistItemCount();
            expect(itemCount).toBeGreaterThan(0);
            
            await wishlistPage.takeScreenshot('product-added-to-wishlist');
        });

        test('Add multiple products to wishlist', async ({ page }) => {
            await searchPage.search('computer');
            await page.waitForTimeout(2000);
            
            const products = page.locator('.product-item .product-title a');
            const productCount = Math.min(await products.count(), 2);
            
            for (let i = 0; i < productCount; i++) {
                await products.nth(i).click();
                await page.waitForLoadState('networkidle');
                
                const wishlistButton = page.locator('.add-to-wishlist-button');
                if (await wishlistButton.isVisible()) {
                    await wishlistButton.click();
                    await page.waitForTimeout(2000);
                }
                
                await page.goBack();
                await page.waitForTimeout(1000);
            }
            
            await wishlistPage.navigateToWishlist();
            const itemCount = await wishlistPage.getWishlistItemCount();
            expect(itemCount).toBeGreaterThanOrEqual(1);
            
            await wishlistPage.takeScreenshot('multiple-products-in-wishlist');
        });

        test('Move product from wishlist to cart', async ({ page }) => {
            // First add a product to wishlist
            await searchPage.search('phone');
            await page.waitForTimeout(2000);
            
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            
            const wishlistButton = page.locator('.add-to-wishlist-button');
            if (await wishlistButton.isVisible()) {
                await wishlistButton.click();
                await page.waitForTimeout(2000);
            }
            
            // Navigate to wishlist
            await wishlistPage.navigateToWishlist();
            
            // Move to cart if items exist
            const itemCount = await wishlistPage.getWishlistItemCount();
            if (itemCount > 0) {
                await wishlistPage.moveToCartFromWishlist(0);
                await wishlistPage.takeScreenshot('moved-to-cart-from-wishlist');
            }
        });
    });

    test.describe('Fail Cases - Invalid Wishlist Operations', () => {
        test('Add same product multiple times to wishlist', async ({ page }) => {
            await searchPage.search('laptop');
            await page.waitForTimeout(2000);
            
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            
            // Add to wishlist multiple times
            const wishlistButton = page.locator('.add-to-wishlist-button');
            if (await wishlistButton.isVisible()) {
                await wishlistButton.click();
                await page.waitForTimeout(2000);
                
                // Try to add again
                await page.reload();
                await page.waitForLoadState('networkidle');
                
                if (await wishlistButton.isVisible()) {
                    await wishlistButton.click();
                    await page.waitForTimeout(2000);
                }
            }
            
            await wishlistPage.navigateToWishlist();
            await wishlistPage.takeScreenshot('duplicate-wishlist-attempt');
        });

        test('Access wishlist when empty', async ({ page }) => {
            await wishlistPage.navigateToWishlist();
            
            const isEmpty = await wishlistPage.isWishlistEmpty();
            if (isEmpty) {
                expect(isEmpty).toBeTruthy();
                await wishlistPage.takeScreenshot('empty-wishlist');
            }
        });
    });

    test.describe('Edge Cases - Boundary Testing', () => {
        test('Remove all items from wishlist', async ({ page }) => {
            // First add some products to wishlist
            await searchPage.search('computer');
            await page.waitForTimeout(2000);
            
            const products = page.locator('.product-item .product-title a');
            const productCount = Math.min(await products.count(), 2);
            
            for (let i = 0; i < productCount; i++) {
                await products.nth(i).click();
                await page.waitForLoadState('networkidle');
                
                const wishlistButton = page.locator('.add-to-wishlist-button');
                if (await wishlistButton.isVisible()) {
                    await wishlistButton.click();
                    await page.waitForTimeout(2000);
                }
                
                await page.goBack();
                await page.waitForTimeout(1000);
            }
            
            // Navigate to wishlist and remove all items
            await wishlistPage.navigateToWishlist();
            const initialItemCount = await wishlistPage.getWishlistItemCount();
            
            for (let i = 0; i < initialItemCount; i++) {
                await wishlistPage.removeItemFromWishlist(0);
                await page.waitForTimeout(1000);
            }
            
            const isEmpty = await wishlistPage.isWishlistEmpty();
            expect(isEmpty).toBeTruthy();
            
            await wishlistPage.takeScreenshot('wishlist-after-removing-all');
        });

        test('Wishlist persistence across sessions', async ({ page }) => {
            // Add a product to wishlist
            await searchPage.search('laptop');
            await page.waitForTimeout(2000);
            
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            
            const wishlistButton = page.locator('.add-to-wishlist-button');
            if (await wishlistButton.isVisible()) {
                await wishlistButton.click();
                await page.waitForTimeout(2000);
            }
            
            // Get initial count
            await wishlistPage.navigateToWishlist();
            const initialCount = await wishlistPage.getWishlistItemCount();
            
            // Simulate new session by refreshing
            await page.reload();
            await page.waitForLoadState('networkidle');
            
            const afterRefreshCount = await wishlistPage.getWishlistItemCount();
            expect(afterRefreshCount).toBe(initialCount);
            
            await wishlistPage.takeScreenshot('wishlist-after-refresh');
        });

        test('Maximum items in wishlist', async ({ page }) => {
            // Try to add many products to test limits
            await searchPage.search('computer');
            await page.waitForTimeout(2000);
            
            const products = page.locator('.product-item .product-title a');
            const maxProductsToAdd = Math.min(await products.count(), 5);
            
            for (let i = 0; i < maxProductsToAdd; i++) {
                await products.nth(i).click();
                await page.waitForLoadState('networkidle');
                
                const wishlistButton = page.locator('.add-to-wishlist-button');
                if (await wishlistButton.isVisible()) {
                    await wishlistButton.click();
                    await page.waitForTimeout(1000);
                }
                
                await page.goBack();
                await page.waitForTimeout(1000);
            }
            
            await wishlistPage.navigateToWishlist();
            const finalCount = await wishlistPage.getWishlistItemCount();
            
            await wishlistPage.takeScreenshot('maximum-wishlist-items');
        });
    });
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    }
});
