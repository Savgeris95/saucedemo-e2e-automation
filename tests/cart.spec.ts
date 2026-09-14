    import { test, expect } from '@playwright/test';
    import { PageManager } from '../page-objects/page-manager';

    test.describe('Cart page', ()=>{

        test.beforeEach('', async({page})=>{
            const pm = new PageManager(page);

            await page.goto('https://www.saucedemo.com/');
            await pm.loginPage().fillUsername('standard_user')
            await pm.loginPage().fillPassword('secret_sauce')
            await pm.loginPage().clickLogInButton()

            expect(page.url()).toBe('https://www.saucedemo.com/inventory.html')

        })

        test('TC-001 — Verify products are displayed', async({page})=>{
            const pm = new PageManager(page);

            // Add a product in the cart
            await pm.productPage().addProductToCart('Sauce Labs Bike Light')

            //Go to cart
            await pm.commonPage().goToCart()

            //Assert cart page url
            expect(page.url()).toContain('cart.html')

            //Verify that 'Your cart' is visible to the user
            await expect(pm.cartPage().cartTitle).toBeVisible()

        })

        test('TC-002 — Verify added product is displayed in cart,Verify its price and quantity', async({page})=>{
            const pm = new PageManager(page);

            // Add a product in the cart
            await pm.productPage().addProductToCart('Sauce Labs Bike Light')

            //Go to cart
            await pm.commonPage().goToCart()

            //Verify that the product is added on the cart
            await expect (pm.cartPage().getSpecificItemFromCart('Sauce Labs Bike Light')).toBeVisible()
            //Verify that the price of the product is the expected on the cart
            expect (await pm.cartPage().getThePriceOfSpecificItem('Sauce Labs Bike Light')).toBe('$9.99')
            //Verify that the quantity is the expected
            expect (await pm.cartPage().getTheQuantityOfSpecificItem('Sauce Labs Bike Light')).toBe('1')
        })

        test('TC-003 — Remove product from cart', async({page})=>{
            const pm = new PageManager(page);

            // Add a product in the cart
            await pm.productPage().addProductToCart('Sauce Labs Bike Light')

            //Go to cart
            await pm.commonPage().goToCart()

            //Remove product from cart
            await pm.cartPage().removeProductFromCart('Sauce Labs Bike Light')

            //Verify that the product is removed from the cart
            await expect (pm.cartPage().getSpecificItemFromCart('Sauce Labs Bike Light')).not.toBeVisible()
            await expect (pm.commonPage().getCartBadge()).not.toBeVisible()
        })

        test('TC-004 — Continue Shopping', async({page})=>{
            const pm = new PageManager(page);

            // Add a product in the cart
            await pm.productPage().addProductToCart('Sauce Labs Bike Light')

            //Go to cart
            await pm.commonPage().goToCart()

            //Click Continue Shopping button
            await pm.cartPage().clickContinueShopping()

            //Verify user is landed back on Product Page
            expect(page.url()).toContain('inventory.html')

        })

        test('TC-005 — Proceed to checkout', async({page})=>{
            const pm = new PageManager(page);
        

            // Add a product in the cart
            await pm.productPage().addProductToCart('Sauce Labs Bike Light')

            //Go to cart
            await pm.commonPage().goToCart()

            //Click Continue Shopping button
            await pm.cartPage().clickCheckoutButton()

            //Verify user is landed back on Checkout Page
            expect(page.url()).toContain('checkout-step-one.html')

        })




    })




