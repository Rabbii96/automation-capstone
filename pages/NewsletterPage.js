const { BasePage } = require('./BasePage');

class NewsletterPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Newsletter selectors
        this.newsletterInput = '#newsletter-email';
        this.subscribeButton = '#newsletter-subscribe-button';
        this.newsletterForm = '.newsletter';
        this.successMessage = '.newsletter-result-block';
        this.errorMessage = '.message-error';
        this.footerNewsletter = '.footer .newsletter';
        this.unsubscribeLink = '.newsletter-unsubscribe';
        
        // Alternative selectors for flexibility
        this.altNewsletterInput = 'input[placeholder*="email" i], input[type="email"]';
        this.altSubscribeButton = 'button:has-text("Subscribe"), input[value*="Subscribe" i]';
    }

    async navigateToNewsletterSection() {
        await this.page.goto(this.baseURL);
        await this.page.waitForLoadState('networkidle');
        
        // Scroll to footer where newsletter is typically located
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(1000);
    }

    async subscribeToNewsletter(email) {
        try {
            // Try primary newsletter input
            let emailInput = this.page.locator(this.newsletterInput);
            if (!(await emailInput.isVisible())) {
                // Try alternative selectors
                emailInput = this.page.locator(this.altNewsletterInput).first();
            }
            
            await emailInput.fill(email);
            await this.page.waitForTimeout(500);
            
            // Try primary subscribe button
            let subscribeBtn = this.page.locator(this.subscribeButton);
            if (!(await subscribeBtn.isVisible())) {
                // Try alternative selectors
                subscribeBtn = this.page.locator(this.altSubscribeButton).first();
            }
            
            await subscribeBtn.click();
            await this.page.waitForTimeout(2000);
            
        } catch (error) {
            console.log('Newsletter subscription method failed:', error.message);
            // Fallback: try any email input in footer
            const footerEmailInputs = await this.page.locator('.footer input[type="email"]').all();
            if (footerEmailInputs.length > 0) {
                await footerEmailInputs[0].fill(email);
                await this.page.keyboard.press('Enter');
                await this.page.waitForTimeout(2000);
            }
        }
    }

    async subscribeFromFooter(email) {
        await this.navigateToNewsletterSection();
        await this.subscribeToNewsletter(email);
    }

    async getNewsletterMessage() {
        try {
            // Check for success message
            const successMsg = this.page.locator(this.successMessage);
            if (await successMsg.isVisible()) {
                return await successMsg.textContent();
            }
            
            // Check for error message
            const errorMsg = this.page.locator(this.errorMessage);
            if (await errorMsg.isVisible()) {
                return await errorMsg.textContent();
            }
            
            // Check for any notification
            const notifications = await this.page.locator('.notification, .alert, .message').all();
            for (const notification of notifications) {
                if (await notification.isVisible()) {
                    return await notification.textContent();
                }
            }
            
            return null;
        } catch (error) {
            console.log('Error getting newsletter message:', error.message);
            return null;
        }
    }

    async getSubscriptionStatus() {
        return await this.getNewsletterMessage();
    }

    async isNewsletterFormVisible() {
        try {
            const form = this.page.locator(this.newsletterForm);
            if (await form.isVisible()) return true;
            
            // Check for any email input in footer
            const footerEmail = this.page.locator('.footer input[type="email"]');
            return await footerEmail.isVisible();
        } catch (error) {
            return false;
        }
    }

    async unsubscribeFromNewsletter(email) {
        try {
            // Navigate to unsubscribe if link exists
            const unsubLink = this.page.locator(this.unsubscribeLink);
            if (await unsubLink.isVisible()) {
                await unsubLink.click();
                await this.page.waitForLoadState('networkidle');
                
                // Fill email for unsubscription
                const emailInput = this.page.locator('input[type="email"]');
                if (await emailInput.isVisible()) {
                    await emailInput.fill(email);
                    
                    const unsubButton = this.page.locator('button:has-text("Unsubscribe"), input[value*="Unsubscribe" i]');
                    if (await unsubButton.isVisible()) {
                        await unsubButton.click();
                        await this.page.waitForTimeout(2000);
                    }
                }
            }
        } catch (error) {
            console.log('Unsubscribe failed:', error.message);
        }
    }

    async validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async getNewsletterInputPlaceholder() {
        try {
            const input = this.page.locator(this.altNewsletterInput).first();
            if (await input.isVisible()) {
                return await input.getAttribute('placeholder');
            }
            return null;
        } catch (error) {
            return null;
        }
    }
}

module.exports = { NewsletterPage };
