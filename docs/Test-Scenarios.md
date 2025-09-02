# Test Scenarios Documentation
## NopCommerce Automation Testing Project

This document outlines the detailed test scenarios for each of the 8 automated features. Each feature includes Pass Cases (positive flow), Fail Cases (negative validation), and Edge Cases (boundary/unexpected behavior).

---

## 🔐 1. User Login Authentication

### Pass Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Valid Login | User is on login page | 1. Enter valid email (frabbif96@gmail.com)<br>2. Enter valid password (123456)<br>3. Click Login button | User successfully logs in, redirected to account page, "My Account" link visible |
| Login with Remember Me | User is on login page | 1. Enter valid credentials<br>2. Check "Remember Me" checkbox<br>3. Click Login button | User logs in successfully, session persists for extended period |
| Successful Logout | User is logged in | 1. Click "Log out" link | User logged out, redirected to home page, login link visible again |

### Fail Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Invalid Credentials | User is on login page | 1. Enter invalid email<br>2. Enter invalid password<br>3. Click Login button | Error message displayed: "Login was unsuccessful", user remains on login page |
| Invalid Email Format | User is on login page | 1. Enter malformed email (notanemail)<br>2. Enter valid password<br>3. Click Login button | Validation error for email format, login blocked |
| Empty Credentials | User is on login page | 1. Leave email field empty<br>2. Leave password field empty<br>3. Click Login button | Validation errors for required fields displayed |

### Edge Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Very Long Email | User is on login page | 1. Enter extremely long email (250+ chars)<br>2. Enter valid password<br>3. Attempt login | System handles gracefully, shows appropriate error or truncates input |
| Very Long Password | User is on login page | 1. Enter valid email<br>2. Enter extremely long password (1000+ chars)<br>3. Attempt login | System handles gracefully without breaking |
| Multiple Failed Attempts | User is on login page | 1. Attempt login with wrong credentials 5+ times | System may implement rate limiting or account lockout |

---

## 🔍 2. Product Search Functionality

### Pass Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Basic Product Search | User is on home page | 1. Enter "laptop" in search box<br>2. Click search button | Relevant products displayed, results count > 0 |
| Search Multiple Terms | User is on home page | 1. Search for "computer"<br>2. Search for "phone"<br>3. Search for "camera" | Each search returns relevant results |
| Advanced Search | User is on search page | 1. Navigate to advanced search<br>2. Enter search term<br>3. Select category filter<br>4. Set price range<br>5. Submit search | Filtered results match all criteria |

### Fail Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Non-existent Product | User is on home page | 1. Search for "xyznonexistentproduct"<br>2. Click search button | "No products were found" message displayed |
| Special Characters Search | User is on home page | 1. Enter "!@#$%^&*()" in search<br>2. Click search button | No results found, system handles gracefully |
| SQL Injection Attempt | User is on home page | 1. Enter SQL injection string<br>2. Submit search | System prevents injection, returns safe error message |

### Edge Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Empty Search | User is on home page | 1. Leave search box empty<br>2. Click search button | System handles empty search appropriately |
| Single Character Search | User is on home page | 1. Enter single character "a"<br>2. Submit search | System processes single character search |
| Very Long Search Term | User is on home page | 1. Enter 500+ character search term<br>2. Submit search | System handles long input without breaking |
| Search with Spaces | User is on home page | 1. Enter "   laptop   " (with spaces)<br>2. Submit search | System trims spaces and returns relevant results |

---

## 🛒 3. Shopping Cart Management

### Pass Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Add Single Product | User is on product page | 1. Navigate to product details<br>2. Click "Add to cart"<br>3. Navigate to cart | Product appears in cart, quantity = 1, price displayed |
| Add Multiple Products | User browsing products | 1. Add first product to cart<br>2. Navigate to different product<br>3. Add second product to cart<br>4. Check cart | Both products in cart with correct quantities and prices |
| Update Quantity | User has items in cart | 1. Navigate to cart<br>2. Change quantity to 3<br>3. Click update cart | Quantity updated, total price recalculated |

