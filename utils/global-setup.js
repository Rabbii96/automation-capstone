// Global setup for Playwright tests
async function globalSetup(config) {
    console.log('🚀 Starting NopCommerce Automation Tests...');
    console.log('📝 Test Environment: https://demo.nopcommerce.com/');
    console.log('🌐 Browsers: Chrome, Firefox, Safari, Edge');
    console.log('📊 Reports will be generated in playwright-report/');
}

module.exports = globalSetup;
