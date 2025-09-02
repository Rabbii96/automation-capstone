# 🚀 NopCommerce E-Commerce Automation Testing Project

![Playwright](https://img.shields.io/badge/Playwright-2D4058?style=for-the-badge&logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

> **Comprehensive automation testing suite for NopCommerce demo e-commerce website using Playwright framework with cross-browser support and professional QA engineering practices.**

## 📊 Project Overview

This capstone project implements end-to-end automation testing for the NopCommerce demo e-commerce platform. The project demonstrates professional QA engineering skills with comprehensive test coverage, cross-browser testing, and industry-standard reporting.

### 🎯 Key Metrics
- **480 Total Test Cases** across 6 browser configurations
- **8 Core Features** automated with complete coverage
- **68+ Unique Test Scenarios** covering pass/fail/edge cases
- **Cross-Browser Testing** (Chrome, Firefox, Safari, Edge, Mobile)
- **Page Object Model** architecture for maintainable code
- **Data-Driven Testing** with JSON test data files

## 🎯 Testing Scope

### 8 Key Features Automated:

1. **🔐 User Login** - Critical for user authentication and session management
2. **🔍 Product Search** - Core functionality for product discovery
3. **🛒 Shopping Cart** - Essential for e-commerce purchase flow
4. **❤️ Wishlist** - Important for user engagement and future purchases
5. **💱 Currency Change** - Supports international users
6. **📧 Newsletter Subscription** - Marketing and customer retention
7. **👤 User Registration** - New customer onboarding
8. **🧭 Site Navigation** - Basic accessibility and usability

## 🏗️ Project Structure

```
├── pages/                  # Page Object Model classes
│   ├── BasePage.js        # Base page with common functionality
│   ├── LoginPage.js       # Login page interactions
│   ├── SearchPage.js      # Search functionality
│   ├── CartPage.js        # Shopping cart operations
│   ├── WishlistPage.js    # Wishlist management
│   ├── CurrencyPage.js    # Currency switching
│   ├── NewsletterPage.js  # Newsletter subscription
│   └── RegistrationPage.js # User registration
├── tests/                 # Test specifications
│   ├── site-navigation.spec.js # Site accessibility & navigation tests
│   ├── login.spec.js      # Login functionality tests
│   ├── search.spec.js     # Search functionality tests
│   ├── cart.spec.js       # Shopping cart tests
│   ├── wishlist.spec.js   # Wishlist functionality tests
│   ├── currency.spec.js   # Currency change tests
│   ├── newsletter.spec.js # Newsletter subscription tests
│   └── registration.spec.js # User registration tests
├── test-data/            # Test data files
│   ├── loginData.json    # Login test data
│   ├── registrationData.json # Registration test data
│   ├── searchData.json   # Search test data
│   └── newsletterData.json # Newsletter test data
├── utils/                # Utility functions
│   ├── TestUtils.js      # Common test utilities
│   ├── global-setup.js   # Global test setup
│   └── global-teardown.js # Global test teardown
├── screenshots/          # Test screenshots
├── docs/                 # Documentation
└── playwright-report/    # Generated test reports
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Git
- Windows/macOS/Linux

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rabbii96/nopcommerce-automation-testing.git
   cd nopcommerce-automation-testing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 🏃‍♂️ Running Tests

### Quick Commands
```bash
# Run all tests
npm test

# Run tests by browser
npm run test:chrome
npm run test:firefox
npm run test:safari
npm run test:edge
npm run test:mobile

# Run tests in headed mode (visual)
npm run test:headed

# Generate reports
npm run report
```

### Specific Test Execution
```bash
# Run specific feature
npx playwright test tests/login.spec.js
npx playwright test tests/cart.spec.js
npx playwright test tests/newsletter.spec.js

# Run with specific browser
npx playwright test --project=msedge tests/search.spec.js

# Run in headed mode for debugging
npx playwright test --headed tests/registration.spec.js
```

## 📊 Test Coverage & Results

| Feature | Pass Cases | Fail Cases | Edge Cases | Total Tests |
|---------|------------|------------|------------|-------------|
| User Login | 3 | 3 | 3 | 9 |
| Product Search | 3 | 3 | 5 | 11 |
| Shopping Cart | 3 | 3 | 4 | 10 |
| Wishlist | 3 | 2 | 3 | 8 |
| Currency Change | 3 | 1 | 4 | 8 |
| Newsletter | 3 | 3 | 6 | 12 |
| Registration | 3 | 5 | 5 | 13 |
| Navigation | 3 | 1 | 4 | 8 |
| **TOTAL** | **24** | **21** | **34** | **79** |

**Cross-Browser Total: 79 × 6 browsers = 474 test executions**

## 🛠️ Technologies & Tools

- **Test Framework:** Playwright v1.55.0
- **Language:** JavaScript (Node.js)
- **Architecture:** Page Object Model (POM)
- **Reporting:** HTML Reports, Screenshots, Videos, Traces
- **Browsers:** Chrome, Firefox, Safari, Edge, Mobile Chrome, Mobile Safari
- **CI/CD Ready:** GitHub Actions compatible
- **Data-Driven:** JSON test data files

## 🏃‍♂️ Running Tests

### Run All Tests
```powershell
npx playwright test
```

### Run Tests on Specific Browser
```powershell
# Edge browser only
npx playwright test --project=msedge

# Chrome browser only
npx playwright test --project=chromium

# Firefox browser only
npx playwright test --project=firefox
```

### Run Specific Test File
```powershell
# Login tests only
npx playwright test tests/login.spec.js

# Search tests only
npx playwright test tests/search.spec.js

# Cart tests only
npx playwright test tests/cart.spec.js
```

### Run Tests with UI Mode
```powershell
npx playwright test --ui
```

### Run Tests in Debug Mode
```powershell
npx playwright test --debug
```

### Re-run Failed Tests Only
```powershell
npx playwright test --last-failed
```

## 📊 Test Reports

### View HTML Report
```powershell
npx playwright show-report
```

### Generate and View Reports
- **HTML Report**: Automatically generated in `playwright-report/`
- **JSON Report**: Generated as `test-results.json`
- **JUnit Report**: Generated as `test-results.xml`

## 🧪 Test Categories

### Pass Cases (Happy Path)
- Valid user login with correct credentials
- Successful product search with existing terms
- Adding products to cart and wishlist
- Currency changes with valid selections
- Newsletter subscription with valid email

### Fail Cases (Negative Testing)
- Login with invalid credentials
- Search for non-existent products
- Invalid email formats for newsletter
- Attempting unauthorized operations

### Edge Cases (Boundary Testing)
- Very long input strings
- Empty fields and null values
- Maximum quantity limits
- Special characters and SQL injection attempts
- Browser refresh and session persistence

## 🔧 Configuration

### Test Credentials
- **Email**: frabbif96@gmail.com
- **Password**: 123456

### Browser Configuration
- Desktop Chrome, Firefox, Safari, Edge
- Mobile Chrome and Safari viewports
- Screenshot on failure
- Video recording on failure
- Trace collection on retry

### Timeouts
- Action timeout: 30 seconds
- Navigation timeout: 30 seconds
- Global test timeout: 60 seconds

## 📈 Test Metrics & Coverage

### Features Coverage
- ✅ User Authentication (Login/Logout)
- ✅ Product Search (Basic & Advanced)
- ✅ Shopping Cart Management
- ✅ Wishlist Operations
- ✅ Currency Switching
- ✅ Newsletter Subscription
- ✅ User Registration
- ✅ Site Navigation & Accessibility

### Test Scenarios
- **Total Test Cases**: 79 automated scenarios
- **Pass Cases**: 24 scenarios (positive flow testing)
- **Fail Cases**: 21 scenarios (negative validation testing)  
- **Edge Cases**: 34 scenarios (boundary & unexpected behavior testing)

## 🏆 Project Highlights

### Academic Excellence
- **Capstone Project Grade**: 400/400 marks + 40 bonus = 440/400
- **Feature Selection**: Complete business justification for each feature
- **Documentation**: Professional-grade documentation for academic submission
- **QA Standards**: Industry-standard testing practices and methodologies

### Technical Excellence
- **Cross-Browser Testing**: 6 different browser configurations
- **Mobile Testing**: Responsive design testing on mobile viewports
- **Error Handling**: Comprehensive error capturing with screenshots and videos
- **Performance Testing**: Page load time validation and performance metrics
- **Accessibility Testing**: Keyboard navigation and accessibility compliance

### Professional Features
- **Page Object Model**: Clean, maintainable code architecture
- **Data-Driven Testing**: Externalized test data in JSON format
- **Parallel Execution**: Efficient test execution across multiple browsers
- **Detailed Reporting**: HTML reports with traces, screenshots, and videos
- **CI/CD Ready**: Configured for continuous integration pipelines

## 🐛 Troubleshooting

### Common Issues

1. **Browser Not Installed**
   ```bash
   npx playwright install msedge
   npx playwright install chromium
   ```

2. **Tests Timing Out**
   - Increase timeout in `playwright.config.js`
   - Check network connectivity to demo site

3. **Dependency Issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Path Issues**
   - Ensure all file paths use forward slashes
   - Check working directory

## 📈 Future Enhancements

- [ ] API Testing Integration
- [ ] Visual Regression Testing
- [ ] Performance Testing Suite
- [ ] CI/CD Pipeline (GitHub Actions)
- [ ] Docker Containerization
- [ ] Allure Reporting
- [ ] Database Testing
- [ ] Security Testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rabbii96**
- GitHub: [@Rabbii96](https://github.com/Rabbii96)
- Email: frabbif96@gmail.com

## 🙏 Acknowledgments

- NopCommerce for providing the demo e-commerce platform
- Playwright team for the excellent testing framework
- Academic institution for the capstone project opportunity
- Open source community for tools and inspiration

---

⭐ **If you find this project helpful, please give it a star!** ⭐
   - Check internet connection
   - Increase timeout in playwright.config.js

3. **Screenshot Directory Missing**
   - Screenshots folder is auto-created
   - Ensure write permissions

### Debug Commands
```powershell
# Run with verbose logging
npx playwright test --reporter=list

# Run single test with trace
npx playwright test tests/login.spec.js --trace on

# Generate trace viewer
npx playwright show-trace trace.zip
```

## 📝 Test Data Management

### Data-Driven Testing
- JSON files contain test data for different scenarios
- Random data generation for unique test runs
- Parameterized tests for multiple data sets

### Test Data Files
- `loginData.json`: Valid/invalid login credentials
- `registrationData.json`: User registration data
- `searchData.json`: Search terms and filters

## 🎬 Video Recording

### Recording Configuration
- Videos recorded only on test failure
- Saved in `test-results/` directory
- MP4 format with full test execution

### Manual Video Recording
```powershell
npx playwright test --video=on
```

## 🚦 Continuous Integration

### GitHub Actions Support
- Tests can run on push/pull request
- Multi-browser execution
- Artifact collection (reports, screenshots, videos)

## 📚 Additional Resources

### Playwright Documentation
- [Playwright Official Docs](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-test)

### Test Automation Patterns
- Page Object Model implementation
- Data-driven testing approach
- Screenshot and error handling
- Cross-browser compatibility testing
