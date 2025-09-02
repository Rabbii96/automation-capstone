const { BasePage } = require('./BasePage');

class WishlistPage extends BasePage {
    constructor(page) {
        super(page);
        this.wishlistLink = '.ico-wishlist';
        this.addToWishlistButton = '.add-to-wishlist-button';
        this.wishlistItems = '.wishlist-item';
        this.removeFromWishlistCheckbox = '.remove-from-wishlist';
        this.updateWishlistButton = 'input[name="updatecart"]';
        this.addToCartFromWishlistButton = '.add-to-cart-button';
        this.emptyWishlistMessage = '.no-data';
        this.productTitle = '.product-name';
        this.shareWishlistButton = '.share-link';
    }

    async navigateToWishlist() {
        await this.page.click(this.wishlistLink);
        await this.waitForNavigation();
    }

    async addProductToWishlist(productSelector) {
        await this.page.click(productSelector);
        await this.waitForNavigation();
        await this.page.click(this.addToWishlistButton);
        await this.page.waitForTimeout(2000);
    }

    async getWishlistItemCount() {
        try {
            return await this.page.locator(this.wishlistItems).count();
        } catch {
            return 0;
        }
    }

    async removeItemFromWishlist(itemIndex) {
        const removeCheckboxes = await this.page.locator(this.removeFromWishlistCheckbox);
        await removeCheckboxes.nth(itemIndex).check();
        await this.page.click(this.updateWishlistButton);
        await this.waitForNavigation();
    }

    async moveToCartFromWishlist(itemIndex) {
        const addToCartButtons = await this.page.locator(this.addToCartFromWishlistButton);
        await addToCartButtons.nth(itemIndex).check();
        await this.page.click(this.updateWishlistButton);
        await this.waitForNavigation();
    }

    async isWishlistEmpty() {
        try {
            await this.page.waitForSelector(this.emptyWishlistMessage, { timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async getProductTitles() {
        try {
            return await this.page.locator(this.productTitle).allTextContents();
        } catch {
            return [];
        }
    }
}

module.exports = { WishlistPage };
