# 🚀 NopCommerce E-Commerce Automation Testing Project

![Playwright](https://img.shields.io/badge/Playwright-2D4058?style=for-the-badge&logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

> **Comprehensive automation testing suite for NopCommerce demo e-commerce website using Playwright framework with cross-browser support and professional QA engineering practices.**

---

## 📋 Table of Contents

1. [📊 Project Overview](#-project-overview)
2. [🚀 Quick Start Guide](#-quick-start-guide)
3. [🛠️ Installation & Setup](#-installation--setup)
4. [🏃‍♂️ Running Tests](#-running-tests)
5. [🏗️ Project Structure](#-project-structure)
6. [🎯 Features Tested](#-features-tested)
7. [📊 Test Coverage & Results](#-test-coverage--results)
8. [🛠️ Technologies & Tools](#-technologies--tools)
9. [🧪 Test Configuration](#-test-configuration)
10. [🐛 Troubleshooting](#-troubleshooting)
11. [🏆 Project Highlights](#-project-highlights)
12. [📈 Future Enhancements](#-future-enhancements)
13. [🤝 Contributing](#-contributing)
14. [📄 License & Author](#-license--author)

---

## 📊 Project Overview

This capstone project implements end-to-end automation testing for the NopCommerce demo e-commerce platform. The project demonstrates professional QA engineering skills with comprehensive test coverage, cross-browser testing, and industry-standard reporting.

### 🎯 Key Metrics
- **474 Total Test Cases** across 6 browser configurations
- **8 Core Features** automated with complete coverage
- **79 Unique Test Scenarios** covering pass/fail/edge cases
- **Cross-Browser Testing** (Chrome, Firefox, Safari, Edge, Mobile)
- **Page Object Model** architecture for maintainable code
- **Data-Driven Testing** with JSON test data files

### 🏆 Academic Achievement
- **Grade**: 440/400 marks (110% score)
- **Professional Documentation** for academic submission
- **Industry-Standard QA Practices**

---

## 🚀 Quick Start Guide

### Step 1: Prerequisites
Before starting, ensure you have:
- ✅ **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- ✅ **Git** - [Download here](https://git-scm.com/)
- ✅ **Operating System**: Windows/macOS/Linux

### Step 2: Clone & Install
```bash
# Clone the repository
git clone https://github.com/Rabbii96/automation-capstone.git

# Navigate to project directory
cd automation-capstone

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Step 3: Run Your First Test
```bash
# Run all tests
npm test

# Run a specific test
npx playwright test tests/login.spec.js

# Run with visual UI
npx playwright test --ui
```

### Step 4: View Results
```bash
# Open HTML report
npx playwright show-report
```

---

## 🛠️ Installation & Setup

### Method 1: Automatic Setup (Recommended)
```bash
# One-command setup (Windows PowerShell)
git clone https://github.com/Rabbii96/automation-capstone.git; cd automation-capstone; npm install; npx playwright install

# One-command setup (macOS/Linux)
git clone https://github.com/Rabbii96/automation-capstone.git && cd automation-capstone && npm install && npx playwright install
```

### Method 2: Step-by-Step Setup

#### Step 1: Clone Repository
```bash
git clone https://github.com/Rabbii96/automation-capstone.git
cd automation-capstone
```

#### Step 2: Install Node Dependencies
```bash
npm install
```

#### Step 3: Install Browser Engines
```bash
# Install all browsers
npx playwright install

# Or install specific browsers
npx playwright install chromium firefox webkit msedge
```

#### Step 4: Verify Installation
```bash
# Check Playwright installation
npx playwright --version

# Run a quick test
npx playwright test tests/login.spec.js --headed
```

---

## 🏃‍♂️ Running Tests

### Basic Commands
```bash
# Run all tests (default: all browsers)
npm test

# Run all tests with HTML report
npm test && npx playwright show-report
```

### Browser-Specific Testing
```bash
# Test individual browsers
npm run test:chrome     # Google Chrome
npm run test:firefox    # Mozilla Firefox  
npm run test:safari     # Safari (macOS only)
npm run test:edge       # Microsoft Edge
npm run test:mobile     # Mobile browsers
```

### Feature-Specific Testing
```bash
# Test individual features
npx playwright test tests/login.spec.js        # Authentication tests
npx playwright test tests/search.spec.js       # Search functionality
npx playwright test tests/cart.spec.js         # Shopping cart tests
npx playwright test tests/wishlist.spec.js     # Wishlist management
npx playwright test tests/currency.spec.js     # Currency switching
npx playwright test tests/newsletter.spec.js   # Newsletter subscription
npx playwright test tests/registration.spec.js # User registration
npx playwright test tests/site-navigation.spec.js # Navigation tests
```

### Advanced Testing Options
```bash
# Visual debugging (opens browser)
npx playwright test --headed

# Interactive UI mode
npx playwright test --ui

# Debug specific test
npx playwright test tests/login.spec.js --debug

# Run failed tests only
npx playwright test --last-failed

# Run with specific project
npx playwright test --project=chromium

# Record video for all tests
npx playwright test --video=on
```

### Reporting Commands
```bash
# Generate and open HTML report
npx playwright show-report

# Generate JSON report
npx playwright test --reporter=json

# Generate JUnit XML report  
npx playwright test --reporter=junit
```

---

## 🏗️ Project Structure

```
automation-capstone/
├── 📁 pages/                    # Page Object Model classes
│   ├── BasePage.js             # Base page with common functionality  
│   ├── LoginPage.js            # Login page interactions
│   ├── SearchPage.js           # Search functionality
│   ├── CartPage.js             # Shopping cart operations
│   ├── WishlistPage.js         # Wishlist management
│   ├── CurrencyPage.js         # Currency switching
│   ├── NewsletterPage.js       # Newsletter subscription
│   └── RegistrationPage.js     # User registration
│
├── 📁 tests/                   # Test specifications
│   ├── login.spec.js           # ✅ Login functionality tests
│   ├── search.spec.js          # ✅ Search functionality tests  
│   ├── cart.spec.js            # ✅ Shopping cart tests
│   ├── wishlist.spec.js        # ✅ Wishlist functionality tests
│   ├── currency.spec.js        # ✅ Currency change tests
│   ├── newsletter.spec.js      # ✅ Newsletter subscription tests
│   ├── registration.spec.js    # ✅ User registration tests
│   └── site-navigation.spec.js # ✅ Site accessibility & navigation
│
├── 📁 test-data/               # JSON test data files
│   ├── loginData.json          # Login test scenarios
│   ├── registrationData.json   # Registration test data
│   ├── searchData.json         # Search test parameters  
│   └── newsletterData.json     # Newsletter test data
│
├── 📁 utils/                   # Utility functions & helpers
│   ├── TestUtils.js            # Common test utilities
│   ├── global-setup.js         # Global test setup configuration
│   └── global-teardown.js      # Global test cleanup
│
├── 📁 screenshots/             # Test failure screenshots
├── 📁 playwright-report/       # Generated HTML test reports
├── 📁 test-results/           # Test execution results & traces
├── 📁 docs/                   # Project documentation
│   ├── Feature-Selection.md    # Original feature selection rationale
│   ├── Feature-Business-Justification.md # 📋 Comprehensive business analysis
│   ├── Feature-Business-Justification-GoogleDocs.txt # Google Docs format
│   └── Test-Scenarios.md      # Detailed test case documentation
│
├── 📄 playwright.config.js     # Playwright configuration
├── 📄 package.json            # Node.js dependencies & scripts
├── 📄 README.md               # This file
└── 📄 LICENSE                 # MIT License
```

---

## 🎯 Features Tested

### 8 Core Features with Business Justification

| Feature | Purpose | Business Impact | Test Scenarios |
|---------|---------|-----------------|----------------|
| 🔐 **User Login** | Authentication & session management | Critical for user access | 9 scenarios |
| 🔍 **Product Search** | Core functionality for product discovery | Essential for sales | 11 scenarios |
| 🛒 **Shopping Cart** | E-commerce purchase flow | Direct revenue impact | 10 scenarios |
| ❤️ **Wishlist** | User engagement & future purchases | Customer retention | 8 scenarios |
| 💱 **Currency Change** | International market support | Global expansion | 8 scenarios |
| 📧 **Newsletter** | Marketing & customer retention | Marketing effectiveness | 12 scenarios |
| 👤 **User Registration** | New customer onboarding | User acquisition | 13 scenarios |
| 🧭 **Site Navigation** | Accessibility & usability | User experience | 8 scenarios |

📋 **Detailed Business Justification**: See [Feature-Business-Justification.md](docs/Feature-Business-Justification.md) for comprehensive analysis of each feature's business value, QA benefits, and risk mitigation strategies.

### Feature Categories

#### 🔴 Critical Features (Revenue Impact)
- **User Login**: Customer account access and security
- **Product Search**: Primary product discovery method
- **Shopping Cart**: Direct purchase functionality
- **User Registration**: Customer acquisition pipeline
- **Site Navigation**: Foundation for all interactions

#### 🟡 High-Value Features (Customer Experience)
- **Wishlist**: User engagement and retention
- **Currency Switching**: International market support
- **Newsletter**: Marketing and communication channel

---

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

### Test Methodology
- **✅ Pass Cases (24)**: Happy path scenarios validating expected functionality
- **❌ Fail Cases (21)**: Negative testing ensuring proper error handling
- **⚠️ Edge Cases (34)**: Boundary testing for unexpected scenarios

---

## 🛠️ Technologies & Tools

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Playwright v1.55.0 | Cross-browser automation testing |
| **Language** | JavaScript (Node.js) | Test script development |
| **Architecture** | Page Object Model | Maintainable and scalable code structure |
| **Browsers** | Chrome, Firefox, Safari, Edge | Cross-browser compatibility testing |
| **Mobile** | Mobile Chrome, Mobile Safari | Responsive design testing |
| **Reporting** | HTML, JSON, JUnit XML | Comprehensive test result reporting |
| **Screenshots** | PNG capture on failure | Visual debugging and evidence |
| **Videos** | MP4 recording on failure | Complete test execution recording |
| **CI/CD** | GitHub Actions compatible | Continuous integration ready |
| **Data** | JSON test data files | Data-driven testing approach |

---

## 🧪 Test Configuration

### Test Environment
- **Target Website**: [NopCommerce Demo](https://demo.nopcommerce.com/)
- **Test Credentials**: frabbif96@gmail.com / 123456
- **Base URL**: https://demo.nopcommerce.com/

### Browser Matrix
| Browser | Desktop | Mobile | Viewport |
|---------|---------|--------|----------|
| Chromium | ✅ | ✅ | 1280x720 / 375x667 |
| Firefox | ✅ | ❌ | 1280x720 |
| Safari | ✅ | ✅ | 1280x720 / 375x667 |
| Edge | ✅ | ❌ | 1280x720 |

### Timeout Settings
- **Action Timeout**: 30 seconds
- **Navigation Timeout**: 30 seconds  
- **Test Timeout**: 60 seconds
- **Global Timeout**: 30 minutes

### Error Handling
- **Screenshots**: Captured automatically on test failure
- **Videos**: Recorded for failed tests in headless mode
- **Traces**: Generated for debugging with --trace flag
- **Retries**: Configured for 2 retries on failure

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. Browser Installation Issues
```bash
# Install missing browsers
npx playwright install
npx playwright install chromium firefox webkit msedge

# Check browser installation
npx playwright install --help
```

#### 2. Test Failures
```bash
# Run tests in headed mode to see what's happening
npx playwright test --headed

# Run with debug mode for step-by-step execution
npx playwright test --debug tests/login.spec.js

# Check test results and screenshots
npx playwright show-report
```

#### 3. Network/Connectivity Issues
```bash
# Test with increased timeout
npx playwright test --timeout=60000

# Run single test to isolate issues
npx playwright test tests/login.spec.js --headed
```

#### 4. Permission Issues
```bash
# On Windows, run as administrator
# On macOS/Linux, check file permissions
chmod +x node_modules/.bin/playwright
```

#### 5. Node.js Version Issues
```bash
# Check Node.js version (should be 16+)
node --version

# Update Node.js if needed
# Visit: https://nodejs.org/
```

### Debug Commands
```bash
# Verbose logging
npx playwright test --reporter=list

# Generate trace for failed tests
npx playwright test --trace=on-first-retry

# View trace files
npx playwright show-trace trace.zip
```

### Performance Tips
- Use `--workers=1` for debugging to run tests sequentially
- Use `--headed` mode only for debugging (slower execution)
- Clear browser data between tests with global setup/teardown
- Use specific selectors to improve test reliability

---

## 🏆 Project Highlights

### Academic Excellence
- **Capstone Project Grade**: 440/400 marks (110% achievement)
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

---

## 📈 Future Enhancements

### Planned Improvements
- [ ] **API Testing Integration**: Add REST API testing for backend validation
- [ ] **Visual Regression Testing**: Implement screenshot comparison testing
- [ ] **Performance Testing Suite**: Add load testing and performance monitoring
- [ ] **CI/CD Pipeline**: GitHub Actions workflow for automated testing
- [ ] **Docker Containerization**: Containerized test execution environment
- [ ] **Allure Reporting**: Enhanced reporting with Allure framework
- [ ] **Database Testing**: Direct database validation for data integrity
- [ ] **Security Testing**: Automated security vulnerability scanning

### Potential Extensions
- Integration with test management tools (TestRail, Zephyr)
- Slack/Teams notifications for test results
- Custom test data generation
- Multi-environment testing (staging, production)

---

## 🤝 Contributing

We welcome contributions to improve this automation testing project!

### How to Contribute
1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/automation-capstone.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Add new test scenarios
   - Improve existing tests
   - Update documentation
   - Fix bugs

4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide clear description of changes
   - Include screenshots if applicable
   - Reference any related issues

### Contribution Guidelines
- Follow existing code style and patterns
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License & Author

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Author
**Rabbii96**
- 🐙 GitHub: [@Rabbii96](https://github.com/Rabbii96)
- 📧 Email: frabbif96@gmail.com
- 🎓 Academic Project: Automation Testing Capstone
- 🏆 Achievement: 440/400 marks (110% score)

### Acknowledgments
- **NopCommerce** for providing the demo e-commerce platform
- **Playwright Team** for the excellent testing framework
- **Academic Institution** for the capstone project opportunity
- **Open Source Community** for tools and inspiration

---

## 🌟 Repository Stats

![GitHub stars](https://img.shields.io/github/stars/Rabbii96/automation-capstone?style=social)
![GitHub forks](https://img.shields.io/github/forks/Rabbii96/automation-capstone?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Rabbii96/automation-capstone?style=social)

⭐ **If you find this project helpful, please give it a star!** ⭐

---

**Last Updated**: September 5, 2025  
**Project Status**: ✅ Complete and Ready for Academic Submission  
**Total Files**: 35+ files with comprehensive test coverage  
**Repository**: https://github.com/Rabbii96/automation-capstone
