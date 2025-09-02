const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/CartPage');
const { SearchPage } = require('../pages/SearchPage');

test.describe('Shopping Cart Functionality Tests', () => {
    let cartPage;
    let searchPage;

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);
        searchPage = new SearchPage(page);
        await cartPage.navigate();
    });

    test.describe('Pass Cases - Valid Cart Operations', () => {
        test('Add single product to cart', async ({ page }) => {
            // Search for a product
            await searchPage.search('laptop');
            await page.waitForTimeout(2000);
            
            // Click on first product
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            
            // Add to cart
            await page.click('.add-to-cart-button');
            await page.waitForTimeout(3000);
            
            // Verify product added
            await cartPage.navigateToCart();
            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBeGreaterThan(0);
            
            await cartPage.takeScreenshot('single-product-added');
        });

        test('Add multiple products to cart', async ({ page }) => {
            // Add first product
            await searchPage.search('computer');
            await page.waitForTimeout(2000);
            
            const products = page.locator('.product-item .product-title a');
            const productCount = Math.min(await products.count(), 2);
            
            for (let i = 0; i < productCount; i++) {
                await products.nth(i).click();
                await page.waitForLoadState('networkidle');
                await page.click('.add-to-cart-button');
                await page.waitForTimeout(2000);
                await page.goBack();
                await page.waitForTimeout(1000);
            }
            
            // Verify multiple products added
            await cartPage.navigateToCart();
            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBe(productCount);
            
            await cartPage.takeScreenshot('multiple-products-added');
        });

        test('Update product quantity in cart', async ({ page }) => {
            // Add a product first
            await searchPage.search('phone');
            await page.waitForTimeout(2000);
            
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            await page.click('.add-to-cart-button');
            await page.waitForTimeout(2000);
            
            // Navigate to cart and update quantity
            await cartPage.navigateToCart();
            await cartPage.updateQuantity(0, 3);
            
            // Verify quantity updated
            const quantityInput = page.locator('.qty-input').first();
            const currentQuantity = await quantityInput.inputValue();
            expect(currentQuantity).toBe('3');
            
            await cartPage.takeScreenshot('quantity-updated');
        });
    });

    test.describe('Fail Cases - Invalid Cart Operations', () => {
        test('Add product with invalid quantity', async ({ page }) => {
            await searchPage.search('laptop');
            await page.waitForTimeout(2000);
            
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            
            // Try to add with invalid quantity (if quantity input exists)
            const quantityInput = page.locator('#addtocart_1_EnteredQuantity');
            if (await quantityInput.isVisible()) {
                await quantityInput.fill('-1');
                await page.click('.add-to-cart-button');
                
                // Should show error or not add to cart
                await page.waitForTimeout(2000);
                await cartPage.takeScreenshot('invalid-quantity-error');
            }
        });

        test('Update cart with zero quantity', async ({ page }) => {
            // Add a product first
            await searchPage.search('computer');
            await page.waitForTimeout(2000);
            
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            await page.click('.add-to-cart-button');
            await page.waitForTimeout(2000);
            
            // Navigate to cart and try zero quantity
            await cartPage.navigateToCart();
            await cartPage.updateQuantity(0, 0);
            
            // Should remove item or show error
            await cartPage.takeScreenshot('zero-quantity-update');
        });

        test('Apply invalid discount code', async ({ page }) => {
            // Add a product first
            await searchPage.search('laptop');
            await page.waitForTimeout(2000);
            
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            await page.click('.add-to-cart-button');
            await page.waitForTimeout(2000);
            
            // Navigate to cart and apply invalid discount
            await cartPage.navigateToCart();
            await cartPage.applyDiscountCode('INVALIDCODE123');
            
            // Should show error message
            await page.waitForTimeout(2000);
            await cartPage.takeScreenshot('invalid-discount-code');
        });
    });

    test.describe('Edge Cases - Boundary Testing', () => {
        test('Add maximum allowed quantity', async ({ page }) => {
            await searchPage.search('computer');
            await page.waitForTimeout(2000);
            
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            
            // Try to add maximum quantity
            const quantityInput = page.locator('#addtocart_1_EnteredQuantity');
            if (await quantityInput.isVisible()) {
                await quantityInput.fill('999');
                await page.click('.add-to-cart-button');
                await page.waitForTimeout(3000);
            }
            
            await cartPage.takeScreenshot('max-quantity-test');
        });

        test('Remove all items from cart', async ({ page }) => {
            // Add multiple products
            await searchPage.search('phone');
            await page.waitForTimeout(2000);
            
            const products = page.locator('.product-item .product-title a');
            const productCount = Math.min(await products.count(), 2);
            
            for (let i = 0; i < productCount; i++) {
                await products.nth(i).click();
                await page.waitForLoadState('networkidle');
                await page.click('.add-to-cart-button');
                await page.waitForTimeout(2000);
                await page.goBack();
                await page.waitForTimeout(1000);
            }
            
            // Navigate to cart and remove all items
            await cartPage.navigateToCart();
            const initialItemCount = await cartPage.getCartItemCount();
            
            for (let i = 0; i < initialItemCount; i++) {
                await cartPage.removeItem(0); // Always remove first item
                await page.waitForTimeout(1000);
            }
            
            // Verify cart is empty
            const isEmpty = await cartPage.isCartEmpty();
            expect(isEmpty).toBeTruthy();
            
            await cartPage.takeScreenshot('empty-cart-after-removal');
        });

        test('Very long discount code', async ({ page }) => {
            // Add a product first
            await searchPage.search('laptop');
            await page.waitForTimeout(2000);
            
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            await page.click('.add-to-cart-button');
            await page.waitForTimeout(2000);
            
            // Navigate to cart and apply very long discount code
            await cartPage.navigateToCart();
            const longCode = 'A'.repeat(1000);
            await cartPage.applyDiscountCode(longCode);
            
            await page.waitForTimeout(2000);
            await cartPage.takeScreenshot('long-discount-code');
        });

        test('Cart persistence across browser refresh', async ({ page }) => {
            // Add a product
            await searchPage.search('computer');
            await page.waitForTimeout(2000);
            
            const firstProduct = page.locator('.product-item').first().locator('.product-title a');
            await firstProduct.click();
            await page.waitForLoadState('networkidle');
            await page.click('.add-to-cart-button');
            await page.waitForTimeout(2000);
            
            // Get initial cart count
            await cartPage.navigateToCart();
            const initialCount = await cartPage.getCartItemCount();
            
            // Refresh browser
            await page.reload();
            await page.waitForLoadState('networkidle');
            
            // Check if cart persisted
            const afterRefreshCount = await cartPage.getCartItemCount();
            expect(afterRefreshCount).toBe(initialCount);
            
            await cartPage.takeScreenshot('cart-after-refresh');
        });
    });
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    }
});
