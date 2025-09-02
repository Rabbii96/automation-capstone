// Global teardown for Playwright tests
async function globalTeardown(config) {
    console.log('✅ NopCommerce Automation Tests Completed!');
    console.log('📊 View detailed reports: npx playwright show-report');
    console.log('🔍 Test artifacts saved in test-results/');
}

module.exports = globalTeardown;
