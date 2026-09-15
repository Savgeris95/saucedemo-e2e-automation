import { test, expect } from "../fixtures/fixtures";

test.describe('Cart page', () => {


    test('TC-001 — Verify products are displayed', async ({ pageManager, page }) => {

        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Bike Light');

        // Go to the cart
        await pageManager.commonPage().goToCart();

        // Verify that the cart page URL is correct
        expect(page.url()).toContain('cart.html');

        // Verify that the 'Your Cart' title is visible to the user
        await expect(pageManager.cartPage().cartTitle).toBeVisible();

    });

    test('TC-002 — Verify added product is displayed in cart, its price and quantity', async ({ pageManager }) => {

        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Bike Light');

        // Go to the cart
        await pageManager.commonPage().goToCart();

        // Verify that the product is displayed in the cart
        await expect(pageManager.cartPage().getSpecificItemFromCart('Sauce Labs Bike Light')).toBeVisible();

        // Verify that the product has the expected price
        expect(await pageManager.cartPage().getThePriceOfSpecificItem('Sauce Labs Bike Light')).toBe('$9.99');

        // Verify that the product has the expected quantity
        expect(await pageManager.cartPage().getTheQuantityOfSpecificItem('Sauce Labs Bike Light')).toBe('1');

    });

    test('TC-003 — Remove product from cart', async ({ pageManager }) => {

        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Bike Light');

        // Go to the cart
        await pageManager.commonPage().goToCart();

        // Remove the product from the cart
        await pageManager.cartPage().removeProductFromCart('Sauce Labs Bike Light');

        // Verify that the product is removed from the cart
        await expect(pageManager.cartPage().getSpecificItemFromCart('Sauce Labs Bike Light')).not.toBeVisible();
        await expect(pageManager.commonPage().getCartBadge()).not.toBeVisible();

    });

    test('TC-004 — Continue Shopping', async ({ pageManager, page }) => {

        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Bike Light');

        // Go to the cart
        await pageManager.commonPage().goToCart();

        // Click the 'Continue Shopping' button
        await pageManager.cartPage().clickContinueShopping();

        // Verify that the user is redirected back to the Product Page
        expect(pageManager.page.url()).toContain('inventory.html');

    });

    test('TC-005 — Proceed to checkout', async ({ pageManager }) => {

        // Add a product to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Bike Light');

        // Go to the cart
        await pageManager.commonPage().goToCart();

        // Click the 'Checkout' button
        await pageManager.cartPage().clickCheckoutButton();

        // Verify that the user is redirected to the Checkout Page
        expect(pageManager.page.url()).toContain('checkout-step-one.html');

    });


})