### Fail Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Invalid Quantity | User on product page | 1. Enter negative quantity (-1)<br>2. Try to add to cart | Error message or quantity defaults to 1 |
| Zero Quantity Update | User has items in cart | 1. Change quantity to 0<br>2. Update cart | Item removed from cart or error displayed |
| Invalid Discount Code | User has items in cart | 1. Enter invalid discount code<br>2. Apply discount | Error message: "Invalid discount code" |

### Edge Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Maximum Quantity | User on product page | 1. Enter maximum allowed quantity (999)<br>2. Add to cart | System accepts up to maximum or shows limit message |
| Remove All Items | User has multiple items in cart | 1. Remove all items one by one | Cart becomes empty, "Your cart is empty" message |
| Cart After Browser Refresh | User has items in cart | 1. Refresh browser<br>2. Check cart contents | Cart persists, items remain |

---

## 💝 4. Wishlist Operations

### Pass Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Add to Wishlist | User on product page | 1. Click "Add to wishlist" button<br>2. Navigate to wishlist | Product appears in wishlist |
| Multiple Wishlist Items | User browsing products | 1. Add multiple products to wishlist<br>2. Check wishlist | All products appear in wishlist |
| Move to Cart from Wishlist | User has items in wishlist | 1. Select item in wishlist<br>2. Choose "Add to cart"<br>3. Check cart | Item moved to cart, removed from wishlist |

### Fail Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Duplicate Wishlist Addition | User has item in wishlist | 1. Try to add same item again | System prevents duplicate or shows message |
| Empty Wishlist Access | User has empty wishlist | 1. Navigate to wishlist page | "Your wishlist is empty" message displayed |

### Edge Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Remove All Wishlist Items | User has multiple wishlist items | 1. Remove all items from wishlist | Wishlist becomes empty |
| Wishlist Persistence | User has wishlist items | 1. Close browser<br>2. Reopen and check wishlist | Wishlist items persist (for logged-in users) |
| Maximum Wishlist Items | User browsing products | 1. Add maximum allowed items to wishlist | System handles limit gracefully |

---

## 💱 5. Currency Change System

### Pass Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Change to Euro | User on any page | 1. Select Euro from currency dropdown<br>2. Navigate to product page | Prices displayed in Euro currency |
| Currency Symbol Display | User changed currency | 1. Browse different product pages | Correct currency symbol appears with all prices |
| Currency Persistence | User changed currency | 1. Navigate between pages<br>2. Check price displays | Currency selection persists across navigation |

### Fail Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Invalid Currency Selection | User on currency dropdown | 1. Attempt to select non-existent currency value | System rejects invalid selection or defaults to valid currency |

### Edge Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Rapid Currency Changes | User on product page | 1. Quickly change currency multiple times<br>2. Check final display | Final currency is correctly applied |
| Currency with Empty Cart | User has empty cart | 1. Change currency<br>2. Check cart page | Currency setting maintained even with empty cart |
| Currency with Items in Cart | User has cart items | 1. Change currency<br>2. Check cart prices | Cart prices update to new currency |

---

## 📧 6. Newsletter Subscription

### Pass Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Valid Email Subscription | User on home page | 1. Enter valid email in newsletter field<br>2. Click subscribe | Success message: "Thank you for subscribing" |
| Footer Newsletter | User on any page | 1. Scroll to footer<br>2. Enter email in newsletter field<br>3. Subscribe | Subscription successful |

### Fail Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Invalid Email Format | User on newsletter section | 1. Enter invalid email format<br>2. Click subscribe | Error message for invalid email format |
| Empty Email Field | User on newsletter section | 1. Leave email field empty<br>2. Click subscribe | Validation error for required field |
| Already Subscribed Email | User previously subscribed | 1. Enter already subscribed email<br>2. Click subscribe | Message indicating already subscribed |

