import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { HelperPage } from '../page-objects/helper.page';
import { ProductPage } from '../page-objects/product.page';
import { CartPage } from '../page-objects/cart.page';
import { CommonPage } from '../page-objects/common.page';

test.describe('Cart page', ()=>{
    
    test.beforeEach('', async({page})=>{
        const login_Page = new LoginPage(page)

        await page.goto('https://www.saucedemo.com/');
        await login_Page.fillUsername('standard_user')
        await login_Page.fillPassword('secret_sauce')
        await login_Page.clickLogInButton()

        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html')
        await expect(page.locator('.app_logo')).toBeVisible()
    })

    test('TC-001 — Verify products are displayed', async({page})=>{
        const product_Page = new ProductPage(page)
        const cart_Page = new CartPage(page)

        // Add a product in the cart
        await product_Page.addProductToCart('Sauce Labs Bike Light')

        //Go to cart
        await cart_Page.goToCart()

        //Assert cart page url
        expect(page.url()).toContain('cart.html')

        //Verify that 'Your cart' is visible to the user
        await expect(cart_Page.getCartTitle()).toBeVisible()

    })

    test('TC-002 — Verify added product is displayed in cart,Verify its price and quantity', async({page})=>{
        const product_Page = new ProductPage(page)
        const cart_Page = new CartPage(page)

        // Add a product in the cart
        await product_Page.addProductToCart('Sauce Labs Bike Light')

        //Go to cart
        await cart_Page.goToCart()

        //Verify that the product is added on the cart
        await expect (cart_Page.getSpecificItemFromCart('Sauce Labs Bike Light')).toBeVisible()
        //Verify that the price of the product is the expected on the cart
        expect (await cart_Page.getThePriceOfSpecificItem('Sauce Labs Bike Light')).toBe('$9.99')
        //Verify that the quantity is the expected
        expect (await cart_Page.getTheQuantityOfSpecificItem('Sauce Labs Bike Light')).toBe('1')
    })

    test('TC-003 — Remove product from cart', async({page})=>{
        const product_Page = new ProductPage(page)
        const cart_Page = new CartPage(page)
        const common_Page = new CommonPage(page)

        // Add a product in the cart
        await product_Page.addProductToCart('Sauce Labs Bike Light')

        //Go to cart
        await cart_Page.goToCart()

        //Remove product from cart
        await cart_Page.removeProductFromCart('Sauce Labs Bike Light')

        //Verify that the product is removed from the cart
        await expect (cart_Page.getSpecificItemFromCart('Sauce Labs Bike Light')).not.toBeVisible()
        await expect (common_Page.getCartBadge()).not.toBeVisible()
    })

    test('TC-004 — Continue Shopping', async({page})=>{
        const product_Page = new ProductPage(page)
        const cart_Page = new CartPage(page)
    

        // Add a product in the cart
        await product_Page.addProductToCart('Sauce Labs Bike Light')

        //Go to cart
        await cart_Page.goToCart()

        //Click Continue Shopping button
        await cart_Page.clickContinueShopping()

        //Verify user is landed back on Product Page
        expect(page.url()).toContain('inventory.html')
        
    })

    test('TC-005 — Proceed to checkout', async({page})=>{
        const product_Page = new ProductPage(page)
        const cart_Page = new CartPage(page)
    

        // Add a product in the cart
        await product_Page.addProductToCart('Sauce Labs Bike Light')

        //Go to cart
        await cart_Page.goToCart()

        //Click Continue Shopping button
        await cart_Page.clickCheckoutButton()

        //Verify user is landed back on Checkout Page
        expect(page.url()).toContain('checkout-step-one.html')
        
    })

    







    

    

    

})




