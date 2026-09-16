import { test, expect } from "../fixtures/fixtures";
import { PageManager } from "../page-objects/page-manager";

test.describe('Checkout Page', () => {

    test('TC-001 — Verify Checkout Information page is displayed', async ({ pageManager }) => {
    
        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Backpack');
    
        // Go to the cart
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Verify that the URL contains 'checkout-step-one.html'
        expect(pageManager.page.url()).toContain('checkout-step-one.html');
    
        // Verify that the 'Checkout: Your Information' title is visible
        await expect(pageManager.checkoutPage().checkoutPageTitle).toBeVisible();
    
    });
    
    test('TC-002a — Verify required fields validation', async ({ pageManager }) => {
    
        // Go to the cart with no products added
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Click the 'Continue' button without filling in the fields
        await pageManager.checkoutPage().clickContinueButton();
    
        // Verify that the error message is displayed
        await expect(pageManager.checkoutPage().errorMessage).toBeVisible();
    
        // Verify that the user is still on the Checkout page
        expect(page.url()).toContain('checkout-step-one.html');
    
    });
    
    test('TC-002b — Empty First Name', async ({ pageManager }) => {
    
        // Go to the cart with no products added
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Fill in the Last Name and ZIP Code fields
        await pageManager.checkoutPage().fillLastName('Ted');
        await pageManager.checkoutPage().fillZipCode('1145');
    
        // Click the 'Continue' button
        await pageManager.checkoutPage().clickContinueButton();
    
        // Verify that the error message is displayed
        await expect(pageManager.checkoutPage().errorMessage).toBeVisible();
        expect(await pageManager.checkoutPage().errorMessage.textContent()).toContain('Error: First Name is required');
    
        // Verify that the user is still on the Checkout page
        expect(pageManager.page.url()).toContain('checkout-step-one.html');
    
    });
    
    test('TC-002c — Empty Last Name', async ({ pageManager }) => {
    
        // Go to the cart with no products added
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Fill in the First Name and ZIP Code fields
        await pageManager.checkoutPage().fillFirstName('John');
        await pageManager.checkoutPage().fillZipCode('1145');
    
        // Click the 'Continue' button
        await pageManager.checkoutPage().clickContinueButton();
    
        // Verify that the error message is displayed
        await expect(pageManager.checkoutPage().errorMessage).toBeVisible();
        expect(await pageManager.checkoutPage().errorMessage.textContent()).toContain('Error: Last Name is required');
    
        // Verify that the user is still on the Checkout page
        expect(pageManager.page.url()).toContain('checkout-step-one.html');
    
    });
    
    test('TC-002d — Empty Zipcode', async ({ pageManager }) => {
    
        // Go to the cart with no products added
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Fill in the First Name and Last Name fields
        await pageManager.checkoutPage().fillFirstName('John');
        await pageManager.checkoutPage().fillLastName('Ted');
    
        // Click the 'Continue' button
        await pageManager.checkoutPage().clickContinueButton();
    
        // Verify that the error message is displayed
        await expect(pageManager.checkoutPage().errorMessage).toBeVisible();
        expect(await pageManager.checkoutPage().errorMessage.textContent()).toContain('Error: Postal Code is required');
    
        // Verify that the user is still on the Checkout page
        expect(pageManager.page.url()).toContain('checkout-step-one.html');
    
    });
    
    test('TC-003 — Verify checkout information can be submitted', async ({ pageManager }) => {
    
        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Backpack');
    
        // Go to the cart
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Fill in the First Name, Last Name, and ZIP Code fields
        await pageManager.checkoutPage().fillFirstName('John');
        await pageManager.checkoutPage().fillLastName('Ted');
        await pageManager.checkoutPage().fillZipCode('11145');
    
        // Click the 'Continue' button
        await pageManager.checkoutPage().clickContinueButton();
    
        // Verify that the user is redirected to the next checkout step
        expect(pageManager.page.url()).toContain('checkout-step-two.html');
    
    });
    
    test('TC-004 — Verify checkout overview displays correct product information', async ({ pageManager }) => {
    
        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Backpack');
    
        // Go to the cart
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Fill in the First Name, Last Name, and ZIP Code fields
        await pageManager.checkoutPage().fillFirstName('John');
        await pageManager.checkoutPage().fillLastName('Ted');
        await pageManager.checkoutPage().fillZipCode('11145');
    
        // Click the 'Continue' button
        await pageManager.checkoutPage().clickContinueButton();
    
        // Verify the product name on the Checkout page
        expect(await pageManager.checkoutPage().getProductNameOnCheckoutPage('Sauce Labs Backpack')).toBe('Sauce Labs Backpack');
    
        // Verify the product price on the Checkout page
        expect(await pageManager.checkoutPage().getProductPriceOnCheckoutPage('Sauce Labs Backpack')).toBe('$29.99');
    
        // Verify the product quantity on the Checkout page
        expect(await pageManager.checkoutPage().getProductQuantityOnCheckoutPage('Sauce Labs Backpack')).toBe('1');
    });
    
    test('TC-005 — Verify checkout overview displays correct Payment Information', async ({ pageManager }) => {
    
        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Backpack');
    
        // Go to the cart
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Fill in the First Name, Last Name, and ZIP Code fields
        await pageManager.checkoutPage().fillFirstName('John');
        await pageManager.checkoutPage().fillLastName('Ted');
        await pageManager.checkoutPage().fillZipCode('11145');
    
        // Click the 'Continue' button
        await pageManager.checkoutPage().clickContinueButton();
    
        // Verify that the Payment Information label is visible
        await expect(pageManager.checkoutPage().paymentInformation).toBeVisible();
    
        // Verify that the Payment Information value has the expected format
        expect(await pageManager.checkoutPage().getPaymentInformationValue()).toMatch(/SauceCard #\d+/);
    });
    
    test('TC-006 — Verify shipping information is displayed', async ({ pageManager }) => {
    
        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Backpack');
    
        // Go to the cart
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Fill in the First Name, Last Name, and ZIP Code fields
        await pageManager.checkoutPage().fillFirstName('John');
        await pageManager.checkoutPage().fillLastName('Ted');
        await pageManager.checkoutPage().fillZipCode('11145');
    
        // Click the 'Continue' button
        await pageManager.checkoutPage().clickContinueButton();
    
        // Verify that the Shipping Information label is visible
        await expect(pageManager.checkoutPage().shippingInformation).toBeVisible();
    
        // Verify that the Shipping Information value is not empty
        await expect(pageManager.checkoutPage().shippingInformationValue).not.toBeEmpty();
    });
    
    test('TC-007 — Verify total price', async ({ pageManager }) => {
    
        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Backpack');
    
        // Go to the cart
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Fill in the First Name, Last Name, and ZIP Code fields
        await pageManager.checkoutPage().fillFirstName('John');
        await pageManager.checkoutPage().fillLastName('Ted');
        await pageManager.checkoutPage().fillZipCode('11145');
    
        // Click the 'Continue' button
        await pageManager.checkoutPage().clickContinueButton();
    
        // Verify that the Price, Subtotal, Tax, and Total labels are visible
        await expect(pageManager.checkoutPage().priceTotalLabel).toBeVisible();
        await expect(pageManager.checkoutPage().itemSubTotalLabel).toBeVisible();
        await expect(pageManager.checkoutPage().taxValueLabel).toBeVisible();
        await expect(pageManager.checkoutPage().totalPriceLabel).toBeVisible();
    
        // Get the Subtotal, Tax, and Total values as strings
        const itemSubTotalValue = await pageManager.checkoutPage().getItemSubTotalValue();
        const itemTaxValue = await pageManager.checkoutPage().getItemTaxValue();
        const itemTotalPrice = await pageManager.checkoutPage().getItemTotalPrice();
    
        // Convert the string values to numbers
        const itemSubTotal = Number(itemSubTotalValue?.replace(/[^\d.]/g, ''));
        const itemTax = Number(itemTaxValue?.replace(/[^\d.]/g, ''));
        const itemTotal = Number(itemTotalPrice?.replace(/[^\d.]/g, ''));
    
        // Verify that Total = Subtotal + Tax
        expect(itemTotal).toEqual(itemTax + itemSubTotal);
    
    });
    
    test('TC-008 — Complete order successfully', async ({ pageManager }) => {
    
        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Backpack');
    
        // Go to the cart
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Fill in the First Name, Last Name, and ZIP Code fields
        await pageManager.checkoutPage().fillFirstName('John');
        await pageManager.checkoutPage().fillLastName('Ted');
        await pageManager.checkoutPage().fillZipCode('11145');
    
        // Click the 'Continue' button
        await pageManager.checkoutPage().clickContinueButton();
    
        // Click the 'Finish' button
        await pageManager.checkoutPage().clickFinishButton();
    
        // Verify that the 'Thank you for your order!' message is displayed
        await expect(pageManager.checkoutPage().completeOrderText).toBeVisible();
        expect(await pageManager.checkoutPage().completeOrderText.textContent()).toContain('Thank you for your order!');
    
    });
    
    test('TC-009 — Verify Back Home button', async ({ pageManager }) => {
    
        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Backpack');
    
        // Go to the cart
        await pageManager.commonPage().goToCart();
    
        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();
    
        // Fill in the First Name, Last Name, and ZIP Code fields
        await pageManager.checkoutPage().fillFirstName('John');
        await pageManager.checkoutPage().fillLastName('Ted');
        await pageManager.checkoutPage().fillZipCode('11145');
    
        // Click the 'Continue' button
        await pageManager.checkoutPage().clickContinueButton();
    
        // Click the 'Finish' button
        await pageManager.checkoutPage().clickFinishButton();
    
        // Click the 'Back Home' button
        await pageManager.checkoutPage().clickBackHomeButton();
    
        // Verify that the user is redirected back to the Products page (inventory.html)
        expect(pageManager.page.url()).toContain('inventory.html');
    
    });


});
