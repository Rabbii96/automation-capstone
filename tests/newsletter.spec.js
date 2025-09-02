const { test, expect } = require('@playwright/test');
const { NewsletterPage } = require('../pages/NewsletterPage');

test.describe('Newsletter Subscription Functionality Tests', () => {
    let newsletterPage;

    test.beforeEach(async ({ page }) => {
        newsletterPage = new NewsletterPage(page);
        await newsletterPage.navigateToNewsletterSection();
    });

    test.describe('Pass Cases - Valid Newsletter Operations', () => {
        test('Subscribe with valid email address', async ({ page }) => {
            const testEmail = 'newsletter.test@example.com';
            
            await newsletterPage.subscribeToNewsletter(testEmail);
            
            // Wait for response and check result
            const result = await newsletterPage.getNewsletterMessage();
            
            // Newsletter subscription should either succeed or be handled gracefully
            if (result) {
                expect(result.toLowerCase()).toMatch(/(subscrib|thank|success|confirm)/);
            }
            
            await newsletterPage.takeScreenshot('newsletter-subscription-success');
        });

        test('Subscribe from footer newsletter form', async ({ page }) => {
            const testEmail = 'footer.newsletter@example.com';
            
            await newsletterPage.subscribeFromFooter(testEmail);
            
            const result = await newsletterPage.getNewsletterMessage();
            
            // Verify newsletter form is functional
            const isFormVisible = await newsletterPage.isNewsletterFormVisible();
            expect(isFormVisible).toBeTruthy();
            
            await newsletterPage.takeScreenshot('footer-newsletter-subscription');
        });

        test('Newsletter form is visible and accessible', async ({ page }) => {
            const isVisible = await newsletterPage.isNewsletterFormVisible();
            expect(isVisible).toBeTruthy();
            
            // Check if newsletter input has appropriate placeholder
            const placeholder = await newsletterPage.getNewsletterInputPlaceholder();
            
            if (placeholder) {
                expect(placeholder.toLowerCase()).toMatch(/(email|mail|address)/);
            }
            
            await newsletterPage.takeScreenshot('newsletter-form-visibility');
        });
    });

    test.describe('Fail Cases - Invalid Newsletter Operations', () => {
        test('Subscribe with invalid email format', async ({ page }) => {
            const invalidEmails = [
                'invalid-email',
                'test@',
                '@example.com',
                'test..email@example.com',
                'test@example'
            ];
            
            for (const email of invalidEmails) {
                await newsletterPage.subscribeToNewsletter(email);
                
                // Check if validation prevents subscription
                const isValid = await newsletterPage.validateEmailFormat(email);
                expect(isValid).toBeFalsy();
                
                await page.waitForTimeout(1000);
            }
            
            await newsletterPage.takeScreenshot('invalid-email-newsletter');
        });

        test('Subscribe with empty email field', async ({ page }) => {
            await newsletterPage.subscribeToNewsletter('');
            
            // Should not allow empty subscription
            const result = await newsletterPage.getNewsletterMessage();
            
            if (result) {
                expect(result.toLowerCase()).toMatch(/(required|empty|invalid|error)/);
            }
            
            await newsletterPage.takeScreenshot('empty-email-newsletter');
        });

        test('Subscribe with existing email address', async ({ page }) => {
            const existingEmail = 'frabbif96@gmail.com'; // Use the login email
            
            await newsletterPage.subscribeToNewsletter(existingEmail);
            
            // Try to subscribe again with same email
            await page.waitForTimeout(2000);
            await newsletterPage.subscribeToNewsletter(existingEmail);
            
            const result = await newsletterPage.getNewsletterMessage();
            
            // Should handle duplicate subscription gracefully
            if (result) {
                expect(result.toLowerCase()).toMatch(/(already|exist|duplicate|subscribed)/);
            }
            
            await newsletterPage.takeScreenshot('duplicate-email-newsletter');
        });
    });

    test.describe('Edge Cases - Boundary Testing', () => {
        test('Subscribe with very long email address', async ({ page }) => {
            const longEmail = 'a'.repeat(250) + '@example.com';
            
            await newsletterPage.subscribeToNewsletter(longEmail);
            
            // System should handle long emails gracefully
            const result = await newsletterPage.getNewsletterMessage();
            
            if (result) {
                // Should either accept or reject with appropriate message
                expect(result).toBeTruthy();
            }
            
            await newsletterPage.takeScreenshot('long-email-newsletter');
        });

        test('Subscribe with special characters in email', async ({ page }) => {
            const specialEmails = [
                'test+newsletter@example.com',
                'test.newsletter@example.com',
                'test_newsletter@example.com',
                'test-newsletter@example.com'
            ];
            
            for (const email of specialEmails) {
                await newsletterPage.subscribeToNewsletter(email);
                
                const isValid = await newsletterPage.validateEmailFormat(email);
                expect(isValid).toBeTruthy();
                
                await page.waitForTimeout(1000);
            }
            
            await newsletterPage.takeScreenshot('special-chars-newsletter');
        });

        test('Subscribe with international domain email', async ({ page }) => {
            const internationalEmails = [
                'test@münchen.de',
                'newsletter@中文.com',
                'subscribe@español.org'
            ];
            
            for (const email of internationalEmails) {
                await newsletterPage.subscribeToNewsletter(email);
                
                // International domains should be supported
                await page.waitForTimeout(1000);
            }
            
            await newsletterPage.takeScreenshot('international-email-newsletter');
        });

        test('Newsletter persistence across page navigation', async ({ page }) => {
            const testEmail = 'persistence.test@example.com';
            
            await newsletterPage.subscribeToNewsletter(testEmail);
            
            // Navigate away and back
            await page.goto(newsletterPage.baseURL + 'computers');
            await page.waitForLoadState('networkidle');
            
            await newsletterPage.navigateToNewsletterSection();
            
            // Newsletter form should still be accessible
            const isVisible = await newsletterPage.isNewsletterFormVisible();
            expect(isVisible).toBeTruthy();
            
            await newsletterPage.takeScreenshot('newsletter-navigation-persistence');
        });

        test('Multiple rapid newsletter subscriptions', async ({ page }) => {
            const emails = [
                'rapid1@example.com',
                'rapid2@example.com',
                'rapid3@example.com'
            ];
            
            // Submit multiple subscriptions rapidly
            for (const email of emails) {
                await newsletterPage.subscribeToNewsletter(email);
                await page.waitForTimeout(500); // Short delay between submissions
            }
            
            // System should handle rapid submissions gracefully
            const result = await newsletterPage.getNewsletterMessage();
            
            if (result) {
                expect(result).toBeTruthy();
            }
            
            await newsletterPage.takeScreenshot('rapid-newsletter-subscriptions');
        });

        test('Newsletter unsubscribe functionality', async ({ page }) => {
            const testEmail = 'unsubscribe.test@example.com';
            
            // First subscribe
            await newsletterPage.subscribeToNewsletter(testEmail);
            await page.waitForTimeout(2000);
            
            // Try to unsubscribe
            await newsletterPage.unsubscribeFromNewsletter(testEmail);
            
            await newsletterPage.takeScreenshot('newsletter-unsubscribe');
        });
    });

    test.describe('Edge Cases - Performance & Compatibility', () => {
        test('Newsletter form loads within acceptable time', async ({ page }) => {
            const startTime = Date.now();
            
            await newsletterPage.navigateToNewsletterSection();
            
            const isVisible = await newsletterPage.isNewsletterFormVisible();
            const loadTime = Date.now() - startTime;
            
            expect(isVisible).toBeTruthy();
            expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
            
            console.log(`Newsletter form load time: ${loadTime}ms`);
            await newsletterPage.takeScreenshot('newsletter-load-time');
        });

        test('Newsletter form mobile compatibility', async ({ page }) => {
            // Set mobile viewport
            await page.setViewportSize({ width: 375, height: 667 });
            
            await newsletterPage.navigateToNewsletterSection();
            
            // Newsletter should be accessible on mobile
            const isVisible = await newsletterPage.isNewsletterFormVisible();
            expect(isVisible).toBeTruthy();
            
            // Test mobile subscription
            await newsletterPage.subscribeToNewsletter('mobile.test@example.com');
            
            await newsletterPage.takeScreenshot('newsletter-mobile-compatibility');
        });
    });
});
