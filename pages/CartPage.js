const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.addToCartButton = '.add-to-cart-button';
        this.cartLink = '.ico-cart';
        this.cartItems = '.cart-item-row';
        this.quantityInput = '.qty-input';
        this.updateCartButton = '.update-cart-button';
        this.removeCheckbox = '.remove-from-cart';
        this.updateCartButton2 = 'input[name="updatecart"]';
        this.productPrice = '.product-price';
        this.totalPrice = '.cart-total-right .product-price';
        this.emptyCartMessage = '.no-data';
        this.continueShoppingLink = '.continue-shopping-link';
        this.checkoutButton = '#checkout';
        this.estimateShippingButton = '.estimate-shipping-button';
        this.countryDropdown = '#CountryId';
        this.stateDropdown = '#StateProvinceId';
        this.zipCodeInput = '#ZipPostalCode';
        this.applyDiscountButton = '#applydiscountcouponcode';
        this.discountCodeInput = '#discountcouponcode';
        this.giftCardInput = '#giftcardcouponcode';
        this.applyGiftCardButton = '#applygiftcardcouponcode';
    }

    async navigateToCart() {
        await this.page.click(this.cartLink);
        await this.waitForNavigation();
    }

    async addProductToCart(productSelector) {
        await this.page.click(productSelector);
        await this.waitForNavigation();
        await this.page.click(this.addToCartButton);
        await this.page.waitForTimeout(2000); // Wait for add to cart animation
    }

    async getCartItemCount() {
        try {
            return await this.page.locator(this.cartItems).count();
        } catch {
            return 0;
        }
    }

    async updateQuantity(itemIndex, quantity) {
        const quantityInputs = await this.page.locator(this.quantityInput);
        await quantityInputs.nth(itemIndex).fill(quantity.toString());
        await this.page.click(this.updateCartButton2);
        await this.waitForNavigation();
    }

    async removeItem(itemIndex) {
        const removeCheckboxes = await this.page.locator(this.removeCheckbox);
        await removeCheckboxes.nth(itemIndex).check();
        await this.page.click(this.updateCartButton2);
        await this.waitForNavigation();
    }

    async getTotalPrice() {
        try {
            const totalElement = await this.page.locator(this.totalPrice).last();
            const totalText = await totalElement.textContent();
            return totalText.trim();
        } catch {
            return null;
        }
    }

    async isCartEmpty() {
        try {
            await this.page.waitForSelector(this.emptyCartMessage, { timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
        await this.waitForNavigation();
    }

    async applyDiscountCode(discountCode) {
        await this.page.fill(this.discountCodeInput, discountCode);
        await this.page.click(this.applyDiscountButton);
        await this.waitForNavigation();
    }

    async applyGiftCard(giftCardCode) {
        await this.page.fill(this.giftCardInput, giftCardCode);
        await this.page.click(this.applyGiftCardButton);
        await this.waitForNavigation();
    }

    async estimateShipping(country, state, zipCode) {
        await this.page.selectOption(this.countryDropdown, country);
        
        if (state) {
            await this.page.selectOption(this.stateDropdown, state);
        }
        
        await this.page.fill(this.zipCodeInput, zipCode);
        await this.page.click(this.estimateShippingButton);
        await this.page.waitForTimeout(2000);
    }
}

module.exports = { CartPage };