### Edge Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Very Long Email | User on newsletter section | 1. Enter extremely long email<br>2. Attempt subscription | System handles gracefully with appropriate validation |
| Special Characters in Email | User on newsletter section | 1. Enter email with special characters<br>2. Subscribe | Valid special characters accepted, invalid ones rejected |

---

## 👤 7. User Registration Process

### Pass Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Complete Registration | User on registration page | 1. Fill all required fields<br>2. Select gender<br>3. Enter personal details<br>4. Set date of birth<br>5. Enter valid email<br>6. Set strong password<br>7. Confirm password<br>8. Submit form | Registration successful, confirmation message displayed |
| Minimal Required Fields | User on registration page | 1. Fill only mandatory fields<br>2. Submit registration | Registration successful with minimum data |

### Fail Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Empty Required Fields | User on registration page | 1. Leave required fields empty<br>2. Submit form | Validation errors for all required fields |
| Password Mismatch | User on registration page | 1. Enter password in first field<br>2. Enter different password in confirm field<br>3. Submit | Error: "Passwords do not match" |
| Invalid Email Format | User on registration page | 1. Enter invalid email format<br>2. Complete other fields<br>3. Submit | Email validation error |
| Existing Email | User on registration page | 1. Enter already registered email<br>2. Complete form<br>3. Submit | Error: "Email already exists" |

### Edge Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Very Long Names | User on registration page | 1. Enter extremely long first/last names<br>2. Submit form | System handles long names appropriately |
| Very Short Names | User on registration page | 1. Enter single character names<br>2. Submit form | System validates minimum name length |
| Future Birth Date | User on registration page | 1. Select future date for birth date<br>2. Submit form | Validation error for invalid birth date |
| Special Characters in Names | User on registration page | 1. Enter names with special characters<br>2. Submit form | System handles special characters appropriately |

---

## 🧭 8. Site Navigation & Accessibility

### Pass Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Main Navigation | User on home page | 1. Click each main navigation link<br>2. Verify page loads | All navigation links work, pages load correctly |
| Breadcrumb Navigation | User on product page | 1. Navigate deep into site<br>2. Use breadcrumb links | Breadcrumbs function correctly for navigation |
| Footer Links | User on any page | 1. Click footer links<br>2. Verify destinations | All footer links navigate to correct pages |

### Fail Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Broken Links | User browsing site | 1. Click suspicious links<br>2. Check for 404 errors | No broken links found, all links functional |

### Edge Cases
| Scenario | Precondition | Test Steps | Expected Result |
|----------|--------------|------------|-----------------|
| Mobile Navigation | User on mobile viewport | 1. Test navigation on mobile size<br>2. Use hamburger menu | Mobile navigation works correctly |
| Keyboard Navigation | User using keyboard only | 1. Navigate using Tab key<br>2. Use Enter/Space to activate | All elements accessible via keyboard |
| Back Button Functionality | User navigated through site | 1. Use browser back button<br>2. Verify correct navigation | Back button works correctly |
| Page Load Performance | User on slow connection | 1. Navigate to various pages<br>2. Monitor load times | Pages load within acceptable time limits |

---

## 📊 Test Scenario Summary

| Feature | Pass Cases | Fail Cases | Edge Cases | Total Scenarios |
|---------|------------|------------|------------|-----------------|
| User Login | 3 | 3 | 3 | 9 |
| Product Search | 3 | 3 | 4 | 10 |
| Shopping Cart | 3 | 3 | 3 | 9 |
| Wishlist | 3 | 2 | 3 | 8 |
| Currency Change | 3 | 1 | 3 | 7 |
| Newsletter | 2 | 3 | 2 | 7 |
| User Registration | 2 | 4 | 4 | 10 |
| Site Navigation | 3 | 1 | 4 | 8 |
| **TOTAL** | **22** | **20** | **26** | **68** |

This comprehensive test suite ensures thorough coverage of critical e-commerce functionality with appropriate positive, negative, and boundary testing scenarios.
